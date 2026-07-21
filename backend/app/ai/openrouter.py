from openai import OpenAI
from app.core.config import settings

client = OpenAI(
    api_key=settings.OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
)


def generate_text(prompt: str) -> str:
    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert startup consultant. "
                    "Always return ONLY valid JSON. "
                    "Do not use markdown. "
                    "Do not use ```json blocks. "
                    "Return only raw JSON."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.7,
    )

    return response.choices[0].message.content

def generate_chat(prompt: str) -> str:

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert startup mentor. "
                    "Answer naturally like ChatGPT. "
                    "Do not return JSON. "
                    "Give clear, detailed, practical advice."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.7,
    )

    return response.choices[0].message.content