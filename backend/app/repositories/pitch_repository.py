from sqlalchemy.orm import Session

from app.models.pitch import PitchDeck


class PitchRepository:

    @staticmethod
    def create(
        db: Session,
        *,
        user_id: int,
        report_id: int,
        title: str,
        pitch: dict,
    ) -> PitchDeck:

        deck = PitchDeck(
            user_id=user_id,
            report_id=report_id,
            title=title,
            pitch=pitch,
        )

        db.add(deck)
        db.commit()
        db.refresh(deck)

        return deck

    @staticmethod
    def get_by_report(
        db: Session,
        *,
        report_id: int,
        user_id: int,
    ) -> PitchDeck | None:

        return (
            db.query(PitchDeck)
            .filter(
                PitchDeck.report_id == report_id,
                PitchDeck.user_id == user_id,
            )
            .first()
        )

    @staticmethod
    def get_all(
        db: Session,
        *,
        user_id: int,
    ):

        return (
            db.query(PitchDeck)
            .filter(PitchDeck.user_id == user_id)
            .order_by(PitchDeck.created_at.desc())
            .all()
        )