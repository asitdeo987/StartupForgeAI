from pydantic import BaseModel, EmailStr, Field, ConfigDict

class RegisterRequest(BaseModel):
    name: str= Field(min_length=3, max_length=50, description="Full Name")
    email: EmailStr
    password: str= Field(min_length=8, max_length=20, description="Password must be at least 8 characters")

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserResponce(BaseModel):
    id: int
    name: str
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)
    
class TokenResponce(BaseModel):
    access_token: str
    token_type: str = "bearer"    

