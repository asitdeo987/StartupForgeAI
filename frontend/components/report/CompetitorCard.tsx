import { Competitors } from "@/types/report";

interface CompetitorCardProps {
    competitors: Competitors;
}

export default function CompetitorCard({
    competitors,
}: CompetitorCardProps) {
    return (
        <div className="h-full rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">
                🏢 Competitor Analysis
            </h2>

            <div className="space-y-6">

                {/* Top Competitors */}
                <div>
                    <h3 className="mb-2 text-lg font-semibold">
                        Top Competitors
                    </h3>

                    <div className="space-y-3">
                        {competitors.top_competitors.map((competitor, index) => (
                            <div
                                key={index}
                                className="rounded-lg border p-4"
                            >
                                <h4 className="font-semibold">
                                    {competitor.name}
                                </h4>

                                <p className="mt-2 text-sm text-gray-600">
                                    {competitor.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Advantages */}
                <div>
                    <h3 className="mb-2 text-lg font-semibold">
                        Advantages
                    </h3>

                    <ul className="list-disc space-y-1 pl-5">
                        {competitors.advantages.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Disadvantages */}
                <div>
                    <h3 className="mb-2 text-lg font-semibold">
                        Disadvantages
                    </h3>

                    <ul className="list-disc space-y-1 pl-5">
                        {competitors.disadvantages.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Market Gap */}
                <div>
                    <h3 className="mb-2 text-lg font-semibold">
                        Market Gap
                    </h3>

                    <p className="leading-7 text-gray-700">
                        {competitors.market_gap}
                    </p>
                </div>

            </div>
        </div>
    );
}