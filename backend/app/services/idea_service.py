import json

from app.ai.openrouter import generate_text
from app.schemas.idea import IdeaRequest, IdeaResponse


class IdeaService:

    @staticmethod
    def refine_idea(data: IdeaRequest) -> IdeaResponse:
        prompt = f"""
Generate ONLY valid JSON.

Return exactly this structure:

{{
  "startup_name": "",
  "elevator_pitch": "",
  "problem_statement": "",
  "solution": "",
  "target_audience": "",
  "business_model": "",
  "mvp_features": []
}}

Startup Name:
{data.title}

Industry:
{data.industry}

Description:
{data.description}

Target Audience:
{data.targetAudience}
"""

        ai_response = generate_text(prompt)

        result = json.loads(ai_response)

        return IdeaResponse(**result)