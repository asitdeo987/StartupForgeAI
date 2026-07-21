import json

from app.ai.openrouter import generate_text


def generate_pitch_deck(report: dict) -> dict:

    prompt = f"""
You are an expert startup investor.

Convert the following startup report into a professional investor pitch deck.

Return ONLY valid JSON.

Structure:

{{
    "startup_name":"",
    "tagline":"",
    "slides":[
        {{
            "title":"",
            "content":[]
        }}
    ]
}}

Generate exactly these slides:

1. Problem
2. Solution
3. Market Opportunity
4. Business Model
5. Competitors
6. Marketing Strategy
7. Technology
8. Roadmap
9. Investment Ask

Startup Report:

{json.dumps(report, indent=2)}
"""

    response = generate_text(prompt)

    return json.loads(response)