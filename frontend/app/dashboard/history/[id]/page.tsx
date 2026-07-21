"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Dashboard from "@/components/report/Dashboard";
import LoadingScreen from "@/components/report/LoadingScreen";

import { getReport } from "@/services/report-history.service";
import { getChatHistory, sendMessage } from "@/services/chat.service";

import { StartupReport } from "@/types/report";
import { ChatMessage } from "@/types/chat";

import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatBox from "@/components/chat/ChatBox";
import ChatInput from "@/components/chat/ChatInput";
import GeneratePitchButton from "@/components/pitch/GeneratePitchButton";
import { generatePitch, getPitch, } from "@/services/pitch.service";
import { PitchDeck } from "@/types/pitch";
import PitchViewer from "@/components/pitch/PitchViewer";

export default function ReportDetailsPage() {
    const params = useParams();

    const reportId = Number(params.id);

    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState<StartupReport | null>(null);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [chatLoading, setChatLoading] = useState(false);

    const [pitch, setPitch] = useState<PitchDeck | null>(null);
    const [pitchLoading, setPitchLoading] = useState(false);

    useEffect(() => {
        async function loadPage() {
            try {
                const token = localStorage.getItem("token") || "";

                const reportData = await getReport(
                    reportId,
                    token
                );

                setReport(reportData.report);

                const history = await getChatHistory(
                    reportId,
                    token
                );

                setMessages(history);
                try {
                    const deck = await getPitch(
                        reportId,
                        token
                    );
                    setPitch(deck);
                } catch {
                    // No pitch deck yet
                }

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (!isNaN(reportId)) {
            loadPage();
        }

    }, [reportId]);

    async function handleSend(message: string) {
        try {
            setChatLoading(true);

            const token = localStorage.getItem("token") || "";

            const assistantReply = await sendMessage(
                reportId,
                message,
                token
            );

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    role: "user",
                    message,
                    created_at: new Date().toISOString(),
                },
                assistantReply,
            ]);

        } catch (error) {
            console.error(error);
        } finally {
            setChatLoading(false);
        }
    }

    async function handleGeneratePitch() {

        try {

            setPitchLoading(true);
            const token =
                localStorage.getItem("token") || "";

            const deck = await generatePitch(
                reportId,
                token
            );
            setPitch(deck);
        } catch (error) {
            console.error(error);
        } finally {
            setPitchLoading(false);
        }
    }
    if (loading) {
        return <LoadingScreen />;
    }

    if (!report) {
        return (
            <div className="mx-auto max-w-7xl p-8">
                <h1 className="text-2xl font-bold">
                    Report not found
                </h1>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl space-y-8 p-8">

            <Dashboard report={report} />
            <div className="mt-10">

                <GeneratePitchButton
                    loading={pitchLoading}
                    onGenerate={handleGeneratePitch}
                />
                {pitch && (
                    <PitchViewer
                        pitch={pitch}
                        reportId={reportId}
                    />
                )}
            </div>
            <div className="mt-10">

                <ChatSidebar>

                    <ChatBox
                        messages={messages}
                        loading={chatLoading}
                    />

                    <ChatInput
                        onSend={handleSend}
                        loading={chatLoading}
                    />

                </ChatSidebar>

            </div>
        </div>
    );
}