import { FC } from "react"
import { NavLink } from "react-router-dom"
import { Badge, Card, Group, Image, Stack, Text, Divider, Button, Title } from "@mantine/core"
import { FILM_ITEM_ROUTE } from "../../../shared/config";

export const FilmCard: FC<any> = ({ item }) => {
    return (
        <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder mb="lg">
            <Group justify="space-between" align="flex-start" grow preventGrowOverflow={false} wrap="nowrap">
                {item.poster !== undefined &&
                    <Image
                        src={item.poster.url}
                        h={260}
                        w={160}
                        alt={item.name}
                        radius="sm" />
                }
                <Stack gap="xs">
                    <Group>
                        <Stack>
                            <Title order={2}>{item.name}</Title>
                            {item.enName !== null && item.enName !== undefined && <Text c="dimmed" size="md">{item.enName}</Text>}
                        </Stack>
                        <Badge color="red">{item.ageRating || 0}+</Badge>
                    </Group>

                    <Group>
                        {item.movieLength !== null && item.movieLength !== undefined && <Text size="sm">{Math.floor(item.movieLength / 60) + " ч. " + item.movieLength % 60 + " мин."}</Text>}
                        {item.movieLength !== null && item.movieLength !== undefined && <Divider size="sm" orientation="vertical" />}
                        {item.year !== null && item.year !== undefined && <Text size="sm">{item.year}</Text>}
                        {item.year !== null && item.year !== undefined && <Divider size="sm" orientation="vertical" />}

                        <Text size="sm">
                            {item.countries !== undefined &&
                                item.countries.map((country) => country.name + " ")}
                        </Text>
                        <Divider size="sm" orientation="vertical" />
                        <Text size="sm">
                            {item.genres !== undefined &&
                                item.genres.map((genre) => genre.name + " ")}
                        </Text>
                    </Group>

                    <Text mb="xl" style={{ width: "75%" }}>{item.shortDescription}</Text>
                    <NavLink to={FILM_ITEM_ROUTE + '/' + item.id}>
                        <Button>Подробнее</Button>
                    </NavLink>
                </Stack>
            </Group>
        </Card>
    )
}