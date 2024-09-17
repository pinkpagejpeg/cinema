import { combineReducers } from "redux"
import { filmsReducer } from "../../entities/films"
import { paginationReducer } from "../../features/pagination"

export const rootReducer = combineReducers({
    pagination: paginationReducer,
    // filter: ,
    // search: ,
    films: filmsReducer
})

export type RootState = ReturnType<typeof rootReducer>