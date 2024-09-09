import { MantineProvider } from "@mantine/core"
import '@mantine/core/styles.css'

export const MainProviders = ({ children }) => {
    return (
        //<Provider store={store}>
        <MantineProvider>
            {children}
        </MantineProvider>
        //</Provider>
    );
}
