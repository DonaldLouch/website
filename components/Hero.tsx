import { 
    // Button, 
    Box, 
    Flex,
    Heading,
    Text,
    Link,
    // Skeleton,
    // AspectRatio,
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
                // overflowY="hidden"
                // overflow="hidden"

                boxShadow="bsOrange" 
                bg="white"
            >
                {/* <Box id="hero" pos="absolute" top="0" left="0" h="100%"> */}
                    <GradientBox />
                    <Flex id="heroWrap" pos="absolute" top="0" left="0" align="center" justify="center" w="100vw" h="100%" px="3rem" direction={{ base: 'column', lg: 'row' }}>
                            <Box>
                            <Heading as="h1" hidden textAlign="center" fontSize="5xl" fontWeight="bold" color="black">Welcome to Donald Louch</Heading>
                            <Image
                                src="/titleLogo.svg"
                                alt="DevLexicon"
                                width="35vw"
                                m="0.5rem auto"
                            />
                            <Text textAlign="center" fontSize="2xl" fontWeight="300" color={useColorModeValue('black', 'white')}>Please note that this Donald Louch website is currently being constructed. In the mean time, please visit the legacy version at <Link href="https://donaldlouch.ca" color={useColorModeValue('primary', 'secondary')}>https://donaldlouch.ca</Link></Text>
                            <Text textAlign="center" color={useColorModeValue('black', 'white')}>You may proceed to use this alpha version of the website. However, note most all functions are still being implemented and will not be available at this time. Click the following link to: <Link href="homePage" color={useColorModeValue('primary', 'secondary')}>Continue</Link></Text>
                            </Box>
                        {/* <Box id="websiteInfo" aria-label="Website Information" color="white" w={{base: "100%", md: "65%"}} textAlign="center"> */}
                            {/* <Image
                                src="/devLexiconTitle.svg"
                                alt="DevLexicon"
                                width="35vw"
                                m="0.5rem auto"
                            />
                            <Heading as="h1" hidden>DevLexicon</Heading>
                            <Heading as="h2" fontSize={{base: "sm", md: "4xl"}}>Branching of knowledge within web to media productions to produce the end product.</Heading> */}
                        {/* </Box> */}
                        {/* <Flex id="services" direction={{base: "row", lg: "column",}} w={{base: "100%", md:"100%", lg: "35%"}} mx="auto" overflowX="scroll"> */}
                            {/* <Button as="a" variant="heroButton" fontSize={{base: "sm", md: "lg", lg: "xl"}} href="services#web" aria-label="Web Development">Web Development</Button>
                            <Button as="a" variant="heroButton" fontSize={{base: "sm", md: "lg", lg: "xl"}} href="services#video" aria-label="Videography">Videography</Button>
                            <Button as="a" variant="heroButton" fontSize={{base: "sm", md: "lg", lg: "xl"}} href="services#photo" aria-label="Photography">Photography</Button>
                            <Button as="a" variant="heroButton" fontSize={{base: "sm", md: "lg",  lg: "xl"}} href="services#eCommerce" aria-label="eCommerce">eCommerce</Button> */}
                        {/* </Flex> */}
                    </Flex>
                </Box>
            {/* </Box> */}
        </>
    )
}
