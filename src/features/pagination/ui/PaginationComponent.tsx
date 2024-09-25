import { FC, useState } from 'react'
import { Group, Pagination, Stack, Text, Input } from '@mantine/core'
import { useAppDispatch, useTypedSelector } from '../../../shared/lib'
import { setCurrentPage, setFilmsCount } from '../model'

export const PaginationComponent: FC = () => {
    const { currentPage, totalPage, filmsCount } = useTypedSelector((state) => state.pagination)
    const dispatch = useAppDispatch()
    const [inputInfo, setInputInfo] = useState(filmsCount)

    const changeFilmsCount = () => {
        let updatedCount = inputInfo
        if (updatedCount <= 0) {
            updatedCount = 1
        } else if (updatedCount >= 250) {
            updatedCount = 250
        }

        setInputInfo(updatedCount)
        dispatch(setFilmsCount(updatedCount))
    }

    const getFilmWord = (count: number) => {
        const lastDigit = count % 10
        const lastTwoDigits = count % 100

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return 'фильмов'
        }

        if (lastDigit === 1) {
            return 'фильм'
        }

        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'фильма'
        }

        return 'фильмов'
    }

    return (
        <Stack gap="xs" mb="md">
            <Pagination.Root size="sm" total={totalPage} value={currentPage} onChange={(page) => dispatch(setCurrentPage(page))}>
                <Group gap={5} justify="center">
                    <Pagination.First onClick={() => dispatch(setCurrentPage(1))} />
                    <Pagination.Previous onClick={() => dispatch(setCurrentPage(currentPage - 1))} />
                    <Pagination.Items />
                    <Pagination.Next onClick={() => dispatch(setCurrentPage(currentPage + 1))} />
                    <Pagination.Last onClick={() => dispatch(setCurrentPage(totalPage))} />
                </Group>
            </Pagination.Root>
            <Group justify="center">
                <Text size="sm">Отображать</Text>
                <Input w="5.2%" placeholder={String(inputInfo)}
                    value={inputInfo}
                    onChange={(event) => setInputInfo(Number(event.target.value) || 0)}
                    onBlur={changeFilmsCount}
                    required />
                <Text size="sm">{getFilmWord(inputInfo)} на странице</Text>
            </Group>
        </Stack>
    )
}