"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var movie_service_1 = require("../../services/movie.service");
var person_service_1 = require("../../services/person.service");
var router_1 = require("@angular/router");
var MoviePageComponent = (function () {
    function MoviePageComponent(movieService, personService, router) {
        this.movieService = movieService;
        this.personService = personService;
        this.router = router;
        this.pageSize = 10;
        this.currentPage = 1;
        this.queryString = "";
    }
    MoviePageComponent.prototype.ngOnInit = function () {
        this.getMovies();
    };
    MoviePageComponent.prototype.getMovies = function () {
        var _this = this;
        this.movieService.getMovies({
            pageSize: this.pageSize,
            page: this.currentPage,
            query: this.queryString
        })
            .subscribe(function (movies) {
            _this.movies = movies;
            _this.lastPage = movies.length < 10 ? true : false;
        });
    };
    MoviePageComponent.prototype.getActors = function () {
        var _this = this;
        this.personService.getPeopleOfMovie(this.selectedMovie.ids.trakt)
            .subscribe(function (people) {
            _this.selectedMovie.actors = [];
            people.cast.forEach(function (cast) { return _this.selectedMovie.actors.push(cast.person); });
        });
    };
    MoviePageComponent.prototype.goActorPage = function () {
        this.router.navigate(["/actors/" + this.selectedActor.ids.trakt]);
    };
    return MoviePageComponent;
}());
MoviePageComponent = __decorate([
    core_1.Component({
        selector: "movie-page",
        templateUrl: "./movie-page.component.html"
    }),
    __metadata("design:paramtypes", [movie_service_1.MovieService,
        person_service_1.PersonService,
        router_1.Router])
], MoviePageComponent);
exports.MoviePageComponent = MoviePageComponent;
//# sourceMappingURL=movie-page.component.js.map