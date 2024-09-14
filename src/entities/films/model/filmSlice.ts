import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFilm, IFilmsState } from "./types"

const initialState: IFilmsState = {
    loading: false,
    error: null,
    films: null,
    film: null
}

const filmSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        fetchLoading(state) {
            state.loading = true
        },
        fetchFilmsSuccess(state, action: PayloadAction<any>) {
            state.loading = false
            state.films = action.payload
        },
        fetchError(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        }, 
        fetchFilmByIdSuccess(state, action: PayloadAction<any>) {
            state.loading = false
            state.film = action.payload
        },
    }
})

export const { fetchLoading, fetchFilmsSuccess, fetchError, fetchFilmByIdSuccess } = filmSlice.actions;

export default filmSlice.reducer;