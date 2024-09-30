import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IActorState } from "./types"

const initialState: IActorState = {
    actorsLoading: false,
    actorsError: null,
    actors: null
}

const actorSlice = createSlice({
    name: "actors",
    initialState,
    reducers: {
        fetchActorsLoading(state) {
            state.actorsLoading = true
        },
        fetchActorsSuccess(state, action: PayloadAction<any>) {
            state.actors = action.payload
            state.actorsLoading = false
        },
        fetchActorsError(state, action: PayloadAction<string>) {
            state.actorsError = action.payload
            state.actorsLoading = false
        }
    }
})

export const { fetchActorsLoading, fetchActorsSuccess, fetchActorsError } = actorSlice.actions
export default actorSlice.reducer