import { FC, useEffect } from "react"
import { Stack, Text } from "@mantine/core"
import { useAppDispatch, useTypedSelector } from "../../../shared/lib"
import { ReviewCard } from "./ReviewCard"
import { PaginationComponent, setReviewsTotalPage } from "../../../features/pagination"
import { fetchReviewsError, fetchReviewsLoading, fetchReviewsSuccess } from "../../../entities/reviews"
import axios from "axios"

export const ReviewSection: FC<any> = ({ id }) => {
    const { reviews, reviewsLoading, reviewsError } = useTypedSelector(state => state.reviews)
    const { reviewsCount, reviewsCurrentPage } = useTypedSelector(state => state.pagination)
    const dispatch = useAppDispatch()

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.TOKEN,
        },
    }

    useEffect(() => {
        const fetchReviewsData = async () => {
            try {
                dispatch(fetchReviewsLoading())
                const response = await axios.get(`https://api.kinopoisk.dev/v1.4/review?page=${reviewsCurrentPage}&limit=${reviewsCount}&movieId=${id}`,
                    options
                )

                dispatch(fetchReviewsSuccess(response.data))
                dispatch(setReviewsTotalPage(response.data.pages))
            } catch (error) {
                dispatch(fetchReviewsError(`При получении информации об отзывах произошла ошибка: ${error.message}`))
            }
        }

        fetchReviewsData()

    }, [id, reviewsCount, reviewsCurrentPage])

    return (
        <Stack>
            {reviewsLoading !== false ? <Text c="dimmed">Загрузка информации об отзывах...</Text> :
                reviewsError !== null ? <Text c="dimmed">При получении информации об отзывах произошла ошибка</Text> :
                    reviews !== null ?
                        <Stack>
                            {reviews.docs.map(item =>
                                <ReviewCard key={item.id} item={item} />
                            )}
                            <PaginationComponent type="reviews" />
                        </Stack>
                        : <Text c="dimmed">Информация об актерах отсутствует</Text>
            }
        </Stack>
    )
}