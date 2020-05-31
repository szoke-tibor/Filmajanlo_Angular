import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Show } from '../models/show.type';
import { Season } from '../models/season.type';

@Injectable()
export class ShowService {
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            "Content-type": "application/json",
            "trakt-api-key": "161402e97f36ba2419b888c48e2ad67cb54cb4d3fc0c4daa8d79c24c9d23b7df",
            "trakt-api-version": "2"
        });
    }

    /*
    *   Amennyiben érkeztek paraméterek, úgy azok segítségével, amennyiben nem,
    *   úgy alapértelmezett értékekkel végez el egy API hívást, melynek következtében
    *   json formátumban megérkeznek a megfelelő sorozatok adatai.
    *   Kéréskor elküldjük fejlécben az api verzióját, az egyedi azonosítónkat valamint
    *   hogy milyen formátumban várjuk a választ (json).
    */
    getShows(options?: { pageSize?: number, page?: number, query?: string }) : Observable<Show[]>{
        let page = (options && options.page) || 1;
        let pageSize = (options && options.pageSize) || 10;
        let query = (options && options.query) || "";
        return this.http.get<Show[]>(`https://api.trakt.tv/shows/popular?extended=full&page=${page}&limit=${pageSize}&query=${query}`, {headers: this.headers});
    }

    /*
    *   Hálózaton keresztül, az API segítségével a megadott paraméter alapján
    *   json formátumban lekéri az adott azonosítójú sorozathoz tartozó évadokat
    *   melyek taratlmazzák az epizódokhoz tartozó információkat is.
    *   Kéréskor elküldjük fejlécben az api verzióját, az egyedi azonosítónkat valamint
    *   hogy milyen formátumban várjuk a választ (json).
    */
    getEpisodesForShow(showId: number) : Observable<Season[]> {
        return this.http.get<Season[]>(`https://api.trakt.tv/shows/${showId}/seasons?extended=episodes`, {headers: this.headers});
    }
}
