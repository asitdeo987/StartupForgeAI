export interface PitchSlide {
    title: string;
    content: string[];
}

export interface PitchDeck {
    id: number;
    title: string;
    pitch: {
        startup_name: string;
        tagline: string;
        slides: PitchSlide[];
    };
    created_at: string;
}