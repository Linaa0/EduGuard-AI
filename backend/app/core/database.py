from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import create_engine, event
from .config import get_settings

settings = get_settings()

is_sqlite = "sqlite" in settings.DATABASE_URL

# Async engine
if is_sqlite:
    async_engine = create_async_engine(
        settings.DATABASE_URL,
        echo=settings.ENVIRONMENT == "development",
        connect_args={"check_same_thread": False},
    )
else:
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

# Sync engine for table creation
if is_sqlite:
    sync_engine = create_engine(
        settings.DATABASE_SYNC_URL,
        echo=settings.ENVIRONMENT == "development",
        connect_args={"check_same_thread": False},
    )
    # Enable WAL mode for SQLite
    @event.listens_for(sync_engine, "connect")
    def set_sqlite_pragma(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA journal_mode=WAL")
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()
else:
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
