export interface IdeaRequest {
    title: string;
    industry: string;
    targetAudience: string;
    description: string
}

export interface IdeaResponse {
    startup_name: string;
    elevator_pitch: string;
    problem_statement: string;
    solution: string;
    target_audience: string;
    business_model: string;
    mvp_features: string[];
}