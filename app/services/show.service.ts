import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Show } from '../models/show.type';

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

    getShows(options?: { pageSize?: number, page?: number, query?: string }) : Observable<Show[]>{
        let page = (options && options.page) || 1;
        let pageSize = (options && options.pageSize) || 10;
        let query = (options && options.query) || "";
        return this.http.get<Show[]>(`https://api.trakt.tv/shows/popular?extended=full&page=${page}&limit=${pageSize}&query=${query}`, {headers: this.headers});
    }
}
