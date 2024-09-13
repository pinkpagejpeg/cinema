import { useSelector } from "react-redux"
import { RootState } from "../../app/stores"

export const useTypedSelector = useSelector.withTypes<RootState>()