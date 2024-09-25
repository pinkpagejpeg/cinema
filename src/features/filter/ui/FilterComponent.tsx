import { FC, useEffect } from "react"
import { Stack, Title } from "@mantine/core"
import { FilterCombobox } from "./FilterCombobox"
import { useAppDispatch, useTypedSelector } from "../../../shared/lib"
import { setAllCountries, setCurrentAgeRating, setCurrentCountry, setCurrentYear, } from "../model"
import axios from "axios"

export const FilterComponent: FC = () => {
    const { allCountries, allYears, allAgeRatings, currentAgeRating, currentCountry, currentYear } = useTypedSelector(state => state.filter)
    const dispatch = useAppDispatch()

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.TOKEN
        }
    }

    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                const response_countries = await axios.get('https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name', options)
                dispatch(setAllCountries(response_countries.data.map(item => item = item.name)))
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchFilterOptions()
    }, [])

    return (
        <Stack mt="xl">
            <Stack>
                <Title order={4}>Страна</Title>
                <FilterCombobox comboboxOptions={allCountries} currentValue={currentCountry} setFilter={(option) => dispatch(setCurrentCountry(option))} />
            </Stack>
            <Stack>
                <Title order={4}>Год</Title>
                <FilterCombobox comboboxOptions={allYears} currentValue={currentYear} setFilter={(option) => dispatch(setCurrentYear(option))} />
            </Stack>
            <Stack>
                <Title order={4}>Возрастной рейтинг</Title>
                <FilterCombobox comboboxOptions={allAgeRatings} currentValue={currentAgeRating} setFilter={(option) => dispatch(setCurrentAgeRating(option))} />
            </Stack>
        </Stack>
    )
}