import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { HttpClient} from "@angular/common/http";
import { Movie } from "../../models/movie.type";
import { MovieService } from "../../services/movie.service";
import { Show } from "../../models/show.type";
import { ShowService } from "../../services/show.service";
import { Person } from "../../models/person.type";
import { PersonService } from "../../services/person.service";
import * as _ from "lodash";

@Component({
    selector: "movie-page",
    templateUrl: "./movie-page.component.html"
})
export class MoviePageComponent implements OnInit {

    movies: Movie[];
    selectedMovie: Movie;

    pageSize: number;
    currentPage: number;
    lastPage: boolean;
    queryString: string;

    constructor(private movieService : MovieService) {
        this.pageSize = 10;
        this.currentPage = 1;
        this.queryString = "";
    }
    
    ngOnInit(): void {
        this.getMovies();
    }

    getMovies() {
        this.movieService.getMovies({
            pageSize: this.pageSize,
            page: this.currentPage,
            query: this.queryString
        })
        .subscribe(movies => {
            this.movies = movies;
            this.lastPage = movies.length < 10 ? true : false;
        });
    }
}