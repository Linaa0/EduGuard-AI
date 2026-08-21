from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, case
from typing import List, Dict, Any, Optional
from uuid import UUID

from app.core.database import get_db
from app.api.deps import get_current_lecturer, get_current_user
from app.models.models import (
    User, Assignment, Submission, Course, CourseMember,
    SubmissionStatus, UserRole,
)

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/dashboard")
async def get_dashboard_analytics(
    course_id: Optional[UUID] = None,
    current_user: User = Depends(get_current_lecturer),
    db: AsyncSession = Depends(get_db),
):
    base_sub_query = select(Submission)
    if course_id:
        base_sub_query = base_sub_query.join(
            Assignment, Submission.assignment_id == Assignment.id
        ).where(Assignment.course_id == course_id)
    else:
        lecturer_courses = (
            select(CourseMember.course_id)
            .where(CourseMember.user_id == current_user.id)
            .subquery()
        )
        base_sub_query = base_sub_query.join(
            Assignment, Submission.assignment_id == Assignment.id
        ).where(Assignment.course_id.in_(lecturer_courses))

    total_result = await db.execute(
        select(func.count()).select_from(base_sub_query.subquery())
    )
    total_submissions = total_result.scalar() or 0

    status_counts = {}
    for s in SubmissionStatus:
        count_query = base_sub_query.where(Submission.status == s)
        result = await db.execute(select(func.count()).select_from(count_query.subquery()))
        count = result.scalar() or 0
        status_counts[s.value] = count

    scored_q = base_sub_query.where(Submission.lecturer_final_score.isnot(None))
    scored_result = await db.execute(
        select(func.count()).select_from(scored_q.subquery())
    )
    graded_count = scored_result.scalar() or 0

    avg_score = 0
    if graded_count > 0:
        avg_q = base_sub_query.where(Submission.lecturer_final_score.isnot(None))
        avg_result = await db.execute(
            select(func.avg(Submission.lecturer_final_score)).select_from(avg_q.subquery())
        )
        avg_score = round(float(avg_result.scalar() or 0), 2)

    avg_confidence = 0
    conf_q = base_sub_query.where(Submission.ai_confidence.isnot(None))
    conf_result = await db.execute(
        select(func.avg(Submission.ai_confidence)).select_from(conf_q.subquery())
    )
    avg_confidence = round(float(conf_result.scalar() or 0), 4)

    modified_count_q = base_sub_query.where(Submission.modified_by_teacher == True)
    modified_result = await db.execute(
        select(func.count()).select_from(modified_count_q.subquery())
    )
    teacher_modified = modified_result.scalar() or 0

    assignment_query = select(Assignment)
    if course_id:
        assignment_query = assignment_query.where(Assignment.course_id == course_id)
    assignments_result = await db.execute(assignment_query)
    total_assignments = len(assignments_result.scalars().all())

    student_courses_q = (
        select(func.count(func.distinct(CourseMember.user_id)))
        .where(CourseMember.role == UserRole.STUDENT)
    )
    if course_id:
        student_courses_q = student_courses_q.where(CourseMember.course_id == course_id)
    else:
        lecturer_courses = (
            select(CourseMember.course_id)
            .where(CourseMember.user_id == current_user.id)
            .subquery()
        )
        student_courses_q = student_courses_q.where(CourseMember.course_id.in_(lecturer_courses))

    students_result = await db.execute(student_courses_q)
    total_students = students_result.scalar() or 0

    return {
        "summary": {
            "total_submissions": total_submissions,
            "total_assignments": total_assignments,
            "total_students": total_students,
            "graded_count": graded_count,
            "pending_review": status_counts.get(SubmissionStatus.AI_COMPLETE.value, 0) + status_counts.get(SubmissionStatus.HUMAN_REVIEW.value, 0),
            "approval_rate": round((status_counts.get(SubmissionStatus.APPROVED.value, 0) / total_submissions * 100), 1) if total_submissions else 0,
        },
        "status_breakdown": status_counts,
        "grading_metrics": {
            "average_final_score": avg_score,
            "average_ai_confidence": avg_confidence,
            "teacher_modification_rate": round((teacher_modified / graded_count * 100), 1) if graded_count else 0,
            "teacher_modified_count": teacher_modified,
            "ai_auto_approved_without_change": graded_count - teacher_modified,
        },
        "recent_activity": {
            "last_24h_submissions": 0,
            "last_24h_graded": 0,
        },
    }


@router.get("/student/{student_id}")
async def get_student_analytics(
    student_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if current_user.role == UserRole.STUDENT and current_user.id != student_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot view another student's analytics",
        )

    subs_query = (
        select(Submission)
        .where(Submission.student_id == student_id)
    )
    subs_result = await db.execute(subs_query)
    submissions = subs_result.scalars().all()

    graded = [s for s in submissions if s.lecturer_final_score is not None]

    return {
        "student_id": str(student_id),
        "submissions_count": len(submissions),
        "graded_count": len(graded),
        "average_score": round(
            sum(s.lecturer_final_score for s in graded) / len(graded), 2
        ) if graded else 0,
        "total_possible": sum(
            s.assignment.max_score for s in submissions if s.assignment
        ),
        "status_breakdown": {},
    }
