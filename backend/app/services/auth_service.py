from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.auth import (RegisterRequest, LoginRequest, UserResponce, TokenResponce)
from app.core.security import (hash_password, verify_password, create_access_token)
from app.models.user import User
from app.repositories.user_repository import UserRepository


class AuthService:

    @staticmethod
    def register_user(db:Session, user:RegisterRequest) -> UserResponce:

        existing_user = UserRepository.get_user_by_email(db, user.email)

        if existing_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registerd",)
        
        hashed_password = hash_password(user.password)

        creat_user = UserRepository.create_user(db=db, name=user.name, email=user.email, hashed_password=hashed_password,)
        
        return UserResponce(id = creat_user.id, name=creat_user.name, email=creat_user.email,)


    @staticmethod
    def login_user(db:Session, user:LoginRequest) -> TokenResponce:

        existing_user = UserRepository.get_user_by_email(db, user.email,)

        if existing_user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found",)
        
        if not verify_password(user.password, existing_user.hashed_password,):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid password",)

        token = create_access_token({"sub":str(existing_user.id),"email":existing_user.email})

        return TokenResponce(access_token=token,token_type="bearer",)

    @staticmethod
    def get_current_user(db:Session, user_id:int,) -> UserResponce:
        
        user = UserRepository.get_user_by_id(db, user_id,)

        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not found",)

        return UserResponce(
            id = user.id,
            name = user.name,
            email= user.email,
        )    