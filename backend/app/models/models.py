from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Float, JSON, Enum
from sqlalchemy.orm import relationship
import uuid
import enum

from app.core.database import Base


class UserRole(str, enum.Enum):
    LECTURER = "lecturer"
    STUDENT = "student"
    ADMIN = "admin"


class SubmissionStatus(str, enum.Enum):
    PENDING = "Pending"
    AI_ASSESSING = "AI Assessing"
    AI_COMPLETE = "AI Complete"
    HUMAN_REVIEW = "Human Review"
    APPROVED = "Approved"
    REJECTED = "Rejected"


class AssessmentStatus(str, enum.Enum):
    NOT_STARTED = "Not Started"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"
    REQUIRES_REVIEW = "Requires Review"


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.STUDENT, nullable=False)
    avatar_url = Column(String(500), nullable=True)
    department = Column(String(255), nullable=True)
    student_id = Column(String(50), unique=True, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    courses = relationship("CourseMember", back_populates="user", cascade="all, delete-orphan")
    created_assignments = relationship("Assignment", back_populates="created_by", foreign_keys="Assignment.created_by_id")
    submissions = relationship("Submission", back_populates="student", foreign_keys="Submission.student_id")
    reviews = relationship("Submission", back_populates="reviewed_by", foreign_keys="Submission.reviewed_by_id")


class Course(Base):
    __tablename__ = "courses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    code = Column(String(20), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    department = Column(String(255), nullable=True)
    academic_year = Column(String(20), nullable=True)
    semester = Column(String(20), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    members = relationship("CourseMember", back_populates="course", cascade="all, delete-orphan")
    assignments = relationship("Assignment", back_populates="course", cascade="all, delete-orphan")
    rubrics = relationship("Rubric", back_populates="course", cascade="all, delete-orphan")


class CourseMember(Base):
    __tablename__ = "course_members"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    course_id = Column(String(36), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    enrolled_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    course = relationship("Course", back_populates="members")
    user = relationship("User", back_populates="courses")


class Rubric(Base):
    __tablename__ = "rubrics"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    course_id = Column(String(36), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    created_by_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    criteria = Column(JSON, nullable=False)
    total_marks = Column(Float, default=100.0, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    course = relationship("Course", back_populates="rubrics")
    assignments = relationship("Assignment", back_populates="rubric")


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    course_id = Column(String(36), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    rubric_id = Column(String(36), ForeignKey("rubrics.id"), nullable=True)
    created_by_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    due_date = Column(DateTime, nullable=True)
    max_score = Column(Float, default=100.0, nullable=False)
    file_types_allowed = Column(JSON, nullable=True)
    max_file_size_mb = Column(Integer, default=10, nullable=False)
    instructions = Column(Text, nullable=True)
    additional_materials = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    course = relationship("Course", back_populates="assignments")
    rubric = relationship("Rubric", back_populates="assignments")
    created_by = relationship("User", back_populates="created_assignments", foreign_keys=[created_by_id])
    submissions = relationship("Submission", back_populates="assignment", cascade="all, delete-orphan")


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    assignment_id = Column(String(36), ForeignKey("assignments.id", ondelete="CASCADE"), nullable=False)
    student_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    content_text = Column(Text, nullable=True)
    file_urls = Column(JSON, nullable=True)
    submitted_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    late_submission = Column(Boolean, default=False, nullable=False)

    status = Column(Enum(SubmissionStatus), default=SubmissionStatus.PENDING, nullable=False)
    assessment_status = Column(Enum(AssessmentStatus), default=AssessmentStatus.NOT_STARTED, nullable=False)

    ai_suggested_score = Column(Float, nullable=True)
    ai_confidence = Column(Float, nullable=True)
    ai_criterion_scores = Column(JSON, nullable=True)
    ai_feedback = Column(Text, nullable=True)
    ai_metadata = Column(JSON, nullable=True)

    lecturer_final_score = Column(Float, nullable=True)
    lecturer_criterion_scores = Column(JSON, nullable=True)
    lecturer_comment = Column(Text, nullable=True)
    reviewed_by_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    reviewed_at = Column(DateTime, nullable=True)
    modified_by_teacher = Column(Boolean, default=False, nullable=False)

    learning_resources = Column(JSON, nullable=True)
    published_to_student = Column(Boolean, default=False, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    assignment = relationship("Assignment", back_populates="submissions")
    student = relationship("User", back_populates="submissions", foreign_keys=[student_id])
    reviewed_by = relationship("User", back_populates="reviews", foreign_keys=[reviewed_by_id])
    assessment_history = relationship("AssessmentHistory", back_populates="submission", cascade="all, delete-orphan")


class AssessmentHistory(Base):
    __tablename__ = "assessment_history"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    submission_id = Column(String(36), ForeignKey("submissions.id", ondelete="CASCADE"), nullable=False)
    action = Column(String(100), nullable=False)
    actor_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    old_values = Column(JSON, nullable=True)
    new_values = Column(JSON, nullable=True)
    comment = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)

    submission = relationship("Submission", back_populates="assessment_history")


class LearningResource(Base):
    __tablename__ = "learning_resources"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    resource_type = Column(String(50), nullable=False)
    url = Column(String(500), nullable=False)
    course_id = Column(String(36), ForeignKey("courses.id", ondelete="CASCADE"), nullable=True)
    topic_tags = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class CourseMaterial(Base):
    __tablename__ = "course_materials"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    course_id = Column(String(36), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    content_text = Column(Text, nullable=True)
    file_urls = Column(JSON, nullable=True)
    material_type = Column(String(50), nullable=False)
    week_number = Column(Integer, nullable=True)
    topic_tags = Column(JSON, nullable=True)
    embedded_in_qdrant = Column(Boolean, default=False, nullable=False)
    qdrant_point_ids = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
