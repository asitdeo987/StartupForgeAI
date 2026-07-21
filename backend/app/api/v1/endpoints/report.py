from fastapi import (APIRouter,Depends,HTTPException, Query)
from fastapi.security import (HTTPAuthorizationCredentials,HTTPBearer,)
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse
from app.db.session import get_db
from app.schemas.report import ReportRequest
from app.services.report_service import ReportService
from app.services.auth_service import AuthService
from app.core.security import decode_access_token
from app.models.user import User

router = APIRouter(
    prefix="/report",
    tags=["Startup Report"],
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

@router.post("/generate")
def generate_report(
    data: ReportRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    return ReportService.generate_report(
        db=db,
        user_id=current_user.id,
        data=data,
    )

# Get all reports
@router.get("/")
def get_reports(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    return ReportService.get_reports(
        db=db,
        user_id=current_user.id,
    )

@router.get("/search")
def search_reports(
    q: str = Query(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    return ReportService.search_reports(
        db=db,
        user_id=current_user.id,
        query=q,
    )

@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    return ReportService.get_dashboard_stats(
        db=db,
        user_id=current_user.id,
    )

@router.get("/{report_id}/pdf")
def download_pdf(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    pdf = ReportService.export_pdf(
        db=db,
        report_id=report_id,
        user_id=current_user.id,
    )

    if pdf is None:

        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    return StreamingResponse(
        pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
            f'attachment; filename="report-{report_id}.pdf"'
        },
    )

# Get one report
@router.get("/{report_id}")
def get_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    report = ReportService.get_report(
        db=db,
        report_id=report_id,
        user_id=current_user.id,
    )

    if report is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    return report

# Delete report
@router.delete("/{report_id}")
def delete_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_logged_in_user),
):

    deleted = ReportService.delete_report(
        db=db,
        report_id=report_id,
        user_id=current_user.id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    return {
        "message": "Report deleted successfully."
    }

