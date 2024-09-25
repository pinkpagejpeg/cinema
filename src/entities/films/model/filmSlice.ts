import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFilmsState } from "./types"

const initialState: IFilmsState = {
    filmsLoading: false,
    filmsError: null,
    films: null,
    film: null
}

const filmSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        fetchLoading(state) {
            state.filmsLoading = true
        },
        fetchFilmsSuccess(state, action: PayloadAction<any>) {
            state.filmsLoading = false
            state.films = action.payload
        },
        fetchError(state, action: PayloadAction<string>) {
            state.filmsLoading = false
            state.filmsError = action.payload
        },
        fetchFilmByIdSuccess(state, action: PayloadAction<any>) {
            state.filmsLoading = false
            state.film = action.payload
        },
    }
})

export const { fetchLoading, fetchFilmsSuccess, fetchError, fetchFilmByIdSuccess } = filmSlice.actions

export default filmSlice.reducer