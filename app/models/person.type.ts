export class Person {
    name: string;
    ids: {
        trakt: number;
        slug: string;
        imdb: string;
        tmdb: number;
        tvrage: number;
    }
    biography: string;
    birthday: string;
    death: string;
    birthplace: string;
    homepage: string;
}