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

    getPeopleOfMovie(movieId: number) : Observable<People> {
        return this.http.get<People>(`https://api.trakt.tv/movies/${movieId}/people`, {headers: this.headers});
    }

    getPeopleOfShow(showId: number) : Observable<People> {
        return this.http.get<People>(`https://api.trakt.tv/shows/${showId}/people`, {headers: this.headers});
    }

    getActor(selectedActorId: number) : Observable<Person> {
        return this.http.get<Person>(`https://api.trakt.tv/people/${selectedActorId}?extended=full`, {headers: this.headers});
    }

    getMoviesOfActor(selectedActorId: number) : Observable<People> {
        return this.http.get<People>(`https://api.trakt.tv/people/${selectedActorId}/movies`, {headers: this.headers});
    }

    getShowsOfActor(selectedActorId: number) : Observable<People> {
        return this.http.get<People>(`https://api.trakt.tv/people/${selectedActorId}/shows`, {headers: this.headers});
    }
}
