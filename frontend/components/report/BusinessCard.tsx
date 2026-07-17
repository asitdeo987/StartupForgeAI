import { BusinessModel } from "@/types/report";

interface BusinessCardProps {
    business: BusinessModel;
}

export default function BusinessCard({
    business,
}: BusinessCardProps) {
    return (
        <div className="h-full rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-2xl font-semibold">
                💼 Business Model
            </h2>

            <div className="space-y-6">

                {/* Business Model */}

                <div>
                    <h3 className="font-semibold text-lg">
                        Business Model
                    </h3>

                    <p className="mt-2 text-gray-700 leading-7">
                        {business.business_model}
                    </p>
                </div>

                {/* Value Proposition */}

                <div>
                    <h3 className="font-semibold text-lg">
                        Value Proposition
                    </h3>

                    <p className="mt-2 text-gray-700 leading-7">
                        {business.value_proposition}
                    </p>
                </div>

                {/* Customer Segments */}

                <div>
                    <h3 className="font-semibold text-lg">
                        Customer Segments
                    </h3>

                    <ul className="mt-2 list-disc space-y-2 pl-5">
                        {business.customer_segments.map((segment, index) => (
                            <li key={index}>
                                {segment}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Pricing Strategy */}

                <div>
                    <h3 className="font-semibold text-lg">
                        Pricing Strategy
                    </h3>

                    <p className="mt-2 text-gray-700 leading-7">
                        {business.pricing_strategy}
                    </p>
                </div>

                {/* Revenue Streams */}

                <div>
                    <h3 className="font-semibold text-lg">
                        Revenue Streams
                    </h3>

                    <ul className="mt-2 list-disc space-y-2 pl-5">
                        {business.revenue_streams.map((stream, index) => (
                            <li key={index}>
                                {stream}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    );
}