"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatBox from "@/components/chat/ChatBox";
import ChatInput from "@/components/chat/ChatInput";

import {
    getChatHistory,
    sendMessage,
} from "@/services/chat.service";

import { ChatMessage } from "@/types/chat";

export default function ReportDetailsPage() {

    const params = useParams();

    const reportId = Number(params.id);

    const [messages, setMessages] =
        useState<ChatMessage[]>([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        async function loadChat() {

            try {

                const token =
                    localStorage.getItem("token") || "";

                const history =
                    await getChatHistory(
                        reportId,
                        token,
                    );

                setMessages(history);

            } catch (error) {

                console.error(error);

            }

        }

        if (!isNaN(reportId)) {

            loadChat();

        }

    }, [reportId]);

    async function handleSend(
        message: string,
    ) {

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token") || "";

            const reply =
                await sendMessage(
                    reportId,
                    message,
                    token,
                );

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    role: "user",
                    message,
                    created_at:
                        new Date().toISOString(),
                },
                reply,
            ]);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="mx-auto max-w-7xl p-8">

            <h1 className="mb-6 text-3xl font-bold">

                AI Startup Mentor

            </h1>

            <ChatSidebar>

                <ChatBox
                    messages={messages}
                />

                <ChatInput
                    onSend={handleSend}
                    loading={loading}
                />

            </ChatSidebar>

        </div>

    );

}