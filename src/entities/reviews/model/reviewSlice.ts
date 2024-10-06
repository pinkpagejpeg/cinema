import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IReviewState } from "./types"

const initialState: IReviewState = {
    reviewsLoading: false,
    reviewsError: null,
    reviews: null
}

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        fetchReviewsLoading(state) {
            state.reviewsLoading = true
        },
        fetchReviewsSuccess(state, action: PayloadAction<any>) {
            state.reviewsLoading = false
            state.reviews = action.payload
        },
        fetchReviewsError(state, action: PayloadAction<string>) {
            state.reviewsLoading = false
            state.reviewsError = action.payload
        }
    }
})

export const { fetchReviewsLoading, fetchReviewsSuccess, fetchReviewsError } = reviewSlice.actions

export default reviewSlice.reducer