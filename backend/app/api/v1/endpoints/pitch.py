from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.services.auth_service import AuthService
from app.schemas.pitch import PitchResponse
from app.core.security import decode_access_token
from app.services.pitch_service import PitchService
from fastapi.security import (HTTPAuthorizationCredentials,HTTPBearer)
from fastapi.responses import StreamingResponse
from io import BytesIO

router = APIRouter(
    prefix="/pitch",
    tags=["Pitch Deck"],
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

@router.post(
    "/generate/{report_id}",
    response_model=PitchResponse,
)
def generate_pitch(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    try:

        return PitchService.generate_pitch(
            db=db,
            report_id=report_id,
            user_id=current_user.id,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.get(
    "/{report_id}",
    response_model=PitchResponse,
)
def get_pitch(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    pitch = PitchService.get_pitch(
        db=db,
        report_id=report_id,
        user_id=current_user.id,
    )

    if pitch is None:

        raise HTTPException(
            status_code=404,
            detail="Pitch deck not found.",
        )

    return pitch


@router.get(
    "",
    response_model=list[PitchResponse],
)
def get_all_pitches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    return PitchService.get_all_pitches(
        db=db,
        user_id=current_user.id,
    )

@router.get("/{report_id}/ppt")
def download_pitch_ppt(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    try:

        ppt = PitchService.export_ppt(
            db=db,
            report_id=report_id,
            user_id=current_user.id,
        )

        return StreamingResponse(
            ppt,
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={
                "Content-Disposition":
                f'attachment; filename="pitch_deck_{report_id}.pptx"'
            },
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )