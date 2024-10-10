import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IImageState } from "./types"

const initialState: IImageState = {
    imagesLoading: false,
    imagesError: null,
    images: null
}

const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        fetchImagesLoading(state) {
            state.imagesLoading = true
        },
        fetchImagesSuccess(state, action: PayloadAction<any>) {
            state.imagesLoading = false
            state.images = action.payload
        },
        fetchImagesError(state, action: PayloadAction<string>) {
            state.imagesLoading = false
            state.imagesError = action.payload
        }
    }
})

export const { fetchImagesLoading, fetchImagesSuccess, fetchImagesError } = imageSlice.actions

export default imageSlice.reducer