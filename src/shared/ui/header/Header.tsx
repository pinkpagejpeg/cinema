import { FC } from "react"
import { Group, Text, Image } from "@mantine/core"
import logo from "../../assets/images/logo.svg"

export const Header: FC<{ search: () => JSX.Element }> = ({ search }) => {
    return (
        <Group py="lg" justify="space-between">
            <Group gap="xs">
                <Image
                    src={logo}
                    h={39}
                    w={50}
                    alt="Логотип" />
                <Text fw="700" size="xl">Кино</Text>
            </Group>
            {search()}
        </Group>
    )
}
