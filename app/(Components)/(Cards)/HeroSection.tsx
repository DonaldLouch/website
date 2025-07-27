'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryLinkedButton from "../(Buttons)/PrimaryLinkedButton"
import { Stack, Flex, AspectRatio, Title, Group, Box, Image, Text, useMantineTheme, Anchor, Badge } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";


export default function HeroSection({aboutMe, links, imageLink, cta}: any) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  // console.log(cta)
  
  return <Box component="section" id="homeHero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflowY: "hidden"}} bg="var(--blurredBackground)">
    <Box bg="var(--mainGradient)" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box>
    {/* <Box bg= {`no-repeat url(https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_M41U25E6mtuU256ls.jpeg) center`}  bgsz="cover" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box> */}
    {/* <Box bg="var(--holidayGradient)" w="100vw" h="100%" opacity="0.4" pos="absolute"></Box> */}
    {/* <Box h="100%" w="100%">
      <Image src={`${imageLink}`} alt="Home Hero" style={{objectPosition: "centre", objectFit: "cover"}} />
    </Box> */}
    <Box bg={`no-repeat url(${imageLink ? imageLink : "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/g4os77p6ityhxn0ki74v.jpg"}) #333 40% 40%`} bgsz="cover" h="100%" w="100vw"></Box>
    <Stack component="section" pos="absolute" top="0" left="0" h="100vh" mx={{base: "0.5rem", md: "2rem"}} mah={{base: "100%", sm: "calc(100vh - 2rem)"}} style={{ overflow: "scroll" }} justify="center">
      <Box bg="var(--darkPurpleRGBA)" style={{
        boxShadow: "var(--mantine-shadow-bsSMPrimary)",
        backdropFilter: "blur(20px)",
        borderRadius: "var(--mantine-radius-lg)"
      }} w={{base:  "calc(100% - 1rem)",  md: "calc(100% - 2rem)"}} p={{base: "1rem", sm: "2rem"}}>
        <Flex
          direction={{base: "row", sm: "row"}}
          gap={{base: "0.5rem", sm: "2rem"}}
          justify="flex-start"
          align="center"
          // mb="2rem"
          // p="2rem 2rem 0" 
        >
          <AspectRatio ratio={1/1} 
            w={{base: "20%", sm: "20%"}}
          >
            <Image src={aboutMe.avatar} alt={`${aboutMe.firstName} ${aboutMe.lastName}`} radius="md" style={{ objectPosition: "top", boxShadow: "var(--mantine-shadow-bsSMPrimary)"}} />
          </AspectRatio>               
          <Flex direction="column" align={{base: "center", sm: "flex-start"}} mt={{base: "1rem", sm: "0"}} gap="2rem">
            <Stack gap="0">
              <Title
                order={1}
                style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
                fz="5vw"
                fw="800"
                ta="center"
                td="underline 0.4rem var(--primary)"
              >
                {aboutMe.firstName} {aboutMe.lastName}
              </Title>
              <Text fz={{base: "1.1rem", sm: "1.3rem"}} fw="300" m="0" display={{base: "none", sm: "initial"}}>
                {aboutMe.pronouns}
              </Text>
            </Stack>
            {cta && <Anchor href={cta[0].ctaLink} style={{color: "currentColor"}}>
                <Badge color="var(--secondary)" leftSection={cta[0].ctaVector && <FontAwesomeIcon icon={[cta[0].ctaVector.pack || "fadl", cta[0].ctaVector.name]} size="xl" />}>
                    {cta[0].ctaTitle}
                </Badge>
            </Anchor>}
          </Flex>
        </Flex>
        <Stack>
          <Title 
            order={3} 
            fz="2.5vw"
            ff="heading"
            fw="400"
            td="underline 0.2rem var(--primary)"
            display={{base: "none", sm: "initial"}}
             mb="-2rem"
          >{aboutMe.tagLine}</Title>
          <Text c="white">{mobile ? aboutMe.bioExcerpt : aboutMe.bio}</Text>
        </Stack>
      </Box>
      <Group justify="center">
        {links && links.map((link: any) => <PrimaryLinkedButton key={link.linkUrl} link={link.linkUrl} primNewIcon={link.linkIcon} >{link.linkTitle}</PrimaryLinkedButton>)}
      </Group>
    </Stack>
  </Box>
}
