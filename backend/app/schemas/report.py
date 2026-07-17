from pydantic import BaseModel

class ReportRequest(BaseModel):
    title: str
    description: str
    industry: str
    targetAudience: str