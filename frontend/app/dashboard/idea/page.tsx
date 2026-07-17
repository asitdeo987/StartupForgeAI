"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import IdeaForm from "@/components/idea/IdeaForm";
import IdeaResult from "@/components/idea/IdeaResult";
import { IdeaResponse } from "@/types/idea";

export default function IdeaPage() {
    const router = useRouter();

    const [result, setResult] =
        useState<IdeaResponse | null>(null);

    return (
        <main className="min-h-screen bg-gray-100">

            <div className="mx-auto max-w-screen-2xl p-10">

                <button
                    onClick={() => router.push("/dashboard")}
                    className="mb-8 rounded-lg border bg-white px-4 py-2"
                >
                    ← Back
                </button>

                <h1 className="mb-3 text-5xl font-extrabold tracking-tight">
                    Startup Idea Refinement
                </h1>

                <p className="mb-10 max-w-2xl text-lg text-gray-600">
                    Turn your idea into a structured startup plan.
                </p>

                <div className="grid gap-10 xl:grid-cols-2">

                    <IdeaForm
                        onSuccess={setResult}
                    />

                    {result && (
                        <IdeaResult
                            result={result}
                        />
                    )}

                </div>

            </div>

        </main>
    );
}