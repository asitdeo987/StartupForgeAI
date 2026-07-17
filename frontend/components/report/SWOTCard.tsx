import { SWOT } from "@/types/report";

interface SWOTCardProps {
    swot: SWOT;
}

export default function SWOTCard({
    swot,
}: SWOTCardProps) {
    return (
        <div className="h-full rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">
                📊 SWOT Analysis
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

                {/* Strengths */}
                <div className="rounded-lg border bg-green-50 p-4">
                    <h3 className="mb-3 text-lg font-semibold text-green-700">
                        💪 Strengths
                    </h3>

                    <ul className="list-disc space-y-2 pl-5">
                        {swot.strengths.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Weaknesses */}
                <div className="rounded-lg border bg-red-50 p-4">
                    <h3 className="mb-3 text-lg font-semibold text-red-700">
                        ⚠️ Weaknesses
                    </h3>

                    <ul className="list-disc space-y-2 pl-5">
                        {swot.weaknesses.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Opportunities */}
                <div className="rounded-lg border bg-blue-50 p-4">
                    <h3 className="mb-3 text-lg font-semibold text-blue-700">
                        🚀 Opportunities
                    </h3>

                    <ul className="list-disc space-y-2 pl-5">
                        {swot.opportunities.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Threats */}
                <div className="rounded-lg border bg-yellow-50 p-4">
                    <h3 className="mb-3 text-lg font-semibold text-yellow-700">
                        🛡️ Threats
                    </h3>

                    <ul className="list-disc space-y-2 pl-5">
                        {swot.threats.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}