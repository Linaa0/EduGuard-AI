from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from uuid import UUID

from app.core.database import get_db
from app.api.deps import get_current_user, get_current_lecturer
from app.models.models import User, Rubric, Course, CourseMember, UserRole
from app.schemas.schemas import RubricCreate, RubricResponse
from app.services.llm_service import EjoChatService
from app.rag.qdrant_service import QdrantService
from app.core.logging_config import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/rubrics", tags=["Rubrics"])


@router.get("", response_model=List[RubricResponse])
async def list_rubrics(
    course_id: Optional[UUID] = None,
    skip: int = 0,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    query = select(Rubric)
    if course_id:
        query = query.where(Rubric.course_id == course_id)

    if current_user.role == UserRole.STUDENT:
        enrolled_courses = (
            select(CourseMember.course_id)
            .where(CourseMember.user_id == current_user.id)
            .subquery()
        )
        query = query.where(Rubric.course_id.in_(enrolled_courses))

    result = await db.execute(query.offset(skip).limit(limit))
    return result.scalars().all()


@router.post("", response_model=RubricResponse, status_code=status.HTTP_201_CREATED)
async def create_rubric(
    rubric_in: RubricCreate,
    current_user: User = Depends(get_current_lecturer),
    db: AsyncSession = Depends(get_db),
):
    course = await db.get(Course, rubric_in.course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found",
        )

    rubric = Rubric(
        **rubric_in.model_dump(),
        created_by_id=current_user.id,
    )
    db.add(rubric)
    await db.flush()

    try:
        llm_service = EjoChatService()
        qdrant_service = QdrantService(llm_service)

        criteria_dicts = [c.model_dump() for c in rubric_in.criteria]
        await qdrant_service.upsert_rubric(
            rubric_id=str(rubric.id),
            course_id=str(rubric.course_id),
            rubric_name=rubric.name,
            criteria=criteria_dicts,
            description=rubric.description,
        )
        logger.info(f"Rubric {rubric.id} indexed in Qdrant")
    except Exception as e:
        logger.warning(f"Failed to index rubric in Qdrant: {str(e)}")

    await db.commit()
    await db.refresh(rubric)
    return rubric


@router.get("/{rubric_id}", response_model=RubricResponse)
async def get_rubric(
    rubric_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    rubric = await db.get(Rubric, rubric_id)
    if not rubric:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rubric not found",
        )
    return rubric
