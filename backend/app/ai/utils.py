import json

from app.ai.openrouter import generate_text


def generate_json(prompt: str) -> dict:
    """
    Generate JSON from the LLM and parse it safely.
    """

    response = generate_text(prompt)

    try:
        return json.loads(response)

    except json.JSONDecodeError as e:
        print("========== AI RESPONSE ==========")
        print(response)
        print("================================")
        raise Exception(f"Invalid JSON returned by AI: {e}")