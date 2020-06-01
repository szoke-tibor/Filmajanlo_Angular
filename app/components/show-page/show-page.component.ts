import { Component, OnInit } from "@angular/core";
import { Show } from "../../models/show.type";
import { ShowService } from "../../services/show.service";
import { Person } from "../../models/person.type";
import { PersonService } from "../../services/person.service";
import { Router } from "@angular/router";
import { Season } from "../../models/season.type";
import { SaveShowPageData } from "../../models/saveShowPageData.type";

@Component({
    selector: "show-page",
    templateUrl: "./show-page.component.html"
})
export class ShowPageComponent implements OnInit {

    shows: Show[];
    selectedShow: Show;
    selectedActor: Person;
    seasons: Season[];

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
    
    /* 
    *   Ez a függvény minden egyes ShowPageComponent példányosodása esetén meghívódik azonnal.
    *   Ha a localStorage-ban nem mentettük el korábban az oldal állapotát, akkor meghívja a getShows() fv-t.
    *   Ellenkező esetben a korábban elmentett oldalállapotot fogjuk visszaállítani a localStorage-ból.
    */
    ngOnInit(): void {
        if (!this.loadFromLocalStorage()) {
            console.log("LOAD WITH GETTER");
            this.getShows();
        }
    }

    /*
    *   A konstruktorban beállított paraméterek segítségével
    *   feltölti a shows tagváltozót aszinkron módon.
    *   Továbbá megvizsgálja, hogy kevesebb, mint 10 sorozat érkezett-e.
    *   Ennek függvényében a lapozó gombot letiltó boolean értékét beállítja.
    */
    getShows() {
        this.showService.getShows({
            pageSize: this.pageSize,
            page: this.currentPage,
            query: this.queryString
        })
        .subscribe(shows => {
            if (!shows)
                throw "Hiba történt az adatlekérdezés során.";
            this.shows = shows;
            this.lastPage = shows.length < 10 ? true : false;
        });
    }

    /*
    *   Szintén aszinkron módon, a subscribe segítségével
    *   feltölti a personService segítségével a kiválasztott
    *   sorozathoz tartozó színészek tömbjét
    *   Ha nem érkezett adat hibát dob.
    */
    getActors() {
        this.personService.getPeopleOfShow(this.selectedShow.ids.trakt)
        .subscribe(people => {
            if (!people)
                throw "Hiba történt az adatlekérdezés során.";
            this.selectedShow.actors = [];
            people.cast.forEach(cast => this.selectedShow.actors.push(cast.person));
        });
    }

    /*
    *   A böngészőben az actors/:id oldalra navigálja a felhasználót.
    */
    goActorPage() : void {
        this.router.navigate([`/actors/${this.selectedActor.ids.trakt}`]);
    }

    /*
    *   Aszinkron módon a showService segítségével beállítja a
    *   kiválasztott sorozathoz tartozó az epizódokat tartalmazó évadokat.
    *   Ha nem érkezett adat hibát dob.
    */
    getEpisodesForShow() : void {
        this.showService.getEpisodesForShow(this.selectedShow.ids.trakt)
        .subscribe(seasons => {
            if (!seasons)
                throw "Hiba történt az adatlekérdezés során.";
            this.seasons = seasons;
        });
    }
    
    /*
    *   Egy SaveShowPageData szerkezetű, json formátumú fájlként
    *   elmentjük az oldal aktuális állapotát a változói segítségével
    *   a localStorage-ba.
    */
    saveToLocalStorage() : void {
        localStorage.setItem("showPage", JSON.stringify(<SaveShowPageData>{
            shows: this.shows,
            selectedShow: this.selectedShow,
            seasons: this.seasons,
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            lastPage: this.lastPage,
            queryString: this.queryString
        }));
    }

    /*
    *   Az localStorage-ba elmentett showPage key-jel jelölt
    *   json formátumú fájlból visszatöltjük az oldal korábbi állapotát,
    *   majd töröljük a localStorage-ből a korábban elmentett állapotot
    *   Amennyiben a localStorageből való olvasás sikertelen a visszatérés false,
    *   abban az esetben viszont ha sikeres volt, úgy a visszatérési érték true lesz.
    */
    loadFromLocalStorage() : boolean {
        let data = JSON.parse(localStorage.getItem('showPage'));
        if(!data)
            return false;

        this.shows = data.shows;
        this.selectedShow = data.selectedShow;
        this.seasons = data.seasons;
        this.pageSize = data.pageSize;
        this.currentPage = data.currentPage;
        this.lastPage = data.lastPage;
        this.queryString = data.queryString;
        
        console.log("LOAD FROM LOCALSTORAGE");
        localStorage.removeItem("showPage");
        return true;
    }
}