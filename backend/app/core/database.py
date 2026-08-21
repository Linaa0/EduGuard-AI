from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import create_engine
from .config import get_settings

settings = get_settings()

async_engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.ENVIRONMENT == "development",
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
    pool_recycle=3600,
)

AsyncSessionLocal = async_sessionmaker(
    async_engine,
    class_=AsyncSession,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)

sync_engine = create_engine(
    settings.DATABASE_SYNC_URL,
    echo=settings.ENVIRONMENT == "development",
    pool_pre_ping=True,
)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
