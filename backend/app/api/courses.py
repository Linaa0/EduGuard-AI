from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from app.core.database import get_db
from app.api.deps import get_current_user, get_current_lecturer
from app.models.models import User, Course, CourseMember, UserRole
from app.schemas.schemas import CourseCreate, CourseResponse

router = APIRouter(prefix="/courses", tags=["Courses"])


@router.get("", response_model=List[CourseResponse])
async def list_courses(
    skip: int = 0,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if current_user.role == UserRole.ADMIN:
        query = select(Course)
    else:
        query = (
            select(Course)
            .join(CourseMember, CourseMember.course_id == Course.id)
            .where(CourseMember.user_id == current_user.id)
        )

    result = await db.execute(query.offset(skip).limit(limit))
    return result.scalars().all()


@router.post("", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
async def create_course(
    course_in: CourseCreate,
    current_user: User = Depends(get_current_lecturer),
    db: AsyncSession = Depends(get_db),
):
    existing = await db.execute(select(Course).where(Course.code == course_in.code))
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Course with code {course_in.code} already exists",
        )

    course = Course(**course_in.model_dump())
    db.add(course)
    await db.flush()

    membership = CourseMember(
        course_id=course.id,
        user_id=current_user.id,
        role=UserRole.LECTURER,
    )
    db.add(membership)
    await db.commit()
    await db.refresh(course)
    return course


@router.get("/{course_id}", response_model=CourseResponse)
async def get_course(
    course_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    course = await db.get(Course, course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found",
        )

    if current_user.role != UserRole.ADMIN:
        membership = await db.execute(
            select(CourseMember).where(
                CourseMember.course_id == course_id,
                CourseMember.user_id == current_user.id,
            )
        )
        if not membership.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enrolled in this course",
            )

    return course
