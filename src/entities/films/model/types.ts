export interface IFilm {
    name: string | null,
    enName: string | null,
    type: string | null,
    year: number | null,
    description: string | null,
    ageRating: number | null,
    poster: IFilmPosters | null,
    shortDescription: string | null,
    rating: IFilmRating  | null,
    movieLength: number | null,
    genres: IFilmGenres[] | null,
    countries: IFilmCountries[] | null,
    //seasonsInfo?: ISeasonsInfo[],
    //similarMovies: IFilms[] | null,
}

export interface IFilms {
    docs: IFilm[]
}

export interface IFilmPosters {
    url: string | null,
    previewUrl: string | null,
}

export interface IFilmRating {
    kp: number | null,
    imdb: number | null,
    tmdb: number | null,
    filmCritics: number | null,
    russianFilmCritics: number | null,
    await: number | null
}

export interface IFilmGenres{
    name: string | null,
}

export interface IFilmCountries{
    name: string | null,
}

export interface ISeasonsInfo{
    number: number | null,
    episodesCount: number | null,
}

export interface IFilmsState {
    loading: boolean,
    error: string | null,
    films: IFilms | null
}

export enum FilmsActionTypes{
    FETCH_FILMS = "FETCH_FILMS",
    FETCH_FILMS_SUCCESS = "FETCH_FILMS_SUCCESS",
    FETCH_FILMS_ERROR = "FETCH_FILMS_ERROR",
}

export interface IFetchFilmsAction {
    type: FilmsActionTypes.FETCH_FILMS
}

export interface IFetchFilmsSuccessAction {
    type:  FilmsActionTypes.FETCH_FILMS_SUCCESS,
    payload: any
}

export interface IFetchFilmsErrorAction {
    type:  FilmsActionTypes.FETCH_FILMS_ERROR,
    payload: string
}

export type FilmsAction = IFetchFilmsAction | IFetchFilmsSuccessAction | IFetchFilmsErrorAction


// "persons": [
//         {
//             "id": 6317,
//             "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_6317.jpg",
//             "name": "Пол Уокер",
//             "enName": "Paul Walker",
//             "description": "string",
//             "profession": "string",
//             "enProfession": "string"
//         }
//     ],

// export interface ISimilarMovies {
//         id: 0,
//         name: string | null,
//         type: string | null,
//         poster": {
//           "url": "string",
//           "previewUrl": "string"
//         },
//         rating": {
//           "kp": 6.2,
//           "imdb": 8.4,
//           "tmdb": 3.2,
//           "filmCritics": 10,
//           "russianFilmCritics": 5.1,
//           "await": 6.1
//         },
//         year: number | null,
// }