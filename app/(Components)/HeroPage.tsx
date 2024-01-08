'use client'
import { 
    Button, 
    Box, 
    Flex,
    Heading,
    Link,
    Grid,
    Stack,
    keyframes,
    usePrefersReducedMotion
} from '@chakra-ui/react'

interface HeroProps {
    name: string
    tagLine: string
    links: any
    cta: any
    imageLink: string
}

// const spinningGradient = keyframes `
//     0%{background: linear-gradient(30deg, rgba(67,12,140,0.9542017490589986) 0%, rgba(231,196,98,1) 49%, rgba(115,229,147,1) 100%);}
    
//     40%{background: linear-gradient(135deg, rgba(67,12,140,0.9542017490589986) 0%, rgba(231,196,98,1) 49%, rgba(115,229,147,1) 100%);}
    
//     60%{background: linear-gradient(90deg, rgba(67,12,140,0.9542017490589986) 0%, rgba(231,196,98,1) 49%, rgba(115,229,147,1) 100%);}
    
//     100%{background: linear-gradient(0deg, rgba(67,12,140,0.9542017490589986) 0%, rgba(231,196,98,1) 49%, rgba(115,229,147,1) 100%);}
// `
const spinningGradient = keyframes `
    0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`
// const spinningGradient = keyframes `
//     0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `

export default function HeroPage(props: HeroProps) {
    const { name, tagLine, links, cta, imageLink } = props


    // https://res.cloudinary.com/donaldlouch/image/upload/v1644189338/donaldlouch/g4os77p6ityhxn0ki74v.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1645167967/portfolio/hpqfin6z4olakfiso0pv.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1645167811/portfolio/kley3bouwow9kls6ifqh.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1668982688/donaldlouch/jan0tedmtlyt0sv4klsw.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpg
    
    const prefersReducedMotion = usePrefersReducedMotion()
    const spinningGradientAnimation = prefersReducedMotion
    ? undefined
    : `${spinningGradient} infinite 7s`

    return (
        <>
            <Box as="section" id="homeHero" w="100vw" h="100vh" maxW="100vw" maxH="100vh" pos="absolute" top="0" left="0" zIndex="overlay" boxShadow="bsSecondary" bg="blurredBackground" overflow="hidden !Important">
                <Box bg='mainGradient' animation={spinningGradientAnimation} w="100vw" h="100%" opacity="0.7" pos="absolute" 
                backgroundSize="150% 150%"
                ></Box>
                <Box bg={`no-repeat url(${imageLink ? imageLink : "https://sjc1.vultrobjects.com/donald-louch/donaldlouch/g4os77p6ityhxn0ki74v.jpg"}) #333 40% 40%`} backgroundSize="cover" h="100%" w="100vw"></Box>
                <Flex id="hero" pos="absolute" top="0" left="0" align="center" justify="center" w="100%" h="100%" px={{base: "0", md: "2rem", lg: "3rem", xl: "5rem"}} overflow="hidden">
                    <Grid templateColumns={{base: "1fr", lg: "2.5fr 3fr", xl: "1fr 2fr"}} gap={{base: "2rem", lg: "1rem", xl: "2rem"}} w="100%" h="90vh" alignContent="center" justifyContent="center" textAlign="center">
                        <Stack boxShadow={{base: "bsBoldPrimary", md:"bsBigBoldPrimary"}} borderRadius="0 2.5rem" align="center" justify="center" p={{base: "1rem"}} w={{base: "80%", md: "100%"}} m={{base: "auto", md: "initial"}}>
                            <Heading as="h1" fontFamily="body" fontWeight="400" fontSize="1.1rem" textShadow="tsPrimary" color="white" m="0">Hello, I&apos;m</Heading>
                            <Heading as="h2" fontWeight={900} fontSize={{base: "4xl", md: "6xl", lg:"5rem"}} textShadow="tsPrimary" color="white" my={{base: "-0.5rem", md: "-0.5rem"}} lineHeight={{ base: "inherit", lg: "5rem"}}>{name}</Heading>
                            <Heading as="h3" fontFamily="body" fontWeight="400" fontSize="1.1rem" textShadow="tsPrimary" color="white" mt={{base: "0", md:"1rem"}}>{tagLine}</Heading>
                            <Button as="a" href={cta?.[1]} variant="heroButton" w="80%" color="white">
                                {cta?.[0]}
                            </Button>
                        </Stack>
                        <Grid templateColumns="repeat(2, 1fr)" gap={{base: "2rem", md: "2rem", xl: "4rem"}} alignItems="center" justifyContent="center" p="1rem 2.5rem" w="100%">
                            {links.map((link:any) => (
                                <Link as="a" href={link.linkUrl} key={link.linkTitle} color="white" boxShadow={{base: "bsBoldPrimary", md: "bsMediumBoldPrimary"}} py={{ base: "2rem", md: "4.5rem" }} px="1rem" borderRadius="0 2rem" textShadow="tsPrimary" _hover={{ boxShadow: "bsBigBoldSecondary", fontWeight: 600, color: "white" }} fontWeight={900} fontSize={{base: "lg", md: "2xl"}} alignSelf="center">
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
