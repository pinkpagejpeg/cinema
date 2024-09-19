import { FC, useEffect } from "react"
import { NavLink, useParams } from "react-router-dom"
import { FILM_LIST_ROUTE } from "../../../app/config/consts"
import { Badge, Container, Group, Title, Image, Stack, Text, Divider } from "@mantine/core"
import { useAppDispatch, useTypedSelector } from "../../../shared/hooks"
import { Footer, Header } from "../../../shared/components"
import { fetchLoading, fetchError, fetchFilmByIdSuccess, IFilm } from "../../../entities/films"
import axios from "axios"

export const FilmItem: FC = () => {
    const { id } = useParams()
    const { film, loading, error } = useTypedSelector((state) => state.films)
    const dispatch = useAppDispatch()

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.TOKEN
        }
    }

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                dispatch(fetchLoading())
                const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&id=${id}`, options)
                dispatch(fetchFilmByIdSuccess(response.data.docs[0]))
            } catch (error) {
                dispatch(fetchError('При  получении информации  о фильмах произошла ошибка'))
            }
        }

        fetchFilmData()
    }, [id])

    if (loading) return <p>Загрузка...</p>
    if (error) return <p>Ошибка: {error}</p>

    return (
        <Container size="xl">
            {film !== null &&
                <>
                    <Header search={"Поиск"} />
                    <Group justify="space-between" gap="xl" align="flex-start" grow preventGrowOverflow={false} wrap="nowrap">
                        {film.poster !== undefined &&
                            <Image
                                src={film.poster.url}
                                h={360}
                                w={260}
                                alt={film.name}
                                radius="sm" />
                        }
                        <Stack gap="xs">
                            <Group>
                                <Stack>
                                    <Title order={2}>{film.name}</Title>
                                    {film.enName !== null && film.enName !== undefined && <Text c="dimmed" size="md">{film.enName}</Text>}
                                </Stack>
                                <Badge color="red">{film.ageRating || 0}+</Badge>
                            </Group>

                            <Text mb="xl" style={{ width: "75%" }}>{film.description}</Text>
                            <Stack mb="xl">
                                <Title order={3}>О фильме</Title>
                                <Group gap="xl">
                                    <Stack>
                                        <Text fw={500}>Год производства</Text>
                                        <Text fw={500}>Страна</Text>
                                        <Text fw={500}>Жанр</Text>
                                        <Text fw={500}>Возрастное ограничение</Text>
                                        <Text fw={500}>Длительность</Text>
                                    </Stack>

                                    <Stack>
                                        <Text>{film.year || "—"}</Text>
                                        <Text> {film.countries !== undefined &&
                                            film.countries.map((country) => country.name + " ") || "—"}
                                        </Text>
                                        <Text>
                                            {film.genres !== undefined &&
                                                film.genres.map((genre) => genre.name + " ") || "—"}
                                        </Text>
                                        <Text>{film.ageRating || 0}+</Text>
                                        <Text>{film.movieLength !== null ? Math.floor(film.movieLength / 60) + " ч. " + film.movieLength % 60 + " мин." : "—"}</Text>
                                    </Stack>
                                </Group>
                            </Stack>

                            <Stack mb="xl">
                                <Title order={3}>Рейтинг</Title>
                                {film.rating.kp !== 0 || film.rating.imdb !== 0 ?
                                    <>
                                        {film.rating.kp !== 0 &&
                                            <Group>
                                                <Text fw={500}>Кинопоиск</Text>
                                                <Text>{film.rating.kp}</Text>
                                            </Group>
                                        }
                                        {film.rating.imdb !== 0 &&
                                            <Group>
                                                <Text fw={500}>IMDb</Text>
                                                <Text>{film.rating.imdb}</Text>
                                            </Group>
                                        }
                                    </> : <Text c="dimmed">Недостаточно оценок, рейтинг формируется</Text>
                                }
                            </Stack>

                            <Title order={3}>Актеры</Title>

                            {film.type === "tv-series" &&
                                <Stack mb="xl">
                                    <Title order={3}>Сезоны и серии</Title>
                                </Stack>
                            }

                            <Title order={3}>Отзывы</Title>
                            <Title order={3}>Постеры</Title>
                        </Stack>
                    </Group>
                    <Footer />
                </>

            }
        </Container>
    )
}