from datetime import datetime

from pydantic import BaseModel


class ChatRequest(BaseModel):
    report_id: int
    message: str


class ChatResponse(BaseModel):
    id: int
    role: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True