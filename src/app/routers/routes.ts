import { RouteObject } from "react-router-dom"
import { FILM_ITEM_ROUTE, FILM_LIST_ROUTE, FILM_SEARCH_ROUTE } from "../../shared/config"
import { FilmList } from "../../pages/filmList"
import { FilmItem } from "../../pages/filmItem"
import { FilmSearch } from "../../pages/filmSearch/ui"

export const publicRoutes: RouteObject[] = [
    {
        path: FILM_LIST_ROUTE,
        Component: FilmList
    },
    {
        path: FILM_SEARCH_ROUTE,
        Component: FilmSearch
    },
    {
        path: FILM_ITEM_ROUTE + '/:id',
        Component: FilmItem
    },
]