from typing import Optional, List, Dict, Any
from qdrant_client import QdrantClient, AsyncQdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, MatchValue
from uuid import uuid4
import json

from app.core.config import get_settings
from app.core.logging_config import get_logger
from app.services.llm_service import EjoChatService

settings = get_settings()
logger = get_logger(__name__)


class QdrantService:
    def __init__(self, llm_service: EjoChatService):
        self.llm_service = llm_service
        self.collection_name = settings.QDRANT_COLLECTION
        self.vector_size = 768
        self.client: Optional[AsyncQdrantClient] = None
        self.sync_client: Optional[QdrantClient] = None
        self._initialize()

    def _initialize(self):
        try:
            self.client = AsyncQdrantClient(
                url=settings.QDRANT_URL,
                api_key=settings.QDRANT_API_KEY,
                port=6333,
            )
            self.sync_client = QdrantClient(
                url=settings.QDRANT_URL,
                api_key=settings.QDRANT_API_KEY,
                port=6333,
            )
            logger.info(f"Connected to Qdrant at {settings.QDRANT_URL}")
        except Exception as e:
            logger.warning(f"Could not connect to Qdrant: {str(e)} - using in-memory fallback")
            self.client = None
            self.sync_client = None
            self._in_memory_points: List[Dict[str, Any]] = []

    async def ensure_collection_exists(self):
        if not self.sync_client:
            return True

        try:
            collections = await self.client.get_collections()
            collection_names = [c.name for c in collections.collections]

            if self.collection_name not in collection_names:
                await self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(
                        size=self.vector_size,
                        distance=Distance.COSINE,
                    ),
                )
                logger.info(f"Created Qdrant collection: {self.collection_name}")
            return True
        except Exception as e:
            logger.error(f"Qdrant collection error: {str(e)}")
            return False

    async def upsert_rubric(
        self,
        rubric_id: str,
        course_id: str,
        rubric_name: str,
        criteria: List[Dict[str, Any]],
        description: Optional[str] = None,
    ):
        await self.ensure_collection_exists()

        points = []
        chunk_id = 0

        header_text = f"Rubric: {rubric_name}\nDescription: {description or ''}\nCourse: {course_id}"
        header_embedding = await self.llm_service.generate_embedding(header_text)

        points.append(PointStruct(
            id=str(uuid4()),
            vector=header_embedding,
            payload={
                "rubric_id": rubric_id,
                "course_id": course_id,
                "chunk_type": "rubric_header",
                "chunk_id": chunk_id,
                "content": header_text,
                "metadata": {"name": rubric_name},
            },
        ))
        chunk_id += 1

        for criterion in criteria:
            criterion_text = (
                f"Criterion: {criterion.get('name', '')}\n"
                f"Description: {criterion.get('description', '')}\n"
                f"Max Score: {criterion.get('max_score', 0)}\n"
                f"Weight: {criterion.get('weight', 1.0)}\n"
                f"Levels: {json.dumps(criterion.get('levels', []), indent=2)}"
            )
            criterion_embedding = await self.llm_service.generate_embedding(criterion_text)

            points.append(PointStruct(
                id=str(uuid4()),
                vector=criterion_embedding,
                payload={
                    "rubric_id": rubric_id,
                    "course_id": course_id,
                    "chunk_type": "criterion",
                    "criterion_id": criterion.get("id"),
                    "chunk_id": chunk_id,
                    "content": criterion_text,
                    "metadata": criterion,
                },
            ))
            chunk_id += 1

        if self.client:
            try:
                await self.client.upsert(
                    collection_name=self.collection_name,
                    points=points,
                )
                logger.info(f"Upserted {len(points)} rubric points for rubric {rubric_id}")
                return True
            except Exception as e:
                logger.error(f"Qdrant upsert error: {str(e)}")

        self._in_memory_points.extend([
            {"id": p.id, "vector": p.vector, "payload": p.payload} for p in points
        ])
        return True

    async def upsert_course_material(
        self,
        material_id: str,
        course_id: str,
        title: str,
        content_chunks: List[str],
        material_type: str = "notes",
        topic_tags: Optional[List[str]] = None,
    ):
        await self.ensure_collection_exists()

        points = []
        for i, chunk in enumerate(content_chunks):
            embedding = await self.llm_service.generate_embedding(chunk)
            points.append(PointStruct(
                id=str(uuid4()),
                vector=embedding,
                payload={
                    "material_id": material_id,
                    "course_id": course_id,
                    "chunk_type": "course_material",
                    "material_type": material_type,
                    "chunk_id": i,
                    "content": chunk,
                    "title": title,
                    "topic_tags": topic_tags or [],
                    "metadata": {"title": title},
                },
            ))

        if self.client:
            try:
                await self.client.upsert(
                    collection_name=self.collection_name,
                    points=points,
                )
                logger.info(f"Upserted {len(points)} course material points for {material_id}")
                return [p.id for p in points]
            except Exception as e:
                logger.error(f"Qdrant upsert error: {str(e)}")

        self._in_memory_points.extend([
            {"id": p.id, "vector": p.vector, "payload": p.payload} for p in points
        ])
        return [p.id for p in points]

    async def search_rubric_context(
        self,
        rubric_id: str,
        query_text: str,
        top_k: int = 5,
    ) -> List[Dict[str, Any]]:
        query_embedding = await self.llm_service.generate_embedding(query_text)

        if self.client:
            try:
                results = await self.client.search(
                    collection_name=self.collection_name,
                    query_vector=query_embedding,
                    limit=top_k,
                    query_filter=Filter(
                        must=[
                            FieldCondition(
                                key="rubric_id",
                                match=MatchValue(value=rubric_id),
                            )
                        ]
                    ),
                )
                return [
                    {
                        "content": r.payload.get("content", ""),
                        "score": r.score,
                        "metadata": r.payload,
                    }
                    for r in results
                ]
            except Exception as e:
                logger.error(f"Qdrant search error: {str(e)}")

        return self._in_memory_search(query_embedding, top_k, {"rubric_id": rubric_id})

    async def search_course_context(
        self,
        course_id: str,
        query_text: str,
        top_k: int = 8,
    ) -> List[Dict[str, Any]]:
        query_embedding = await self.llm_service.generate_embedding(query_text)

        if self.client:
            try:
                results = await self.client.search(
                    collection_name=self.collection_name,
                    query_vector=query_embedding,
                    limit=top_k,
                    query_filter=Filter(
                        must=[
                            FieldCondition(
                                key="course_id",
                                match=MatchValue(value=course_id),
                            )
                        ]
                    ),
                )
                return [
                    {
                        "content": r.payload.get("content", ""),
                        "score": r.score,
                        "title": r.payload.get("title", ""),
                        "metadata": r.payload,
                    }
                    for r in results
                ]
            except Exception as e:
                logger.error(f"Qdrant search error: {str(e)}")

        return self._in_memory_search(query_embedding, top_k, {"course_id": course_id})

    def _in_memory_search(
        self,
        query_embedding: List[float],
        top_k: int,
        filter_conditions: Dict[str, str],
    ) -> List[Dict[str, Any]]:
        import math

        filtered = [
            p for p in getattr(self, '_in_memory_points', [])
            if all(p["payload"].get(k) == v for k, v in filter_conditions.items())
        ]

        def cosine_similarity(v1, v2):
            if len(v1) != len(v2):
                return 0.0
            dot = sum(a * b for a, b in zip(v1, v2))
            norm1 = math.sqrt(sum(a * a for a in v1))
            norm2 = math.sqrt(sum(b * b for b in v2))
            return dot / (norm1 * norm2) if norm1 and norm2 else 0.0

        scored = []
        for p in filtered:
            score = cosine_similarity(query_embedding, p["vector"])
            scored.append((score, p))

        scored.sort(key=lambda x: x[0], reverse=True)
        top = scored[:top_k]

        return [
            {
                "content": p["payload"].get("content", ""),
                "score": score,
                "title": p["payload"].get("title", ""),
                "metadata": p["payload"],
            }
            for score, p in top
        ]
