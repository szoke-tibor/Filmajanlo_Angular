import { Component, OnInit } from "@angular/core";
import { Movie } from "../../models/movie.type";
import { MovieService } from "../../services/movie.service";
import { Person } from "../../models/person.type";
import { PersonService } from "../../services/person.service";
import { Router } from "@angular/router";
import { SaveMoviePageData } from "../../models/saveData.type";

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

    /* 
    *   Ez a függvény minden egyes MoviePageComponent példányosodása esetén meghívódik azonnal.
    *   Meghívja a getMovies() fv-t.
    */
    ngOnInit(): void {
        if (!this.loadFromLocalStorage()) {
            console.log("LOAD WITH GETTER");
            this.getMovies();
        }
    }

    /*
    *   A konstruktorban beállított paraméterek segítségével
    *   feltölti a movies tagváltozót aszinkron módon, majd a 
    *   betöltött filmek értékelését két tizedesjegy pontossággal kerekíti.
    *   Továbbá megvizsgálja, hogy kevesebb, mint 10 film érkezett-e.
    *   Ennek függvényében a lapozó gombot letiltó boolean értékét beállítja.
    *   
    */
    getMovies() {
        this.movieService.getMovies({
            pageSize: this.pageSize,
            page: this.currentPage,
            query: this.queryString
        })
        .subscribe(movies => {
            if (!movies)
                throw "Hiba történt az adatlekérdezés során.";
            this.movies = movies;
            this.ratingRounding(this.movies);
            this.lastPage = movies.length < 10 ? true : false;
        });
    }

    /*
    *   Szintén aszinkron módon, a subscribe segítségével
    *   feltölti a personService segítségével a kiválasztott
    *   filmhez tartozó színészek tömbjét
    *   Ha nem érkezett adat hibát dob.
    */
    getActors() {
        this.personService.getPeopleOfMovie(this.selectedMovie.ids.trakt)
        .subscribe(people => {
            if (!people)
                throw "Hiba történt az adatlekérdezés során.";
            this.selectedMovie.actors = [];
            people.cast.forEach(cast => this.selectedMovie.actors.push(cast.person));
        });
    }

    /*
    *   A böngészőben az actors/:id oldalra navigálja a felhasználót.
    */
    goActorPage() : void {
        this.router.navigate([`/actors/${this.selectedActor.ids.trakt}`]);
    }

    /*
    *   Aszinkron módon értéket ad a kapcsolódó filmek tömbjének
    *   majd kerekíti a filmek értékelését két tizedesjegy pontossággal
    *   Ha nem érkezett adat hibát dob.
    */
    getRelatedMovies() {
        this.movieService.getRelatedMovies(this.selectedMovie.ids.trakt)
        .subscribe(movies => {
            if (!movies)
                throw "Hiba történt az adatlekérdezés során.";
            this.relatedMovies = movies;
            this.ratingRounding(this.relatedMovies);
        });
    }

    /*
    *   Kerekítéshez használatos segédfüggvény, mely egy paraméterül
    *   kapott számot, a szintén paraméterül kapott pontossággal kerekíti.
    */
    numberRounder(number: number, punctuality: number) : number {
        var power = Math.pow(10, punctuality);
        return Math.ceil(number * power) / power;
    }

    /*
    *   Ennek a függvénynek a segítségével a paraméterül adott
    *   filmeket tartalmazó tömb elemeinek értékelését két tizedesjegyre kerekíthetjük.
    */
    ratingRounding(movies: Movie[]) {
        movies.forEach(movie => movie.rating = this.numberRounder(movie.rating, 2));
    }

    saveToLocalStorage() : void {
        localStorage.setItem("moviePage", JSON.stringify(<SaveMoviePageData>{
            movies: this.movies,
            selectedMovie: this.selectedMovie,
            relatedMovies: this.relatedMovies,
            toggleRelateMovies: this.toggleRelateMovies,
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            lastPage: this.lastPage,
            queryString: this.queryString
        }));
    }

    loadFromLocalStorage() : boolean {
        let data = JSON.parse(localStorage.getItem('moviePage'));
        if(!data)
            return false;

        this.movies = data.movies;
        this.selectedMovie = data.selectedMovie;
        this.relatedMovies = data.relatedMovies;
        this.toggleRelateMovies = data.toggleRelateMovies;
        this.pageSize = data.pageSize;
        this.currentPage = data.currentPage;
        this.lastPage = data.lastPage;
        this.queryString = data.queryString;
        
        console.log("LOAD FROM LOCALSTORAGE");
        localStorage.removeItem("moviePage");
        return true;
    }
}