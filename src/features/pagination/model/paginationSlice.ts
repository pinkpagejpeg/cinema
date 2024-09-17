import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPaginationState } from "./types"

const initialState: IPaginationState = {
    currentPage: 1,
    totalPage: 10,
    filmsCount: 10,
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setTotalPage(state, action: PayloadAction<number>) {
            state.totalPage = action.payload
        },
        setFilmsCount(state, action: PayloadAction<number>) {
            state.filmsCount = action.payload
        }
    }
})

export const { setCurrentPage, setTotalPage, setFilmsCount } = paginationSlice.actions

export default paginationSlice.reducer