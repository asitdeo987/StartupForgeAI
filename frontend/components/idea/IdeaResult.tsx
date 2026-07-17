import { IdeaResponse } from "@/types/idea";

interface Props {
    result: IdeaResponse;
}

export default function IdeaResult({
    result,
}: Props) {
    return (
        <div className="space-y-6">

            {/* Startup Name */}

            <div className="rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="text-3xl font-bold text-blue-600">
                    🚀 {result.startup_name}
                </h2>

                <p className="mt-3 text-gray-600 leading-7">
                    {result.elevator_pitch}
                </p>

            </div>

            {/* Two Column */}

            <div className="grid gap-5 md:grid-cols-2">

                <div className="rounded-xl border bg-white p-5 shadow-sm">

                    <h3 className="mb-3 text-lg font-semibold">
                        Problem Statement
                    </h3>

                    <p className="text-gray-600 leading-7">
                        {result.problem_statement}
                    </p>

                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm">

                    <h3 className="mb-3 text-lg font-semibold">
                        Proposed Solution
                    </h3>

                    <p className="text-gray-600 leading-7">
                        {result.solution}
                    </p>

                </div>

            </div>

            {/* Audience + Model */}

            <div className="grid gap-5 md:grid-cols-2">

                <div className="rounded-xl border bg-white p-5 shadow-sm">

                    <h3 className="mb-3 text-lg font-semibold">
                        Target Audience
                    </h3>

                    <p className="text-gray-600">
                        {result.target_audience}
                    </p>

                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm">

                    <h3 className="mb-3 text-lg font-semibold">
                        Business Model
                    </h3>

                    <p className="text-gray-600">
                        {result.business_model}
                    </p>

                </div>

            </div>

            {/* Features */}

            <div className="rounded-xl border bg-white p-5 shadow-sm">

                <h3 className="mb-4 text-lg font-semibold">
                    MVP Features
                </h3>

                <div className="flex flex-wrap gap-3">

                    {result.mvp_features.map((feature) => (
                        <span
                            key={feature}
                            className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                        >
                            {feature}
                        </span>
                    ))}

                </div>

            </div>

        </div>
    );
}