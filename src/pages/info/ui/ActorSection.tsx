import { FC, useEffect, useState } from "react"
import { ActorCard } from "./ActorCard"
import { Grid, Stack, Text } from "@mantine/core"
import { useAppDispatch, useTypedSelector } from "../../../shared/lib"
import { fetchActorsError, fetchActorsLoading, fetchActorsSuccess } from "../../../entities/actors"
import { PaginationComponent, setActorsTotalPage } from "../../../features/pagination"
import axios from "axios"

export const ActorSection: FC<any> = ({ id }) => {
    const { actors, actorsLoading, actorsError } = useTypedSelector((state) => state.actors)
    const { actorsCurrentPage, actorsCount } = useTypedSelector((state) => state.pagination)
    const dispatch = useAppDispatch()

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.TOKEN,
        },
    }

    useEffect(() => {
        const fetchActorsData = async () => {
            try {
                dispatch(fetchActorsLoading())
                const response = await axios.get(
                    `https://api.kinopoisk.dev/v1.4/person?page=${actorsCurrentPage}&limit=${actorsCount}&movies.id=${id}`,
                    options
                )

                dispatch(fetchActorsSuccess(response.data))
                dispatch(setActorsTotalPage(response.data.pages))
            } catch (error) {
                dispatch(fetchActorsError(`При получении информации об актерах фильма произошла ошибка: ${error.message}`))
            }
        };

        fetchActorsData()
    }, [id, actorsCurrentPage, actorsCount])

    return (
        <Stack>
            {actorsLoading !== false ? <Text c="dimmed">Загрузка информации об актерах...</Text> :
                actorsError !== null ? <Text c="dimmed">При получении информации об актерах произошла ошибка</Text> :
                    actors !== null && actors.total !== 0 ?
                        <>
                            <Grid>
                                <Grid.Col span={6}>
                                    {actors.docs.slice(0, Math.ceil(actorsCount / 2)).map((item) => (
                                        <ActorCard key={item.id} item={item} />
                                    ))}
                                </Grid.Col>

                                <Grid.Col span={6}>
                                    {actors.docs.slice(Math.ceil(actorsCount / 2), actorsCount).map((item) => (
                                        <ActorCard key={item.id} item={item} />
                                    ))}
                                </Grid.Col>
                            </Grid>
                            <PaginationComponent type="actors" />
                        </>
                        : <Text c="dimmed">Информация об актерах отсутствует</Text>
            }
        </Stack>
    );
};