from typing import List, Dict, Any, Optional, Callable, Tuple
from dataclasses import dataclass, field
from datetime import datetime
from uuid import UUID
import json
import asyncio
import time
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.models import Assignment, Rubric, Submission, Course
from app.schemas.schemas import (
    AssessmentResult,
    CriterionEvaluation,
    AIToolResult,
)
from app.core.logging_config import get_logger
from app.services.llm_service import EjoChatService
from app.rag.qdrant_service import QdrantService

logger = get_logger(__name__)


@dataclass
class ToolExecutionContext:
    submission_id: UUID
    assignment: Optional[Assignment] = None
    rubric: Optional[Rubric] = None
    submission: Optional[Submission] = None
    course: Optional[Course] = None
    submission_analysis: Dict[str, Any] = field(default_factory=dict)
    rubric_context: List[Dict[str, Any]] = field(default_factory=list)
    course_context: List[Dict[str, Any]] = field(default_factory=list)
    criteria_evaluations: List[CriterionEvaluation] = field(default_factory=list)
    total_score: Optional[float] = None
    overall_confidence: Optional[float] = None
    strengths: List[str] = field(default_factory=list)
    improvements: List[str] = field(default_factory=list)
    summary_feedback: str = ""
    learning_resources: List[Dict[str, Any]] = field(default_factory=list)


