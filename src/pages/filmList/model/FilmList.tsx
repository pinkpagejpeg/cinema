import { FC } from "react"
import { NavLink } from "react-router-dom"
import { FILM_ITEM_ROUTE } from "../../../app/config/consts"

export const FilmList: FC = () => {
    return (
        <div>
            Список фильмов
            <NavLink to={FILM_ITEM_ROUTE}>Конкретный фильм</NavLink>
        </div>
    )
}