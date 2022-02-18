import { 
    Button, 
    Box, 
    Flex,
    Heading,
    // Text,
    Link,
    Grid,
    Stack,
    // Skeleton,
    // AspectRatio,
    // Image,
    // useColorModeValue,
    // color
} from '@chakra-ui/react'


import ImageGradientBox  from './ImageGradientBox'

interface HeroProps {
    name: string
    tagLine: string
    links: any
    cta: any
}

export default function HeroPage(props: HeroProps) {
    const { name, tagLine, links, cta } = props
    return (
        <>
            <Box as="section" id="homeHero" w="100vw" h="100vh" maxW="100vw" maxH="100vh" pos="absolute" top="0" left="0" zIndex="overlay" boxShadow="bsOrange" bg="white">
                <ImageGradientBox />
                <Flex id="hero" pos="absolute" top="0" left="0" align="center" justify="center" w="100%" h="100%" px={{base: "0", md: "3rem"}} overflow="hidden">
                    <Grid templateColumns={{base: "1fr", md: "1fr 2fr"}} gap={{base: 0.5, md: 10}} w="100%" h="90vh" alignContent="center" justifyContent="center" textAlign="center">
                        <Stack boxShadow="bsBigBoldBlue" borderRadius="0 2.5rem" align="center" justify="center" p={{base: "1rem"}} w={{base: "80%", md: "100%"}} m={{base: "auto", md: "initial"}}>
                            <Heading as="h1" fontFamily="lato" fontWeight="light" fontSize="1rem" lineHeight={0.1}>Hello, I&apos;m</Heading>
                            <Heading as="h2" fontWeight={900} fontSize="8xl" lineHeight={0.85}>{name}</Heading>
                            <Heading as="h3" fontFamily="lato" fontWeight="light" fontSize="1rem" lineHeight={2}>{tagLine}</Heading>
                            <Button as="a" href={cta?.[1]} variant="heroButton" w="80%">
                                {cta?.[0]}
                            </Button>
                        </Stack>
                        <Grid templateColumns={{base: "repeat(3, 1fr)", md: "repeat(2, 1fr)"}} gap={{base: 5, md: 10}} alignItems="center" justifyContent="center" p="1rem 2.5rem">
                            {links.map((link:any) => (
                                <Link as="a" href={link.linkUrl} key={link.linkTitle} boxShadow="bsBoldBlue" py={{ base: "2rem", md: "5rem" }} borderRadius="0 2.5rem" _hover={{ boxShadow: "bsBigBoldOrange", fontWeight: 500, color: "secondary" }} fontWeight={900} fontSize={{base: "xl", md: "2xl"}} alignSelf="center">
                                    {link.linkTitle}
                                </Link>
                            ))}
                        </Grid>
                    </Grid>
                </Flex>
            </Box>
        </>
    )
}
