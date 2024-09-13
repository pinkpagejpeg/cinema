import { combineReducers } from "redux"
import { filmsReducer } from "../../entities/films"

export const rootReducer = combineReducers({
    // pagination: ,
    // filter: ,
    // search: ,
    films: filmsReducer
})

export type RootState = ReturnType<typeof rootReducer>