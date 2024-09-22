import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    searchLoading: false,
    searchError: null,
    searchResults: null,
    searchQuery: null
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        searchLoading(state, action: PayloadAction<string>) {
            state.searchLoading = true
            state.searchQuery = action.payload
        },
        searchFilmsSuccess(state, action: PayloadAction<any>) {
            state.searchLoading = false
            state.searchResults = action.payload
        },
        searchError(state, action: PayloadAction<string>) {
            state.searchLoading = false
            state.searchError = action.payload
        }
    }
})

export const {searchLoading, searchFilmsSuccess, searchError} = searchSlice.actions

export default searchSlice.reducer