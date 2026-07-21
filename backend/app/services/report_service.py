from app.ai.startup_report import generate_startup_report
from app.schemas.report import ReportRequest
from sqlalchemy.orm import Session
from app.models.report import Report
from app.repositories.report_repository import ReportRepository
from app.utils.pdf_generator import generate_pdf

class ReportService:
    @staticmethod
    def generate_report(
        db: Session,
        user_id: int,
        data: ReportRequest,
        ):
        report = generate_startup_report(
            title=data.title,
            description=data.description,
            industry=data.industry,
            target_audience=data.targetAudience,
            )
        saved = ReportRepository.create(
            db=db,
            user_id=user_id,
            title=data.title,
            industry=data.industry,
            target_audience=data.targetAudience,
            report=report,
            )
        return {
            "id": saved.id,
            "report": report,
            }

    @staticmethod
    def get_reports(
        db: Session,
        user_id: int,
    ) -> list[Report]:

        return ReportRepository.get_all_by_user(
            db=db,
            user_id=user_id,
        )

    @staticmethod
    def get_report(
        db: Session,
        report_id: int,
        user_id: int,
    ) -> Report | None:

        return ReportRepository.get_by_id(
            db=db,
            report_id=report_id,
            user_id=user_id,
        )

    @staticmethod
    def delete_report(
        db: Session,
        report_id: int,
        user_id: int,
    ) -> bool:

        report = ReportRepository.get_by_id(
            db=db,
            report_id=report_id,
            user_id=user_id,
        )

        if report is None:
            return False

        ReportRepository.delete(
            db=db,
            report=report,
        )

        return True
    
    @staticmethod
    def search_reports(
        db: Session,
        user_id: int,
        query: str,
    ):

        return ReportRepository.search_reports(
            db=db,
            user_id=user_id,
            query=query,
        )
    @staticmethod
    def get_dashboard_stats(
        db: Session,
        user_id: int,
    ):

        return ReportRepository.get_dashboard_stats(
            db=db,
            user_id=user_id,
        )
    
    @staticmethod
    def export_pdf(
        db: Session,
        report_id: int,
        user_id: int,
    ):

        report = ReportRepository.get_by_id(
            db=db,
            report_id=report_id,
            user_id=user_id,
        )

        if report is None:
            return None

        return generate_pdf( report )