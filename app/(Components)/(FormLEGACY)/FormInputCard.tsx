import {
  HStack, Stack
} from '@chakra-ui/react'

interface CardProps {
    id: string
    children: React.ReactNode
}

export const FormInputCard = (props: CardProps) => {
    const { id, children } = props

    return (
        <Stack 
            direction="row"
            spacing="2rem" 
            id={id}
            p="1.5rem 1.5rem" 
            my="1.5rem" 
            boxShadow="bsBoldPrimary"
            borderRadius="0 2rem"
            filter="opacity(80%)" 
            color="white"
            alignItems="center"
            flexWrap={{base: "wrap", xl: "initial"}}
            // flexWrap="wrap"
        >
            {children}
        </Stack>
    )
}
