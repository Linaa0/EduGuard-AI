from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import timedelta

from app.core.database import get_db
from app.core.security import verify_password, create_access_token, hash_password
from app.core.config import get_settings
from app.models.models import User
from app.schemas.schemas import UserCreate, UserLogin, UserResponse, Token

router = APIRouter(prefix="/auth", tags=["Authentication"])
settings = get_settings()


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    existing = await db.execute(select(User).where(User.email == user_in.email))
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists",
        )

    if user_in.student_id:
        existing_student_id = await db.execute(select(User).where(User.student_id == user_in.student_id))
        if existing_student_id.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A user with this student ID already exists",
            )

    user = User(
        email=user_in.email,
        full_name=user_in.full_name,
        hashed_password=hash_password(user_in.password),
        role=user_in.role,
        department=user_in.department,
        student_id=user_in.student_id,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@router.post("/login", response_model=Token)
async def login(form_data: UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == form_data.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is disabled",
        )

    access_token = create_access_token(
        subject=str(user.id),
        extra_claims={"role": user.role.value, "email": user.email},
        expires_delta=timedelta(minutes=settings.JWT_EXPIRE_MINUTES),
    )

    return Token(access_token=access_token, token_type="bearer")


@router.post("/demo-login", response_model=Token)
async def demo_login(role: str = "lecturer", db: AsyncSession = Depends(get_db)):
    from app.models.models import UserRole

    target_role = UserRole.LECTURER if role.lower() == "lecturer" else UserRole.STUDENT

    result = await db.execute(
        select(User).where(User.role == target_role).limit(1)
    )
    user = result.scalar_one_or_none()

    if not user:
        from uuid import uuid4
        user = User(
            email=f"demo_{target_role.value}_{uuid4().hex[:6]}@eduguard.ai",
            full_name=f"Demo {target_role.value.title()}",
            hashed_password=hash_password("demo_password_123"),
            role=target_role,
            is_active=True,
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    access_token = create_access_token(
        subject=str(user.id),
        extra_claims={"role": user.role.value, "email": user.email},
        expires_delta=timedelta(days=7),
    )
    return Token(access_token=access_token, token_type="bearer")


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(__import__("app.api.deps", fromlist=["get_current_user"]).get_current_user)):
    return current_user
