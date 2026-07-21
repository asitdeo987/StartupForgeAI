"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {deleteReport,getReport,getReports,searchReports} from "@/services/report-history.service";
import { ReportHistoryItem } from "@/types/history";
import ReportCard from "./ReportCard";


interface ReportHistoryProps {
    search: string;
}
export default function ReportHistory({ search }: ReportHistoryProps) {

    const router = useRouter();

    const [reports, setReports] = useState<ReportHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadReports() {

        try {

            const token = localStorage.getItem("token") || "";

            const data = await getReports(token);

            setReports(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    }

    useEffect(() => {

        const timer = setTimeout(async () => {
            try {
                const token =
                localStorage.getItem("token") || "";
                if (search.trim() === "") {
                    await loadReports();
                    return;
                }

                const data = await searchReports(
                    search,
                    token,
                );
                setReports(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    async function handleOpen(id: number) {

        try {

            const token = localStorage.getItem("token") || "";

            await getReport(id, token);

            router.push(`/dashboard/history/${id}`);

        } catch (error) {

            console.error(error);

        }
    }

    async function handleDelete(id: number) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this report?"
        );

        if (!confirmed) return;

        try {

            const token = localStorage.getItem("token") || "";

            await deleteReport(id, token);

            setReports((prev) =>
                prev.filter((report) => report.id !== id)
            );

        } catch (error) {

            console.error(error);

        }
    }

    if (loading) {
        return (
            <div className="py-10 text-center">
                Loading reports...
            </div>
        );
    }

    if (reports.length === 0) {

        return (
            <div className="rounded-xl border bg-white p-10 text-center">

                <h2 className="text-2xl font-bold">
                    No Reports Found
                </h2>

                <p className="mt-3 text-gray-500">
                    Generate your first AI startup report.
                </p>

            </div>
        );
    }

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {reports.map((report) => (

                <ReportCard
                    key={report.id}
                    report={report}
                    onOpen={handleOpen}
                    onDelete={handleDelete}
                />

            ))}

        </div>

    );
}