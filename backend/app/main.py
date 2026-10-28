
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app import models

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CLARA API",
    description="AI Emotion-Aware Dementia Care Companion",
    version="1.0.0",
)

# Allow requests from the React/Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to CLARA Backend!",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "CLARA backend is running!",
    }
