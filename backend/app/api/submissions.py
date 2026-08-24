from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
import json

from app.core.database import get_db
from app.api.deps import get_current_user, get_current_lecturer, get_current_student
from app.models.models import (
    User, Assignment, Submission, Rubric, AssessmentHistory,
    SubmissionStatus, AssessmentStatus, UserRole,
)
from app.schemas.schemas import (
    SubmissionCreate, SubmissionResponse, SubmissionReview,
    SubmissionStatusUpdate, AssessmentResult,
)
from app.services.llm_service import EjoChatService
from app.rag.qdrant_service import QdrantService
from app.agents.assessment_agent import AIAssessmentAgent
from app.core.logging_config import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/submissions", tags=["Submissions"])


def _get_services():
    llm = EjoChatService()
    qdrant = QdrantService(llm)
    return llm, qdrant


@router.get("", response_model=List[SubmissionResponse])
async def list_submissions(
    assignment_id: Optional[UUID] = None,
    status: Optional[SubmissionStatus] = None,
    skip: int = 0,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    query = select(Submission)

    if assignment_id:
        query = query.where(Submission.assignment_id == assignment_id)
    if status:
        query = query.where(Submission.status == status)

    if current_user.role == UserRole.STUDENT:
        query = query.where(Submission.student_id == current_user.id)
        query = query.where(
            (Submission.published_to_student == True) |
            (Submission.status.in_([
                SubmissionStatus.PENDING,
                SubmissionStatus.AI_ASSESSING,
                SubmissionStatus.AI_COMPLETE,
            ]))
        )

    result = await db.execute(query.order_by(Submission.created_at.desc()).offset(skip).limit(limit))
    return result.scalars().all()


@router.post("", response_model=SubmissionResponse, status_code=status.HTTP_201_CREATED)
async def create_submission(
    submission_in: SubmissionCreate,
    current_user: User = Depends(get_current_student),
    db: AsyncSession = Depends(get_db),
):
    assignment = await db.get(Assignment, submission_in.assignment_id)
    if not assignment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assignment not found",
        )

    existing = await db.execute(
        select(Submission).where(
            Submission.assignment_id == submission_in.assignment_id,
            Submission.student_id == current_user.id,
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already submitted this assignment",
        )

    late = False
    if assignment.due_date:
        from datetime import datetime, timezone
        now = datetime.now(timezone.utc)
        if now.tzinfo is None:
            from datetime import timezone as tz
            now = now.replace(tzinfo=tz.utc)
        due = assignment.due_date
        if due.tzinfo is None:
            from datetime import timezone as tz
            due = due.replace(tzinfo=tz.utc)
        late = now > due

    submission = Submission(
        **submission_in.model_dump(),
        student_id=current_user.id,
        late_submission=late,
        status=SubmissionStatus.PENDING,
        assessment_status=AssessmentStatus.NOT_STARTED,
    )
    db.add(submission)
    await db.commit()
    await db.refresh(submission)
    return submission


@router.get("/{submission_id}", response_model=SubmissionResponse)
async def get_submission(
    submission_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    submission = await db.get(Submission, submission_id)
    if not submission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Submission not found",
        )

    if (
        current_user.role == UserRole.STUDENT
        and submission.student_id != current_user.id
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This is not your submission",
        )

    return submission


@router.post("/{submission_id}/run-ai-assessment", response_model=AssessmentResult)
async def run_ai_assessment(
    submission_id: str,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_lecturer),
    db: AsyncSession = Depends(get_db),
):
    submission = await db.get(Submission, submission_id)
    if not submission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Submission not found",
        )

    submission.status = SubmissionStatus.AI_ASSESSING
    submission.assessment_status = AssessmentStatus.IN_PROGRESS
    await db.commit()

    llm_service, qdrant_service = _get_services()
    agent = AIAssessmentAgent(db, llm_service, qdrant_service)

    try:
        result, tool_logs = await agent.execute_full_assessment(submission_id)

        submission.status = SubmissionStatus.AI_COMPLETE
        submission.assessment_status = AssessmentStatus.COMPLETED
        submission.ai_suggested_score = result.overall_score
        submission.ai_confidence = result.overall_confidence
        submission.ai_criterion_scores = {
            ce.criterion_id: ce.score
            for ce in result.criteria_evaluations
        }
        submission.ai_feedback = result.summary_feedback
        submission.ai_metadata = {
            "strengths": result.strengths,
            "areas_for_improvement": result.areas_for_improvement,
            "tool_execution_log": result.tool_execution_log,
        }
        submission.learning_resources = result.learning_resources

        history = AssessmentHistory(
            submission_id=submission.id,
            action="AI_ASSESSMENT_COMPLETED",
            actor_id=current_user.id,
            new_values={
                "ai_suggested_score": result.overall_score,
                "ai_confidence": result.overall_confidence,
            },
            comment=f"AI assessment completed. Confidence: {result.overall_confidence:.0%}",
        )
        db.add(history)
        await db.commit()
        await db.refresh(submission)

        return result

    except Exception as e:
        logger.error(f"AI Assessment failed for {submission_id}: {str(e)}")
        submission.status = SubmissionStatus.HUMAN_REVIEW
        submission.assessment_status = AssessmentStatus.REQUIRES_REVIEW
        await db.commit()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI assessment failed: {str(e)}",
        )


