from app.core.security import *

password = "password123"

hashed = hash_password(password)

print("Original :", password)

print("Hashed :", hashed)

print(
    verify_password(
        password,
        hashed
    )
)

token = create_access_token(
    {
        "sub": "asit@test.com"
    }
)

print(token)

print(
    decode_access_token(token)
)