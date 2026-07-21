"use client";

import { PitchDeck } from "@/types/pitch";

import PitchSlide from "./PitchSlide";
import { downloadPitchPPT } from "@/services/pitch.service";

interface Props {
    pitch: PitchDeck;
    reportId: number;
}

export default function PitchViewer({
    pitch,
    reportId,
}: Props) {

    async function handleDownload() {

        try {

            const token =
                localStorage.getItem("token") || "";
            const blob = await downloadPitchPPT(
                reportId,
                token
            );

            const url = window.URL.createObjectURL(blob);
            const link =
                document.createElement("a");

            link.href = url;
            link.download =
                `${pitch.title}_Pitch_Deck.pptx`;

            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            alert("Failed to download PowerPoint.");
        }
    }
    return (
        <section className="mt-10 space-y-8">

            <div className="rounded-xl bg-linear-to-r from-purple-600 to-blue-600 p-10 text-white">

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">
                            {pitch.pitch.startup_name}
                        </h1>
                        <p className="mt-3 text-xl">
                            {pitch.pitch.tagline}
                        </p>

                    </div>
                    <button
                        onClick={handleDownload}
                        className="rounded-lg bg-white px-5 py-3 font-semibold text-purple-700 transition hover:bg-gray-100"
                    >
                        Download PPT
                    </button>

                </div>
            </div>

            {pitch.pitch.slides.map(
                (slide, index) => (
                    <PitchSlide
                        key={index}
                        slide={slide}
                        index={index}
                    />
                )
            )}

        </section>
    );
}