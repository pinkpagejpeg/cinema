import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFilterState } from "./types"

const initialState: IFilterState = {
    currentCountry: "Все страны",
    currentYear: "Все годы",
    currentAgeRating: "Все рейтинги",
    allCountries: ["Все страны"],
    allYears: ["Все годы", "2027", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2020-2027", "2010-2019", "2000-2009", "1990-1999", "1980-1989", "1970-1979", "1960-1969", "1950-1959", "1940-1949", "1930-1939", "1920-1929", "1910-1919", "1909-1900", "1890-1899"],
    allAgeRatings: ["Все рейтинги", "0", "6", "12", "16", "18"],
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCurrentCountry(state, action: PayloadAction<string>) {
            state.currentCountry = action.payload
        },
        setCurrentYear(state, action: PayloadAction<string>) {
            state.currentYear = action.payload
        },
        setCurrentAgeRating(state, action: PayloadAction<string>) {
            state.currentAgeRating = action.payload
        },
        setAllCountries(state, action: PayloadAction<any>) {
            state.allCountries = [...new Set([...state.allCountries, ...action.payload])]
        },
    }
})

export const { setCurrentCountry, setCurrentYear, setCurrentAgeRating, setAllCountries } = filterSlice.actions

export default filterSlice.reducer