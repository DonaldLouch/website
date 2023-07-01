'use client'

import { Box } from '@chakra-ui/react'

interface CardProps {
    id: string
    styleType: string
    children: React.ReactNode
}

export const SectionCard = (props: CardProps) => {
    const { id, styleType, children } = props
    return (
        <Box 
            as="section" 
            id={id} 
            filter="opacity(80%)" 
            mx="-2rem"
            my="2rem" 
            p="2rem" 
            borderRadius="0 2rem" 
            bg="none"
            boxShadow={
                styleType == "primaryCard" ? "bsBoldBlue" 
                :  styleType == "secondaryCard" ? "bsBoldOrange" 
                : "bsBoldWhite"
            }
            color="white"
        >
            {children}
        </Box>
    )
}
