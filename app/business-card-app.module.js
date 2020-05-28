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
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var company_page_component_1 = require("./components/company-page/company-page.component");
var card_page_component_1 = require("./components/card-page/card-page.component");
var business_card_app_component_1 = require("./components/business-card-app/business-card-app.component");
var card_service_1 = require("./services/card.service");
var company_service_1 = require("./services/company.service");
var routes = [
    { path: "companies", component: company_page_component_1.CompanyPageComponent },
    { path: "cards", component: card_page_component_1.CardPageComponent },
    { path: "companies/:id", component: company_page_component_1.CompanyPageComponent },
    { path: "cards/:id", component: card_page_component_1.CardPageComponent },
];
var BusinessCardAppModule = (function () {
    function BusinessCardAppModule() {
    }
    return BusinessCardAppModule;
}());
BusinessCardAppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(routes), forms_1.FormsModule, http_1.HttpModule, ng2_bootstrap_1.CollapseModule.forRoot()],
        declarations: [business_card_app_component_1.BusinessCardAppComponent, company_page_component_1.CompanyPageComponent, card_page_component_1.CardPageComponent],
        exports: [],
        providers: [card_service_1.CardService, company_service_1.CompanyService],
        bootstrap: [business_card_app_component_1.BusinessCardAppComponent]
    })
], BusinessCardAppModule);
exports.BusinessCardAppModule = BusinessCardAppModule;
//# sourceMappingURL=business-card-app.module.js.map