import { Component, OnInit } from "@angular/core";
import { Movie } from "../../models/movie.type";
import { Show } from "../../models/show.type";
import { Person } from "../../models/person.type";
import { PersonService } from "../../services/person.service";
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
    
    /* 
    *   Ez a függvény minden egyes PersonPageComponent példányosodása esetén meghívódik azonnal.
    *   Példányosítja a kiválasztott színész mezőt, hogy későbbi lekérdezések ne null objecten hívódjanak.
    *   A routingból kinyert paramétert eltárolja a selectedActorId változóban.
    *   Ezek után már be tudja állítani a kiválasztott színész objektumot.
    *   Majd annak filmjeit és sorozatait is beállítja.
    */
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.selectedActor = new Person();
            this.selectedActorId = params["id"];
            this.getActor();
            this.getMoviesOfActor();
            this.getShowsOfActor();
        });
    }

    /*
    *   Aszinkron módon beállítja a selectedActor-t a
    *   personService segítségével
    *   Ha nem érkezett adat hibát dob.
    */
    getActor() : void {
        this.personService.getActor(this.selectedActorId)
        .subscribe(actor => {
            if (!actor)
                throw "Hiba történt az adatlekérdezés során.";
            this.selectedActor = actor;
        });
    }

    /*
    *   Aszinkron módon beállítja a kiválasztott
    *   színészhez tartozó filmeket a personService segítségével
    *   Ha nem érkezett adat hibát dob.
    */
    getMoviesOfActor() : void {
        this.personService.getMoviesOfActor(this.selectedActorId)
        .subscribe(people => {
            if (!people)
                throw "Hiba történt az adatlekérdezés során.";
            this.moviesOfActor = [];
            people.cast.forEach(cast => this.moviesOfActor.push(cast.movie));
        });
    }

    /*
    *   Aszinkron módon beállítja a kiválasztott
    *   színészhez tartozó sorozatokat a personService segítségével
    *   Ha nem érkezett adat hibát dob.
    */
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