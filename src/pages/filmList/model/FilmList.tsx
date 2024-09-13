import { FC, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { FILM_ITEM_ROUTE } from "../../../app/config/consts"
import { useAppDispatch, useTypedSelector } from "../../../shared/hooks"
import { Button, Card, Group, List, Text, Badge, Image, Container, Title, Stack, Divider } from "@mantine/core"
import { fetchFilms, fetchFilmsError, fetchFilmsSuccess } from "../../../entities/films"
import axios from "axios"

export const FilmList: FC = () => {
    const { films, loading, error } = useTypedSelector((state) => state.films)
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
                dispatch(fetchFilms())
                const response = await axios.get('https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=name&selectFields=enName&selectFields=type&selectFields=year&selectFields=description&selectFields=ageRating&selectFields=poster&selectFields=shortDescription&selectFields=rating&selectFields=movieLength&selectFields=genres&selectFields=countries&notNullFields=name&notNullFields=shortDescription&notNullFields=poster.url', options)
                dispatch(fetchFilmsSuccess(response.data))
            } catch (error) {
                dispatch(fetchFilmsError('При  получении информации  о фильмах произошла ошибка'))
            }
        }
        fetchFilmsData()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <Container>
            <Title order={1} mt="md" mb="lg">Список фильмов</Title>
            <List>
                {films !== null &&
                    films.docs.map((item) =>
                        <Card key={item.enName} shadow="sm" padding="lg" radius="md" withBorder mb="lg">
                            <Group justify="space-between" align="flex-start" grow preventGrowOverflow={false} wrap="nowrap">
                                {item.poster !== undefined &&
                                    <Image
                                        src={item.poster.url}
                                        height={260}
                                        w={160}
                                        alt={item.name} />
                                }
                                <Stack gap="xs">
                                    <Group>
                                        <Title order={2}>{item.name}</Title>
                                        <Badge color="red">{item.ageRating | 0}+</Badge>
                                    </Group>

                                    <Group>
                                        {item.enName !== null && item.enName !== undefined && <Text c="dimmed" size="sm">{item.enName}</Text>}
                                        {item.enName !== null && item.enName !== undefined && item.year !== null && item.year !== undefined
                                            && <Divider size="sm" orientation="vertical" />}
                                        {item.year !== null && item.year !== undefined && <Text c="dimmed" size="sm">{item.year}</Text>}
                                        {item.movieLength !== null && item.movieLength !== undefined && item.year !== null && item.year !== undefined
                                            && <Divider size="sm" orientation="vertical" />}
                                        {item.movieLength !== null && item.movieLength !== undefined && <Text c="dimmed" size="sm">{item.movieLength}</Text>}
                                    </Group>

                                    <Group>
                                        <Text c="dimmed" size="sm">
                                            {item.countries !== undefined &&
                                                item.countries.map((country) => country.name + " ")}
                                        </Text>
                                        <Divider size="sm" orientation="vertical" />
                                        <Text c="dimmed" size="sm">
                                            {item.genres !== undefined &&
                                                item.genres.map((genre) => genre.name + " ")}
                                        </Text>
                                    </Group>

                                    <Text mb="xl" style={{ width: "75%" }}>{item.shortDescription}</Text>
                                    <NavLink to={FILM_ITEM_ROUTE}>
                                        <Button>Подробнее</Button>
                                    </NavLink>
                                </Stack>
                            </Group>
                        </Card>
                    )
                }
            </List>
        </Container>
    )
}