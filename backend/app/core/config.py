from pydantic_settings import BaseSettings
from typing import List, Optional
from functools import lru_cache
import os


def _detect_database_url() -> str:
    """Auto-detect: use PostgreSQL if available, else SQLite for local dev."""
    pg_url = os.getenv("DATABASE_URL", "")
    if pg_url and "postgresql" in pg_url:
        return pg_url
    # Check if PostgreSQL is reachable
    try:
        import socket
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(1)
        s.connect(("localhost", 5432))
        s.close()
        return "postgresql+asyncpg://eduguard:eduguard_dev_2026@localhost:5432/eduguard_ai"
    except (ConnectionRefusedError, OSError):
        pass
    # Fall back to SQLite
    db_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "eduguard.db")
    return f"sqlite+aiosqlite:///{db_path}"


def _detect_sync_database_url() -> str:
    """Sync version for table creation."""
    pg_url = os.getenv("DATABASE_SYNC_URL", "")
    if pg_url and "postgresql" in pg_url:
        return pg_url
    try:
        import socket
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(1)
        s.connect(("localhost", 5432))
        s.close()
        return "postgresql+psycopg2://eduguard:eduguard_dev_2026@localhost:5432/eduguard_ai"
    except (ConnectionRefusedError, OSError):
        pass
    db_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "eduguard.db")
    return f"sqlite:///{db_path}"


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"

    DATABASE_URL: str = ""
    DATABASE_SYNC_URL: str = ""

    QDRANT_URL: str = "http://localhost:6333"
    QDRANT_COLLECTION: str = "eduguard_rubrics"
    QDRANT_API_KEY: Optional[str] = None

    EJOCHAT_API_KEY: str = "your_ejochat_api_key_here"
    EJOCHAT_BASE_URL: str = "https://api.ejochat.ai/v1"
    EJOCHAT_MODEL: str = "ejochat-4o"
    EMBEDDING_MODEL: str = "BAAI/bge-base-en-v1.5"

    JWT_SECRET: str = "eduguard_jwt_super_secret_key_change_in_production_2026"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 10080

    N8N_WEBHOOK_URL: str = "http://localhost:5678/webhook/eduguard-assessment"

    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173"
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000

    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_SIZE_MB: int = 50

    AI_CONFIDENCE_THRESHOLD: float = 0.85

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = ("../.env", ".env")
        case_sensitive = True
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    s = Settings()
    if not s.DATABASE_URL:
        object.__setattr__(s, 'DATABASE_URL', _detect_database_url())
    if not s.DATABASE_SYNC_URL:
        object.__setattr__(s, 'DATABASE_SYNC_URL', _detect_sync_database_url())
    return s
