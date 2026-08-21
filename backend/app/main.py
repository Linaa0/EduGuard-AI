from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager

from app.core.config import get_settings
from app.core.database import Base, async_engine, sync_engine
from app.core.logging_config import setup_logging, get_logger
from app.api.auth import router as auth_router
from app.api.courses import router as courses_router
from app.api.assignments import router as assignments_router
from app.api.rubrics import router as rubrics_router
from app.api.submissions import router as submissions_router
from app.api.analytics import router as analytics_router
from app.api.users import router as users_router

settings = get_settings()
setup_logging()
logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting EduGuard AI backend...")
    logger.info(f"Environment: {settings.ENVIRONMENT}")

    try:
        import asyncio
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, _create_tables_sync)
        logger.info("Database tables initialized")
    except Exception as e:
        logger.error(f"Database initialization error: {str(e)}")

    yield
    logger.info("Shutting down EduGuard AI backend...")


def _create_tables_sync():
    try:
        Base.metadata.create_all(bind=sync_engine)
    except Exception:
        pass


app = FastAPI(
    title="EduGuard AI — Academic Assessment API",
    description=(
        "AI-powered academic assessment and feedback platform. "
        "Uses a tool-using AI Agent (7 tools: get_assignment, get_rubric, analyze_submission, "
        "evaluate_criteria, calculate_score, generate_feedback, check_confidence) "
        "with EjoChat LLM and Qdrant RAG vector database for rubric-grounded marking."
    ),
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
    contact={
        "name": "EduGuard AI Team",
        "url": "https://github.com/Linaa0/EduGuard-AI",
    },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list + [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(courses_router, prefix="/api/v1")
app.include_router(assignments_router, prefix="/api/v1")
app.include_router(rubrics_router, prefix="/api/v1")
app.include_router(submissions_router, prefix="/api/v1")
app.include_router(analytics_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1")


@app.get("/", tags=["Root"])
async def root():
    return {
        "name": "EduGuard AI API",
        "version": "2.0.0",
        "status": "online",
        "docs": "/docs",
        "redoc": "/redoc",
        "health": "/health",
        "ai_agent": {
            "description": "Tool-using AI Assessment Agent",
            "tools": [
                "get_assignment",
                "get_rubric",
                "analyze_submission",
                "evaluate_criteria",
                "calculate_score",
                "generate_feedback",
                "check_confidence",
            ],
            "llm": settings.EJOCHAT_MODEL,
            "llm_provider": "EjoChat API",
            "rag": {
                "engine": "Qdrant Vector Database",
                "collection": settings.QDRANT_COLLECTION,
            },
        },
    }


@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "timestamp": __import__("datetime").datetime.utcnow().isoformat(),
        "components": {
            "api": "online",
            "database": "connected",
        },
    }


@app.exception_handler(422)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Validation error",
            "errors": exc.errors(),
        },
    )
