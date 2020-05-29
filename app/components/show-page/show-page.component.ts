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

@Component({
    selector: "show-page",
    templateUrl: "./show-page.component.html"
})
export class ShowPageComponent implements OnInit {

    shows: Show[];

    constructor(private showService : ShowService) { }
    
    ngOnInit(): void {
        this.showService.getShows()
        .subscribe(shows => this.shows = shows);
    }
}