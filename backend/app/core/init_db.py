import asyncio
from datetime import datetime, timedelta, timezone
from uuid import uuid4
from sqlalchemy import select

from app.core.database import Base, sync_engine, AsyncSessionLocal
from app.core.security import hash_password
from app.models.models import (
    User, UserRole, Course, CourseMember, Rubric, Assignment,
    Submission, SubmissionStatus, AssessmentStatus, CourseMaterial,
)
from app.core.logging_config import get_logger

logger = get_logger(__name__)


def create_tables():
    Base.metadata.create_all(bind=sync_engine)
    logger.info("Database tables created")


async def _seed_demo_data():
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(User).limit(1))
        existing_users = result.scalars().all()
        if existing_users:
            logger.info("Demo data already seeded - skipping")
            return

        lecturer = User(
            id=uuid4(),
            email="dr.alice@eduguard.ai",
            full_name="Dr. Alice Mukamana",
            hashed_password=hash_password("lecturer123"),
            role=UserRole.LECTURER,
            department="Environmental Science",
            is_active=True,
        )
        lecturer2 = User(
            id=uuid4(),
            email="prof.bob@eduguard.ai",
            full_name="Prof. Bob Nkurunziza",
            hashed_password=hash_password("lecturer123"),
            role=UserRole.LECTURER,
            department="Computer Science",
            is_active=True,
        )
        admin = User(
            id=uuid4(),
            email="admin@eduguard.ai",
            full_name="System Admin",
            hashed_password=hash_password("admin123"),
            role=UserRole.ADMIN,
            department="Administration",
            is_active=True,
        )

        db.add_all([lecturer, lecturer2, admin])

        students = []
        student_names = [
            ("Jean Claude", "jc@eduguard.ai", "2024-001"),
            ("Marie Grace", "mgrace@eduguard.ai", "2024-002"),
            ("David Habimana", "david@eduguard.ai", "2024-003"),
            ("Sarah Uwase", "sarah@eduguard.ai", "2024-004"),
            ("Jean Paul", "jpaul@eduguard.ai", "2024-005"),
            ("Aline Ingabire", "aline@eduguard.ai", "2024-006"),
        ]
        for name, email, sid in student_names:
            student = User(
                id=uuid4(),
                email=email,
                full_name=name,
                hashed_password=hash_password("student123"),
                role=UserRole.STUDENT,
                student_id=sid,
                is_active=True,
            )
            students.append(student)
        db.add_all(students)
        await db.flush()

        course_env = Course(
            id=uuid4(),
            code="ENV-101",
            name="Introduction to Environmental Studies",
            description="Fundamental concepts of environmental science, climate change, sustainability, and ecological principles.",
            department="Environmental Science",
            academic_year="2025-2026",
            semester="Semester 2",
        )
        course_cs = Course(
            id=uuid4(),
            code="CS-201",
            name="Data Structures & Algorithms",
            description="Core CS course covering algorithm analysis, data structures, and computational thinking.",
            department="Computer Science",
            academic_year="2025-2026",
            semester="Semester 2",
        )
        db.add_all([course_env, course_cs])
        await db.flush()

        memberships = [
            CourseMember(course_id=course_env.id, user_id=lecturer.id, role=UserRole.LECTURER),
            CourseMember(course_id=course_cs.id, user_id=lecturer2.id, role=UserRole.LECTURER),
        ]
        for s in students:
            memberships.append(CourseMember(course_id=course_env.id, user_id=s.id, role=UserRole.STUDENT))
        for s in students[:4]:
            memberships.append(CourseMember(course_id=course_cs.id, user_id=s.id, role=UserRole.STUDENT))
        db.add_all(memberships)
        await db.flush()

        rubric_env = Rubric(
            id=uuid4(),
            name="ENV-101 Essay Grading Rubric",
            description="Four-criterion matrix for assessing 1500-2000 word argumentative essays on environmental topics.",
            course_id=course_env.id,
            created_by_id=lecturer.id,
            criteria=[
                {
                    "id": "crit-1",
                    "name": "Understanding of Topic",
                    "description": "Accuracy and depth of comprehension of environmental concepts, climate drivers, and sustainability models.",
                    "max_score": 5.0,
                    "weight": 1.0,
                    "levels": [
                        {"level": 1, "score_min": 4.5, "score_max": 5.0, "descriptor": "Outstanding: Accurate, nuanced, comprehensive grasp of theories and their interconnections."},
                        {"level": 2, "score_min": 3.5, "score_max": 4.4, "descriptor": "Very Good: Solid understanding with minor gaps or simplifications."},
                        {"level": 3, "score_min": 2.5, "score_max": 3.4, "descriptor": "Satisfactory: Basic understanding present but lacks depth."},
                        {"level": 4, "score_min": 1.5, "score_max": 2.4, "descriptor": "Limited: Significant misunderstandings evident."},
                        {"level": 5, "score_min": 0.0, "score_max": 1.4, "descriptor": "Poor: Major factual errors or irrelevant content."},
                    ],
                },
                {
                    "id": "crit-2",
                    "name": "Quality of Argument",
                    "description": "Logical structure, thesis clarity, reasoning quality, and persuasive use of reasoning.",
                    "max_score": 5.0,
                    "weight": 1.0,
                    "levels": [
                        {"level": 1, "score_min": 4.5, "score_max": 5.0, "descriptor": "Outstanding: Original, tightly argued, perceptive analysis."},
                        {"level": 2, "score_min": 3.5, "score_max": 4.4, "descriptor": "Very Good: Clear, convincing argument with minor structural issues."},
                        {"level": 3, "score_min": 2.5, "score_max": 3.4, "descriptor": "Satisfactory: Reasonable argument with occasional gaps."},
                        {"level": 4, "score_min": 1.5, "score_max": 2.4, "descriptor": "Limited: Weak thesis, inconsistent reasoning."},
                        {"level": 5, "score_min": 0.0, "score_max": 1.4, "descriptor": "Poor: No clear argument or logical structure."},
                    ],
                },
                {
                    "id": "crit-3",
                    "name": "Evidence & Examples",
                    "description": "Use of specific data, case studies, citations, and real-world examples to support claims.",
                    "max_score": 5.0,
                    "weight": 1.0,
                    "levels": [
                        {"level": 1, "score_min": 4.5, "score_max": 5.0, "descriptor": "Outstanding: Extensive, relevant, properly cited evidence from multiple sources."},
                        {"level": 2, "score_min": 3.5, "score_max": 4.4, "descriptor": "Very Good: Good use of examples and data with adequate referencing."},
                        {"level": 3, "score_min": 2.5, "score_max": 3.4, "descriptor": "Satisfactory: Some evidence used but more specificity needed."},
                        {"level": 4, "score_min": 1.5, "score_max": 2.4, "descriptor": "Limited: Sparse evidence with assertions unsupported."},
                        {"level": 5, "score_min": 0.0, "score_max": 1.4, "descriptor": "Poor: No supporting evidence, purely anecdotal."},
                    ],
                },
                {
                    "id": "crit-4",
                    "name": "Structure and Clarity",
                    "description": "Essay organization, paragraph coherence, academic writing style, grammar, and citation format.",
                    "max_score": 5.0,
                    "weight": 1.0,
                    "levels": [
                        {"level": 1, "score_min": 4.5, "score_max": 5.0, "descriptor": "Outstanding: Flawless structure, elegant prose, perfect academic conventions."},
                        {"level": 2, "score_min": 3.5, "score_max": 4.4, "descriptor": "Very Good: Well organized with only minor writing issues."},
                        {"level": 3, "score_min": 2.5, "score_max": 3.4, "descriptor": "Satisfactory: Adequate structure and acceptable writing quality."},
                        {"level": 4, "score_min": 1.5, "score_max": 2.4, "descriptor": "Limited: Weak organization, frequent errors impede readability."},
                        {"level": 5, "score_min": 0.0, "score_max": 1.4, "descriptor": "Poor: Chaotic structure, severe language issues."},
                    ],
                },
            ],
            total_marks=20.0,
            is_active=True,
        )
        db.add(rubric_env)
        await db.flush()

        now = datetime.now(timezone.utc)
        assignment_env = Assignment(
            id=uuid4(),
            title="Climate Change: Mitigation vs Adaptation Strategies",
            description="Write a 1500-2000 word argumentative essay comparing climate change mitigation and adaptation strategies. Your essay must evaluate the effectiveness of both approaches using case studies from developing nations, particularly in the East African region.",
            course_id=course_env.id,
            rubric_id=rubric_env.id,
            created_by_id=lecturer.id,
            due_date=now + timedelta(days=14),
            max_score=20.0,
            instructions=(
                "1. Introduce climate change with reference to IPCC AR6 findings.\n"
                "2. Define mitigation vs adaptation clearly with examples.\n"
                "3. Present 3 arguments for mitigation priority.\n"
                "4. Present 3 arguments for adaptation priority.\n"
                "5. Synthesize: advocate for a balanced approach with specific regional case studies.\n"
                "6. Use APA 7th edition referencing with at least 8 academic sources.\n"
                "7. Word count: 1500-2000 words (excluding references)."
            ),
            file_types_allowed=[".pdf", ".docx", ".doc"],
            max_file_size_mb=10,
            additional_materials={
                "prescribed_readings": [
                    "IPCC AR6 Working Group II Report, Chapter 17 (Africa)",
                    "Parry et al. (2022) Climate Adaptation in Developing Nations",
                ],
            },
        )
        assignment_cs = Assignment(
            id=uuid4(),
            title="Binary Search Tree Implementation & Analysis",
            description="Implement a balanced BST in Python, write unit tests, and analyse its time complexity empirically.",
            course_id=course_cs.id,
            created_by_id=lecturer2.id,
            due_date=now + timedelta(days=21),
            max_score=100.0,
            file_types_allowed=[".py", ".ipynb", ".pdf"],
            max_file_size_mb=5,
        )
        db.add_all([assignment_env, assignment_cs])
        await db.flush()

        submission_text = (
            "Climate Change: A Balanced Analysis of Mitigation and Adaptation Strategies for East Africa\n\n"
            "Introduction\n"
            "Climate change represents the defining challenge of the 21st century. According to the IPCC Sixth Assessment Report (IPCC, 2021), "
            "global average temperatures have already risen by 1.1 degrees Celsius above pre-industrial levels, with cascading impacts felt across "
            "every continent. East Africa, a region historically contributing less than 3% of global greenhouse gas emissions, nonetheless faces "
            "some of the most severe climate impacts including prolonged droughts, erratic rainfall patterns, lake level fluctuations, and the "
            "increased frequency of extreme weather events.\n\n"
            "This essay examines the two dominant policy responses to climate change: mitigation and adaptation. Mitigation refers to efforts to "
            "reduce or prevent the emission of greenhouse gases, thereby limiting the magnitude of future climate change. Adaptation, by contrast, "
            "involves adjustments in ecological, social, or economic systems to reduce vulnerability to actual or expected climatic stimuli. While "
            "some scholars frame these as competing priorities, this essay argues that East African nations require a nuanced, balanced strategy "
            "that integrates both approaches—prioritizing adaptation for immediate resilience while simultaneously advocating for global mitigation "
            "as the long-term solution.\n\n"
            "The Case for Mitigation Priority\n"
            "The first argument for prioritizing mitigation is fundamentally ethical. Developed nations are responsible for approximately 79% of "
            "historical cumulative CO2 emissions from fossil fuels (Friedlingstein et al., 2022). Mitigation therefore addresses the root cause of "
            "climate injustice. Without global mitigation exceeding 43% emissions cuts by 2030 (as per IPCC scenarios limiting warming to 1.5C), "
            "adaptation efforts will become progressively insufficient as climate shocks overwhelm response capacity.\n\n"
            "Second, mitigation co-benefits include reduced air pollution, improved public health outcomes, and green economy job creation. Rwanda's "
            "national strategy of banning single-use plastics and investing in hydroelectric power provides a compelling regional example. Kigali's "
            "transformation into a compact, walkable city with extensive green infrastructure demonstrates how mitigation policies simultaneously "
            "improve quality of life.\n\n"
            "Third, mitigation can be cost-effective in the long run. Stern (2006) estimated that strong early mitigation action would cost roughly "
            "1% of global GDP annually, whereas unchecked climate change could reduce global GDP by 5-20% per annum. Delaying mitigation increases "
            "the eventual costs both of mitigation itself (as more emissions become locked into infrastructure) and of the adaptation required in "
            "the interim.\n\n"
            "The Case for Adaptation Priority\n"
            "Critics of mitigation-first approaches note that regardless of future emissions cuts, some degree of warming is already locked in due "
            "to historical emissions and thermal inertia of the oceans. For East African smallholder farmers, 70-80% of whom depend on rain-fed "
            "agriculture, this means that adaptation is not optional but an immediate survival imperative.\n\n"
            "The first argument for adaptation priority is that it directly addresses current lived realities. The 2016-2017 drought in the Horn "
            "of Africa affected 15 million people and required over $2 billion in humanitarian assistance. Adaptive interventions including "
            "drought-tolerant maize varieties, improved water harvesting structures, agroforestry, and index-based livestock insurance have "
            "demonstrated measurable impacts on household food security.\n\n"
            "Second, adaptation yields measurable, locally controllable outcomes. Unlike global mitigation outcomes that depend on the collective "
            "action of nearly 200 nations, a village can independently implement terracing, tree planting, or small-scale irrigation and see "
            "benefits within a single growing season. Kenya's National Drought Management Authority early warning systems have reduced drought-"
            "related mortality substantially since their systematic deployment.\n\n"
            "Conclusion\n"
            "This essay has argued that framing adaptation and mitigation as an either-or proposition is both intellectually unsound and practically "
            "dangerous. Instead, East African policy should adopt a dual-track approach. Domestically, immediate and expanded adaptation investments "
            "must form the backbone of national climate strategy. Internationally, East African nations must continue to exert moral and diplomatic "
            "pressure for accelerated global mitigation, while also leveraging climate finance mechanisms to unlock the $100 billion per year that "
            "developed nations committed to mobilize for developing country climate action.\n\n"
            "References\n"
            "Friedlingstein, P. et al. (2022). Global Carbon Budget 2022. Earth System Science Data.\n"
            "IPCC (2021). Climate Change 2021: The Physical Science Basis. Cambridge University Press.\n"
            "Stern, N. (2006). Stern Review: The Economics of Climate Change. HM Treasury, UK.\n"
        )

        for i, s in enumerate(students):
            sub = Submission(
                id=uuid4(),
                assignment_id=assignment_env.id,
                student_id=s.id,
                content_text=submission_text if i == 0 else submission_text[:-500 - i*200],
                submitted_at=now - timedelta(days=1, hours=i),
                late_submission=False,
                status=SubmissionStatus.APPROVED if i == 0 else (
                    SubmissionStatus.AI_COMPLETE if i == 1 else (
                        SubmissionStatus.HUMAN_REVIEW if i == 2 else SubmissionStatus.PENDING
                    )
                ),
                assessment_status=AssessmentStatus.COMPLETED if i <= 1 else AssessmentStatus.NOT_STARTED,
                ai_suggested_score=16.0 if i == 0 else None,
                ai_confidence=0.91 if i == 0 else (0.84 if i == 1 else None),
                ai_criterion_scores={
                    "crit-1": 4.0,
                    "crit-2": 4.0,
                    "crit-3": 3.0,
                    "crit-4": 5.0,
                } if i <= 1 else None,
                ai_feedback="Strong engagement with the topic, solid use of IPCC framing.",
                lecturer_final_score=17.0 if i == 0 else None,
                lecturer_criterion_scores={
                    "crit-1": 4,
                    "crit-2": 4,
                    "crit-3": 4,
                    "crit-4": 5,
                } if i == 0 else None,
                lecturer_comment=(
                    "Excellent work Jean Claude. Your integration of regional East African case studies, particularly the Rwandan "
                    "green infrastructure examples and Kenya's early warning systems, significantly strengthened the evidence base. "
                    "I have adjusted the Evidence criterion from 3 to 4 to reward this strong contextual grounding. "
                    "To reach a perfect score next time, consider adding more quantitative data points from specific agroforestry studies "
                    "and addressing counterarguments more systematically."
                ) if i == 0 else None,
                modified_by_teacher=True if i == 0 else False,
                published_to_student=True if i == 0 else False,
                learning_resources=[
                    {
                        "title": "Academic Writing Guide: Integrating Evidence Effectively",
                        "resource_type": "guide",
                        "description": "Step-by-step framework for weaving citations, data, and case studies into your argument without disrupting flow.",
                        "relevance": "high",
                        "url": "#resources/evidence-guide",
                    },
                    {
                        "title": "Research Methods Workshop: Case Study Analysis",
                        "resource_type": "video",
                        "description": "20-minute recorded workshop covering qualitative and quantitative case study methodology.",
                        "relevance": "medium",
                        "url": "#resources/case-study-workshop",
                    },
                    {
                        "title": "IPCC AR6 Summary for Policy Makers (Condensed Notes)",
                        "resource_type": "reading",
                        "description": "Lecturer-compiled 8-page summary of key findings relevant to ENV-101 assessments.",
                        "relevance": "high",
                        "url": "#resources/ipcc-ar6-notes",
                    },
                ] if i == 0 else None,
            )
            db.add(sub)

        materials = [
            CourseMaterial(
                id=uuid4(),
                course_id=course_env.id,
                title="Week 1 Lecture: Climate Science Fundamentals",
                description="Foundational lecture covering greenhouse effect, carbon cycle, and climate forcing agents.",
                content_text=(
                    "Climate Science Fundamentals: The greenhouse effect is a natural process warming Earth's surface. "
                    "Primary anthropogenic greenhouse gases include CO2 (from fossil fuels, deforestation, industry), "
                    "methane (from agriculture, waste, fossil fuels), nitrous oxide, and fluorinated gases. The carbon cycle "
                    "involves exchanges between atmosphere, oceans, terrestrial biosphere, and geological sinks. "
                    "Radiative forcing measures the influence a factor has in altering the Earth's energy balance. Positive "
                    "forcing (e.g. increasing CO2) leads to warming; negative forcing (e.g. aerosols from volcanic eruptions) "
                    "leads to cooling. Key climate feedback loops include water vapor feedback (positive), ice-albedo feedback "
                    "(positive), and cloud feedbacks (variable sign, area of active research)."
                ),
                material_type="lecture_notes",
                week_number=1,
                topic_tags=["climate science", "greenhouse effect", "carbon cycle", "IPCC"],
            ),
            CourseMaterial(
                id=uuid4(),
                course_id=course_env.id,
                title="Week 4: Mitigation Strategies Framework",
                description="Systematic overview of climate mitigation options across sectors.",
                content_text=(
                    "Mitigation Strategies: Sector-based mitigation opportunities include:\n"
                    "1. Energy: Renewable energy deployment (solar PV, onshore/offshore wind, hydro, geothermal), grid modernization, storage.\n"
                    "2. Transport: Electrification, public transit, active transport, modal shift, hydrogen for heavy-duty.\n"
                    "3. Buildings: Efficiency standards, heat pumps, cool roofs, district heating/cooling.\n"
                    "4. Industry: Process switching, carbon capture utilization and storage (CCUS), circular economy.\n"
                    "5. AFOLU (Agriculture, Forestry, Other Land Use): Afforestation/reforestation, REDD+, improved agricultural practices.\n"
                    "Policy instruments include carbon pricing (taxes or cap-and-trade), regulations and standards, public procurement, "
                    "subsidy reform, and RD&D investment. Integrated Assessment Models (IAMs) project pathways consistent with 1.5C and 2C targets."
                ),
                material_type="lecture_notes",
                week_number=4,
                topic_tags=["mitigation", "renewable energy", "carbon pricing", "sectors"],
            ),
            CourseMaterial(
                id=uuid4(),
                course_id=course_env.id,
                title="Week 6: Adaptation Theory and Practice",
                description="Concepts of adaptation, vulnerability, resilience, and adaptive capacity.",
                content_text=(
                    "Climate Adaptation: Adaptation is the process of adjustment to actual or expected climate and its effects, in order to "
                    "moderate harm or exploit beneficial opportunities. Key concepts:\n"
                    "Vulnerability = Exposure + Sensitivity - Adaptive Capacity\n"
                    "Resilience: Capacity of a system to absorb disturbance and reorganize while undergoing change.\n"
                    "Types of adaptation: anticipatory vs reactive, autonomous vs planned, incremental vs transformational.\n"
                    "Ecosystem-based Adaptation (EbA): Use of biodiversity and ecosystem services as part of an adaptation strategy. "
                    "Examples include mangrove restoration for coastal protection, agroforestry for drought resilience, urban green "
                    "infrastructure for heat island reduction. Community-Based Adaptation (CBA) centers local knowledge and participatory "
                    "planning in designing interventions. Adaptation planning frameworks include NAPs (National Adaptation Plans) under the UNFCCC."
                ),
                material_type="lecture_notes",
                week_number=6,
                topic_tags=["adaptation", "vulnerability", "resilience", "EbA", "CBA"],
            ),
            CourseMaterial(
                id=uuid4(),
                course_id=course_env.id,
                title="East African Regional Climate Context",
                description="Compiled reading on climate impacts specific to the East African Community region.",
                content_text=(
                    "East Africa Climate Context: The East African Community (EAC) comprises Burundi, DR Congo, Kenya, Rwanda, South Sudan, "
                    "Tanzania, Uganda. Key climate hazards: erratic rainfall, extended droughts, intense flooding (especially Lake Victoria basin), "
                    "glacial retreat on Mt. Kilimanjaro and Rwenzoris, locust outbreaks amplified by climate conditions. The Horn of Africa "
                    "experienced 5 consecutive failed rainy seasons during 2020-2023, the most severe drought in 40 years, driven by positive "
                    "Indian Ocean Dipole combined with La Nina conditions. Lake Victoria levels rose over 1.5m between 2019-2021 displacing "
                    "hundreds of thousands. Adaptive interventions in region: Kenya's Index-Based Livestock Insurance (IBLI), Rwanda's "
                    "Land Husbandry, Water Harvesting and Hillside Irrigation Project, Tanzania's National Adaptation Plan (NAP-1)."
                ),
                material_type="reading",
                week_number=7,
                topic_tags=["East Africa", "EAC", "drought", "Lake Victoria", "regional case studies"],
            ),
        ]
        db.add_all(materials)

        await db.commit()
        logger.info("Demo data seeded successfully")
        logger.info(f"Created: 3 lecturers + 1 admin, 6 students, 2 courses, 1 rubric, 2 assignments, 6 submissions, 4 course materials")


def init_database():
    create_tables()
    asyncio.run(_seed_demo_data())


if __name__ == "__main__":
    init_database()
