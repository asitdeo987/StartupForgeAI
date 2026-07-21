from sqlalchemy.orm import Session

from app.ai.pitch_deck import generate_pitch_deck

from app.models.pitch import PitchDeck

from app.repositories.pitch_repository import PitchRepository
from app.repositories.report_repository import ReportRepository
from app.utils.ppt_generator import generate_ppt

class PitchService:

    @staticmethod
    def generate_pitch(
        db: Session,
        *,
        report_id: int,
        user_id: int,
    ) -> PitchDeck:

        report = ReportRepository.get_by_id(
            db=db,
            report_id=report_id,
            user_id=user_id,
        )

        if report is None:
            raise ValueError("Report not found.")

        existing = PitchRepository.get_by_report(
            db=db,
            report_id=report_id,
            user_id=user_id,
        )

        if existing:
            return existing

        pitch = generate_pitch_deck(
            report.report,
        )

        return PitchRepository.create(
            db=db,
            user_id=user_id,
            report_id=report.id,
            title=report.title,
            pitch=pitch,
        )

    @staticmethod
    def get_pitch(
        db: Session,
        *,
        report_id: int,
        user_id: int,
    ) -> PitchDeck | None:

        return PitchRepository.get_by_report(
            db=db,
            report_id=report_id,
            user_id=user_id,
        )

    @staticmethod
    def get_all_pitches(
        db: Session,
        *,
        user_id: int,
    ):

        return PitchRepository.get_all(
            db=db,
            user_id=user_id,
        )
    
    @staticmethod
    def export_ppt(
        db: Session,
        *,
        report_id: int,
        user_id: int,
    ):

        pitch = PitchRepository.get_by_report(
            db=db,
            report_id=report_id,
            user_id=user_id,
        )

        if pitch is None:
            raise ValueError("Pitch deck not found.")

        return generate_ppt(
            pitch.pitch,
        )