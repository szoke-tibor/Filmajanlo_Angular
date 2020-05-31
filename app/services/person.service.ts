import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Person } from '../models/person.type';
import { People } from '../models/people.type';

@Injectable()
export class PersonService {
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            "Content-type": "application/json",
            "trakt-api-key": "161402e97f36ba2419b888c48e2ad67cb54cb4d3fc0c4daa8d79c24c9d23b7df",
            "trakt-api-version": "2"
        });
    }

    /*
    *   Hálozaton keresztül (http) json formátumban az API segítségével
    *   lekérjük az adott id-val rendelkező filmhez tartozó embereket.
    */
    getPeopleOfMovie(movieId: number) : Observable<People> {
        return this.http.get<People>(`https://api.trakt.tv/movies/${movieId}/people`, {headers: this.headers});
    }

    /*
    *   Hálozaton keresztül (http) json formátumban az API segítségével
    *   lekérjük az adott id-val rendelkező sorozathoz tartozó embereket.
    */
    getPeopleOfShow(showId: number) : Observable<People> {
        return this.http.get<People>(`https://api.trakt.tv/shows/${showId}/people`, {headers: this.headers});
    }

    /*
    *   Hálozaton keresztül (http) json formátumban az API segítségével
    *   lekérjük az adott id-val rendelkező színészt (Person).
    */
    getActor(selectedActorId: number) : Observable<Person> {
        return this.http.get<Person>(`https://api.trakt.tv/people/${selectedActorId}?extended=full`, {headers: this.headers});
    }

    /*
    *   Hálozaton keresztül (http) json formátumban az API segítségével
    *   lekérjük azokat a filmeket melyekben adott id-val rendelkező színész szerepelt.
    */
    getMoviesOfActor(selectedActorId: number) : Observable<People> {
        return this.http.get<People>(`https://api.trakt.tv/people/${selectedActorId}/movies`, {headers: this.headers});
    }

    /*
    *   Hálozaton keresztül (http) json formátumban az API segítségével
    *   lekérjük azokat a sorozatokat melyekben adott id-val rendelkező színész szerepelt.
    */
    getShowsOfActor(selectedActorId: number) : Observable<People> {
        return this.http.get<People>(`https://api.trakt.tv/people/${selectedActorId}/shows`, {headers: this.headers});
    }
}
