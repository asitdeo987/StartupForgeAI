import { MarketAnalysis } from "@/types/report";

interface MarketCardProps {
    market: MarketAnalysis;
}
export default function MarketCard({
    market,
}: MarketCardProps) {
    return (
        <div className="h-full rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-semibold">
                📈 Market Analysis
            </h2>

            <div className="space-y-6">

                <div>
                    <h3 className="font-semibold">
                        Market Size
                    </h3>

                    <p className="text-gray-600">
                        {market.market_size}
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold">
                        Target Customers
                    </h3>

                    <ul className="mt-2 list-disc pl-5 space-y-1">
                        {market.target_customers.map((customer, index) => (
                            <li key={index}>
                                {customer}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold">
                        Customer Pain Points
                    </h3>

                    <ul className="mt-2 list-disc pl-5 space-y-1">
                        {market.customer_pain_points.map((pain, index) => (
                            <li key={index}>
                                {pain}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold">
                        Market Trends
                    </h3>

                    <ul className="mt-2 list-disc pl-5 space-y-1">
                        {market.market_trends.map((trend, index) => (
                            <li key={index}>
                                {trend}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}