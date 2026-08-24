from pydantic import BaseModel, EmailStr, ConfigDict, Field, field_validator
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.models import UserRole, SubmissionStatus, AssessmentStatus


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    sub: Optional[str] = None
    role: Optional[str] = None


class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole = UserRole.STUDENT
    department: Optional[str] = None
    student_id: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: EmailStr
    full_name: str
    role: UserRole
    department: Optional[str] = None
    student_id: Optional[str] = None
    avatar_url: Optional[str] = None
    is_active: bool
    created_at: datetime


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    department: Optional[str] = None
    avatar_url: Optional[str] = None


class RubricCriterion(BaseModel):
    id: str
    name: str
    description: str
    weight: Optional[float] = None
    max_score: float
    levels: Optional[List[Dict[str, Any]]] = None


class RubricBase(BaseModel):
    name: str
    description: Optional[str] = None
    criteria: List[RubricCriterion]
    total_marks: float = 100.0


class RubricCreate(RubricBase):
    course_id: str


class RubricResponse(RubricBase):
    model_config = ConfigDict(from_attributes=True)

    id: str
    course_id: str
    created_by_id: str
    is_active: bool
    created_at: datetime
    updated_at: datetime


class CourseBase(BaseModel):
    code: str
    name: str
    description: Optional[str] = None
    department: Optional[str] = None
    academic_year: Optional[str] = None
    semester: Optional[str] = None


class CourseCreate(CourseBase):
    pass


class CourseResponse(CourseBase):
    model_config = ConfigDict(from_attributes=True)

    id: str
    created_at: datetime


class AssignmentBase(BaseModel):
    title: str
    description: Optional[str] = None
    max_score: float = 100.0
    due_date: Optional[datetime] = None
    instructions: Optional[str] = None
    file_types_allowed: Optional[List[str]] = None
    max_file_size_mb: int = 10


class AssignmentCreate(AssignmentBase):
    course_id: str
    rubric_id: Optional[UUID] = None


class AssignmentResponse(AssignmentBase):
    model_config = ConfigDict(from_attributes=True)

    id: str
    course_id: str
    rubric_id: Optional[UUID] = None
    created_by_id: str
    created_at: datetime


class SubmissionBase(BaseModel):
    content_text: Optional[str] = None
    file_urls: Optional[List[str]] = None


class SubmissionCreate(SubmissionBase):
    assignment_id: str


class SubmissionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    assignment_id: str
    student_id: str
    content_text: Optional[str] = None
    file_urls: Optional[List[str]] = None
    submitted_at: datetime
    late_submission: bool
    status: SubmissionStatus
    assessment_status: AssessmentStatus
    ai_suggested_score: Optional[float] = None
    ai_confidence: Optional[float] = None
    ai_feedback: Optional[str] = None
    lecturer_final_score: Optional[float] = None
    lecturer_comment: Optional[str] = None
    modified_by_teacher: bool
    published_to_student: bool
    lecturer_criterion_scores: Optional[Dict[str, Any]] = None
    ai_criterion_scores: Optional[Dict[str, Any]] = None
    learning_resources: Optional[List[Dict[str, Any]]] = None
    created_at: datetime


class AIToolResult(BaseModel):
    tool_name: str
    status: str
    result: Any
    timestamp: datetime
    duration_ms: Optional[int] = None


class AIAgentRun(BaseModel):
    submission_id: str
    status: str
    steps: List[AIToolResult]
    total_score: Optional[float] = None
    confidence: Optional[float] = None


class CriterionEvaluation(BaseModel):
    criterion_id: str
    criterion_name: str
    score: float
    max_score: float
    rationale: str
    evidence: List[str]
    confidence: float


class AssessmentResult(BaseModel):
    submission_id: str
    overall_score: float
    overall_max_score: float
    overall_confidence: float
    criteria_evaluations: List[CriterionEvaluation]
    summary_feedback: str
    strengths: List[str]
    areas_for_improvement: List[str]
    learning_resources: List[Dict[str, Any]]
    tool_execution_log: List[Dict[str, Any]]


class SubmissionReview(BaseModel):
    lecturer_criterion_scores: Dict[str, float]
    lecturer_comment: Optional[str] = None
    final_score: Optional[float] = None
    publish_to_student: bool = True


class SubmissionStatusUpdate(BaseModel):
    status: SubmissionStatus
    comment: Optional[str] = None
