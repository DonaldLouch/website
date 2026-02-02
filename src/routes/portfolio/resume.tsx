import { GetAboutMe, GetResume } from '@/actions/database/GetDatabase.server'
import MultiAccordion from '@/components/accordions/MultiAccordion'
import HomeButton from '@/components/buttons/HomeButton'
import PrimaryLinkedButton from '@/components/buttons/PrimaryLinkedButton'
import { FooterIcon } from '@/components/layout/(Footer)/FooterIcon'
import TableOfContents from '@/components/TableOfContents'
import DisplayDate from '@/lib/DisplayDate'
import { seo } from '@/utils/seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Title, Text, Image, Anchor, AspectRatio, Badge, Flex, Grid, Group, Paper, Stack } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio/resume')({
    component: RouteComponent,
    loader: async () => {
        return {
            resume: await GetResume({ data: {type: "resume"} }) as any,
            work: await GetResume({ data: {type: "workPlus"} }) as any,
            education: await GetResume({ data: {type: "educationPlus"} }) as any
        }
    },
    head: ({ loaderData }) => ({
        meta: [
            ...seo({
                title: `${loaderData?.resume?.firstName} ${loaderData?.resume?.lastName}'s Resume`,
                description: loaderData?.resume?.bioExcerpt,
                keywords: `${import.meta.env.VITE_KEYWORDS}, ${loaderData?.resume?.firstName} ${loaderData?.resume?.lastName}, ${loaderData?.resume?.firstName}, ${loaderData?.resume?.lastName}, ${loaderData?.resume?.middleName}, resume, ${loaderData?.resume?.firstName} ${loaderData?.resume?.middleName} ${loaderData?.resume?.lastName}, canada, Canadian, photographer, videographer, web developer, devop`,
                image: loaderData?.resume?.avatar,
            }),
        ]
    }),
})

function RouteComponent() {
    const { resume, work, education } = Route.useLoaderData()

    const workArray = (Array.isArray(work) ? work : []).map((experience: any) => ({
      ...experience,
      content: (<>
        <Title order={3}>{experience.position}</Title>
        <Text>{experience.job.description}</Text>
        {Array.isArray(experience.history) &&
          experience.history?.map((history: any) => (
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
          ))}
      </>)
    }))

    const educationArray = (Array.isArray(education) ? education : []).map((education: any) => ({
        ...education,
        content: (<Text>{education.description}</Text>)
      }));
    
    const sections = [
    { label: 'Profile', link: '#profile', order: 1 },
    { label: 'Skills', link: '#skills', order: 1 },
    { label: 'Experience', link: '#experience', order: 1 },
    { label: 'Education', link: '#education', order: 1 },
    { label: 'View My Work', link: '#portfolio', order: 1 },
    { label: 'Download My Resume', link: '#download', order: 1 },
  ]

    return <>
    <Box component="section" id="hero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflowY: "hidden"}} bg="var(--blurredBackground)">
      <Box bg="var(--darkPurple)" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box>
      <Box w="100vw" h="100vh">
          <Image src={resume.avatar} w="100vw" h="100vh"/>
      </Box>
      <Box><HomeButton icon={<FontAwesomeIcon icon={["fadl", "briefcase-blank"]} size="3x" />} link="/portfolio" helperText="Go Back to Portfolio Home" /></Box>
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
                    >
                      {resume.firstName} {resume.middleName} {resume.lastName}
                    </Title>
                    <Text fz="1.3rem" fw="300" m="0">
                        {resume.pronouns}
                    </Text>
                  </Stack>
                  <Stack gap="1rem">
                    <Group>
                      <Badge color="red" leftSection={<FontAwesomeIcon icon={["fal", "calendar"]} size="lg" />}>
                          {resume.currentAge}
                      </Badge>
                      <Badge color="secondary" leftSection={<FontAwesomeIcon icon={["fal", "user"]} size="lg" />}>
                          {resume.tagLine}
                      </Badge>
                      <Badge color="blue" leftSection={<FontAwesomeIcon icon={["fal", "location-pin"]} size="lg"  />}>
                          {resume.address}
                      </Badge>
                    </Group>
                    <Group align="center" my="-1rem">
                      <FooterIcon linkURL={resume.linkedin} socialMedia="Linkedin" icon={{name: "linkedin", pack: "fab"}} />
                      <FooterIcon linkURL="/contact" socialMedia="Contact Me" icon={{name: "message-arrow-up-right", pack: "fadl"}} />
                      <FooterIcon linkURL={`mailto:${resume.email}`} socialMedia="Email Me" icon={{name: "light-envelope-at", pack: "fak"}} />
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

    <Grid
      pos="relative"
      pt="calc(100vh + 1rem)"
      mb="5rem"
      gutter="2rem"
    >
      <Grid.Col span={{base: 12, sm: 10}} ml={{base: "0", sm: "-1rem"}}>
        <Paper p="2rem" color="white" bg="none" shadow="bsBoldPrimary" radius="lg" m="0">
            <Box component="section" id="skills">
              <Title order={3} fz="3rem" fw="300" ta="center">Skills</Title>
              <Text>{resume.skills}</Text>
              </Box>
              <Box component="section" id="experience">
                <Title order={3} fz="3rem" fw="300" ta="center">Experience</Title>
                <MultiAccordion content={workArray} />
              </Box>
              <Box component="section" id="education">
                <Title order={3} fz="3rem" fw="300" ta="center">Education</Title>
                <MultiAccordion content={educationArray} />
              </Box>
              <Box component="section" id="portfolio">
                <Title order={3} fz="3rem" fw="300" ta="center">View My Work</Title>
                <Group my="1rem" align="center" justify="center">
                  <PrimaryLinkedButton link={{ to: "https://github.com/donaldlouch" }} icon={{name: "github", pack: "fab"}}>Web Production</PrimaryLinkedButton>
                  <PrimaryLinkedButton link={{ to: "/portfolio/photography" }} icon={{name: "images"}}>Photography</PrimaryLinkedButton>
                  <PrimaryLinkedButton link={{ to: "/video/$id", params: {id: "clv70b4iy00013b6rinrnxiz7"}}} icon={{name: "films"}}>Videography</PrimaryLinkedButton>
                </Group>
              </Box>
              <Box component="section" id="download">
                <Title order={3} fz="3rem" fw="300" ta="center">Download My Resume</Title>
                  <Text ta="center"><FontAwesomeIcon icon={["fadl", "file-arrow-down"]} size="xl" /> {" "} The File Will Be Downloadable Upon <Anchor href="/contact" c="primary">Request</Anchor></Text>
                  {/* <PrimaryLinkedButton link="about#contact" icon={<BsDownload />} isFullWidth={true}>Request a Download Link</PrimaryLinkedButton> */}
              </Box>
              <Text style={{ textShadow: "3px 2px 4px rgb(193 93 79 / 20%)" }} fz="sm" c="grey" mt="2rem">Last Updated On: <DisplayDate source={resume.lastUpdatedOn} /></Text>
              {/* @ts-ignore */}
              <Anchor href="https://logo.dev" alt="pk_H4gEZdMqTp6aYXA1jzEvzQ"  style={{ textShadow: "3px 2px 4px rgb(193 93 79 / 20%)" }} fz="sm" c="grey" mt="2rem" target="_blank">Logos provided by Logo.dev</Anchor>
        </Paper>
      </Grid.Col>
      <Grid.Col span={2} top="4rem" bottom="-4rem" pos="sticky" h="74vh" display={{base: "none", sm: "initial"}}><TableOfContents sections={sections} /></Grid.Col>
    </Grid>
  </>
}
