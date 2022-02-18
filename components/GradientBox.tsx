import {
    Box,
    useColorModeValue
} from '@chakra-ui/react'

export default function GradientBox() {
    return (
        <Box bg={useColorModeValue('white', 'black')} w="100vw" h="100%" opacity={{base: "1", md: "0.6"}}></Box>
    )
}
