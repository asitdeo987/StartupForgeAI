from concurrent.futures import ThreadPoolExecutor

from app.ai.market import market_analysis
from app.ai.competitor import competitor_analysis
from app.ai.swot import swot_analysis
from app.ai.business import business_analysis
from app.ai.tech_stack import tech_stack_analysis
from app.ai.roadmap import roadmap_analysis


def generate_startup_report(
    title: str,
    description: str,
    industry: str,
    target_audience: str,
):

    with ThreadPoolExecutor(max_workers=6) as executor:

        market_future = executor.submit(
            market_analysis,
            title,
            description,
            industry,
            target_audience,
        )

        competitor_future = executor.submit(
            competitor_analysis,
            title,
            description,
            industry,
        )

        swot_future = executor.submit(
            swot_analysis,
            title,
            description,
            industry,
            target_audience,
        )

        business_future = executor.submit(
            business_analysis,
            title,
            description,
            industry,
            target_audience,
        )

        tech_future = executor.submit(
            tech_stack_analysis,
            title,
            description,
            industry,
            target_audience,
        )

        roadmap_future = executor.submit(
            roadmap_analysis,
            title,
            description,
            industry,
            target_audience,
        )

    return {

        "market": market_future.result(),

        "competitors": competitor_future.result(),

        "swot": swot_future.result(),

        "business": business_future.result(),

        "technology": tech_future.result(),

        "roadmap": roadmap_future.result(),

    }