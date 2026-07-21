import json

from app.ai.openrouter import generate_chat


def generate_chat_response(
    report: dict,
    history: list,
    user_message: str,
) -> str:

    conversation = ""

    for item in history:
        conversation += f"{item.role}: {item.message}\n"

    prompt = f"""
You are an experienced startup mentor.

You are helping the founder improve their startup.

Below is the startup report.

{json.dumps(report, indent=2)}

Previous Conversation:

{conversation}

User Question:

{user_message}

Rules:

- Answer only the user's question.
- Be practical and professional.
- Use the startup report as context.
- Keep the conversation natural.
- Do NOT answer with JSON.
- Do NOT use markdown code blocks.
"""

    return generate_chat(prompt)