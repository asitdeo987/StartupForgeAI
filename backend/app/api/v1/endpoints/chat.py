from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.chat import ChatRequest
from app.services.chat_service import ChatService
from app.services.auth_service import AuthService
from app.core.security import decode_access_token
from app.models.user import User

from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
)

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"],
)

security = HTTPBearer()


def get_logged_in_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> User:

    token = credentials.credentials

    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token",
        )

    user_id = payload.get("sub")

    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token",
        )

    return AuthService.get_current_user(
        db=db,
        user_id=int(user_id),
    )


@router.post("/send")
def send_message(
    data: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    return ChatService.send_message(
        db=db,
        user_id=current_user.id,
        report_id=data.report_id,
        message=data.message,
    )


@router.get("/{report_id}")
def get_chat_history(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    return ChatService.get_history(
        db=db,
        report_id=report_id,
        user_id=current_user.id,
    )


@router.delete("/{report_id}")
def delete_chat_history(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    deleted = ChatService.delete_history(
        db=db,
        report_id=report_id,
        user_id=current_user.id,
    )

    return {
        "deleted_messages": deleted,
    }