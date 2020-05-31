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
    ShowPageComponent.prototype.ngOnInit = function () {
        this.getShows();
    };
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
    ShowPageComponent.prototype.goActorPage = function () {
        this.router.navigate(["/actors/" + this.selectedActor.ids.trakt]);
    };
    ShowPageComponent.prototype.getEpisodesForShow = function () {
        var _this = this;
        this.showService.getEpisodesForShow(this.selectedShow.ids.trakt)
            .subscribe(function (seasons) {
            if (!seasons)
                throw "Hiba történt az adatlekérdezés során.";
            _this.seasons = seasons;
            console.log(seasons);
        });
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