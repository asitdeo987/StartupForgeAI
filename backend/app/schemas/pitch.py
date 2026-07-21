from pydantic import BaseModel
from datetime import datetime


class PitchRequest(BaseModel):
    report_id: int


class PitchResponse(BaseModel):
    id: int
    title: str
    pitch: dict
    created_at: datetime

    class Config:
        from_attributes = True