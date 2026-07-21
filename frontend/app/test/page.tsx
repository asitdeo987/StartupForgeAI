"use client";
import ReportCard from "@/components/history/ReportCard";

export default function TestPage() {

    const report = {
        id: 1,
        title: "StartupForgeAI",
        industry: "Technology",
        target_audience: "Students",
        created_at: new Date().toISOString(),
    };

    return (
        <div className="mx-auto mt-10 max-w-xl">
            <ReportCard
                report={report}
                onOpen={(id) => console.log(id)}
                onDelete={(id) => console.log(id)}
            />
        </div>
    );
}