"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/dashboard/Navbar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { getDashboardStats } from "@/services/report-history.service";

interface DashboardStats {
    total_reports?: number;
    total_chats?:number;
    top_industry?:string;
    latest_report?:string
}

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats | null>(null);

    const {
        loading,
        isAuthenticated,
    } = useAuth();

    useEffect(() => {
    if (!isAuthenticated) return;
    async function loadStats() {
        try {
            const token = localStorage.getItem("token") || "";
            const data = await getDashboardStats(token);
            setStats(data);
        } catch (error) {
            console.error(error);
        }
    }
    loadStats();
}, [isAuthenticated]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-xl font-semibold">
                    Loading...
                </h1>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="mx-auto max-w-7xl p-6">

                <DashboardHeader />

                <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <DashboardCard
                        title="Reports"
                        value={stats?.total_reports ?? 0}
                        description="AI generated startup ideas"
                    />

                    <DashboardCard
                        title="AI Chats"
                        value={stats?.total_chats ?? 0}
                        description="Generated business plans"
                    />

                    <DashboardCard
                        title="Top Industry"
                        value={stats?.top_industry ?? "-"}
                        description="System designs created"
                    />

                    <DashboardCard
                        title="Latest Report"
                        value={
                            stats?.latest_report
                            ? new Date(stats.latest_report).toLocaleDateString()
                            : "-"
                        }
                        description="Project roadmaps generated"
                    />

                </section>

            </main>
        </div>
    );
}