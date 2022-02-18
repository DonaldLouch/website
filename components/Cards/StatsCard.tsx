import { 
    Stack,
    Heading,
    Text,
    useColorModeValue
  } from '@chakra-ui/react'
  
  interface CardProps {
    startsTitle: string
    startsDescription: string
  }
  
  export const StatsCard = (props: CardProps) => {
      const { startsTitle, startsDescription } = props
      return (
          <Stack px={{ base: 2, md: 5 }} py="1rem" boxShadow="bsBoldOrange" borderRadius="0 1.5rem">
              <Heading as="h5" size="0.3rem" color={useColorModeValue("grey", "white")} textTransform="uppercase">{startsTitle}</Heading>
              <Text fontWeight="500" m="0" textTransform="uppercase" color={useColorModeValue("black", "secondary")}>{startsDescription}</Text>
          </Stack>
      )
  }