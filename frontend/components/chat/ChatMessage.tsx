"use client";

import { ChatMessage as Message } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface Props {
    message: Message;
}

export default function ChatMessage({
    message,
}: Props) {

    const isUser = message.role === "user";

    async function copyMessage() {

        await navigator.clipboard.writeText(
            message.message
        );

        toast.success("Copied!");
    }

    return (

        <div
            className={`flex gap-3 ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            {!isUser && (

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">

                    AI

                </div>

            )}

            <div
                className={`max-w-[75%] rounded-2xl p-4 shadow ${
                    isUser
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                }`}
            >

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                >
                    {message.message}
                </ReactMarkdown>

                <div className="mt-3 flex items-center justify-between">

                    <span className="text-xs opacity-60">

                        {new Date(
                            message.created_at
                        ).toLocaleTimeString()}

                    </span>

                    {!isUser && (

                        <button
                            onClick={copyMessage}
                            className="rounded p-1 hover:bg-gray-100"
                        >

                            <Copy size={16} />

                        </button>

                    )}

                </div>

            </div>

            {isUser && (

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white">

                    You

                </div>

            )}

        </div>

    );

}