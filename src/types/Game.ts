

export interface Platform {
    id?: number;
    slug?: string;
    name?: string;
}

interface Genre {
    id: number;
    name: string;
}

type PlatfromTypeProps = {
    platform: Platform
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
    ratings?: string[];
    ratings_count?: number;
    metacritic?: number;
    playtime?: number;
    suggestions_count?: number;
    updated?: string;
    platforms?: PlatfromTypeProps[];
    genres?: Genre[];
}


export interface ApiResponse {
    count: number;
    results: Game[];
}