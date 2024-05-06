'use client'

import { 
    Stack,
    Heading,
    Text,
} from '@chakra-ui/react'
  
  interface CardProps {
    startsTitle: string
    startsDescription: string|any
  }
  
  export const StatsCard = (props: CardProps) => {
    const { startsTitle, startsDescription } = props
    return (
        <Stack px={{ base: 2, md: 5 }} py="1rem" boxShadow="bsBoldSecondary" borderRadius="0 1.5rem">
            <Heading as="h5" size="0.3rem" color="grey" textTransform="uppercase">{startsTitle}</Heading>
            <Text fontWeight="500" m="0" textTransform="uppercase" color="secondary" fontSize="1rem">{startsDescription}</Text>
        </Stack>
    )
}