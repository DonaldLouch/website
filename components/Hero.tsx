import {
    Box, 
    Flex,
    Heading,
    Text,
    Link,
    Image,
    useColorModeValue
} from '@chakra-ui/react'


import GradientBox  from './GradientBox'

export default function Hero() {
    return (
        <>
            <Box 
                as="section"
                id="homeHero"

                w="100vw" 
                h="100vh"
                maxW="100vw"
                maxH="100vh"
                pos="absolute" 
                top="0" 
                left="0"  
                zIndex="overlay"

                boxShadow="bsOrange" 
                bg="white"
            >
                    <GradientBox />
                    <Flex id="heroWrap" pos="absolute" top="0" left="0" align="center" justify="center" w="100vw" h="100%" px="3rem" direction={{ base: 'column', lg: 'row' }}>
                            <Box>
                            <Heading as="h1" hidden textAlign="center" fontSize="5xl" fontWeight="bold" color="black">Welcome to Donald Louch</Heading>
                            <Image
                                src="/titleLogoPride.svg"
                                alt="DevLexicon"
                                width="35vw"
                                m="0.5rem auto"
                            />
                            <Text textAlign="center" fontSize="2xl" fontWeight="300" color={useColorModeValue('black', 'white')}>Please note that this Donald Louch website is currently being constructed. In the mean time, please visit the legacy version at <Link href="https://donaldlouch.ca" color={useColorModeValue('primary', 'secondary')}>https://donaldlouch.ca</Link></Text>
                            <Text textAlign="center" color={useColorModeValue('black', 'white')}>You may proceed to use this alpha version of the website. However, note most all functions are still being implemented and will not be available at this time. Click the following link to: <Link href="homePage" color={useColorModeValue('primary', 'secondary')}>Continue</Link></Text>
                            </Box>
                    </Flex>
                </Box>
        </>
    )
}
