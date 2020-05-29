export interface Person {
    name: string;
    ids: {
        trakt: number;
        slug: string;
        imdb: string;
        tmdb: number;
    }
}