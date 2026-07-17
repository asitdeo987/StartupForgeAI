"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

import Navbar from "@/components/dashboard/Navbar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

export default function DashboardPage() {
    const router = useRouter();

    const {
        loading,
        isAuthenticated,
    } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [loading, isAuthenticated, router]);

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
                        title="Startup Ideas"
                        value={0}
                        description="AI generated startup ideas"
                    />

                    <DashboardCard
                        title="Business Plans"
                        value={0}
                        description="Generated business plans"
                    />

                    <DashboardCard
                        title="Technical Architectures"
                        value={0}
                        description="System designs created"
                    />

                    <DashboardCard
                        title="Roadmaps"
                        value={0}
                        description="Project roadmaps generated"
                    />

                </section>

            </main>
        </div>
    );
}