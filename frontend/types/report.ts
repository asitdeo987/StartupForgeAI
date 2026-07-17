export interface ReportRequest {
    title: string;
    description: string;
    industry: string;
    targetAudience: string;
}

export interface MarketAnalysis {
    market_size: string;
    target_customers: string[];
    customer_pain_points: string[];
    market_trends: string[];
}

export interface TopCompetitor {
    name: string;
    description: string;
}

export interface Competitors {
    top_competitors: TopCompetitor[];
    advantages: string[];
    disadvantages: string[];
    market_gap: string;
}

export interface SWOT {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
}

export interface BusinessModel {
    business_model: string;
    value_proposition: string;
    customer_segments: string[];
    pricing_strategy: string;
    revenue_streams: string[];
}

export interface Technology {
    frontend: string;
    backend: string;
    database: string;
    cloud: string;
    authentication: string;
    ai_stack: string;
    devops: string;
    integrations: string[];
}

export interface Roadmap {
    planning: string[];
    mvp: string[];
    beta: string[];
    launch: string[];
    scaling: string[];
}

export interface StartupReport {
    market: MarketAnalysis;
    competitors: Competitors;
    swot: SWOT;
    business: BusinessModel;
    technology: Technology;
    roadmap: Roadmap;
}