import { PitchSlide as PitchSlideType } from "@/types/pitch";

interface Props {
    slide: PitchSlideType;
    index: number;
}

export default function PitchSlide({
    slide,
    index,
}: Props) {
    return (
        <div className="rounded-xl border bg-white p-8 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold">
                    {slide.title}
                </h2>

                <span className="rounded bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    Slide {index + 1}
                </span>

            </div>

            <ul className="space-y-3">

                {slide.content.map((item, i) => (
                    <li
                        key={i}
                        className="flex gap-3"
                    >
                        <span>•</span>

                        <span>{item}</span>

                    </li>
                ))}

            </ul>

        </div>
    );
}