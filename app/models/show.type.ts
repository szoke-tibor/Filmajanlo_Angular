import { Person } from "./person.type";

export interface Show {
    title: string;
    year: number;
    ids: {
      trakt: number;
      slug: string;
      tvdb: number;
      imdb: string;
      tmdb: number;
      tvrage: number;
    }
    rating: number;
    runtime: number;
    trailer: string;
    language: string;
    genres: string[];
    overview: string;
    actors: Person[];
}
