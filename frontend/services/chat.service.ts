import api from "@/lib/api";
import { ChatMessage } from "@/types/chat";

export async function getChatHistory(
    reportId: number,
    token: string,
): Promise<ChatMessage[]> {

    const response = await api.get(
        `/chat/${reportId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}

export async function sendMessage(
    reportId: number,
    message: string,
    token: string,
): Promise<ChatMessage> {

    const response = await api.post(
        "/chat/send",
        {
            report_id: reportId,
            message,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}