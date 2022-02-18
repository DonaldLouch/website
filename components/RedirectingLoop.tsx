import { 
    HStack, 
    Spinner, 
    Heading,
    useColorModeValue
} from '@chakra-ui/react'

export default function RedirectingLoop() {
    return (
        <HStack spacing="2rem" align="baseline" justify="center" my="1rem">
            <Spinner color="white" size="xl" />
            <Heading as="h2" variant="sectionTitle" fontSize="4rem" color={useColorModeValue('black', 'white')}>Redirecting or Loading Content...</Heading>
        </HStack>
    )
}
