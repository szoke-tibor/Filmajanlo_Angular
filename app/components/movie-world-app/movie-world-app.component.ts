import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from "rxjs/rx";
import * as _ from 'lodash';

@Component({
    selector: 'movie-world-app',
    templateUrl: './movie-world-app.component.html'
})
export class MovieWorldAppComponent {
    title = "MovieWorld";
}