from datetime import datetime, timedelta, timezone
from pwdlib import PasswordHash
from jose import jwt, JWTError
# from fastapi import Depends, HTTPException, status
# from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.core.config import settings



pwd_hash = PasswordHash.recommended()

# SECRET_KEY = "your-super-secret-key"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60

def hash_password(password: str) -> str:
    return pwd_hash.hash(password)

def verify_password(plain_password: str, hashed_password:str) -> bool:
    return pwd_hash.verify(plain_password,hashed_password);


# JWT function
def create_access_token(data: dict) -> str:
    payload =data.copy()

    expire= datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    payload.update({"exp":expire})

    encode_jwt=jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

    return encode_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    
    except JWTError:
        return None
    
# security = HTTPBearer()    
# def get_current_user_token(
#     credentials: HTTPAuthorizationCredentials = Depends(security),
# ):
#     token = credentials.credentials

#     payload = decode_access_token(token)

#     if payload is None:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid or expired token",
#         )

#     return payload