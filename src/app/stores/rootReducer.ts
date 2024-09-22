import { combineReducers } from "redux"
import { filmsReducer } from "../../entities/films"
import { paginationReducer } from "../../features/pagination"
import { filterReducer } from "../../features/filter"
import { searchReducer } from "../../features/search"

export const rootReducer = combineReducers({
    pagination: paginationReducer,
    filter: filterReducer,
    search: searchReducer,
    films: filmsReducer
})