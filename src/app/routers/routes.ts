import { RouteObject } from "react-router-dom"
import FilmItem from "../../pages/filmItem/FilmItem"
import FilmList from "../../pages/filmList/FilmList"
import { FILM_ITEM_ROUTE, FILM_LIST_ROUTE } from "../config/consts"

export const publicRoutes: RouteObject[] = [
    {
        path: FILM_LIST_ROUTE,
        Component: FilmList
    },
    {
        path: FILM_ITEM_ROUTE,
        Component: FilmItem
    }
]