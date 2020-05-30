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
    selector: "person-page",
    templateUrl: "./person-page.component.html"
})
export class PersonPageComponent implements OnInit {

    constructor(private personService : PersonService) { }
    
    ngOnInit(): void { }
}