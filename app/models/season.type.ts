import { Episode } from "./episode.type";

export interface Season {
    number: number;
    ids: {
        trakt: number;
        tvdb: number;
        tmdb: number
        tvrage: number;
    }
    episodes: Episode[];
}
