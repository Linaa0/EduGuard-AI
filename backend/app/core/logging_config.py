import structlog
import logging
from .config import get_settings

settings = get_settings()


def setup_logging():
    log_level = logging.DEBUG if settings.ENVIRONMENT == "development" else logging.INFO

    structlog.configure(
        processors=[
            structlog.contextvars.merge_contextvars,
            structlog.processors.add_log_level,
            structlog.processors.StackInfoRenderer(),
            structlog.dev.set_exc_info,
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.dev.ConsoleRenderer() if settings.ENVIRONMENT == "development"
            else structlog.processors.JSONRenderer(),
        ],
        wrapper_class=structlog.make_filtering_bound_logger(log_level),
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(),
        cache_logger_on_first_use=True,
    )

    logging.basicConfig(
        format="%(message)s",
        stream=open("app.log", "a"),
        level=log_level,
    )


def get_logger(name: str):
    return structlog.get_logger(name)
