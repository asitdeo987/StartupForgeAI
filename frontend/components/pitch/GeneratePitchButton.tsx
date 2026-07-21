"use client";

interface GeneratePitchButtonProps {
    loading: boolean;
    onGenerate: () => void;
}

export default function GeneratePitchButton({
    loading,
    onGenerate,
}: GeneratePitchButtonProps) {
    return (
        <button
            onClick={onGenerate}
            disabled={loading}
            className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50"
        >
            {loading
                ? "Generating Pitch Deck..."
                : "Generate Pitch Deck"}
        </button>
    );
}