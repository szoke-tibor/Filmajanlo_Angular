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
var show_service_1 = require("../../services/show.service");
var person_service_1 = require("../../services/person.service");
var router_1 = require("@angular/router");
var ShowPageComponent = (function () {
    function ShowPageComponent(showService, personService, router) {
        this.showService = showService;
        this.personService = personService;
        this.router = router;
        this.pageSize = 10;
        this.currentPage = 1;
        this.queryString = "";
    }
    /*
    *   Ez a függvény minden egyes ShowPageComponent példányosodása esetén meghívódik azonnal.
    *   Meghívja a getShows() fv-t.
    */
    ShowPageComponent.prototype.ngOnInit = function () {
        if (!this.loadFromLocalStorage()) {
            console.log("LOAD WITH GETTER");
            this.getShows();
        }
    };
    /*
    *   A konstruktorban beállított paraméterek segítségével
    *   feltölti a shows tagváltozót aszinkron módon.
    *   Továbbá megvizsgálja, hogy kevesebb, mint 10 sorozat érkezett-e.
    *   Ennek függvényében a lapozó gombot letiltó boolean értékét beállítja.
    */
    ShowPageComponent.prototype.getShows = function () {
        var _this = this;
        this.showService.getShows({
            pageSize: this.pageSize,
            page: this.currentPage,
            query: this.queryString
        })
            .subscribe(function (shows) {
            if (!shows)
                throw "Hiba történt az adatlekérdezés során.";
            _this.shows = shows;
            _this.lastPage = shows.length < 10 ? true : false;
        });
    };
    /*
    *   Szintén aszinkron módon, a subscribe segítségével
    *   feltölti a personService segítségével a kiválasztott
    *   sorozathoz tartozó színészek tömbjét
    *   Ha nem érkezett adat hibát dob.
    */
    ShowPageComponent.prototype.getActors = function () {
        var _this = this;
        this.personService.getPeopleOfShow(this.selectedShow.ids.trakt)
            .subscribe(function (people) {
            if (!people)
                throw "Hiba történt az adatlekérdezés során.";
            _this.selectedShow.actors = [];
            people.cast.forEach(function (cast) { return _this.selectedShow.actors.push(cast.person); });
        });
    };
    /*
    *   A böngészőben az actors/:id oldalra navigálja a felhasználót.
    */
    ShowPageComponent.prototype.goActorPage = function () {
        this.router.navigate(["/actors/" + this.selectedActor.ids.trakt]);
    };
    /*
    *   Aszinkron módon a showService segítségével beállítja a
    *   kiválasztott sorozathoz tartozó az epizódokat tartalmazó évadokat.
    *   Ha nem érkezett adat hibát dob.
    */
    ShowPageComponent.prototype.getEpisodesForShow = function () {
        var _this = this;
        this.showService.getEpisodesForShow(this.selectedShow.ids.trakt)
            .subscribe(function (seasons) {
            if (!seasons)
                throw "Hiba történt az adatlekérdezés során.";
            _this.seasons = seasons;
        });
    };
    ShowPageComponent.prototype.saveToLocalStorage = function () {
        localStorage.setItem("showPage", JSON.stringify({
            shows: this.shows,
            selectedShow: this.selectedShow,
            seasons: this.seasons,
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            lastPage: this.lastPage,
            queryString: this.queryString
        }));
    };
    ShowPageComponent.prototype.loadFromLocalStorage = function () {
        var data = JSON.parse(localStorage.getItem('showPage'));
        if (!data)
            return false;
        this.shows = data.shows;
        this.selectedShow = data.selectedShow;
        this.seasons = data.seasons;
        this.pageSize = data.pageSize;
        this.currentPage = data.currentPage;
        this.lastPage = data.lastPage;
        this.queryString = data.queryString;
        console.log("LOAD FROM LOCALSTORAGE");
        localStorage.removeItem("showPage");
        return true;
    };
    return ShowPageComponent;
}());
ShowPageComponent = __decorate([
    core_1.Component({
        selector: "show-page",
        templateUrl: "./show-page.component.html"
    }),
    __metadata("design:paramtypes", [show_service_1.ShowService,
        person_service_1.PersonService,
        router_1.Router])
], ShowPageComponent);
exports.ShowPageComponent = ShowPageComponent;
//# sourceMappingURL=show-page.component.js.map