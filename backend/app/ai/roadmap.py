from app.ai.utils import generate_json
from app.ai.prompts import ROADMAP_PROMPT


def roadmap_analysis(
    title: str,
    description: str,
    industry: str,
    target_audience: str,
):
    prompt = f"""
{ROADMAP_PROMPT}

Startup Name:
{title}

Industry:
{industry}

Description:
{description}

Target Audience:
{target_audience}
"""

   
    return generate_json(prompt)

    