import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPaginationState } from "./types"

const initialState: IPaginationState = {
    filmsCurrentPage: 1,
    filmsTotalPage: 10,
    filmsCount: 10,
    actorsCurrentPage: 1,
    actorsTotalPage: 10,
    actorsCount: 10,
    reviewsCurrentPage: 1,
    reviewsTotalPage: 10,
    reviewsCount: 10,
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setFilmsCurrentPage(state, action: PayloadAction<number>) {
            state.filmsCurrentPage = action.payload
        },
        setFilmsTotalPage(state, action: PayloadAction<number>) {
            state.filmsTotalPage = action.payload
        },
        setFilmsCount(state, action: PayloadAction<number>) {
            state.filmsCount = action.payload
        },
        setActorsCurrentPage(state, action: PayloadAction<number>) {
            state.actorsCurrentPage = action.payload
        },
        setActorsTotalPage(state, action: PayloadAction<number>) {
            state.actorsTotalPage = action.payload
        },
        setActorsCount(state, action: PayloadAction<number>) {
            state.actorsCount = action.payload
        },
        setReviewsCurrentPage(state, action: PayloadAction<number>) {
            state.reviewsCurrentPage = action.payload
        },
        setReviewsTotalPage(state, action: PayloadAction<number>) {
            state.reviewsTotalPage = action.payload
        },
        setReviewsCount(state, action: PayloadAction<number>) {
            state.reviewsCount = action.payload
        }
    }
})

export const { setFilmsCurrentPage, setFilmsTotalPage, setFilmsCount,
    setActorsCurrentPage, setActorsTotalPage, setActorsCount,
    setReviewsCurrentPage, setReviewsTotalPage, setReviewsCount } = paginationSlice.actions

export default paginationSlice.reducer