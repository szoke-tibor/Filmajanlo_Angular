import { Person } from "./person.type";
import { Movie } from "./movie.type";

export interface Cast {
    characters: string[];
    person: Person;
    movie: Movie;
}