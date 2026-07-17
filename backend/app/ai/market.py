from app.ai.prompts import MARKET_PROMPT
from app.ai.utils import generate_json

def market_analysis(
        title: str,
        description: str,
        industry: str,
        target_audience: str,
):
    prompt = f"""
{MARKET_PROMPT}

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


