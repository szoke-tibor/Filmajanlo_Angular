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
import { Router } from "@angular/router";

@Component({
    selector: "show-page",
    templateUrl: "./show-page.component.html"
})
export class ShowPageComponent implements OnInit {

    shows: Show[];
    selectedShow: Show;
    selectedActor: Person;

    pageSize: number;
    currentPage: number;
    lastPage: boolean;
    queryString: string;

    constructor(private showService : ShowService,
                private personService: PersonService,
                private router: Router) {
        this.pageSize = 10;
        this.currentPage = 1;
        this.queryString = "";
    }
    
    ngOnInit(): void {
        this.getShows();
    }

    getShows() {
        this.showService.getShows({
            pageSize: this.pageSize,
            page: this.currentPage,
            query: this.queryString
        })
        .subscribe(shows => {
            this.shows = shows;
            this.lastPage = shows.length < 10 ? true : false;
        });
    }

    getActors() {
        this.personService.getPeopleOfShow(this.selectedShow.ids.trakt)
        .subscribe(people => {
            this.selectedShow.actors = [];
            people.cast.forEach(cast => this.selectedShow.actors.push(cast.person));
        });
    }

    goActorPage() : void {
        this.router.navigate([`/actors/${this.selectedActor.ids.trakt}`]);
    }
}