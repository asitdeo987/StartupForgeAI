from sqlalchemy.orm import sessionmaker, Session
from app.db.connection import engine
from typing import Generator

SessionLocal = sessionmaker(autoflush=False, bind=engine)

def get_db() -> Generator[Session, None, None]:
    db= SessionLocal()

    try:
        yield db

    finally:
        db.close()    