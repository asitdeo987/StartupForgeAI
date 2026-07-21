"use client";

import { useEffect, useRef } from "react";
import { ChatMessage as Message } from "@/types/chat";
import ChatMessage from "./ChatMessage";

interface Props {
    messages: Message[];
    loading?: boolean;
}

export default function ChatBox({
    messages,
    loading,
}: Props) {

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    return (
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

            {messages.length === 0 && !loading && (

                <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">

                    <h3 className="text-lg font-semibold">

                        👋 Ask your startup mentor anything

                    </h3>

                    <p className="mt-2">

                        Examples:

                    </p>

                    <ul className="mt-4 space-y-2 text-sm">

                        <li>• Improve my pricing strategy</li>

                        <li>• Who are my competitors?</li>

                        <li>• How do I acquire customers?</li>

                        <li>• Suggest a better revenue model</li>

                    </ul>

                </div>

            )}

            {messages.map((message) => (

                <ChatMessage
                    key={message.id}
                    message={message}
                />

            ))}

            {loading && (

                <div className="flex justify-start">

                    <div className="flex items-center gap-2">

                        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></div>

                        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 delay-100"></div>

                        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 delay-200"></div>

                    </div>

                </div>

            )}

            <div ref={bottomRef} />

        </div>
    );
}