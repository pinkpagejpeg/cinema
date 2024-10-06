export interface IReviewState {
    reviewsLoading: boolean,
    reviewsError: string | null,
    reviews: IReviews | null
}

export interface IReviews {
    docs: IReview[] | null,
    total: number | null,
    limit: number | null,
    page: number | null,
    pages: number | null
}

export interface IReview {
    id: number | null,
    movieId: number | null,
    title: string | null,
    type: string | null,
    review: string | null,
    date: string | null,
    author: string | null,
    userRating: number | null,
    authorId: number | null,
}