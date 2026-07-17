interface DashboardCardProps {
    title: string;
    value: number;
    description: string;
}

export default function DashboardCard({
    title,
    value,
    description,
}: DashboardCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800">
                {title}
            </h3>

            <p className="mt-4 text-4xl font-bold text-blue-600">
                {value}
            </p>

            <p className="mt-2 text-sm text-gray-500">
                {description}
            </p>
        </div>
    );
}