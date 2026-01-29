import PrimaryLinkedButton from "@/components/buttons/PrimaryLinkedButton"
import { Stack, Flex, AspectRatio, Title, Group, Box, Image, Text, useMantineTheme, Spoiler } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
// import { BsFolder2Open, BsImages, BsFilePerson, BsSend, BsPersonBadge, BsLink45Deg } from "react-icons/bs"

export default function HomeHeroSection({aboutMe}: any) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const [expanded, setExpanded] = useState(false)

  const quickLinks = [
    { 
      link: { to: "/portfolio"},
      icon: { name: "briefcase-blank", pack: "fadl" },
      title: "Portfolio"
    },
    { 
      link: { to: "/feed" },
      icon: { name: "rectangle-history", pack: "fadl" },
      title: "Feed"
    },
    { 
      link: { to: "/blog" },
      icon: { name: "blog" },
      title: "Blog"
    },
    { 
      link: { to: "#links" },
      icon: { name: "link" },
      title: "Links"
    },
    { 
      link: { to: "/contact" },
      icon: { name: "comment-arrow-up-right", pack: "fadl" },
      title: "Contact"
    },
    { 
      link: { to: "/contact", search: { search: "type", value: "hire" } },
      icon: { name: "light-briefcase-blank-magnifying-glass", pack: "fak" },
      title: "Hire Me!"
    },
  ]

  return <Box component="section" id="homeHero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", overflowY: "hidden"}} bg="var(--blurredBackground)">
    {/* <Box bg= {`no-repeat url(https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_M41U25E6mtuU256ls.jpeg) center`}  bgsz="cover" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box> */}
    <Box bg="var(--mainGradient)" w="100vw" h="100%" opacity="0.4" pos="absolute" style={{zIndex: "110", overflowY: "hidden"}}></Box>
    {/* <Box h="100%" w="100vw" visibleFrom="sm"> */}
    <AspectRatio ratio={16/9} h="100%" w="100vw" visibleFrom="sm" pos="absolute" style={{zIndex: "100", overflowY: "hidden"}} bg="var(--mainGradient)">
      <video src="https://donaldlouch.s3.us-west-004.backblazeb2.com/videography/videography_LV70B8VTthp427b6b.mp4" muted loop autoPlay></video>
    </AspectRatio>
    {/* </Box> */}
    <Box hiddenFrom="sm" bg={`no-repeat url("https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_M1ISNFD4g4o2T6pt3.jpeg") center`} bgsz="cover" h="100%" w="100vw"></Box>

    {/* <Box h="100%" w="100%" hiddenFrom="sm" bg="url(https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LNQUPGZ0x3vPA2ztg.jpg)" bgp="center" bgsz="cover">
      <Image src="https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LNQUPGZ0x3vPA2ztg.jpg" alt="Home Hero" />
    </Box> */}
    <Stack component="section" pos="absolute" 
      top="0%" 
      left="0%" 
      h="100vh" 
      // mx="1rem"
      mx={{base: "2rem", lg: "1rem"}} 
      mah={{base: "100%", sm: "calc(100vh)"}} 
      style={{ zIndex: "1000", overflow: "hidden" }} 
      justify="center"
      align="center"
      p="0rem"
      // m="0"
    >
      <Box bg="var(--darkPurpleRGBA)" style={{
        boxShadow: "var(--mantine-shadow-bsSMPrimary)",
        backdropFilter: "blur(20px)",
        borderRadius: "var(--mantine-radius-lg)"
      }} 
      // w={{base:  "calc(100% - 1rem)",  md: "calc(100% - 2rem)"}} 
      p={{base: "1rem", sm: "1.5rem"}}
      >
        <Flex
          direction={{base: "row", sm: "row"}}
          gap={{base: "0.5rem", sm: "2rem"}}
          // p="1rem"
          // p={{base: "1rem 1rem 0", sm: "1.5rem 1.5rem 1rem"}}
          justify="flex-start"
          align="center"
          // mb="2rem"
          // p="2rem 2rem 0" 
        >
          <AspectRatio ratio={1/1} 
            w={{base: "20%", sm: "20%"}}
          >
            <Image src={aboutMe.avatar ? aboutMe.avatar : "https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LOANPCWJe9jTCQ2fh.jpg"} alt={aboutMe.firstName && aboutMe.lastName ?`${aboutMe.firstName} ${aboutMe.lastName}` : "Donald Louch"} radius="md" style={{ objectPosition: "top", boxShadow: "var(--mantine-shadow-bsSMPrimary)"}} />
          </AspectRatio>               
          <Flex direction="column" align={{base: "center", sm: "flex-start"}} mt={{base: "1rem", sm: "0"}} gap="2rem">
            <Stack gap="0">
              <Title
                order={1}
                style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
                fz="5vw"
                ta="center"
                fw="800"
                td="underline 0.4rem var(--primary)"
              >
                {aboutMe.firstName} {aboutMe.lastName}
              </Title>
              <Text fz={{base: "1.1rem", sm: "1.3rem"}} fw="300" m="0" display={{base: "none", sm: "initial"}}>
                {aboutMe.pronouns}
              </Text>
            </Stack>
          </Flex>
        </Flex>
        <Stack mah={{base: "initial", sm: "40vw", md: "30vw", lg: "50vw"}} style={{overflow: "scroll"}}>
          <Title 
            order={3} 
            fz="2.5vw"
            ff="heading"
            fw="400"
            td="underline 0.2rem var(--primary)"
            display={{base: "none", sm: "initial"}}
            mb="-2rem"
          >{aboutMe.tagLine}</Title>
          {mobile ?
            <Box mah="50vh" style={{overflow: "scroll"}}>
              {/* 165 */}
              <Spoiler maxHeight={165} showLabel="Read Full Bio" hideLabel="Hide" expanded={expanded} onExpandedChange={setExpanded}>
              <Text>{!expanded && aboutMe.bioExcerpt}</Text>
              <Text>{!expanded && " "}</Text>
              <Text>{aboutMe.bio}</Text>
              </Spoiler>
            </Box> 
          : <Text>{aboutMe.bio}</Text>}
        </Stack>
      </Box>
      <Group justify="center">
        {quickLinks.map((link, index): any => {
          <PrimaryLinkedButton key={index} link={link.link} icon={link.icon}>{link.title}</PrimaryLinkedButton>
        })}
      </Group>
    </Stack>
  </Box>
}
