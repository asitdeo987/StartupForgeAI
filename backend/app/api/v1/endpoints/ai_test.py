from fastapi import APIRouter

from app.ai.openrouter import generate_text

router = APIRouter(
    prefix="/ai",
    tags=["AI Test"]
)


@router.get("/test")
def test_ai():
    response = generate_text(
        "Say hello in one sentence."
    )

    return {
        "success": True,
        "response": response
    }