"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var movie_page_component_1 = require("./components/movie-page/movie-page.component");
var movie_world_app_component_1 = require("./components/movie-world-app/movie-world-app.component");
var movie_service_1 = require("./services/movie.service");
var show_page_component_1 = require("./components/show-page/show-page.component");
var person_page_component_1 = require("./components/person-page/person-page.component");
var show_service_1 = require("./services/show.service");
var person_service_1 = require("./services/person.service");
var http_2 = require("@angular/common/http");
var routes = [
    { path: "movies", component: movie_page_component_1.MoviePageComponent },
    { path: "shows", component: show_page_component_1.ShowPageComponent },
    { path: "actors/:id", component: person_page_component_1.PersonPageComponent }
];
var MovieWorldAppModule = (function () {
    function MovieWorldAppModule() {
    }
    return MovieWorldAppModule;
}());
MovieWorldAppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(routes), forms_1.FormsModule, http_1.HttpClientModule, ng2_bootstrap_1.CollapseModule.forRoot()],
        declarations: [movie_world_app_component_1.MovieWorldAppComponent, movie_page_component_1.MoviePageComponent, show_page_component_1.ShowPageComponent, person_page_component_1.PersonPageComponent],
        exports: [],
        providers: [movie_service_1.MovieService, show_service_1.ShowService, person_service_1.PersonService, http_2.HttpClient],
        bootstrap: [movie_world_app_component_1.MovieWorldAppComponent]
    })
], MovieWorldAppModule);
exports.MovieWorldAppModule = MovieWorldAppModule;
//# sourceMappingURL=movie-world-app.module.js.map