from typing import Optional, List, Dict, Any
from openai import AsyncOpenAI
import httpx
from app.core.config import get_settings
from app.core.logging_config import get_logger

settings = get_settings()
logger = get_logger(__name__)


class EjoChatService:
    def __init__(self):
        self.api_key = settings.EJOCHAT_API_KEY
        self.base_url = settings.EJOCHAT_BASE_URL
        self.model = settings.EJOCHAT_MODEL
        self.client: Optional[AsyncOpenAI] = None

        if self.api_key and self.api_key != "your_ejochat_api_key_here":
            self.client = AsyncOpenAI(
                api_key=self.api_key,
                base_url=self.base_url,
                http_client=httpx.AsyncClient(timeout=120.0),
            )
        else:
            logger.warning("EJOCHAT_API_KEY not configured - using mock mode")

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.3,
        max_tokens: int = 4000,
        response_format: Optional[Dict[str, str]] = None,
    ) -> str:
        if not self.client:
            return self._mock_chat_response(messages, temperature, response_format)

        try:
            params: Dict[str, Any] = {
                "model": self.model,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens,
            }
            if response_format:
                params["response_format"] = response_format

            response = await self.client.chat.completions.create(**params)
            return response.choices[0].message.content or ""
        except Exception as e:
            logger.error(f"EjoChat API error: {str(e)}")
            return self._mock_chat_response(messages, temperature, response_format)

    def _mock_chat_response(
        self,
        messages: List[Dict[str, str]],
        temperature: float,
        response_format: Optional[Dict[str, str]] = None,
    ) -> str:
        import json

        last_message = messages[-1]["content"] if messages else ""

        if "json" in str(response_format).lower() or "criterion" in last_message.lower():
            mock_response = {
                "criteria_evaluations": [
                    {
                        "criterion_id": "crit-1",
                        "criterion_name": "Understanding of Topic",
                        "score": 4.0,
                        "max_score": 5.0,
                        "rationale": "The student demonstrates a solid understanding of the core concepts with accurate explanations of key theories.",
                        "evidence": ["Correctly identifies primary drivers", "Uses appropriate terminology"],
                        "confidence": 0.92
                    },
                    {
                        "criterion_id": "crit-2",
                        "criterion_name": "Quality of Argument",
                        "score": 4.0,
                        "max_score": 5.0,
                        "rationale": "Well-structured argument with clear thesis and logical progression of ideas.",
                        "evidence": ["Clear thesis statement", "Logical flow between paragraphs"],
                        "confidence": 0.88
                    },
                    {
                        "criterion_id": "crit-3",
                        "criterion_name": "Evidence & Examples",
                        "score": 3.0,
                        "max_score": 5.0,
                        "rationale": "Some relevant examples provided but could benefit from more specific data and citations.",
                        "evidence": ["General case study mentioned", "Needs more specific references"],
                        "confidence": 0.82
                    },
                    {
                        "criterion_id": "crit-4",
                        "criterion_name": "Structure and Clarity",
                        "score": 5.0,
                        "max_score": 5.0,
                        "rationale": "Excellent academic structure with clear introduction, body paragraphs, and conclusion.",
                        "evidence": ["Strong introduction with roadmap", "Effective conclusion", "Proper paragraph transitions"],
                        "confidence": 0.95
                    }
                ],
                "summary_feedback": "This submission demonstrates a commendable understanding of the subject matter. The argumentation is solid, though additional specific evidence would strengthen the work further. The writing structure is exemplary.",
                "strengths": [
                    "Clear understanding of theoretical concepts",
                    "Well-organized structure and logical flow",
                    "Effective introduction and conclusion",
                    "Appropriate academic tone maintained throughout"
                ],
                "areas_for_improvement": [
                    "Include more specific data and citations to support claims",
                    "Consider counterarguments to demonstrate deeper engagement",
                    "Add more real-world case studies with concrete examples"
                ],
                "learning_resources": [
                    {"title": "Academic Writing Guide: Evidence Integration", "type": "guide", "url": "#", "relevance": "high"},
                    {"title": "Research Methods: Case Study Analysis", "type": "video", "url": "#", "relevance": "medium"}
                ]
            }
            return json.dumps(mock_response, indent=2)

        return "This is a mock AI response. Configure EJOCHAT_API_KEY for real AI assessment."

    async def generate_embedding(self, text: str) -> List[float]:
        if not self.client:
            import hashlib
            import struct
            text_bytes = text.encode('utf-8')
            seed = int.from_bytes(hashlib.md5(text_bytes).digest()[:4], 'big')
            import random
            rng = random.Random(seed)
            return [rng.uniform(-0.1, 0.1) for _ in range(768)]

        try:
            response = await self.client.embeddings.create(
                model=settings.EMBEDDING_MODEL,
                input=text,
            )
            return response.data[0].embedding
        except Exception as e:
            logger.error(f"Embedding API error: {str(e)}")
            import hashlib
            import random
            text_bytes = text.encode('utf-8')
            seed = int.from_bytes(hashlib.md5(text_bytes).digest()[:4], 'big')
            rng = random.Random(seed)
            return [rng.uniform(-0.1, 0.1) for _ in range(768)]
