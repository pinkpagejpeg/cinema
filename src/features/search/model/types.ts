import { IFilms, IFilm } from "../../../entities/films"

export interface ISearchState {
    searchLoading: boolean,
    searchError: string | null,
    searchResults: IFilms | null,
    searchQuery: string | null
}