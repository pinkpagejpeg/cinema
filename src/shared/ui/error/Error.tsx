import { FC } from "react"
import { Alert, Container } from "@mantine/core"
import { IconAlertCircle } from '@tabler/icons-react'

export const Error: FC<{ message: string }> = ({ message }) => {
    return (
        <Container size="sm" pt="30vh">
            <Alert
                icon={<IconAlertCircle size="1rem" />}
                title="Ошибка"
                color="red"
                variant="outline"
            >
                {message}
            </Alert>
        </Container>
    )
}