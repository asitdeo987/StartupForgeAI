"use client";

import { ReportHistoryItem } from "@/types/history";

interface ReportCardProps {
    report: ReportHistoryItem;
    onOpen: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function ReportCard({
    report,
    onOpen,
    onDelete,
}: ReportCardProps) {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">

            <div className="space-y-2">

                <h2 className="text-xl font-bold">
                    {report.title}
                </h2>

                <p className="text-gray-600">
                    {report.industry}
                </p>

                <p className="text-gray-500">
                    Target Audience:
                    {" "}
                    {report.target_audience}
                </p>

                <p className="text-sm text-gray-400">
                    Created:
                    {" "}
                    {new Date(report.created_at).toLocaleDateString()}
                </p>

            </div>

            <div className="mt-6 flex gap-3">

                <button
                    onClick={() => onOpen(report.id)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                    Open
                </button>

                <button
                    onClick={() => onDelete(report.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                >
                    Delete
                </button>

            </div>

        </div>
    );
}