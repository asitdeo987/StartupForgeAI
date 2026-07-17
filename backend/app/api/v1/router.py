from fastapi import APIRouter
from app.api.v1.endpoints import (auth, ideas, ai_test, report)


api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(ideas.router)
api_router.include_router(ai_test.router)
api_router.include_router(report.router)
