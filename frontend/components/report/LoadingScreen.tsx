"use client";

import { useEffect, useState } from "react";

const messages = [

    "🧠 Reading your startup idea...",
    "🔍 Analyzing market trends...",
    "📊 Estimating market size...",
    "🏢 Searching competitors...",
    "💡 Identifying market opportunities...",
    "💰 Creating business model...",
    "⚙️ Designing software architecture...",
    "🤖 Choosing AI technologies...",
    "📅 Preparing development roadmap...",
    "✨ Almost finished..."
];

export default function LoadingScreen() {

    const [step, setStep] = useState(0);

    useEffect(() => {

        const timer = setInterval(() => {

            setStep((prev) => {

                if (prev === messages.length - 1)
                    return prev;

                return prev + 1;

            });

        }, 1800);

        return () => clearInterval(timer);

    }, []);

    return (

        <div className="fixed inset-0 bg-gray-500 flex flex-col items-center justify-center">

            <h1 className="text-4xl font-bold mb-8">
                StartupForge AI
            </h1>

            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-black mb-10" />
            <div className="w-96 h-2 bg-gray-200 rounded-full mt-8 overflow-hidden">

                <div
                    className="h-full bg-black transition-all duration-1000"
                    style={{
                        width: `${((step + 1) / messages.length) * 100}%`
                    }}
                />

            </div>
            <p className="text-xl font-medium text-red-600">

                {messages[step]}

            </p>

        </div>

    );

}