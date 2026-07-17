"use client";

import { StartupReport } from "@/types/report";
import ReportCard from "./ReportCard";
import MarketCard from "./MarketCard";
import CompetitorCard from "./CompetitorCard";
import SWOTCard from "./SWOTCard";
import BusinessCard from "./BusinessCard";
import TechnologyCard from "./TechnologyCard";
import RoadmapCard from "./RoadmapCard";

interface DashboardProps {
    report: StartupReport;
}

export default function Dashboard({
    report,
}: DashboardProps) {

    return (

        <div className="max-w-screen-2xl mx-auto px-10 py-8">
            <h1 className="text-5xl font-bold mb-3">
                AI Startup Report
            </h1>

            <p className="text-gray-600 mb-10">
                Your startup has been analyzed using multiple AI
                agents.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <MarketCard market={report.market} />

                <CompetitorCard competitors={report.competitors} />

                <SWOTCard swot={report.swot} />

                <BusinessCard business={report.business} />

                <TechnologyCard technology={report.technology} />

                <RoadmapCard roadmap={report.roadmap} />
            </div>

        </div>

    );

}