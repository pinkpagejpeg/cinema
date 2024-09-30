import { FC, useState } from 'react'
import { Group, Pagination, Stack, Text, Input } from '@mantine/core'
import { useAppDispatch, useTypedSelector } from '../../../shared/lib'
import { setFilmsCurrentPage, setFilmsCount, setActorsCurrentPage, setActorsCount } from '../model'

export const PaginationComponent: FC<any> = ({ type }) => {
    const { filmsCurrentPage, filmsTotalPage, filmsCount, actorsCurrentPage, actorsTotalPage, actorsCount } = useTypedSelector((state) => state.pagination)
    const dispatch = useAppDispatch()
    const [count, setCount] = useState(type === "films" ? filmsCount : actorsCount)
    const [total, setTotal] = useState(type === "films" ? filmsTotalPage : actorsTotalPage)
    const [current, setCurrent] = useState(type === "films" ? filmsCurrentPage : actorsCurrentPage)

    const changeCount = () => {
        let updatedCount = count
        if (updatedCount <= 0) {
            updatedCount = 1
        } else if (updatedCount >= 250) {
            updatedCount = 250
        }

        setCount(updatedCount)
        type === "films" ? dispatch(setFilmsCount(updatedCount)) : dispatch(setActorsCount(updatedCount))
    }

    const getWord = (count: number) => {
        const lastDigit = count % 10
        const lastTwoDigits = count % 100

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return type === "films" ? 'фильмов' : 'актеров'
        }

        if (lastDigit === 1) {
            return type === "films" ? 'фильм' : 'актер'
        }

        if (lastDigit >= 2 && lastDigit <= 4) {
            return type === "films" ? 'фильма' : 'актера'
        }

        return type === "films" ? 'фильмов' : 'актеров'
    }

    const firstPage = () => {
        type === "films" ? dispatch(setFilmsCurrentPage(1)) : dispatch(setActorsCurrentPage(1))
        setCurrent(1)
    }

    const previousPage = () => {
        type === "films" ? dispatch(setFilmsCurrentPage(current - 1)) : dispatch(setActorsCurrentPage(current - 1))
        setCurrent(current - 1)
    }

    const nextPage = () => {
        type === "films" ? dispatch(setFilmsCurrentPage(current + 1)) : dispatch(setActorsCurrentPage(current + 1))
        setCurrent(current + 1)
    }

    const lastPage = () => {
        type === "films" ? dispatch(setFilmsCurrentPage(total)) : dispatch(setActorsCurrentPage(total))
        setCurrent(total)
    }
    
    const paginationHandler = (page) => {
        setCurrent(page)
        type === "films" ? dispatch(setFilmsCurrentPage(page)) : dispatch(setActorsCurrentPage(page))
    }

    return (
        <Stack gap="xs" mb="md">
            <Pagination.Root size="sm" total={total} value={current} onChange={paginationHandler}>
                <Group gap={5} justify="center">
                    <Pagination.First onClick={firstPage} />
                    <Pagination.Previous onClick={previousPage} />
                    <Pagination.Items />
                    <Pagination.Next onClick={nextPage} />
                    <Pagination.Last onClick={lastPage} />
                </Group>
            </Pagination.Root>
            <Group justify="center">
                <Text size="sm">Отображать</Text>
                <Input w="5.2%" placeholder={String(count)}
                    value={count}
                    onChange={(event) => setCount(Number(event.target.value) || 0)}
                    onBlur={changeCount}
                    required />
                <Text size="sm">{getWord(count)} на странице</Text>
            </Group>
        </Stack>
    )
}