from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.models.report import Report
from app.models.chat import ChatMessage


class ReportRepository:

    @staticmethod
    def create(
        db: Session,
        *,
        user_id: int,
        title: str,
        industry: str,
        target_audience: str,
        report: dict,
    ) -> Report:

        new_report = Report(
            user_id=user_id,
            title=title,
            industry=industry,
            target_audience=target_audience,
            report=report,
        )

        db.add(new_report)
        db.commit()
        db.refresh(new_report)

        return new_report

    @staticmethod
    def get_all_by_user(
        db: Session,
        user_id: int,
    ) -> list[Report]:

        return (
            db.query(Report)
            .filter(Report.user_id == user_id)
            .order_by(Report.created_at.desc())
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        report_id: int,
        user_id: int,
    ) -> Report | None:

        return (
            db.query(Report)
            .filter(
                Report.id == report_id,
                Report.user_id == user_id,
            )
            .first()
        )

    @staticmethod
    def delete(
        db: Session,
        report: Report,
    ) -> None:

        db.delete(report)
        db.commit()

    @staticmethod
    def search_reports(
        db: Session,
        user_id: int,
        query: str,
    ):

        return (
            db.query(Report)
            .filter(
                Report.user_id == user_id,
                or_(
                    Report.title.ilike(f"%{query}%"),
                    Report.industry.ilike(f"%{query}%"),
                    Report.target_audience.ilike(f"%{query}%"),
                ),
            )
            .order_by(
                Report.created_at.desc()
            )
            .all()
        )

    @staticmethod
    def get_dashboard_stats(
        db: Session,
        user_id: int,
    ):

        total_reports = (
            db.query(Report)
            .filter(
                Report.user_id == user_id
            )
            .count()
        )

        total_chats = (
            db.query(ChatMessage)
            .join(
                Report,
                ChatMessage.report_id == Report.id
            )
            .filter(
                Report.user_id == user_id
            )
            .count()
        )

        top_industry = (
            db.query(
                Report.industry,
                func.count(Report.id)
            )
            .filter(
                Report.user_id == user_id
            )
            .group_by(
                Report.industry
            )
            .order_by(
                func.count(Report.id).desc()
            )
            .first()
        )

        latest_report = (
            db.query(Report)
            .filter(
                Report.user_id == user_id
            )
            .order_by(
                Report.created_at.desc()
            )
            .first()
        )

        return {
            "total_reports": total_reports,
            "total_chats": total_chats,
            "top_industry": (
                top_industry[0]
                if top_industry
                else "-"
            ),
            "latest_report": (
                latest_report.created_at
                if latest_report
                else None
            ),
        }    