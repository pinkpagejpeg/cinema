import { FC } from "react"
import { Container, Loader, Stack, Title } from "@mantine/core"

export const Loading: FC = () => {
    return (
        <Container size="sm" pt="30vh">
            <Stack gap="md" align="center" justify="center" mt="xl">
                <Title order={1}>Загрузка...</Title>
                <Loader size="xl" variant="dots" />
            </Stack>
        </Container>
    )
}
