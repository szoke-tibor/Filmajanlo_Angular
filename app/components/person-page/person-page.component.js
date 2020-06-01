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
var person_type_1 = require("../../models/person.type");
var person_service_1 = require("../../services/person.service");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var PersonPageComponent = (function () {
    function PersonPageComponent(personService, route, location) {
        this.personService = personService;
        this.route = route;
        this.location = location;
        this.moviesOfActor = [];
        this.showsOfActor = [];
    }
    /*
    *   Ez a függvény minden egyes PersonPageComponent példányosodása esetén meghívódik azonnal.
    *   Példányosítja a kiválasztott színész mezőt, hogy későbbi lekérdezések ne null objecten hívódjanak.
    *   A routingból kinyert paramétert eltárolja a selectedActorId változóban.
    *   Ezek után már be tudja állítani a kiválasztott színész objektumot.
    *   Majd annak filmjeit és sorozatait is beállítja.
    */
    PersonPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.selectedActor = new person_type_1.Person();
            _this.selectedActorId = params["id"];
            _this.getActor();
            _this.getMoviesOfActor();
            _this.getShowsOfActor();
        });
    };
    /*
    *   Aszinkron módon beállítja a selectedActor-t a
    *   personService segítségével
    *   Ha nem érkezett adat hibát dob.
    */
    PersonPageComponent.prototype.getActor = function () {
        var _this = this;
        this.personService.getActor(this.selectedActorId)
            .subscribe(function (actor) {
            if (!actor)
                throw "Hiba történt az adatlekérdezés során.";
            _this.selectedActor = actor;
        });
    };
    /*
    *   Aszinkron módon beállítja a kiválasztott
    *   színészhez tartozó filmeket a personService segítségével
    *   Ha nem érkezett adat hibát dob.
    */
    PersonPageComponent.prototype.getMoviesOfActor = function () {
        var _this = this;
        this.personService.getMoviesOfActor(this.selectedActorId)
            .subscribe(function (people) {
            if (!people)
                throw "Hiba történt az adatlekérdezés során.";
            people.cast.forEach(function (cast) { return _this.moviesOfActor.push(cast.movie); });
        });
    };
    /*
    *   Aszinkron módon beállítja a kiválasztott
    *   színészhez tartozó sorozatokat a personService segítségével
    *   Ha nem érkezett adat hibát dob.
    */
    PersonPageComponent.prototype.getShowsOfActor = function () {
        var _this = this;
        this.personService.getShowsOfActor(this.selectedActorId)
            .subscribe(function (people) {
            if (!people)
                throw "Hiba történt az adatlekérdezés során.";
            people.cast.forEach(function (cast) { return _this.showsOfActor.push(cast.show); });
        });
    };
    PersonPageComponent.prototype.goBack = function () {
        this.location.back();
    };
    return PersonPageComponent;
}());
PersonPageComponent = __decorate([
    core_1.Component({
        selector: "person-page",
        templateUrl: "./person-page.component.html"
    }),
    __metadata("design:paramtypes", [person_service_1.PersonService,
        router_1.ActivatedRoute,
        common_1.Location])
], PersonPageComponent);
exports.PersonPageComponent = PersonPageComponent;
//# sourceMappingURL=person-page.component.js.map