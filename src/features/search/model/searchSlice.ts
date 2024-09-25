import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    searchResults: null,
    searchQuery: null
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        searchLoading(state, action: PayloadAction<string>) {
            state.loading = true
            state.searchQuery = action.payload
        },
        searchFilmsSuccess(state, action: PayloadAction<any>) {
            state.loading = false
            state.searchResults = action.payload
        },
        searchError(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {searchLoading, searchFilmsSuccess, searchError} = searchSlice.actions

export default searchSlice.reducer