import { Movie } from "./movie.type";

export interface SaveMoviePageData {
    movies: Movie[];
    selectedMovie: Movie;
    relatedMovies: Movie[];
    toggleRelateMovies: boolean;
    pageSize: number;
    currentPage: number;
    lastPage: boolean;
    queryString: string;
}