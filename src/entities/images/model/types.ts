export interface IImageState {
    imagesLoading: boolean,
    imagesError: string | null,
    images: IImages | null
}

export interface IImages {
    docs: IImage[],
    total: number | null,
    limit: number | null,
    page: number | null,
    pages: number | null
}

export interface IImage {
    movieId: number | null,
    type: string | null,
    url: string | null,
    previewUrl: string | null,
    height: number | null,
    width: number | null,
    id: string | null,
}