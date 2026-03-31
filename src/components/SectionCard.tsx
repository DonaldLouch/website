// "use client"

import { Box } from '@mantine/core'

interface CardProps {
    id?: string
    styleType?: "primaryCard" | "secondaryCard" | null | undefined
    children: React.ReactNode
    [key: string]: any
}

export const SectionCard = (props: CardProps) => {
    const { id, styleType, children, ...rest } = props
    return (
        <Box 
            component="section" 
            id={id} 
            style={{
                // filter: "opacity(80%)",
                borderRadius: "var(--mantine-radius-lg)",
                boxShadow: styleType == "primaryCard" ? "var(--mantine-shadow-bsBoldPrimary)" :  styleType == "secondaryCard" ? "var(--mantine-shadow-bsBoldSecondary)" : "var(--mantine-shadow-bsBoldWhite)"
            }}
            mx={{base: "0rem", lg: "-3rem"}}
            my={{base: "1rem", lg: "1rem"}}
            p="2rem" 
            bg="none"
            c="white"
            {...rest}
        >
            {children}
        </Box>
    )
}
