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
import { Cast } from "../../models/cast.type";
import { People } from "../../models/people.type";
import { Router } from "@angular/router";

@Component({
    selector: "movie-page",
    templateUrl: "./movie-page.component.html"
})
export class MoviePageComponent implements OnInit {

    movies: Movie[];
    selectedMovie: Movie;
    selectedActor: Person;
    relatedMovies: Movie[];
    toggleRelateMovies: boolean;

    pageSize: number;
    currentPage: number;
    lastPage: boolean;
    queryString: string;

    constructor(private movieService : MovieService,
                private personService: PersonService,
                private router: Router) {
        this.pageSize = 10;
        this.currentPage = 1;
        this.queryString = "";
        this.toggleRelateMovies = false;
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

    getActors() {
        this.personService.getPeopleOfMovie(this.selectedMovie.ids.trakt)
        .subscribe(people => {
            this.selectedMovie.actors = [];
            people.cast.forEach(cast => this.selectedMovie.actors.push(cast.person));
        });
    }

    goActorPage() : void {
        this.router.navigate([`/actors/${this.selectedActor.ids.trakt}`]);
    }

    
    getRelatedMovies() {
        this.movieService.getRelatedMovies(this.selectedMovie.ids.trakt)
        .subscribe(movies => {
            this.relatedMovies = movies;
        });
    }
}