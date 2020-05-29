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
var ShowPageComponent = (function () {
    function ShowPageComponent(showService) {
        this.showService = showService;
    }
    ShowPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showService.getShows()
            .subscribe(function (shows) { return _this.shows = shows; });
    };
    return ShowPageComponent;
}());
ShowPageComponent = __decorate([
    core_1.Component({
        selector: "show-page",
        templateUrl: "./show-page.component.html"
    }),
    __metadata("design:paramtypes", [show_service_1.ShowService])
], ShowPageComponent);
exports.ShowPageComponent = ShowPageComponent;
//# sourceMappingURL=show-page.component.js.map