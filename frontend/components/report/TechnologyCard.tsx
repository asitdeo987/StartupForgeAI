import { Technology } from "@/types/report";

interface TechnologyCardProps {
    technology: Technology;
}

export default function TechnologyCard({
    technology,
}: TechnologyCardProps) {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-2xl font-semibold">
                ⚙️ Technology Stack
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

                <div className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-2">
                        🎨 Frontend
                    </h3>

                    <p>{technology.frontend}</p>
                </div>

                <div className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-2">
                        🖥 Backend
                    </h3>

                    <p>{technology.backend}</p>
                </div>

                <div className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-2">
                        🗄 Database
                    </h3>

                    <p>{technology.database}</p>
                </div>

                <div className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-2">
                        ☁️ Cloud
                    </h3>

                    <p>{technology.cloud}</p>
                </div>

                <div className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-2">
                        🔐 Authentication
                    </h3>

                    <p>{technology.authentication}</p>
                </div>

                <div className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-2">
                        🤖 AI Stack
                    </h3>

                    <p>{technology.ai_stack}</p>
                </div>

                <div className="rounded-lg border p-4 md:col-span-2">
                    <h3 className="font-semibold mb-2">
                        🚀 DevOps
                    </h3>

                    <p>{technology.devops}</p>
                </div>

            </div>

            <div className="mt-8">

                <h3 className="mb-3 text-lg font-semibold">
                    🔌 Integrations
                </h3>

                <div className="flex flex-wrap gap-2">

                    {technology.integrations.map((item, index) => (

                        <span
                            key={index}
                            className="rounded-full bg-blue-100 px-4 py-2 text-sm"
                        >
                            {item}
                        </span>

                    ))}

                </div>

            </div>

        </div>
    );
}