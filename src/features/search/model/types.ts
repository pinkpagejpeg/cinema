import { IFilms, IFilm } from "../../../entities/films"

export interface ISearchState {
    loading: boolean,
    error: string | null,
    searchResults: IFilms | null,
    searchQuery: string | null
}