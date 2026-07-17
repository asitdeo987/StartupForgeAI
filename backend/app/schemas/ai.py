from pydantic import BaseModel


class MarketAnalysis(BaseModel):
    market_size: str
    target_customers: list[str]
    customer_pain_points: list[str]
    market_trends: list[str]


class CompetitorAnalysis(BaseModel):
    top_competitors: list
    advantages: list[str]
    disadvantages: list[str]
    market_gap: str


class SWOTAnalysis(BaseModel):
    strengths: list[str]
    weaknesses: list[str]
    opportunities: list[str]
    threats: list[str]


class BusinessAnalysis(BaseModel):
    business_model: str
    pricing_strategy: str
    value_proposition: str
    customer_segments: list[str]
    revenue_streams: list[str]


class TechAnalysis(BaseModel):
    frontend: str
    backend: str
    database: str
    authentication: str
    ai_stack: str
    cloud: str
    devops: str
    integrations: list[str]


class RoadmapAnalysis(BaseModel):
    planning: list[str]
    mvp: list[str]
    beta: list[str]
    launch: list[str]
    scaling: list[str]