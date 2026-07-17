import json

from app.ai.utils import generate_json
from app.ai.prompts import COMPETITOR_PROMPT


def competitor_analysis(
    title: str,
    description: str,
    industry: str,
):
    prompt = f"""
{COMPETITOR_PROMPT}

Startup Name:
{title}

Industry:
{industry}

Description:
{description}
"""

    return generate_json(prompt)
    