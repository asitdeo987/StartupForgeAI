"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { StartupReport } from "@/types/report";
import { ideaSchema, IdeaFormData } from "@/lib/validators";
import { generateReport } from "@/services/report.service";
import Dashboard from "@/components/report/Dashboard";
import LoadingScreen from "@/components/report/LoadingScreen";

export default function IdeaForm() {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<StartupReport | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IdeaFormData>({
        resolver: zodResolver(ideaSchema),
    });

    const onSubmit = async (data: IdeaFormData) => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token") || "";

            const response = await generateReport(data, token);
            console.log(response);
            setReport(response.report);

            toast.success("Startup report generated successfully!");

            reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate startup report.");
        } finally {
            setLoading(false);
        }
    };

    // Show full screen loading
    if (loading) {
        return <LoadingScreen />;
    }

    // Show dashboard after report generation
    if (report) {
        return <Dashboard report={report} />;
    }

    return (
        <div className="rounded-xl border bg-white p-8 shadow-sm">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div>
                    <label className="mb-2 block font-medium">
                        Startup Title
                    </label>

                    <input
                        type="text"
                        placeholder="Example: AI Fitness Coach"
                        {...register("title")}
                        className="w-full rounded-lg border p-3"
                    />

                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Industry
                    </label>

                    <select
                        {...register("industry")}
                        className="w-full rounded-lg border p-3"
                    >
                        <option value="">Select Industry</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Finance">Finance</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Travel">Travel</option>
                        <option value="Food">Food</option>
                        <option value="Technology">Technology</option>
                    </select>

                    {errors.industry && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.industry.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Target Audience
                    </label>

                    <input
                        type="text"
                        placeholder="College Students"
                        {...register("targetAudience")}
                        className="w-full rounded-lg border p-3"
                    />

                    {errors.targetAudience && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.targetAudience.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Describe Your Startup Idea
                    </label>

                    <textarea
                        rows={6}
                        placeholder="Explain your startup idea..."
                        {...register("description")}
                        className="w-full rounded-lg border p-3"
                    />

                    {errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Generate AI Startup Plan
                </button>
            </form>
        </div>
    );
}