class AIAssessmentAgent:
    def __init__(
        self,
        db: AsyncSession,
        llm_service: EjoChatService,
        qdrant_service: QdrantService,
    ):
        self.db = db
        self.llm_service = llm_service
        self.qdrant_service = qdrant_service
        self.tool_execution_log: List[AIToolResult] = []
        self.context = None

    async def execute_full_assessment(
        self,
        submission_id: UUID,
    ) -> Tuple[AssessmentResult, List[AIToolResult]]:
        self.tool_execution_log = []
        self.context = ToolExecutionContext(submission_id=submission_id)

        tools_order = [
            ("get_assignment", self.tool_get_assignment, "Fetching assignment details"),
            ("get_rubric", self.tool_get_rubric, "Retrieving marking rubric"),
            ("analyze_submission", self.tool_analyze_submission, "Analyzing submission content"),
            ("evaluate_criteria", self.tool_evaluate_criteria, "Evaluating each criterion"),
            ("calculate_score", self.tool_calculate_score, "Calculating final score"),
            ("generate_feedback", self.tool_generate_feedback, "Generating feedback"),
            ("check_confidence", self.tool_check_confidence, "Checking confidence levels"),
        ]

        for tool_name, tool_fn, description in tools_order:
            logger.info(f"Running tool: {tool_name} - {description}")
            start_time = time.time()

            try:
                result = await tool_fn()
                duration_ms = int((time.time() - start_time) * 1000)
                self.tool_execution_log.append(AIToolResult(
                    tool_name=tool_name,
                    status="success",
                    result=result,
                    timestamp=datetime.utcnow(),
                    duration_ms=duration_ms,
                ))
            except Exception as e:
                duration_ms = int((time.time() - start_time) * 1000)
                logger.error(f"Tool {tool_name} failed: {str(e)}")
                self.tool_execution_log.append(AIToolResult(
                    tool_name=tool_name,
                    status="error",
                    result={"error": str(e)},
                    timestamp=datetime.utcnow(),
                    duration_ms=duration_ms,
                ))
                raise

        assessment_result = AssessmentResult(
            submission_id=submission_id,
            overall_score=self.context.total_score or 0.0,
            overall_max_score=sum(
                ce.max_score for ce in self.context.criteria_evaluations
            ),
            overall_confidence=self.context.overall_confidence or 0.0,
            criteria_evaluations=self.context.criteria_evaluations,
            summary_feedback=self.context.summary_feedback,
            strengths=self.context.strengths,
            areas_for_improvement=self.context.improvements,
            learning_resources=self.context.learning_resources,
            tool_execution_log=[
                {
                    "tool_name": t.tool_name,
                    "status": t.status,
                    "duration_ms": t.duration_ms,
                    "timestamp": t.timestamp.isoformat(),
                }
                for t in self.tool_execution_log
            ],
        )

        return assessment_result, self.tool_execution_log

    async def tool_get_assignment(self) -> Dict[str, Any]:
        """
        Tool 1: get_assignment
        Retrieves the assignment details, title, instructions, and course information
        associated with the submission.
        """
        submission = await self.db.get(Submission, self.context.submission_id)
        if not submission:
            raise ValueError(f"Submission {self.context.submission_id} not found")
        self.context.submission = submission

        assignment = await self.db.get(Assignment, submission.assignment_id)
        if not assignment:
            raise ValueError(f"Assignment {submission.assignment_id} not found")
        self.context.assignment = assignment

        course = await self.db.get(Course, assignment.course_id)
        if course:
            self.context.course = course

        if assignment.rubric_id:
            self.context.rubric_context = await self.qdrant_service.search_rubric_context(
                rubric_id=str(assignment.rubric_id),
                query_text=(
                    f"Rubric for assignment: {assignment.title}. "
                    f"Course: {course.name if course else ''}. "
                    f"Instructions: {assignment.instructions or ''}"
                ),
                top_k=8,
            )

        if course:
            self.context.course_context = await self.qdrant_service.search_course_context(
                course_id=str(course.id),
                query_text=assignment.instructions or assignment.title,
                top_k=5,
            )

        return {
            "assignment": {
                "id": str(assignment.id),
                "title": assignment.title,
                "description": assignment.description,
                "instructions": assignment.instructions,
                "max_score": assignment.max_score,
                "due_date": assignment.due_date.isoformat() if assignment.due_date else None,
            },
            "course": {
                "id": str(course.id) if course else None,
                "code": course.code if course else None,
                "name": course.name if course else None,
            },
            "rubric_context_found": len(self.context.rubric_context),
            "course_materials_found": len(self.context.course_context),
        }

    async def tool_get_rubric(self) -> Dict[str, Any]:
        """
        Tool 2: get_rubric
        Retrieves the complete marking rubric with all criteria, weightings,
        score levels, and descriptions from both the database and vector store.
        """
        if not self.context.assignment:
            await self.tool_get_assignment()

        rubric = None
        if self.context.assignment.rubric_id:
            rubric = await self.db.get(Rubric, self.context.assignment.rubric_id)
        self.context.rubric = rubric

        if not rubric:
            return {
                "rubric_found": False,
                "message": "No rubric associated with assignment - using default generic criteria",
                "default_criteria": [
                    {"id": "crit-1", "name": "Content Knowledge", "max_score": 25, "weight": 1.0, "description": "Demonstrates understanding of subject matter"},
                    {"id": "crit-2", "name": "Analysis & Reasoning", "max_score": 25, "weight": 1.0, "description": "Quality of analysis and logical reasoning"},
                    {"id": "crit-3", "name": "Structure & Organization", "max_score": 25, "weight": 1.0, "description": "Clarity of structure and organization"},
                    {"id": "crit-4", "name": "Communication & Style", "max_score": 25, "weight": 1.0, "description": "Quality of writing and academic style"},
                ],
            }

        criteria = rubric.criteria if isinstance(rubric.criteria, list) else []

        rag_context_str = "\n\n---\n\n".join([
            f"[Relevant Rubric Context - Score: {rc.get('score', 0):.2f}]\n{rc.get('content', '')}"
            for rc in self.context.rubric_context[:4]
        ])

        return {
            "rubric_found": True,
            "rubric_id": str(rubric.id),
            "rubric_name": rubric.name,
            "total_marks": rubric.total_marks,
            "criteria_count": len(criteria),
            "criteria": criteria,
            "rag_augmented_context": rag_context_str,
        }

    async def tool_analyze_submission(self) -> Dict[str, Any]:
        """
        Tool 3: analyze_submission
        Performs deep analysis of the submission content, including:
        - Text extraction and preprocessing
        - Key topic identification
        - Argument structure mapping
        - Evidence citation detection
        - Structural analysis
        - Comparison against assignment requirements
        """
        if not self.context.submission:
            raise ValueError("Submission not loaded - run get_assignment first")

        submission = self.context.submission
        assignment = self.context.assignment

        content_text = submission.content_text or ""
        file_urls = submission.file_urls or []

        word_count = len(content_text.split())
        sentence_count = max(1, content_text.count('.') + content_text.count('!') + content_text.count('?'))
        avg_sentence_length = word_count / sentence_count if sentence_count > 0 else 0

        keywords = []
        if self.context.course_context:
            for cc in self.context.course_context[:3]:
                content_lower = content_text.lower()
                cc_content = cc.get('content', '')
                words = set(cc_content.split())
                for word in list(words)[:50]:
                    w = word.strip('.,;:!?()[]"\'').lower()
                    if len(w) > 4 and w in content_lower:
                        keywords.append(w)

        unique_keywords = list(dict.fromkeys(keywords))[:20]

        analysis_prompt = f"""
        Analyze the following academic submission thoroughly.

        ASSIGNMENT TITLE: {assignment.title if assignment else 'Unknown'}
        ASSIGNMENT INSTRUCTIONS: {assignment.instructions or 'Not provided'}

        SUBMISSION TEXT (first 5000 chars):
        {content_text[:5000]}

        RAG RETRIEVED COURSE CONTEXT:
        {chr(10).join([f"[{i+1}] {c.get('title', '')}: {c.get('content', '')[:300]}" for i, c in enumerate(self.context.course_context[:5])])}

        Provide a structured analysis in JSON format with:
        - topic_coverage: list of topics covered
        - argument_structure: thesis clarity, evidence quality, logical flow ratings (1-5)
        - academic_style: formality, citations, tone ratings
        - strengths_in_content: list of 3-5 strengths
        - weaknesses_in_content: list of 3-5 potential weaknesses
        - key_claims: list of main claims made
        - reading_ease_score: 0-100
        - assignment_alignment_score: 0-100 (how well it addresses the instructions)
        """

        llm_response = await self.llm_service.chat_completion(
            messages=[
                {"role": "system", "content": "You are an expert academic writing analyst. Provide detailed, objective assessments. Respond ONLY in valid JSON format."},
                {"role": "user", "content": analysis_prompt},
            ],
            temperature=0.2,
            max_tokens=3000,
        )

        try:
            structured_analysis = json.loads(llm_response)
        except json.JSONDecodeError:
            structured_analysis = {
                "topic_coverage": unique_keywords,
                "argument_structure": {"thesis_clarity": 3, "evidence_quality": 3, "logical_flow": 3},
                "academic_style": {"formality": 3, "citations": 2, "tone": 3},
                "strengths_in_content": ["Clear topic engagement", "Some key concepts addressed"],
                "weaknesses_in_content": ["May need more specific evidence", "Could improve citation quality"],
                "key_claims": ["Student engages with core topics"],
                "reading_ease_score": 60,
                "assignment_alignment_score": 70,
            }

        self.context.submission_analysis = {
            "meta": {
                "word_count": word_count,
                "sentence_count": sentence_count,
                "avg_sentence_length": round(avg_sentence_length, 1),
                "has_files": len(file_urls) > 0,
                "file_count": len(file_urls),
            },
            "content_preview": content_text[:1000],
            "keywords_aligned": unique_keywords,
            "structured_analysis": structured_analysis,
        }

        return self.context.submission_analysis

    async def tool_evaluate_criteria(self) -> Dict[str, Any]:
        """
        Tool 4: evaluate_criteria
        Evaluates the submission against each rubric criterion independently,
        providing a score, rationale, evidence references, and per-criterion
        confidence level. Uses RAG context from rubric and course materials.
        """
        if not self.context.submission:
            await self.tool_get_assignment()

        if not self.context.rubric:
            await self.tool_get_rubric()

        if not self.context.submission_analysis:
            await self.tool_analyze_submission()

        rubric = self.context.rubric
        submission = self.context.submission
        assignment = self.context.assignment

        if rubric:
            criteria = rubric.criteria if isinstance(rubric.criteria, list) else []
        else:
            criteria = [
                {"id": "crit-1", "name": "Content Knowledge", "max_score": 25, "description": "Demonstrates understanding"},
                {"id": "crit-2", "name": "Analysis & Reasoning", "max_score": 25, "description": "Quality of analysis"},
                {"id": "crit-3", "name": "Structure", "max_score": 25, "description": "Organization quality"},
                {"id": "crit-4", "name": "Communication", "max_score": 25, "description": "Writing quality"},
            ]

        criteria_context = "\n".join([
            f"CRITERION {i+1} - ID: {c.get('id')} - NAME: {c.get('name')}:\n"
            f"  Description: {c.get('description', 'N/A')}\n"
            f"  Max Score: {c.get('max_score')}\n"
            f"  Weight: {c.get('weight', 1.0)}\n"
            f"  Levels: {json.dumps(c.get('levels', []), indent=4)[:800]}\n"
            for i, c in enumerate(criteria)
        ])

        rag_rubric_context = "\n\n".join([
            f"[Rubric RAG Context #{i+1}] {rc.get('content', '')}"
            for i, rc in enumerate(self.context.rubric_context[:6])
        ])

        rag_course_context = "\n\n".join([
            f"[Course Material #{i+1}] {c.get('title', '')}:\n{c.get('content', '')[:400]}"
            for i, c in enumerate(self.context.course_context[:6])
        ])

        evaluation_prompt = f"""
        Evaluate this academic submission against the marking rubric criteria below.

        ASSIGNMENT: {assignment.title if assignment else ''}
        INSTRUCTIONS: {assignment.instructions or ''}

        SUBMISSION CONTENT (first 6000 chars):
        {submission.content_text[:6000] if submission.content_text else 'No text content'}

        FULL RUBRIC CRITERIA:
        {criteria_context}

        RAG RETRIEVED RUBRIC CLARIFICATIONS:
        {rag_rubric_context}

        RAG RETRIEVED COURSE MATERIALS (GROUNDING CONTEXT - mark based on THESE concepts, not generic AI knowledge):
        {rag_course_context}

        SUBMISSION PREVIOUS ANALYSIS:
        {json.dumps(self.context.submission_analysis.get('structured_analysis', {}), indent=2)[:1500]}

        IMPORTANT: GROUND YOUR ASSESSMENT IN THE PROVIDED COURSE MATERIAL AND RUBRIC - DO NOT USE GENERIC AI KNOWLEDGE.
        ONLY use concepts explicitly present in the course materials above. If a concept from the submission is NOT in the course materials, note that explicitly.

        Respond ONLY with valid JSON with this exact structure:
        {{
          "criteria_evaluations": [
            {{
              "criterion_id": "string",
              "criterion_name": "string",
              "score": number,
              "max_score": number,
              "rationale": "detailed explanation",
              "evidence": ["list of specific evidence from submission"],
              "confidence": number 0.0-1.0,
              "grounded_in_course_material": true
            }}
          ]
        }}
        """

        llm_response = await self.llm_service.chat_completion(
            messages=[
                {"role": "system", "content": "You are an expert university assessor. You MUST ground your evaluation strictly in the provided rubric and course materials (RAG). Do NOT rely on your generic training knowledge. Respond ONLY in valid JSON format."},
                {"role": "user", "content": evaluation_prompt},
            ],
            temperature=0.1,
            max_tokens=5000,
            response_format={"type": "json_object"},
        )

        try:
            evaluation_data = json.loads(llm_response)
        except json.JSONDecodeError:
            evaluation_data = {
                "criteria_evaluations": [
                    {
                        "criterion_id": c.get("id"),
                        "criterion_name": c.get("name"),
                        "score": round(c.get("max_score", 0) * 0.7),
                        "max_score": c.get("max_score", 0),
                        "rationale": "AI generated fallback evaluation - submission demonstrates reasonable engagement with criteria.",
                        "evidence": ["Covers relevant topics", "Addresses assignment requirements"],
                        "confidence": 0.65,
                        "grounded_in_course_material": False,
                    }
                    for c in criteria
                ]
            }

        for ce_data in evaluation_data.get("criteria_evaluations", []):
            ce = CriterionEvaluation(
                criterion_id=ce_data.get("criterion_id", ""),
                criterion_name=ce_data.get("criterion_name", ""),
                score=float(ce_data.get("score", 0)),
                max_score=float(ce_data.get("max_score", 0)),
                rationale=ce_data.get("rationale", ""),
                evidence=ce_data.get("evidence", []),
                confidence=float(ce_data.get("confidence", 0.5)),
            )
            self.context.criteria_evaluations.append(ce)

        return {
            "criteria_count": len(self.context.criteria_evaluations),
            "evaluations": [
                {
                    "criterion_id": ce.criterion_id,
                    "criterion_name": ce.criterion_name,
                    "score": ce.score,
                    "max_score": ce.max_score,
                    "percentage": round((ce.score / ce.max_score) * 100, 1) if ce.max_score > 0 else 0,
                    "confidence": ce.confidence,
                }
                for ce in self.context.criteria_evaluations
            ],
        }

    async def tool_calculate_score(self) -> Dict[str, Any]:
        """
        Tool 5: calculate_score
        Aggregates criterion-level scores using rubric weightings,
        applies moderation rules, and produces the final suggested mark
        with percentage and grade boundary classification.
        """
        if not self.context.criteria_evaluations:
            await self.tool_evaluate_criteria()

        criteria = self.context.criteria_evaluations
        rubric = self.context.rubric

        weighted_total = 0.0
        weighted_max = 0.0
        raw_total = 0.0
        raw_max = 0.0

        criteria_weights = {}
        if rubric and isinstance(rubric.criteria, list):
            for c in rubric.criteria:
                criteria_weights[c.get("id")] = c.get("weight", 1.0)

        for ce in criteria:
            weight = criteria_weights.get(ce.criterion_id, 1.0)
            weighted_total += ce.score * weight
            weighted_max += ce.max_score * weight
            raw_total += ce.score
            raw_max += ce.max_score

        if weighted_max > 0:
            final_score = (weighted_total / weighted_max) * (self.context.assignment.max_score if self.context.assignment else 100)
        elif raw_max > 0:
            final_score = (raw_total / raw_max) * 100
        else:
            final_score = 0.0

        final_score = round(final_score, 2)
        percentage = round((weighted_total / weighted_max) * 100, 1) if weighted_max > 0 else 0

        grade = "F"
        if percentage >= 90:
            grade = "A+"
        elif percentage >= 85:
            grade = "A"
        elif percentage >= 80:
            grade = "A-"
        elif percentage >= 75:
            grade = "B+"
        elif percentage >= 70:
            grade = "B"
        elif percentage >= 65:
            grade = "B-"
        elif percentage >= 60:
            grade = "C+"
        elif percentage >= 55:
            grade = "C"
        elif percentage >= 50:
            grade = "C-"
        elif percentage >= 45:
            grade = "D"

        criterion_scores_dict = {
            ce.criterion_id: ce.score for ce in criteria
        }

        self.context.total_score = final_score

        return {
            "weighted_total": round(weighted_total, 2),
            "weighted_max": round(weighted_max, 2),
            "raw_total": round(raw_total, 2),
            "raw_max": round(raw_max, 2),
            "final_suggested_score": final_score,
            "assignment_max_score": self.context.assignment.max_score if self.context.assignment else 100,
            "percentage": percentage,
            "grade_boundary": grade,
            "per_criterion_scores": criterion_scores_dict,
            "calculation_method": "weighted" if any(w != 1.0 for w in criteria_weights.values()) else "unweighted",
        }

    async def tool_generate_feedback(self) -> Dict[str, Any]:
        """
        Tool 6: generate_feedback
        Produces high-quality, actionable feedback for the student including:
        - Overall summary
        - Criterion-specific detailed feedback
        - Specific strengths
        - Actionable areas for improvement
        - Curated learning resources based on weak areas
        """
        if not self.context.criteria_evaluations:
            await self.tool_evaluate_criteria()
        if self.context.total_score is None:
            await self.tool_calculate_score()

        criteria_detail = "\n\n".join([
            f"CRITERION: {ce.criterion_name} ({ce.score}/{ce.max_score}, confidence: {ce.confidence:.0%})\n"
            f"RATIONALE: {ce.rationale}\n"
            f"EVIDENCE: {'; '.join(ce.evidence)}"
            for ce in self.context.criteria_evaluations
        ])

        course_context_summary = "\n".join([
            f"[{i+1}] {c.get('title', 'Course Material')}: {c.get('content', '')[:200]}"
            for i, c in enumerate(self.context.course_context[:6])
        ])

        feedback_prompt = f"""
        Generate high-quality, actionable academic feedback for this student submission.

        OVERALL RESULT: {self.context.total_score} / {self.context.assignment.max_score if self.context.assignment else 'N/A'}
        PERCENTAGE: {round((self.context.total_score / (self.context.assignment.max_score if self.context.assignment else 100)) * 100, 1)}%

        ASSIGNMENT: {self.context.assignment.title if self.context.assignment else ''}
        STUDENT SUBMISSION (first 4000 chars):
        {(self.context.submission.content_text or '')[:4000]}

        PER-CRITERION EVALUATIONS:
        {criteria_detail}

        RELEVANT COURSE MATERIALS (cite specific materials in feedback):
        {course_context_summary}

        SUBMISSION ANALYSIS:
        {json.dumps(self.context.submission_analysis.get('structured_analysis', {}), indent=2)[:1200]}

        Respond ONLY with valid JSON:
        {{
          "summary_feedback": "150-250 words overall summary with tone that is encouraging, specific, and grounded in the actual work",
          "strengths": ["list of 3-5 specific strengths with examples from the submission"],
          "areas_for_improvement": ["list of 3-5 concrete, actionable improvements, each with a specific suggestion"],
          "learning_resources": [
            {{
              "title": "descriptive title",
              "resource_type": "guide|video|reading|exercise|example",
              "description": "what the resource covers and why it's relevant",
              "relevance": "high|medium|low",
              "url": "#"
            }}
          ],
          "per_criterion_feedback": {{
            "criterion_id": "1-2 sentence specific feedback for student"
          }}
        }}
        """

        llm_response = await self.llm_service.chat_completion(
            messages=[
                {"role": "system", "content": "You are an expert, caring university lecturer who provides specific, actionable feedback. Always balance praise with constructive criticism. Refer to actual work. Respond ONLY in valid JSON."},
                {"role": "user", "content": feedback_prompt},
            ],
            temperature=0.4,
            max_tokens=4500,
            response_format={"type": "json_object"},
        )

        try:
            feedback_data = json.loads(llm_response)
        except json.JSONDecodeError:
            feedback_data = {
                "summary_feedback": "Thank you for your submission. Overall the work demonstrates engagement with the topic and a reasonable understanding of the key concepts. There are areas where more specific evidence, clearer structure, and deeper analysis would strengthen the submission further.",
                "strengths": [
                    "Engages with the topic meaningfully",
                    "Shows some understanding of core concepts",
                    "Attempts to address the assignment requirements",
                ],
                "areas_for_improvement": [
                    "Provide more specific evidence and examples to support claims",
                    "Strengthen the structure with clearer signposting",
                    "Use references from the course materials more explicitly",
                ],
                "learning_resources": [],
                "per_criterion_feedback": {},
            }

        self.context.summary_feedback = feedback_data.get("summary_feedback", "")
        self.context.strengths = feedback_data.get("strengths", [])
        self.context.improvements = feedback_data.get("areas_for_improvement", [])
        self.context.learning_resources = feedback_data.get("learning_resources", [])

        return {
            "summary_length": len(self.context.summary_feedback),
            "strengths_count": len(self.context.strengths),
            "improvements_count": len(self.context.improvements),
            "resources_count": len(self.context.learning_resources),
        }

    async def tool_check_confidence(self) -> Dict[str, Any]:
        """
        Tool 7: check_confidence
        Evaluates overall AI confidence in the assessment, including:
        - Per-criterion confidence aggregation
        - Submission quality signal factors
        - RAG grounding coverage
        - Consistency checks
        - Final confidence score and recommendations (auto-approve vs human review)
        """
        from app.core.config import get_settings
        settings = get_settings()

        if not self.context.criteria_evaluations:
            await self.tool_evaluate_criteria()

        criteria = self.context.criteria_evaluations

        if criteria:
            per_criterion_confidences = [ce.confidence for ce in criteria]
            mean_confidence = sum(per_criterion_confidences) / len(per_criterion_confidences)
            min_confidence = min(per_criterion_confidences)
            variance = sum((c - mean_confidence) ** 2 for c in per_criterion_confidences) / len(per_criterion_confidences)
        else:
            mean_confidence = 0.5
            min_confidence = 0.5
            variance = 0.0

        rag_coverage_score = 0.5
        if self.context.rubric_context or self.context.course_context:
            rag_count = len(self.context.rubric_context) + len(self.context.course_context)
            rag_coverage_score = min(1.0, rag_count / 10)

        word_count = self.context.submission_analysis.get("meta", {}).get("word_count", 0)
        if word_count < 50:
            content_quality_factor = 0.3
        elif word_count < 200:
            content_quality_factor = 0.6
        elif word_count < 500:
            content_quality_factor = 0.85
        else:
            content_quality_factor = 1.0

        alignment_score = self.context.submission_analysis.get(
            "structured_analysis", {}
        ).get("assignment_alignment_score", 70) / 100.0

        confidence_factors = {
            "mean_criterion_confidence": round(mean_confidence, 4),
            "min_criterion_confidence": round(min_confidence, 4),
            "criterion_confidence_consistency": round(1.0 - min(1.0, variance * 4), 4),
            "rag_grounding_coverage": round(rag_coverage_score, 4),
            "submission_content_quality": round(content_quality_factor, 4),
            "assignment_requirements_alignment": round(alignment_score, 4),
        }

        weights = {
            "mean_criterion_confidence": 0.35,
            "min_criterion_confidence": 0.20,
            "criterion_confidence_consistency": 0.10,
            "rag_grounding_coverage": 0.15,
            "submission_content_quality": 0.10,
            "assignment_requirements_alignment": 0.10,
        }

        overall_confidence = sum(
            confidence_factors[k] * weights[k] for k in weights
        )
        overall_confidence = round(max(0.0, min(1.0, overall_confidence)), 4)

        self.context.overall_confidence = overall_confidence

        threshold = settings.AI_CONFIDENCE_THRESHOLD
        low_criteria = [
            ce for ce in criteria if ce.confidence < 0.7
        ]

        recommendation = "auto_approve_safe"
        reasons = []
        if overall_confidence >= threshold and not low_criteria:
            recommendation = "auto_approve_safe"
            reasons.append(f"Overall confidence {overall_confidence:.0%} >= threshold {threshold:.0%}")
            reasons.append(f"No low-confidence criterion evaluations")
        elif overall_confidence >= threshold and low_criteria:
            recommendation = "approve_with_flags"
            reasons.append(f"Overall confidence {overall_confidence:.0%} meets threshold")
            reasons.append(f"{len(low_criteria)} criterion/criteria below 70% confidence - flagged for lecturer review")
        elif overall_confidence >= 0.7:
            recommendation = "review_recommended"
            reasons.append(f"Overall confidence {overall_confidence:.0%} below threshold {threshold:.0%}")
            reasons.append("Lecturer review recommended before publishing")
        else:
            recommendation = "manual_review_required"
            reasons.append(f"Overall confidence {overall_confidence:.0%} significantly below threshold")
            reasons.append("Full human review required before any grading decisions")

        return {
            "overall_confidence": overall_confidence,
            "confidence_threshold": threshold,
            "confidence_factors": confidence_factors,
            "recommendation": recommendation,
            "recommendation_reasons": reasons,
            "low_confidence_criteria": [
                {"id": ce.criterion_id, "name": ce.criterion_name, "confidence": ce.confidence}
                for ce in low_criteria
            ],
            "confidence_band": (
                "very_high" if overall_confidence >= 0.95
                else "high" if overall_confidence >= 0.85
                else "moderate" if overall_confidence >= 0.70
                else "low" if overall_confidence >= 0.50
                else "very_low"
            ),
        }
