import { RouteObject } from "react-router-dom"
import { FILM_ITEM_ROUTE, FILM_LIST_ROUTE } from "../config/consts"
import { FilmList } from "../../pages/filmList"
import { FilmItem } from "../../pages/filmItem"

export const publicRoutes: RouteObject[] = [
    {
        path: FILM_LIST_ROUTE,
        Component: FilmList
    },
    {
        path: FILM_ITEM_ROUTE + '/:id',
        Component: FilmItem
    }
]