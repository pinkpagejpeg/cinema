import { store } from "../../app/stores"

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
