import { People } from "./people.type";
import { Cast } from "./cast.type";
import { Person } from "./person.type";

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
    actors: Person[];
}
