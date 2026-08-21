from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from uuid import UUID

from app.core.database import get_db
from app.api.deps import get_current_user, get_current_lecturer
from app.models.models import User, Assignment, Rubric, Course, CourseMember, UserRole
from app.schemas.schemas import AssignmentCreate, AssignmentResponse

router = APIRouter(prefix="/assignments", tags=["Assignments"])


@router.get("", response_model=List[AssignmentResponse])
async def list_assignments(
    course_id: Optional[UUID] = None,
    skip: int = 0,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    query = select(Assignment)
    if course_id:
        query = query.where(Assignment.course_id == course_id)

    if current_user.role == UserRole.STUDENT:
        enrolled_courses = (
            select(CourseMember.course_id)
            .where(CourseMember.user_id == current_user.id)
            .subquery()
        )
        query = query.where(Assignment.course_id.in_(enrolled_courses))
    elif current_user.role == UserRole.LECTURER:
        query = query.where(Assignment.created_by_id == current_user.id)

    result = await db.execute(query.offset(skip).limit(limit))
    return result.scalars().all()


@router.post("", response_model=AssignmentResponse, status_code=status.HTTP_201_CREATED)
async def create_assignment(
    assignment_in: AssignmentCreate,
    current_user: User = Depends(get_current_lecturer),
    db: AsyncSession = Depends(get_db),
):
    course = await db.get(Course, assignment_in.course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found",
        )

    if assignment_in.rubric_id:
        rubric = await db.get(Rubric, assignment_in.rubric_id)
        if not rubric:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Rubric not found",
            )

    assignment = Assignment(
        **assignment_in.model_dump(),
        created_by_id=current_user.id,
    )
    db.add(assignment)
    await db.commit()
    await db.refresh(assignment)
    return assignment


@router.get("/{assignment_id}", response_model=AssignmentResponse)
async def get_assignment(
    assignment_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    assignment = await db.get(Assignment, assignment_id)
    if not assignment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assignment not found",
        )
    return assignment
