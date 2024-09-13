import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFilm, IFilmsState } from "./types"

const initialState: IFilmsState = {
    loading: false,
    error: null,
    films: null
}

const filmSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        fetchFilms(state) {
            state.loading = true
            state.error = null
            state.films = null
        },
        fetchFilmsSuccess(state, action: PayloadAction<any>) {
            state.loading = false
            state.error = null
            state.films = action.payload
        },
        fetchFilmsError(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
            state.films = null
        }
    }
})

export const { fetchFilms, fetchFilmsSuccess, fetchFilmsError } = filmSlice.actions;

export default filmSlice.reducer;