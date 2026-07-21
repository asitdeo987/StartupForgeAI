from sqlalchemy.orm import Session

from app.models.chat import ChatMessage


class ChatRepository:

    @staticmethod
    def create(
        db: Session,
        *,
        user_id: int,
        report_id: int,
        role: str,
        message: str,
    ) -> ChatMessage:

        chat = ChatMessage(
            user_id=user_id,
            report_id=report_id,
            role=role,
            message=message,
        )

        db.add(chat)
        db.commit()
        db.refresh(chat)

        return chat

    @staticmethod
    def get_by_report(
        db: Session,
        *,
        report_id: int,
        user_id: int,
    ) -> list[ChatMessage]:

        return (
            db.query(ChatMessage)
            .filter(
                ChatMessage.report_id == report_id,
                ChatMessage.user_id == user_id,
            )
            .order_by(ChatMessage.created_at.asc())
            .all()
        )

    @staticmethod
    def delete_by_report(
        db: Session,
        *,
        report_id: int,
        user_id: int,
    ) -> int:

        messages = (
            db.query(ChatMessage)
            .filter(
                ChatMessage.report_id == report_id,
                ChatMessage.user_id == user_id,
            )
            .all()
        )

        count = len(messages)

        for message in messages:
            db.delete(message)

        db.commit()

        return count