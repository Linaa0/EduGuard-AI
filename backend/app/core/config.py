from pydantic_settings import BaseSettings
from typing import List, Optional
from functools import lru_cache


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"

    DATABASE_URL: str = "postgresql+asyncpg://eduguard:eduguard_secure_pass_2026@localhost:5432/eduguard_ai"
    DATABASE_SYNC_URL: str = "postgresql+psycopg2://eduguard:eduguard_secure_pass_2026@localhost:5432/eduguard_ai"

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
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
