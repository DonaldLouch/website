'use client'

import {
  Box,
  Text,
  Title,
  Stack,
  Anchor,
  Grid,
  AspectRatio,
  Image,
  Paper,
  Group,
  Flex,
  Badge,
} from "@mantine/core";

import DisplayDate from "@/lib/DisplayDate";
// import { BsCalendar2, BsCamera2, BsCameraReels, BsDownload, BsEnvelopeAt, BsGithub, BsLinkedin, BsPersonBadge, BsPinMap, BsSend } from "react-icons/bs";
import TableOfContents from "@/app/(Components)/TableOfContents";
import { FooterIcon } from "@/app/(Config)/(Layout)/(Footer)/FooterIcon";
import MultiAccordion from "@/app/(Components)/(Accordion)/MultiAccordion";
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";
import HomeButton from "@/app/(Components)/(Buttons)/HomeButton";
import HugeIcon from "@/app/(Components)/HugeIcon";

export default function ResumePage({resume, resumeExperience, resumeWorkExperienceHistory, resumeEducation}: any) {
  const sections = [
    { label: 'Profile', link: '#profile', order: 1 },
    { label: 'Skills', link: '#skills', order: 1 },
    { label: 'Experience', link: '#experience', order: 1 },
    { label: 'Education', link: '#education', order: 1 },
    { label: 'View My Work', link: '#portfolio', order: 1 },
    { label: 'Download My Resume', link: '#download', order: 1 },
  ]

  const resumeExperienceArray = new Array()
  resumeExperience.forEach((experience: any) => {
    const historyArray = new Array()
    resumeWorkExperienceHistory.forEach((history: any) => {
        history.workID === experience.id ? (
        historyArray.push(history)
        ) : null
    })

    const iconImage = experience.company === "McDonald's" 
    ? "https://cdn.brandfetch.io/mcdonalds.ca" 
    : experience.company === "Donald Louch Productions" ? "/logo/logo.svg" 
    : experience.company === "Vancouver Island University" ? "https://cdn.brandfetch.io/viu.ca" 
    : experience.company === "Royal Roads University" ? "https://cdn.brandfetch.io/royalroads.ca" 
    : experience.company === "Antica Productions" ? "https://cdn.brandfetch.io/anticaproductions.com" 
    : experience.company === "Westshore Centre for Learning and Training" ? "https://logo.clearbit.com/sd62.bc.ca" 
    : null

    resumeExperienceArray.push({
      id: experience.id,
      imageType: iconImage ? "Avatar" : null,
      image: iconImage ? iconImage : null,
      label: experience?.startDate === experience?.endDate ? (<><DisplayDate source={experience?.startDate} format="MMMM YYYY" />: {experience.company}</>) : (<><DisplayDate source={experience?.startDate} format="MMMM YYYY" /> - {experience?.endDate ? <DisplayDate source={experience?.endDate} format="MMMM YYYY" /> : "Present"}: {experience.company}</>),
      description: historyArray.length > 1 ? `${experience.position} + ${historyArray.length} other positions` : experience.position,
      content: <><Title order={3}>{experience.position}</Title>
        <Text>{experience.description}</Text>

        {historyArray.map((history: any) => (
          <Box
            key={history.id}
            style={{boxShadow: "var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)"}}
            p="2rem"
            my="1rem"
          >
            <Title order={4}>{history.position}</Title>
            <Text c="grey" mb="2rem" fw="300" lh="0" fz="1.1rem">{history?.startDate === history?.endDate 
              ? (<DisplayDate source={history?.startDate} format="MMMM YYYY" />) 
              : (<><DisplayDate source={history?.startDate} format="MMMM YYYY" /> - {history?.endDate ? <DisplayDate source={history?.endDate} format="MMMM YYYY" /> : "Present"}</>)
            }</Text>
            <Text>{history.description}</Text>
          </Box>
          ))}</>
    })
  })

  const educationArray = new Array()
  resumeEducation.forEach((education: any) => {
    const iconImage = education.school === "Vancouver Island University" ? "https://cdn.brandfetch.io/viu.ca" 
    : education.school === "Camosun College" ? "https://cdn.brandfetch.io/camosun.ca" 
    : education.school === "Westshore Centre for Learning and Training" ? "https://logo.clearbit.com/sd62.bc.ca" 
    : education.school === "Dunsmuir Middle School" ? "https://logo.clearbit.com/sd62.bc.ca" 
    : null

    educationArray.push({
      id: education.id,
      imageType: iconImage ? "Avatar" : null,
      image: iconImage ? iconImage : null,
      label: education?.startDate === education?.endDate ? (<>{education.startDate}: {education.school}</>) : (<>{education.startDate} - {education.endDate ? education.endDate : "Present"}: {education.school}</>),
      description: education.degree,
      content: <Text>{education.description}</Text>
    })
  })

  return (<>
    <Box component="section" id="hero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflowY: "hidden"}} bg="var(--blurredBackground)">
      <Box bg="var(--darkPurple)" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box>
      <Box w="100vw" h="100vh">
          {/* TO DO: CHANGE IMAGE! */}
          <Image src={resume.avatar} w="100vw" h="100vh"/>
      </Box>
      <Box><HomeButton icon={<HugeIcon name="briefcase-02" size="3rem" />} link="/portfolio" helperText="Go Back to Portfolio Home" /></Box>
      <Stack component="section" pos="absolute" top="0" left="0" h="100vh" mx={{base: "0.5rem", md: "2rem"}} mah={{base: "auto", sm: "calc(100vh - 2rem)"}} style={{ overflow: "scroll" }} justify="center" miw="calc(100% - 2rem)">
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
              >
                <AspectRatio ratio={1/1} 
                  w={{base: "28%", md: "28%"}}
                >
                  <Image src={resume.avatar} alt={`${resume.firstName} ${resume.lastName}`} radius="md" style={{ objectPosition: "top", boxShadow: "var(--mantine-shadow-bsSMPrimary)"}} />
                </AspectRatio>               
                <Flex direction="column" align={{base: "center", lg: "flex-start"}} mt={{base: "1rem", md: "0"}} gap="2rem">
                  <Stack gap="0">
                    <Title
                      order={1}
                      mt="1rem"
                      style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
                      fz={{ base: "7vw", md:"5vw" }}
                      ta="center"
                      fw="800"
                      td="underline 0.4rem var(--primary)"
                      // textDecorationThickness="0.4rem"
                      // textDecorationColor="primary"
                    >
                      {resume.firstName} {resume.middleName} {resume.lastName}
                    </Title>
                    <Text fz="1.3rem" fw="300" m="0">
                        {resume.pronouns}
                    </Text>
                  </Stack>
                  <Stack gap="1rem">
                    <Group>
                      <Badge color="red" leftSection={<HugeIcon name="calendar-03" />}>
                          {resume.currentAge}
                      </Badge>
                      <Badge color="secondary" leftSection={<HugeIcon name="contact" />}>
                          {resume.tagLine}
                      </Badge>
                      <Badge color="blue" leftSection={<HugeIcon name="pin-location-03" />}>
                          {resume.address}
                      </Badge>
                    </Group>
                    <Group align="center" my="-1rem">
                      <FooterIcon linkURL={resume.linkedin} socialMedia="Linkedin" linkIcon="linkedin-02" />
                      <FooterIcon linkURL="/contact" socialMedia="Contact Me" linkIcon="chatting-01" />
                      <FooterIcon linkURL={`mailto:${resume.email}`} socialMedia="Email Me" linkIcon="mail-at-sign-01" />
                    </Group>
                    </Stack>
                  </Flex>
              </Flex>
              <Stack gap="1rem" m="1rem" mah="30vh" style={{overflow: "scroll"}}>
                <Title 
                  order={3} 
                  fz={{base: "4.5vw", lg: "3.5vw", xl: "2.5vw"}}
                  ff="heading"
                  fw="400"
                  td="underline 0.2rem var(--primary)"
                  mb="-2rem"
                >Profile</Title>
                <Text>{resume.profile}</Text>
              </Stack>
          </Box>
      </Stack>
  </Box>
    {/* <Box w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0%" left="0%" style={{zIndex: "90", boxShadow: "bsSecondary", overflow: "hidden !Important"}} bg="var(--darkPurple)" id="profile">
      <Box 
        style={{
              filter: "opacity(80%)",
              borderRadius: "var(--mantine-radius-lg)",
              boxShadow: "var(--mantine-shadow-bsBoldPrimary)"
          }}
          mx={{base: "1rem", md: "3rem"}}
          my={{base: "8rem", md: "11rem"}}
          bg="none"
          c="white"
      >
          <Flex
              direction={{base: "column", md: "row"}}
              gap={{base: "0.5rem", md: "3rem"}}
              justify="flex-start"
              align="center"
              // mb="2rem"
              p="2rem 2rem 0" 
          >
            <AspectRatio ratio={1/1} 
              w={{base: "28%", md: "28%"}}
            >
              <Image src={resume.avatar} alt={`${resume.firstName} ${resume.lastName}`} radius="md" style={{ objectPosition: "top", boxShadow: "var(--mantine-shadow-bsSMPrimary)"}} />
            </AspectRatio>               
            <Flex direction="column" align={{base: "center", lg: "flex-start"}} mt={{base: "1rem", md: "0"}} gap="2rem">
              <Stack gap="0">
                <Title
                  order={1}
                  mt="1rem"
                  style={{textShadow: "3px 2px 4px rgb(193 93 79 / 20%)"}}
                  fz={{ base: "7vw", md:"5vw" }}
                  ta="center"
                  td="underline 0.4rem var(--primary)"
                  // textDecorationThickness="0.4rem"
                  // textDecorationColor="primary"
                >
                  {resume.firstName} {resume.middleName} {resume.lastName}
                </Title>
                <Text fz="2rem">
                    {resume.pronouns}
                </Text>
              </Stack>
              <Stack gap="1rem">
                <Group>
                  <Badge color="red" leftSection={<Calendar03Icon />}>
                      {resume.currentAge}
                  </Badge>
                  <Badge color="secondary" leftSection={<ContactIcon />}>
                      {resume.tagLine}
                  </Badge>
                  <Badge color="blue" leftSection={<PinLocation03Icon />}>
                      {resume.address}
                  </Badge>
                </Group>
                <Group align="center" my="-1rem">
                  <FooterIcon linkURL={resume.linkedin} socialMedia="Linkedin" linkIcon={<Linkedin02Icon />} />
                  <FooterIcon linkURL="/contact" socialMedia="Contact Me" linkIcon={<Chatting01Icon />} />
                  <FooterIcon linkURL={`mailto:${resume.email}`} socialMedia="Email Me" linkIcon={<MailAtSign02Icon />} />
                </Group>
              </Stack>
            </Flex>
          </Flex>
          <Stack p="2rem" m="0" gap="0">
            <Title 
              order={3} 
              fz={{base: "5vw", lg: "4vw", xl: "3vw"}}
              ff="text"
              fw="300"
              td="underline 0.2rem var(--primary)"
            >Profile</Title>
            <Text>{resume.profile}</Text>
          </Stack>
          
      </Box>
    </Box> */}

    <Grid
      pos="relative"
      pt="calc(100vh + 1rem)"
      mb="5rem"
      gutter="2rem"
    >
      <Grid.Col span={{base: 12, sm: 10}} ml={{base: "0", sm: "-1rem"}}>
        <Paper p="2rem" color="white" bg="none" shadow="bsBoldPrimary" radius="lg" m="0">
          {/* <AspectRatio ratio={8.5 / 11}> */}
            <Box component="section" id="skills">
              <Title order={3} fz="3rem" fw="300" ta="center">Skills</Title>
              <Text>{resume.skills}</Text>
              </Box>
              <Box component="section" id="experience">
                <Title order={3} fz="3rem" fw="300" ta="center">Experience</Title>
                <MultiAccordion content={resumeExperienceArray} />
              </Box>
              <Box component="section" id="education">
                <Title order={3} fz="3rem" fw="300" ta="center">Education</Title>
                <MultiAccordion content={educationArray} />
              </Box>
              <Box component="section" id="portfolio">
                <Title order={3} fz="3rem" fw="300" ta="center">View My Work</Title>
                <Group my="1rem" align="center" justify="center">
                  <PrimaryLinkedButton link="https://github.com/donaldlouch" icon={<HugeIcon name="github" />}>Web Production</PrimaryLinkedButton>
                  <PrimaryLinkedButton link="/portfolio/photography" icon={<HugeIcon name="album-02" />}>Photography</PrimaryLinkedButton>
                  <PrimaryLinkedButton link="/video/clv70b4iy00013b6rinrnxiz7" icon={<HugeIcon name="camera-video" />}>Videography</PrimaryLinkedButton>
                </Group>
              </Box>
              <Box component="section" id="download">
                <Title order={3} fz="3rem" fw="300" ta="center">Download My Resume</Title>
                  <Text ta="center"><HugeIcon name="message-download-01" /> {" "} The File Will Be Downloadable Upon <Anchor href="/contact" c="primary">Request</Anchor></Text>
                  {/* <PrimaryLinkedButton link="about#contact" icon={<BsDownload />} isFullWidth={true}>Request a Download Link</PrimaryLinkedButton> */}
              </Box>
              <Text style={{ textShadow: "3px 2px 4px rgb(193 93 79 / 20%)" }} fz="sm" c="grey" mt="2rem">Last Updated On: <DisplayDate source={resume.lastUpdatedOn} /></Text>
          {/* </AspectRatio> */}
        </Paper>
      </Grid.Col>
      <Grid.Col span={2} top="4rem" bottom="-4rem" pos="sticky" h="74vh" display={{base: "none", sm: "initial"}}><TableOfContents sections={sections} /></Grid.Col>
    </Grid>
  </>)
}
