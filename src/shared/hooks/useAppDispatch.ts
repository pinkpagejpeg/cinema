import { useDispatch } from "react-redux"
import { AppDispatch } from "../../app/stores"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()