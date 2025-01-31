'use client'
import { 
    Box, 
    Flex,
    Title,
    Anchor,
    Stack,
    Group,
    // keyframes,
    // usePrefersReducedMotion
} from '@mantine/core'
import PrimaryLinkedButton from './(Buttons)/PrimaryLinkedButton'

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
// THIS ONE ---
// const spinningGradient = keyframes `
//     0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// ` THIS ONE ---
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
    
    // const prefersReducedMotion = usePrefersReducedMotion()
    // const spinningGradientAnimation = prefersReducedMotion
    // ? undefined
    // : `${spinningGradient} infinite 7s`

    return (
        <>
        {/* animation={spinningGradientAnimation} */}
        {/* _hover={{ boxShadow: "bsBigBoldSecondary", fontWeight: 600, color: "white" }} */}
            <Box component="section" id="homeHero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflow: "hidden !Important"}} bg="var(--blurredBackground)">
                <Box bg= {`no-repeat url(https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_M41U25E6mtuU256ls.jpeg) center`}  bgsz="cover" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box>
    <Box bg="var(--holidayGradient)" w="100vw" h="100%" opacity="0.4" pos="absolute"></Box>
                <Box bg={`no-repeat url(${imageLink ? imageLink : "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/g4os77p6ityhxn0ki74v.jpg"}) #333 40% 40%`} bgsz="cover" h="100%" w="100vw"></Box>
                <Flex id="hero" direction={{base: "column", sm: "row"}} pos="absolute" top="0" left="0" align="center" justify="center" w="100%" h="100%" px={{base: "0", md: "2rem", lg: "3rem", xl: "5rem"}} style={{overflow: "hidden"}} gap="0">
                    <Stack style={{boxShadow: "var(--mantine-shadow-bsMediumBoldPrimary)", borderRadius: "0 2.5rem"}}  align="center" justify="center" p="5rem" m={{base: "1rem auto", md: "initial"}}>
                        <Title order={2} ff="body" fw="400" fz="1.1rem" style={{textShadow: "var(--mantine-shadow-tsPrimary)"}} c="white" m="0">Hello, I&apos;m</Title>
                        <Title order={1} fw={900} fz={{base: "4xl", md: "6xl", lg:"5rem"}} style={{textShadow: "var(--mantine-shadow-tsPrimary)"}} c="white" my={{base: "-0.5rem", md: "-0.5rem"}} lh={{ base: "inherit", lg: "5rem"}} ta="center">{name}</Title>
                        <Title order={3} ff="body" fw="400" fz="1.1rem" style={{textShadow: "var(--mantine-shadow-tsPrimary)"}} c="white" mt={{base: "0", md:"1rem"}}>{tagLine}</Title>
                        <PrimaryLinkedButton link={cta?.[1]} isFullWidth={true}>{cta?.[0]}</PrimaryLinkedButton>
                    </Stack>
                    <Group gap="2rem" align="center" justify="center" p="1rem 2.5rem" w="100%">
                        {links.map((link:any) => (
                            <Anchor href={link.linkUrl} key={link.linkTitle} c="white" style={{boxShadow: "var(--mantine-shadow-bsMediumBoldPrimary)", borderRadius: "0 2rem",  textShadow: "var(--mantine-shadow-tsPrimary)", textAlign: "center"}} py={{ base: "2rem", md: "4.5rem"}} px="1rem" fw={900} fz={{base: "lg", md: "1.2rem"}} w="calc(50% - 4rem)">
                                {link.linkTitle}
                            </Anchor>
                        ))}
                    </Group>
                </Flex>
            </Box>
        </>
    )
}
