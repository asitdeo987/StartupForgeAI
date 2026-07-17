from app.ai.startup_report import generate_startup_report
from app.schemas.report import ReportRequest


class ReportService:

    @staticmethod
    def generate_report(data: ReportRequest):

        return generate_startup_report(
            title=data.title,
            description=data.description,
            industry=data.industry,
            target_audience=data.targetAudience,
        )