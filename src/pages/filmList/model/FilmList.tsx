import { FC, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { FILM_ITEM_ROUTE } from "../../../app/config/consts"
import { useAppDispatch, useTypedSelector } from "../../../shared/hooks"
import { Button, Card, Group, List, Text, Badge, Image, Container, Title, Stack, Divider } from "@mantine/core"
import { fetchLoading, fetchError, fetchFilmsSuccess } from "../../../entities/films"
import axios from "axios"
import { Footer, Header } from "../../../shared/components"

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
                dispatch(fetchLoading())
                const response = await axios.get('https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=id&selectFields=name&selectFields=enName&selectFields=type&selectFields=year&selectFields=description&selectFields=ageRating&selectFields=poster&selectFields=shortDescription&selectFields=rating&selectFields=movieLength&selectFields=genres&selectFields=countries&notNullFields=name&notNullFields=shortDescription&notNullFields=poster.url', options)
                dispatch(fetchFilmsSuccess(response.data))
            } catch (error) {
                dispatch(fetchError('При  получении информации  о фильмах произошла ошибка'))
            }
        }
        fetchFilmsData()
    }, [])

    if (loading) return <p>Загрузка...</p>
    if (error) return <p>Ошибка: {error}</p>

    return (
        <Container>
            <Header search={"Поиск"} />
            <Title order={1} mt="md" mb="lg">Список фильмов</Title>
            <List>
                {films !== null &&
                    films.docs.map((item) =>
                        <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder mb="lg">
                            <Group justify="space-between" align="flex-start" grow preventGrowOverflow={false} wrap="nowrap">
                                {item.poster !== undefined &&
                                    <Image
                                        src={item.poster.url}
                                        h={260}
                                        w={160}
                                        alt={item.name}
                                        radius="sm" />
                                }
                                <Stack gap="xs">
                                    <Group>
                                        <Stack>
                                            <Title order={2}>{item.name}</Title>
                                            {item.enName !== null && item.enName !== undefined && <Text c="dimmed" size="md">{item.enName}</Text>}
                                        </Stack>
                                        <Badge color="red">{item.ageRating || 0}+</Badge>
                                    </Group>

                                    <Group>
                                        {item.movieLength !== null && item.movieLength !== undefined && <Text size="sm">{Math.floor(item.movieLength / 60)+" ч. " + item.movieLength % 60 +" мин."}</Text>}
                                        {item.movieLength !== null && item.movieLength !== undefined && <Divider size="sm" orientation="vertical" />}
                                        {item.year !== null && item.year !== undefined && <Text size="sm">{item.year}</Text>}
                                        {item.year !== null && item.year !== undefined && <Divider size="sm" orientation="vertical" />}
                                        
                                        <Text size="sm">
                                            {item.countries !== undefined &&
                                                item.countries.map((country) => country.name + " ")}
                                        </Text>
                                        <Divider size="sm" orientation="vertical" />
                                        <Text size="sm">
                                            {item.genres !== undefined &&
                                                item.genres.map((genre) => genre.name + " ")}
                                        </Text>
                                    </Group>

                                    <Text mb="xl" style={{ width: "75%" }}>{item.shortDescription}</Text>
                                    <NavLink to={FILM_ITEM_ROUTE + '/' + item.id}>
                                        <Button>Подробнее</Button>
                                    </NavLink>
                                </Stack>
                            </Group>
                        </Card>
                    )
                }
            </List>
            <Footer />
        </Container>
    )
}