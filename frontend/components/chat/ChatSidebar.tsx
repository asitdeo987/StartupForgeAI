"use client";

interface Props {

    children: React.ReactNode;

}

export default function ChatSidebar({

    children,

}: Props) {

    return (

        <div className="flex h-[750px] flex-col overflow-hidden rounded-2xl border bg-gray-50 shadow-xl">

            <div className="border-b bg-white p-5">

                <h2 className="text-xl font-bold">

                    🤖 AI Startup Mentor

                </h2>

                <p className="text-sm text-gray-500">

                    Ask anything about your startup report

                </p>

            </div>

            {children}

        </div>

    );

}