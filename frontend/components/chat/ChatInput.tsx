"use client";

import { useState } from "react";

interface Props {
    onSend: (message: string) => void;
    loading: boolean;
}

export default function ChatInput({
    onSend,
    loading,
}: Props) {

    const [message, setMessage] = useState("");

    function handleSend() {

        if (!message.trim()) return;

        onSend(message);

        setMessage("");
    }

    return (

        <div className="flex gap-3 border-t p-4">

            <input
                value={message}
                disabled={loading}
                onChange={(e) =>
                    setMessage(e.target.value)
                }
                placeholder="Ask about pricing, competitors, roadmap..."
                className="flex-1 rounded-xl border bg-white p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                onKeyDown={(e) => {

                    if (
                        e.key === "Enter" &&
                        !loading
                    ) {
                        handleSend();
                    }

                }}
            />

            <button
                disabled={loading}
                onClick={handleSend}
                className="rounded-lg bg-blue-600 px-5 text-white disabled:opacity-50"
            >
                {loading ? "Thinking..." : "Send"}
            </button>

        </div>

    );
}