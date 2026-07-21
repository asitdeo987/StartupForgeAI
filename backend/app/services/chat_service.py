from sqlalchemy.orm import Session

from app.ai.chat import generate_chat_response
from app.models.report import Report
from app.repositories.chat_repository import ChatRepository
from app.repositories.report_repository import ReportRepository


class ChatService:

    @staticmethod
    def send_message(
        db: Session,
        *,
        user_id: int,
        report_id: int,
        message: str,
    ):

        report = ReportRepository.get_by_id(
            db=db,
            report_id=report_id,
            user_id=user_id,
        )

        if report is None:
            raise ValueError("Report not found.")

        history = ChatRepository.get_by_report(
            db=db,
            report_id=report_id,
            user_id=user_id,
        )

        ChatRepository.create(
            db=db,
            user_id=user_id,
            report_id=report_id,
            role="user",
            message=message,
        )

        ai_reply = generate_chat_response(
            report=report.report,
            history=history,
            user_message=message,
        )

        assistant = ChatRepository.create(
            db=db,
            user_id=user_id,
            report_id=report_id,
            role="assistant",
            message=ai_reply,
        )

        return assistant

    @staticmethod
    def get_history(
        db: Session,
        *,
        report_id: int,
        user_id: int,
    ):

        return ChatRepository.get_by_report(
            db=db,
            report_id=report_id,
            user_id=user_id,
        )

    @staticmethod
    def delete_history(
        db: Session,
        *,
        report_id: int,
        user_id: int,
    ):

        return ChatRepository.delete_by_report(
            db=db,
            report_id=report_id,
            user_id=user_id,
        )