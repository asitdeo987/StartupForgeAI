from fastapi import APIRouter
from app.schemas.idea import( IdeaRequest,IdeaResponse )
from app.services.idea_service import IdeaService

router = APIRouter( prefix="/ideas", tags=["Ideas"])

@router.post("/refine", response_model=IdeaResponse)
def refine_idea(data: IdeaRequest):
    return IdeaService.refine_idea(data)