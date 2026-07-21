export interface ChatMessage {
    id: number;
    role: "user" | "assistant";
    message: string;
    created_at: string;
}

export interface ChatRequest {
    report_id: number;
    message: string;
}