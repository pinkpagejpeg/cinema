import { FC } from "react"
import { NavLink } from "react-router-dom"
import { FILM_LIST_ROUTE } from "../../app/config/consts"

const FilmItem: FC = () => {
    return (
        <div>
            Страница конкретного фильма
            <NavLink to={FILM_LIST_ROUTE}>Вернуться к списку фильмов</NavLink>
        </div>
    )
}

export default FilmItem