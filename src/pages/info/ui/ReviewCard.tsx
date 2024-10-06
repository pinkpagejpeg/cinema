import { FC, useState } from "react"
import { Card, Group, Spoiler, Stack, Text, Title } from "@mantine/core"

export const ReviewCard: FC<any> = ({ item }) => {
    const [expanded, setExpanded] = useState(false)

    function formatDate(dateString) {
        const date = new Date(dateString)
    
        const months = [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ]
    
        const day = date.getUTCDate()
        const month = months[date.getUTCMonth()]
        const year = date.getUTCFullYear()
    
        const hours = date.getUTCHours().toString().padStart(2, "0")
        const minutes = date.getUTCMinutes().toString().padStart(2, "0")
    
        return `${day} ${month} ${year} в ${hours}:${minutes}`
    }

    return (
        <Card mb="md" padding="xl" radius="sm" withBorder bg={item.type === "Нейтральный" ? 'gray.0' : item.type === "Позитивный" ? 'green.0' : 'red.0'}>
            <Group justify="space-between" mb="md">
                <Text fw={500}>{item.author}</Text>
                <Text>{formatDate(item.date)}</Text>
            </Group>
            <Stack gap="sm">
                <Title order={4}>{item.title}</Title>
                <Spoiler showLabel={<Text c="dimmed" fw={500}>Показать всю рецензию</Text>}
                    hideLabel={<Text c="dimmed" fw={500}>Спрятать рецензию</Text>}
                    expanded={expanded}
                    onExpandedChange={setExpanded}
                    styles={{
                        control: {
                            textDecoration: 'none',
                            color: 'inherit',
                            '&:hover': {
                                textDecoration: 'none', 
                                color: 'black',  
                            }
                        }
                    }}>
                    {item.review}
                </Spoiler>
            </Stack>
        </Card>
    )
}