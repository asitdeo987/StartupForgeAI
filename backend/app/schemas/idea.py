from pydantic import BaseModel, Field

class IdeaRequest(BaseModel):
    title: str= Field(...,min_length=5,max_length=100)
    industry: str= Field(...,min_length=2,max_length=50)
    targetAudience: str= Field(...,min_length=3,max_length=100)
    description: str= Field(...,min_length=30)

class IdeaResponse(BaseModel):
    startup_name: str
    elevator_pitch: str
    problem_statement: str
    solution: str
    target_audience: str
    business_model: str
    mvp_features: list[str]