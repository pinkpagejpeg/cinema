import { FC, useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "../../../shared/lib"
import { Group, List, Container, Title, Stack } from "@mantine/core"
import { Footer, Header } from "../../../shared/ui"
import { PaginationComponent, setFilmsCurrentPage, setFilmsTotalPage } from "../../../features/pagination"
import { FilterComponent } from "../../../features/filter"
import { SearchComponent, searchError, searchFilmsSuccess, searchLoading } from "../../../features/search"
import { FilmCard } from "../../../shared/ui"
import { useSearchParams } from "react-router-dom"
import { Loading } from "../../../shared/ui"
import { Error } from "../../../shared/ui"
import axios from "axios"

export const FilmSearch: FC = () => {
    const { filmsCurrentPage, filmsCount } = useTypedSelector((state) => state.pagination)
    const { loading, error, searchResults } = useTypedSelector((state) => state.search)
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get("query") || ""
    const dispatch = useAppDispatch()

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.TOKEN
        }
    }

    useEffect(() => {
        const searchFilmsData = async () => {
            try {
                dispatch(searchLoading())
                const queryParam = searchQuery !== "" ? `&query=${searchQuery}` : ""
                const response = await axios.get(
                    `https://api.kinopoisk.dev/v1.4/movie/search?page=${filmsCurrentPage}&limit=${filmsCount}${queryParam}`,
                    options
                )
                // dispatch(setFilmsCurrentPage(1))
                dispatch(searchFilmsSuccess(response.data))
            } catch (error) {
                dispatch(searchError(`При поиске фильмов произошла ошибка: ${error.message}`))
            }
        }
        if (searchQuery) {
            searchFilmsData()
        }
    }, [filmsCurrentPage, filmsCount, searchQuery])

    if (loading) return <Loading/>
    if (error) return <Error message={error}/>

    return (
        <Container size="xl">
            <Header search={() => <SearchComponent />} />
            <Group gap="xl" align="center" justify="center">
                <Stack gap="xs">
                    {searchQuery !== null &&
                        <Title order={1} mt="md" mb="lg">{`Результат поиска по запросу "${searchQuery}"`}</Title>}
                    <List>
                        {searchResults !== null &&
                            searchResults.docs.map((item) =>
                                <FilmCard key={item.id} item={item} />
                            )
                        }
                    </List>
                    <PaginationComponent type="films"/>
                </Stack>
            </Group>
            <Footer />
        </Container>
    )
}