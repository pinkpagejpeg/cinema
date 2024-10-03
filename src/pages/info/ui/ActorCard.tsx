import { FC } from "react"
import { Card, Group, Stack, Image, Title, Text } from "@mantine/core"
import noPhoto from "../../../shared/assets/images/no_photo.svg"

export const ActorCard: FC<any> = ({ item }) => {
    return (
        <Card shadow="sm" padding="sm" radius="sm" withBorder mb="sm">
            <Group align="flex-start">
                <Image
                    src={item.photo || noPhoto}
                    h={80}
                    w={60}
                    alt={item.name}
                    radius="sm" />
                <Stack gap="xs">
                    <Title order={4} mt="xs">{item.name}</Title>
                    {item.enName !== null && item.enName !== undefined && <Text c="dimmed" size="sm">{item.enName}</Text>}
                </Stack>
            </Group>
        </Card>
    )
}