from sqlalchemy import Column, Integer,String, ForeignKey, DateTime, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from app.db.base import Base

class Report(Base):
    __tablename__ = "reports"
    id = Column(
        Integer, 
        primary_key=True, 
        index=True
    )
    user_id = Column(
        Integer, 
        ForeignKey("users.id", ondelete="CASCADE"), 
        nullable=False
    )
    title = Column(
        String, 
        nullable=False
    )
    industry = Column(
        String, 
        nullable=False
    )
    target_audience = Column(
        String, 
        nullable=False
    )
    report = Column(
        JSONB, 
        nullable=False
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )
    user = relationship(
        "User",
        back_populates="reports"
    )
    chat_messages = relationship(
    "ChatMessage",
    back_populates="report",
    cascade="all, delete-orphan",
    )
    pitch_decks = relationship(
    "PitchDeck",
    back_populates="report",
    cascade="all, delete-orphan",
    )