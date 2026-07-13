from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.api.v1.router import api_router
from app.db.connection import engine
from app.db.base import Base
from app.core.config import settings

@asynccontextmanager
async def lifespan(app : FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="StartupForge AI", version="1.0.0", debug=settings.DEBUG, lifespan=lifespan)


app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message":"StartupForge AI Backend Running 🚀"}

