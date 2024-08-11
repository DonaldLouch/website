import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton"
import { Briefcase02Icon, Chatting01Icon, DashboardSquare02Icon, Folder01Icon, JobSearchIcon, Link01Icon, Link04Icon, NewsIcon, Passport01Icon, PassportIcon } from "@hugeicons/react"
import { Stack, Flex, AspectRatio, Title, Group, Box, Image, Text, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
// import { BsFolder2Open, BsImages, BsFilePerson, BsSend, BsPersonBadge, BsLink45Deg } from "react-icons/bs"

export default function HomeHeroSection({aboutMe}: any) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  
  return <Box component="section" id="homeHero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflowY: "hidden"}} bg="var(--blurredBackground)">
    <Box bg="var(--mainGradient)" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box>
    <Box h="100%" w="100vw" visibleFrom="sm">
      <video src="https://donaldlouch.s3.us-west-004.backblazeb2.com/videography/videography_LV70B8VTthp427b6b.mp4" muted loop autoPlay></video>
    </Box>
    <Box hiddenFrom="sm" bg={`no-repeat url("https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LOALIC887xh5HW4rj.jpg") #333 40% 40%`} bgsz="cover" h="100%" w="100vw"></Box>

    {/* <Box h="100%" w="100%" hiddenFrom="sm" bg="url(https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LNQUPGZ0x3vPA2ztg.jpg)" bgp="center" bgsz="cover">
      <Image src="https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LNQUPGZ0x3vPA2ztg.jpg" alt="Home Hero" />
    </Box> */}
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
                ta="center"
                fw="800"
                td="underline 0.4rem var(--primary)"
              >
                {aboutMe.firstName} {aboutMe.middleName} {aboutMe.lastName}
              </Title>
              <Text fz={{base: "1.1rem", sm: "1.3rem"}} fw="300" m="0" display={{base: "none", sm: "initial"}}>
                {aboutMe.pronouns}
              </Text>
            </Stack>
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
        <PrimaryLinkedButton link="/portfolio" icon={<Briefcase02Icon />}>Portfolio</PrimaryLinkedButton>
        <PrimaryLinkedButton link="/feed" icon={<DashboardSquare02Icon />}>Feed</PrimaryLinkedButton>
        <PrimaryLinkedButton link="/blog" icon={<NewsIcon />}>Blog</PrimaryLinkedButton>
        <PrimaryLinkedButton link="/portfolio/resume" icon={<PassportIcon />}>Resume</PrimaryLinkedButton>
        <PrimaryLinkedButton link="#links" icon={<Link04Icon />}>Links</PrimaryLinkedButton>
        <PrimaryLinkedButton link="/contact" icon={<Chatting01Icon />}>Contact</PrimaryLinkedButton>
        <PrimaryLinkedButton link="/portal/projects?openID=newProject" icon={<JobSearchIcon />}>Hire Me!</PrimaryLinkedButton>
      </Group>
    </Stack>
  </Box>
}
