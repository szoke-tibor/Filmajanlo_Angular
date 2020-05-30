export interface Movie {
    title: string;
    year: number;
    ids: {
      trakt: number;
      slug: string;
      imdb: string;
      tmdb: number;
    }
    rating: number;
    trailer: string;
    language: string;
    genres: string[];
    overview: string;
}
