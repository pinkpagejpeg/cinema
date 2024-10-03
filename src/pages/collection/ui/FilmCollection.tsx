import { FC, useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "../../../shared/lib"
import { Group, List, Container, Title, Stack } from "@mantine/core"
import { fetchFilmsLoading, fetchFilmsError, fetchFilmsSuccess } from "../../../entities/films"
import { Footer, Header } from "../../../shared/ui"
import { PaginationComponent, setFilmsTotalPage } from "../../../features/pagination"
import { FilterComponent } from "../../../features/filter"
import { SearchComponent } from "../../../features/search"
import { FilmCard } from "../../../shared/ui"
import { Loading } from "../../../shared/ui"
import { Error } from "../../../shared/ui"
import axios from "axios"

export const FilmCollection: FC = () => {
    const { films, filmsLoading, filmsError } = useTypedSelector((state) => state.films)
    const { filmsCurrentPage, filmsCount } = useTypedSelector((state) => state.pagination)
    const { currentCountry, currentYear, currentAgeRating } = useTypedSelector((state) => state.filter)
    const dispatch = useAppDispatch()

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.TOKEN
        }
    }

    useEffect(() => {
        const fetchFilmsData = async () => {
            try {
                dispatch(fetchFilmsLoading())
                const countryParam = currentCountry !== "Все страны" ? `&countries.name=${encodeURIComponent(currentCountry)}` : ""
                const yearParam = currentYear !== "Все годы" ? `&year=${encodeURIComponent(currentYear)}` : ""
                const ageParam = currentAgeRating !== "Все рейтинги" ? `&ageRating=${encodeURIComponent(currentAgeRating)}` : ""

                const response = await axios.get(
                    `https://api.kinopoisk.dev/v1.4/movie?page=${filmsCurrentPage}&limit=${filmsCount}${yearParam}${ageParam}${countryParam}&selectFields=id&selectFields=name&selectFields=enName&selectFields=type&selectFields=year&selectFields=description&selectFields=ageRating&selectFields=poster&selectFields=shortDescription&selectFields=rating&selectFields=movieLength&selectFields=genres&selectFields=countries&notNullFields=name&notNullFields=shortDescription&notNullFields=poster.url`,
                    options
                )

                dispatch(fetchFilmsSuccess(response.data))
                dispatch(setFilmsTotalPage(response.data.pages))
            } catch (error) {
                dispatch(fetchFilmsError(`При получении информации о фильмах произошла ошибка: ${error}`))
            }
        }
        fetchFilmsData()
    }, [filmsCurrentPage, filmsCount, currentYear, currentAgeRating, currentCountry])

    if (filmsLoading) return <Loading/>
    if (filmsError) return <Error message={filmsError}/>

    return (
        <Container size="xl">
            <Header search={() => <SearchComponent />} />
            <Group gap="xl" wrap="nowrap" align="flex-start">
                <FilterComponent />
                <Stack gap="xs">
                    <Title order={1} mt="md" mb="lg">Список фильмов</Title>
                    <List>
                        {films !== null &&
                            films.docs.map((item) =>
                                <FilmCard key={item.id} item={item} />
                            )
                        }
                    </List>
                    <PaginationComponent type="films" />
                </Stack>
            </Group>
            <Footer />
        </Container>
    )
}