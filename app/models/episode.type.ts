export interface Episode {
    season: number;
    number: number;
    title: string;
    ids: {
        trakt: number;
        tvdb: number;
        imdb: number;
        tmdb: number;
        tvrage: number;
    }
}
