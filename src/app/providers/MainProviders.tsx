import { MantineProvider } from "@mantine/core"
import '@mantine/core/styles.css'
import { Provider } from "react-redux"
import { store } from "../stores"

export const MainProviders = ({ children }) => {
    return (
        <Provider store={store}>
            <MantineProvider>
                {children}
            </MantineProvider>
        </Provider>
    )
}
