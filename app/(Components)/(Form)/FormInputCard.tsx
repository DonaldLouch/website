import { Stack } from '@mantine/core'

interface CardProps {
    id: string
    children: React.ReactNode
}

export const FormInputCard = (props: CardProps) => {
    const { id, children } = props

    return (
        <Stack
            gap="2rem" 
            id={id}
            p="1.5rem 1.5rem" 
            my="1.5rem" 
            style={{ borderRadius: "var(--mantine-radius-md)", boxShadow: "var(--mantine-shadow-bsBoldPrimary)", filter: "opacity(80%)"}}
            color="white"
            align="center"
            // ={{base: "wrap", xl: "initial"}}
            // flexWrap="wrap"
        >
            {children}
        </Stack>
    )
}
