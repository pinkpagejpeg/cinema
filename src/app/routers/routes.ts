import { RouteObject } from "react-router-dom"
import { FILM_ITEM_ROUTE, FILM_LIST_ROUTE, FILM_SEARCH_ROUTE } from "../../shared/config"
import { FilmCollection } from "../../pages/collection"
import { FilmInfo } from "../../pages/info"
import { FilmSearch } from "../../pages/search"

export const publicRoutes: RouteObject[] = [
    {
        path: FILM_LIST_ROUTE,
        Component: FilmCollection
    },
    {
        path: FILM_SEARCH_ROUTE,
        Component: FilmSearch
    },
    {
        path: FILM_ITEM_ROUTE + '/:id',
        Component: FilmInfo
    },
]