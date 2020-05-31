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
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "person-page",
    templateUrl: "./person-page.component.html"
})
export class PersonPageComponent implements OnInit {
    selectedActorId: number;
    selectedActor: Person;
    moviesOfActor: Movie[];
    showsOfActor: Show[];

    constructor(private personService : PersonService,
                private route: ActivatedRoute) { }
    
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.selectedActor = new Person();
            this.selectedActorId = params["id"];
            this.getActor();
            this.getMoviesOfActor();
            this.getShowsOfActor();
        });
    }

    getActor() : void {
        this.personService.getActor(this.selectedActorId)
        .subscribe(actor => {
            if (!actor)
                throw "Hiba történt az adatlekérdezés során.";
            this.selectedActor = actor;
        });
    }

    getMoviesOfActor() : void {
        this.personService.getMoviesOfActor(this.selectedActorId)
        .subscribe(people => {
            if (!people)
                throw "Hiba történt az adatlekérdezés során.";
            this.moviesOfActor = [];
            people.cast.forEach(cast => this.moviesOfActor.push(cast.movie));
        });
    }

    getShowsOfActor() : void {
        this.personService.getShowsOfActor(this.selectedActorId)
        .subscribe(people => {
            if (!people)
                throw "Hiba történt az adatlekérdezés során.";
            this.showsOfActor = [];
            people.cast.forEach(cast => this.showsOfActor.push(cast.show));
        });
    }
}