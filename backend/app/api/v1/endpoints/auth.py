from fastapi import (APIRouter, HTTPException, Depends, status)
from fastapi.security import (HTTPAuthorizationCredentials, HTTPBearer)
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import decode_access_token
from app.schemas.auth import (RegisterRequest, LoginRequest, UserResponce, TokenResponce)
from app.services.auth_service import AuthService


router = APIRouter(prefix="/auth", tags=["Authentication"])

security = HTTPBearer()

@router.post("/register", response_model=UserResponce, status_code=status.HTTP_201_CREATED)
def register(user: RegisterRequest, db:Session = Depends(get_db)):
    return AuthService.register_user(db = db, user= user)


@router.post("/login", response_model=TokenResponce)
def login(user: LoginRequest, db:Session = Depends(get_db)):
    return AuthService.login_user(db = db, user = user)


@router.get("/me", response_model=UserResponce)
def me(
    credentials : HTTPAuthorizationCredentials = Depends(security),
    db : Session = Depends(get_db)
):
    token = credentials.credentials
    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")
    
    user_id = payload.get("sub")

    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")
    
    return AuthService.get_current_user(db = db, user_id = int(user_id))
    