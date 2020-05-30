import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Movie } from '../models/movie.type';

@Injectable()
export class MovieService {
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            "Content-type": "application/json",
            "trakt-api-key": "161402e97f36ba2419b888c48e2ad67cb54cb4d3fc0c4daa8d79c24c9d23b7df",
            "trakt-api-version": "2"
        });
    }

    getMovies(options?: { pageSize?: number, page?: number, query?: string }) : Observable<Movie[]>{
        let page = (options && options.page) || 1;
        let pageSize = (options && options.pageSize) || 10;
        let query = (options && options.query) || "";
        return this.http.get<Movie[]>(`https://api.trakt.tv/movies/popular?extended=full&page=${page}&limit=${pageSize}&query=${query}`, {headers: this.headers});
    }
}
