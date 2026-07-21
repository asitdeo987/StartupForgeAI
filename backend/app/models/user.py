from datetime import datetime, UTC
from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id:Mapped[int] = mapped_column(
        primary_key=True, 
        nullable=False
    )

    name:Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    email:Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
        index=True
    )

    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC)
    )

    update_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        onupdate=lambda: datetime.now(UTC)
    )
    reports = relationship(
        "Report",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    chat_messages = relationship(
    "ChatMessage",
    back_populates="user",
    cascade="all, delete-orphan",
    )

    pitch_decks = relationship(
    "PitchDeck",
    back_populates="user",
    cascade="all, delete-orphan",
    )

