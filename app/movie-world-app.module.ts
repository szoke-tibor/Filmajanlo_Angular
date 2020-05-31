import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ng2-bootstrap'
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { MovieWorldAppComponent } from './components/movie-world-app/movie-world-app.component';
import { MovieService } from './services/movie.service';
import { ShowPageComponent } from './components/show-page/show-page.component';
import { PersonPageComponent } from './components/person-page/person-page.component';
import { ShowService } from './services/show.service';
import { PersonService } from './services/person.service';
import { HttpClient } from '@angular/common/http';

let routes: Route[] = [
    { path: "movies", component: MoviePageComponent },
    { path: "shows", component: ShowPageComponent },
    { path: "actors/:id", component: PersonPageComponent }
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpClientModule, CollapseModule.forRoot()],
    declarations: [MovieWorldAppComponent, MoviePageComponent, ShowPageComponent, PersonPageComponent],
    exports: [],
    providers: [MovieService, ShowService, PersonService, HttpClient],
    bootstrap: [MovieWorldAppComponent]
})
export class MovieWorldAppModule { }
