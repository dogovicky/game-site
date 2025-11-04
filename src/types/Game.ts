

export interface Platform {
    id?: number;
    slug?: string;
    name?: string;
}

export interface PlatformWrapper {
    platform: Platform;
    released_at?: string;
    requirements?: {
        minimum?: string;
        recommended?: string;
    };
}

export interface ParentPlatform {
    platform: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
    image_background?: string;
}


export interface Game {
    id: number;
    slug?: string;
    name: string;
    released?: string;
    tba?: boolean;
    background_image: string;
    rating?: number;
    rating_top?: number;
    ratings?: any[];
    ratings_count?: number;
    metacritic?: number;
    playtime?: number;
    suggestions_count?: number;
    updated?: string;
    platforms?: PlatformWrapper[];
    parent_platforms?: ParentPlatform[]; // This is what you want to use!
    genres?: Genre[];
}


export interface ApiResponse {
    count: number;
    results: Game[];
}