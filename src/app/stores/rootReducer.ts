import { combineReducers } from "redux"
import { filmsReducer } from "../../entities/films"
import { paginationReducer } from "../../features/pagination"
import { filterReducer } from "../../features/filter"

export const rootReducer = combineReducers({
    pagination: paginationReducer,
    filter: filterReducer,
    // search: ,
    films: filmsReducer
})

export type RootState = ReturnType<typeof rootReducer>