@router.post("/{submission_id}/review", response_model=SubmissionResponse)
async def review_submission(
    submission_id: str,
    review_in: SubmissionReview,
    current_user: User = Depends(get_current_lecturer),
    db: AsyncSession = Depends(get_db),
):
    submission = await db.get(Submission, submission_id)
    if not submission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Submission not found",
        )

    old_values = {
        "lecturer_final_score": submission.lecturer_final_score,
        "lecturer_criterion_scores": submission.lecturer_criterion_scores,
    }

    final_score = review_in.final_score
    if final_score is None:
        final_score = sum(review_in.lecturer_criterion_scores.values())

    ai_score = submission.ai_suggested_score or 0
    modified = abs(final_score - ai_score) > 0.001

    submission.lecturer_criterion_scores = review_in.lecturer_criterion_scores
    submission.lecturer_comment = review_in.lecturer_comment
    submission.lecturer_final_score = final_score
    submission.reviewed_by_id = current_user.id
    submission.reviewed_at = __import__("datetime").datetime.utcnow()
    submission.modified_by_teacher = modified
    submission.status = SubmissionStatus.APPROVED
    submission.published_to_student = review_in.publish_to_student

    history = AssessmentHistory(
        submission_id=submission.id,
        action="LECTURER_REVIEW_COMPLETED",
        actor_id=current_user.id,
        old_values=old_values,
        new_values={
            "lecturer_final_score": final_score,
            "lecturer_criterion_scores": review_in.lecturer_criterion_scores,
            "modified_by_teacher": modified,
            "published": review_in.publish_to_student,
        },
        comment=review_in.lecturer_comment,
    )
    db.add(history)

    try:
        import httpx
        from app.core.config import get_settings
        settings = get_settings()
        payload = {
            "event": "grade_published",
            "submission_id": str(submission.id),
            "student_id": str(submission.student_id),
            "final_score": final_score,
            "published": review_in.publish_to_student,
        }
        async with httpx.AsyncClient(timeout=10.0) as client:
            await client.post(settings.N8N_WEBHOOK_URL, json=payload)
    except Exception as e:
        logger.warning(f"n8n webhook notification failed: {str(e)}")

    await db.commit()
    await db.refresh(submission)
    return submission


@router.patch("/{submission_id}/status", response_model=SubmissionResponse)
async def update_submission_status(
    submission_id: str,
    status_in: SubmissionStatusUpdate,
    current_user: User = Depends(get_current_lecturer),
    db: AsyncSession = Depends(get_db),
):
    submission = await db.get(Submission, submission_id)
    if not submission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Submission not found",
        )

    old_status = submission.status
    submission.status = status_in.status

    history = AssessmentHistory(
        submission_id=submission.id,
        action=f"STATUS_CHANGED_{status_in.status.value.upper().replace(' ', '_')}",
        actor_id=current_user.id,
        old_values={"status": old_status.value if old_status else None},
        new_values={"status": status_in.status.value},
        comment=status_in.comment,
    )
    db.add(history)
    await db.commit()
    await db.refresh(submission)
    return submission
