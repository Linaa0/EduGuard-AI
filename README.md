# EduGuard AI

**AI Assesses. Teachers Decide. Students Understand.**

EduGuard AI is an academic assessment platform that uses an AI agent to evaluate student submissions against rubric criteria, while keeping lecturers firmly in control of the final grade. Students receive criterion-level feedback with actionable improvement recommendations — not just a score.

Built for the [Ejo Labs STP '26 Hackathon](https://github.com/Linaa0/EduGuard-AI).

---

## Overview

University lecturers spend hours grading hundreds of submissions against detailed rubrics. EduGuard AI automates the first pass: an autonomous AI agent reads the submission, retrieves rubric criteria and course context via RAG, evaluates each criterion with explanations, calculates a suggested score, and generates feedback — all grounded in the rubric, not free-form. A lecturer reviews, adjusts, and approves. Students get transparent, criterion-level feedback that tells them exactly where they lost marks and how to improve.

The core principle: **AI assesses, teachers decide, students understand**.

---

## Key Features

- **Rubric-based AI assessment** — The AI agent evaluates submissions against each rubric criterion independently, producing per-criterion scores, confidence levels, and rationale
- **7-tool autonomous agent** — A tool-using AI pipeline that fetches assignment details, retrieves rubric context via RAG, analyzes the submission, evaluates criteria, calculates scores, generates feedback, and checks confidence thresholds
- **RAG-grounded evaluation** — Rubric criteria and course materials are vectorized in Qdrant and retrieved as context for each evaluation, preventing hallucinated grading
- **Lecturer review workflow** — Every AI-generated grade goes through a human-in-the-loop review where lecturers can adjust scores, override criteria, and approve or reject before students see anything
- **Criterion-level feedback** — Students see exactly which criteria they met, which they didn't, and why — not just a single number
- **Student recommendations** — Personalized study resources and improvement suggestions based on assessment results
- **Multi-role dashboards** — Separate views for lecturers, students, administrators, and parents, each with role-appropriate information
- **English / Kinyarwanda language support** — Full site-wide language toggle with translations across all pages

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, Lucide React |
| **Backend** | Python 3.12, FastAPI, SQLAlchemy 2 (async), Alembic |
| **Database** | PostgreSQL 16 |
| **Vector Store** | Qdrant (RAG retrieval for rubric & course context) |
| **LLM** | EjoChat API (OpenAI-compatible) |
| **Embeddings** | BAAI/bge-base-en-v1.5 via sentence-transformers |
| **Document Parsing** | pypdf, pdfplumber, python-docx, BeautifulSoup |
| **Automation** | n8n (webhook-based notification pipelines) |
| **Auth** | JWT (python-jose + passlib/bcrypt) |
| **Deployment** | Docker Compose (5 services) |

---

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│   Frontend   │────▶│   Backend    │────▶│   AI Agent       │
│  React/Vite  │ API │   FastAPI    │     │  (7-tool pipeline)│
└──────────────┘     └──────┬───────┘     └────────┬─────────┘
                            │                      │
                   ┌────────▼───────┐     ┌────────▼─────────┐
                   │   PostgreSQL   │     │   Qdrant Vector  │
                   │   (data)       │     │   Store (RAG)    │
                   └────────────────┘     └──────────────────┘
                                                    │
                                           ┌────────▼─────────┐
                                           │   EjoChat LLM    │
                                           │   (evaluation)   │
                                           └──────────────────┘
```

The frontend communicates with the FastAPI backend over REST. When a submission is assessed, the backend dispatches to the AI agent, which executes a 7-step pipeline: fetch assignment, retrieve rubric via RAG, analyze submission text, evaluate each criterion, calculate score, generate feedback, and check confidence. Low-confidence assessments are flagged for mandatory human review.

---

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local frontend development without Docker)
- Python 3.12+ (for local backend development without Docker)

### 1. Clone the repository

```bash
git clone https://github.com/Linaa0/EduGuard-AI.git
cd EduGuard-AI
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your values. At minimum, you need a valid `EJOCHAT_API_KEY` for the AI agent to function.

### 3. Start with Docker Compose

```bash
docker compose up --build
```

This starts all five services:
- **Frontend** — `http://localhost:3000`
- **Backend API** — `http://localhost:8000` (Swagger docs at `/docs`)
- **PostgreSQL** — `localhost:5432`
- **Qdrant** — `localhost:6333`
- **n8n** — `http://localhost:5678`

### 4. Run locally (without Docker)

**Backend:**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Start PostgreSQL and Qdrant separately, then:
python -m app.core.init_db
uvicorn app.main:app --reload --port 8000
```

**Frontend:**

```bash
npm install
npm run dev
```

The Vite dev server starts on `http://localhost:5173` and proxies `/api` requests to the backend on port 8000.

---

## Project Structure

```
EduGuard-AI/
├── backend/
│   ├── app/
│   │   ├── agents/          # AI assessment agent (7-tool pipeline)
│   │   ├── api/             # FastAPI route handlers
│   │   ├── core/            # Config, database, security, logging
│   │   ├── models/          # SQLAlchemy ORM models
│   │   ├── rag/             # Qdrant vector store service
│   │   ├── schemas/         # Pydantic request/response schemas
│   │   └── services/        # LLM service (EjoChat integration)
│   ├── alembic/             # Database migrations
│   ├── requirements.txt
│   └── Dockerfile
├── src/
│   ├── components/
│   │   ├── admin/           # Administrator dashboard views
│   │   ├── auth/            # Login and signup pages
│   │   ├── common/          # Shared UI (navbar, sidebar, status badges)
│   │   ├── landing/         # Public marketing/landing page sections
│   │   ├── lecturer/        # Lecturer dashboard and grading views
│   │   ├── parent/          # Parent/guardian portal
│   │   └── student/         # Student dashboard and feedback views
│   ├── context/             # React context (app state, auth, theme, language)
│   ├── data/                # Mock data, translations, team info
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API client
│   └── index.css            # Tailwind CSS + custom theme
├── docker-compose.yml       # Full-stack orchestration (5 services)
├── .env.example             # Environment variable template
└── package.json
```

---

## Screenshots

> Screenshots and demo video coming soon.

---

## Team

| Name | Role |
|------|------|
| **ISHIMWE Lina Assoumani** | Team Lead — Product & Project Coordination |
| **SHEMA Aime Pacifique** | Lead AI Engineer — AI Agent & RAG System |
| **BESSORA Neema Hirwa** | Frontend Developer — User Interface & Experience |
| **IZERE Joyeux Fils** | Backend Developer — APIs & Database |
| **NIYOMPANO Fidele** | Quality Assurance & Documentation |

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

Built for the **Ejo Labs STP '26 Hackathon**. Powered by the EjoChat LLM API.
