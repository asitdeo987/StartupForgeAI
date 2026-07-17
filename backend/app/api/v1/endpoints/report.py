from fastapi import APIRouter

from app.schemas.report import ReportRequest
from app.services.report_service import ReportService

router = APIRouter(
    prefix="/report",
    tags=["Startup Report"],
)


@router.post("/generate")
def generate_report(data: ReportRequest):

    return ReportService.generate_report(data)