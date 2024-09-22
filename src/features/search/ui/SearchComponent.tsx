import { FC, useState } from "react"
import { Button, Group, TextInput } from "@mantine/core"
import { useAppDispatch } from "../../../shared/lib"
import { searchError, searchFilmsSuccess, searchLoading } from "../model"
import axios from "axios"

export const SearchComponent: FC = () => {
    const [query, setQuery] = useState<string>("")
    const dispatch = useAppDispatch()

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.TOKEN
        }
    }

    const searchFilmsData = async () => {
        try {
            dispatch(searchLoading(query))
            const queryParam = query !== "" ? `&query=${query}` : ""
            const response = await axios.get(
                `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10${queryParam}`,
                options
            )

            dispatch(searchFilmsSuccess(response.data))
        } catch (error) {
            dispatch(searchError('При поиске фильмов произошла ошибка'))
        }
    }



    return (
        <Group justify="center" align="center" gap="xs">
            <TextInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Введите название фильма"
                aria-label="Search input"
                style={{ width: 200 }}
            />
            <Button color="blue" onClick={searchFilmsData}>
                Поиск
            </Button>
        </Group>
    )
}