import { FC } from "react"
import { Group, Text, Image } from "@mantine/core"
import logo from "../../assets/images/logo.svg"

export const Footer: FC = () => {
    return (
        <Group py="lg" mb="lg" justify="space-between">
            <Group gap="xs">
                <Image
                    src={logo}
                    h={29}
                    w={40}
                    alt="Логотип" />
                <Text fw="700" size="md">Кино</Text>
            </Group>
            <Text size="sm" c="dimmed">&copy;Кино все права защищены {new Date().getFullYear()}г.</Text>
        </Group>
    )
}