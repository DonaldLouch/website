'use client'

import {
  Box,
  Text,
  Heading,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Stack,
  Link,
  Button,
  Grid,
  Image,
  AspectRatio,
  Icon,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard";
import { SectionTitle } from "@/app/(Components)/SectionTitle";

import { useEffect, useState } from "react"

import supabase from "@/lib/supabase"
import LoadingComponent from "@/app/(Config)/ContentLoading";

export default function ResumePage({resume, resumeExperience, resumeWorkExperienceHistory, resumeEducation}: any) {
    // const [resume, setResume] = useState<any>([])
    // const [resumeExperience, setResumeExperience] = useState<any>([])
    // const [resumeWorkExperienceHistory, setResumeWorkExperienceHistory] = useState<any>([])
    // const [resumeEducation, setResumeEducation] = useState<any>([])
    // const [isLoading, setIsLoading] = useState<boolean>(true)

    // useEffect(() => {
    //     const fetchSupabaseData = async () => {
    //         const { data: resumeData } = await supabase.from('Resume').select() as any
    //         const { data: experienceData } = await supabase.from('ResumeWorkExperience').select().order('startDate', { ascending: false }) as any
    //         const { data: workExperienceHistoryData } = await supabase.from('ResumeWorkExperienceHistory').select().order('startDate', { ascending: false }) as any
    //         const { data: educationData } = await supabase.from('ResumeEducation').select().order('startDate', { ascending: false }) as any
    //         setResume(resumeData[0])
    //         setResumeExperience(experienceData)
    //         setResumeWorkExperienceHistory(workExperienceHistoryData)
    //         setResumeEducation(educationData)
    //     }
    //     fetchSupabaseData()
    //     setIsLoading(false)
    // }, [])
    return (
        <>
        {/* {isLoading ? <LoadingComponent /> : (
            <> */}
      <Box as="main" color="white">
        <SectionCard id="resume" styleType="primaryCard">
          <Grid
            templateColumns={{ base: "100%", md: "30% 70%", lg: "20% 60% 20%" }}
            gap="2rem"
            pos="relative"
            pr={{ base: "initial", md: "5rem" }}
          >
            <Box
              as="aside"
              pos="sticky"
              top="6rem"
              h="74vh"
              id="bio"
              display={{ base: "none", md: "initial" }}
            >
              <AspectRatio ratio={1}>
                <Image
                  src={resume.avatar}
                  alt="Donald Louch Avatar"
                  width="100%"
                  boxShadow="bsBoldBlue"
                  borderRadius="0 2rem"
                />
              </AspectRatio>
              <Heading
                as="h3"
                mt="1rem"
                textShadow="3px 2px 4px rgb(193 93 79 / 20%)"
                fontSize="1.5rem"
                textAlign="center"
              >
                {resume.firstName} {resume.middleName} {resume.lastName}
              </Heading>
              <Text fontSize="sm" color="gray.500" mt="0" textAlign="center">
                {resume.address}
              </Text>
              <Stack gap="1.8rem" mt="1rem">
                <Button
                  as="a"
                  variant="portalButton"
                  href={resume.linkedin}
                  w="100%"
                  color="white"
                >
                  LinkedIn
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="/about#contact"
                  w="100%"
                  color="white"
                >
                  Contact Me
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href={resume.email}
                  w="100%"
                  color="white"
                >
                  Email Me
                </Button>
              </Stack>
            </Box>

            <Box as="article">
              <SectionTitle
                headingTitle={`${resume.firstName} ${resume.lastName}`}
              />
              <Text fontSize="lg" textAlign="center" mt="1rem">
                {resume.pronouns}
              </Text>
              <Heading textAlign="center" my="1rem" id="profile">
                Profile
              </Heading>
              <Text>
                {resume.profile}
              </Text>

              <Heading
                textAlign="center"
                my="1rem"
                id="skills"
                textShadow="3px 2px 4px rgb(193 93 79 / 20%)"
              >
                Skills
              </Heading>
              <Text>
                {resume.skills}
              </Text>

              <Heading
                textAlign="center"
                my="1rem"
                id="experience"
                textShadow="3px 2px 4px rgb(193 93 79 / 20%)"
              >
                Experience
              </Heading>
              {resumeExperience.map((experience: any) => (
                <Accordion
                  allowToggle
                  mt="2rem"
                  mx="auto"
                  w="100%"
                  textDecoration="none"
                  whiteSpace="break-spaces"
                  wordBreak="break-word"
                  key={experience.id}
                >
                  <AccordionItem border="none">
                    <AccordionButton
                      bg="backgroundGradient"
                      color="white"
                      borderRadius="0 2rem"
                      p="1.5rem 3rem"
                      fontSize="1.2rem"
                      fontWeight="600"
                      fontFamily="body"
                      _hover={{ bg: "none", color: "primary" }}
                      outline="none"
                      _expanded={{ bg: "primary", color: "white" }}
                    >
                      <Box flex="1" textAlign="left">
                        {experience?.startDate === experience?.endDate ? (
                          <>
                            {`${new Date(
                              experience?.startDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: undefined,
                            })}: ${experience.company}`}
                          </>
                        ) : (
                          <>
                            {`${new Date(
                              experience?.startDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: undefined,
                            })} - ${
                              experience?.endDate
                                ? new Date(
                                    experience?.endDate
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: undefined,
                                  })
                                : "Present"
                            }: ${experience.company}`}
                          </>
                        )}
                      </Box>
                      <Icon w="1.5rem" h="1.5rem">
                          <FontAwesomeIcon 
                              icon={["fal", "chevron-down"]}
                              // height="100%"
                              // fontSize="md"
                              color="currentColor"
                          />
                      </Icon>
                    </AccordionButton>
                    <AccordionPanel px="0.5rem" mx="1.5rem">
                      <Heading as="h3" my="1rem">
                        {experience.position}
                      </Heading>
                      <Text>{experience.description}</Text>

                      {resumeWorkExperienceHistory.map((history: any) =>
                        history.workID === experience.id ? (
                          <Box
                            key={history.id}
                            boxShadow="bsBoldBlue"
                            p="2rem"
                            borderRadius="0 2rem"
                            my="1rem"
                          >
                            <Heading as="h3" my="1rem 0.8rem">
                              {history.position}
                            </Heading>
                            <Text color="gray" mb="0.8rem" fontWeight="300">
                              {history?.startDate === history?.endDate ? (
                                <>
                                  {`${new Date(
                                    history?.startDate
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: undefined,
                                  })}`}
                                </>
                              ) : (
                                <>
                                  {`${new Date(
                                    history?.startDate
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: undefined,
                                  })} - ${
                                    history?.endDate
                                      ? new Date(
                                          history?.endDate
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: undefined,
                                        })
                                      : "Present"
                                  }`}
                                </>
                              )}
                            </Text>
                            <Text>{history.description}</Text>
                          </Box>
                        ) : null
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}
              <Heading
                textAlign="center"
                my="1rem"
                id="education"
                textShadow="3px 2px 4px rgb(193 93 79 / 20%)"
              >
                Education
              </Heading>
              {resumeEducation.map((education: any) => (
                <Accordion
                  allowToggle
                  mt="2rem"
                  mx="auto"
                  w="100%"
                  textDecoration="none"
                  whiteSpace="break-spaces"
                  wordBreak="break-word"
                  key={education.id}
                >
                  <AccordionItem border="none">
                    <AccordionButton
                      bg="backgroundGradient"
                      color="white"
                      borderRadius="0 2rem"
                      p="1.5rem 3rem"
                      fontSize="1.2rem"
                      fontWeight="600"
                      fontFamily="body"
                      _hover={{ bg: "none", color: "primary" }}
                      outline="none"
                      _expanded={{ bg: "primary", color: "white" }}
                    >
                      <Box flex="1" textAlign="left">
                        {education?.startDate === education?.endDate ? (
                          <>
                            {`${education.startDate}: ${education.school}`}
                          </>
                        ) : (
                          <>
                            {`${education.startDate} - ${
                              education.endDate ? education.endDate : "Present"
                            }: ${education.school}`}
                          </>
                        )}
                        {/* {`${education.startDate} - ${education.endDate}: ${education.school}`} */}
                      </Box>
                      <Icon w="1.5rem" h="1.5rem">
                        <FontAwesomeIcon 
                            icon={["fal", "chevron-down"]}
                            // height="100%"
                            // fontSize="md"
                            color="currentColor"
                        />
                    </Icon>
                    </AccordionButton>
                    <AccordionPanel px="0.5rem" mx="1.5rem">
                      <Text>{education.description}</Text>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}
              <Heading
                textAlign="center"
                my="1rem"
                id="portfolio"
                textShadow="3px 2px 4px rgb(193 93 79 / 20%)"
              >
                View My Work
              </Heading>

              <Stack
                direction={{ base: "column", xl: "row" }}
                justifyContent="space-between"
                gap={{ base: "0.5rem", xl: "2rem" }}
              >
                <Button
                  as="a"
                  variant="portalButton"
                  href="https://github.com/donaldlouch"
                  w="100%"
                  color="white"
                >
                  Web Production
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="photography"
                  w="100%"
                  color="white"
                >
                  Photography
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="videography"
                  w="100%"
                  color="white"
                >
                  Videography
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="/C/graphic"
                  w="100%"
                  color="white"
                >
                  Graphic Design
                </Button>
              </Stack>

              <Heading
                textAlign="center"
                my="1rem"
                id="download"
                textShadow="3px 2px 4px rgb(193 93 79 / 20%)"
              >
                Download
              </Heading>
              <Text fontSize="1.1rem" lineHeight="1.4rem">
                The File Will Be Downloadable Upon{" "}
                <Link href="/about#contact" variant="primary">
                  Request
                </Link>
              </Text>

              <Text
                textShadow="3px 2px 4px rgb(193 93 79 / 20%)"
                fontSize="sm"
                color="gray.500"
                mt="2rem"
              >{`${new Date(resume?.lastUpdatedOn).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })} at ${new Date(resume?.lastUpdatedOn).toLocaleTimeString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "2-digit",
                }
              )}`}</Text>
            </Box>

            <Box
              as="aside"
              pos="sticky"
              top="6rem"
              h="74vh"
              id="menu"
              display={{ base: "none", lg: "initial" }}
            >
              <Stack gap="1.8rem" mx="1rem">
                <Button
                  as="a"
                  variant="portalButton"
                  href="#profile"
                  w="100%"
                  color="white"
                >
                  Profile
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="#skills"
                  w="100%"
                  color="white"
                >
                  Skills
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="#experience"
                  w="100%"
                  color="white"
                >
                  Experience
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="#education"
                  w="100%"
                  color="white"
                >
                  Education
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="#portfolio"
                  w="100%"
                  color="white"
                >
                  Portfolio
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="#download"
                  w="100%"
                  color="white"
                >
                  Download
                </Button>
              </Stack>
            </Box>
          </Grid>
        </SectionCard>
      </Box>
      {/* </>)} */}
      </>
    )
}
