import { Roadmap } from "@/types/report";

interface RoadmapCardProps {
    roadmap: Roadmap;
}

export default function RoadmapCard({
    roadmap,
}: RoadmapCardProps) {

    const phases = [
        {
            title: "📋 Planning",
            items: roadmap.planning,
            color: "border-blue-500",
        },
        {
            title: "🛠 MVP Development",
            items: roadmap.mvp,
            color: "border-green-500",
        },
        {
            title: "🧪 Beta Testing",
            items: roadmap.beta,
            color: "border-yellow-500",
        },
        {
            title: "🚀 Launch",
            items: roadmap.launch,
            color: "border-purple-500",
        },
        {
            title: "📈 Scaling",
            items: roadmap.scaling,
            color: "border-red-500",
        },
    ];

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-8 text-2xl font-semibold">
                🗺 Product Roadmap
            </h2>

            <div className="space-y-6">

                {phases.map((phase, index) => (

                    <div
                        key={index}
                        className={`rounded-xl border-l-4 ${phase.color} border p-5`}
                    >

                        <h3 className="mb-4 text-lg font-semibold">
                            {phase.title}
                        </h3>

                        <ul className="list-disc space-y-2 pl-5">

                            {phase.items.map((item, i) => (

                                <li key={i}>
                                    {item}
                                </li>

                            ))}

                        </ul>

                    </div>

                ))}

            </div>

        </div>
    );
}