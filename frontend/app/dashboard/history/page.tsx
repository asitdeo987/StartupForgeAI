"use client";

import ReportHistory from "@/components/history/ReportHistory";
import { useState } from "react";

export default function HistoryPage() {
    const [search, setSearch] = useState("");

    return (
        <main className="mx-auto max-w-7xl p-8">

            <h1 className="mb-8 text-3xl font-bold">
                Report History
            </h1>
            <div className="mb-6">

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search reports..."
                    className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            <ReportHistory search={search}/>

        </main>
    );
}