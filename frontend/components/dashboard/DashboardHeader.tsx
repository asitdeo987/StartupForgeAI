"use client";

import { useAuth } from "@/hooks/useAuth";

export default function DashboardHeader() {
    const { user } = useAuth();

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <section className="rounded-xl bg-white p-8 top-5 shadow-sm border">
            <h2 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name} 👋
            </h2>

            <p className="mt-2 text-gray-500">
                {today}
            </p>

            <p className="mt-6 text-lg text-gray-700">
                Lets build something amazing today.
            </p>
        </section>
    );
}