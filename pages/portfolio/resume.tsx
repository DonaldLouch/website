import React from "react";

import {
  Box,
  Text,
  Heading,
  useColorModeValue,
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
} from "@chakra-ui/react";

import { Metadata } from "../../components/Metadata";

import prisma from "../../config/prisma";

import { SectionCard } from "../../components/Cards/SectionCard";
import { SectionTitle } from "../../components/SectionTitle";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "../../config/fontAwesome";
import useSWR from "swr";

import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Test({
  resumeData,
  resumeExperienceData,
  resumeWorkExperienceHistoryData,
  resumeEducationData,
}: any) {
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const pageID = "pageL4UBGH6Awzq" as string;
  useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  // const pageID = "pageL4UBGH6Awzq" as string
  // updatePostView(pageID)
  // async function updatePostView(pageID: string) {
  //     await fetch('/api/pages/updateView', {
  //         method: 'POST',
  //         body: JSON.stringify(pageID)
  //     })
  // }
  const resume = resumeData?.[0];
  const resumeExperience = resumeExperienceData;
  const resumeWorkExperienceHistory = resumeWorkExperienceHistoryData;
  const resumeEducation = resumeEducationData;

  return (
    <>
      <Metadata
        title="Donald Louch's Resume"
        keywords={`${process.env.KEYWORDS}, Donald Louch, donald, louch, resume`}
        description={`${resume.bioExcerpt}`}
      />
      <Box as="main" color={useColorModeValue("black", "white")}>
        <SectionCard id="signup" styleType="primaryCard">
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
              <Stack gap="0.5rem">
                <Button
                  as="a"
                  variant="portalButton"
                  href={resume.linkedin}
                  w="100%"
                  color={useColorModeValue("black", "white")}
                >
                  LinkedIn
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="/about#contact"
                  w="100%"
                  color={useColorModeValue("black", "white")}
                >
                  Contact Me
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href={resume.email}
                  w="100%"
                  color={useColorModeValue("black", "white")}
                >
                  Email Me
                </Button>
              </Stack>
            </Box>

            <Box as="article">
              <SectionTitle
                headingTitle={`${resume.firstName} ${resume.lastName}`}
              />
              <Text fontSize="lg" textAlign="center">
                {resume.pronouns}
              </Text>
              <Heading textAlign="center" my="1rem" id="profile">
                Profile
              </Heading>
              <Text fontSize="1.1rem" lineHeight="1.4rem">
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
              <Text fontSize="1.1rem" lineHeight="1.4rem">
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
                      fontFamily="Lato"
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
                      <Box
                        mr="4"
                        width={{ base: "4%", md: "12%" }}
                        color="white"
                      >
                        <ChevronDownIcon
                          color="currentColor"
                          w="3rem"
                          h="3rem"
                        />
                        {/* <FontAwesomeIcon
                          icon={["fas", "chevron-down"]}
                          width="100%"
                        /> */}
                      </Box>
                    </AccordionButton>
                    <AccordionPanel>
                      <Heading as="h3" my="1rem">
                        {experience.position}
                      </Heading>
                      <Text fontSize="1.1rem">{experience.description}</Text>

                      {resumeWorkExperienceHistory.map((history: any) =>
                        history.resumeID === experience.id ? (
                          <Box
                            key={history.id}
                            boxShadow="bsBoldBlue"
                            p="2rem"
                            borderRadius="0 2rem"
                            my="1rem"
                          >
                            <Heading as="h3" my="1rem">
                              {history.position}
                            </Heading>
                            <Text fontSize="1.1rem">
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
                            <Text fontSize="1.1rem">{history.description}</Text>
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
                      fontFamily="Lato"
                      _hover={{ bg: "none", color: "primary" }}
                      outline="none"
                      _expanded={{ bg: "primary", color: "white" }}
                    >
                      <Box flex="1" textAlign="left">
                        {`${education.startDate} - ${education.endDate}: ${education.school}`}
                      </Box>
                      <Box
                        mr="4"
                        width={{ base: "4%", md: "12%" }}
                        color="white"
                      >
                        <ChevronDownIcon
                          color="currentColor"
                          w="3rem"
                          h="3rem"
                        />
                        {/* <FontAwesomeIcon
                          icon={["fas", "chevron-down"]}
                          width="100%"
                        /> */}
                      </Box>
                    </AccordionButton>
                    <AccordionPanel>
                      <Text fontSize="1.1rem">{education.description}</Text>
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
                  color={useColorModeValue("black", "white")}
                >
                  Web Production
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="photography"
                  w="100%"
                  color={useColorModeValue("black", "white")}
                >
                  Photography
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="videography"
                  w="100%"
                  color={useColorModeValue("black", "white")}
                >
                  Videography
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="/C/graphic"
                  w="100%"
                  color={useColorModeValue("black", "white")}
                >
                  Graphic Design
                </Button>
                {/* <Button as="a" variant="portalButton" href="written" w="100%" color={useColorModeValue("black", "white")}>Written Work</Button> */}
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
              {/* const postedDay = postedData.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const postedTime = postedData.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) */}

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
              <Stack gap="1.4rem" mx="1rem">
                <Button
                  as="a"
                  variant="portalButton"
                  href="#profile"
                  w="100%"
                  color={useColorModeValue("black", "white")}
                >
                  Profile
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="#skills"
                  w="100%"
                  color={useColorModeValue("black", "white")}
                >
                  Skills
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="#experience"
                  w="100%"
                  color={useColorModeValue("black", "white")}
                >
                  Experience
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="#education"
                  w="100%"
                  color={useColorModeValue("black", "white")}
                >
                  Education
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="#portfolio"
                  w="100%"
                  color={useColorModeValue("black", "white")}
                >
                  Portfolio
                </Button>
                <Button
                  as="a"
                  variant="portalButton"
                  href="#download"
                  w="100%"
                  color={useColorModeValue("black", "white")}
                >
                  Download
                </Button>
              </Stack>
            </Box>
          </Grid>
        </SectionCard>
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const resumeData = await prisma.resume.findMany({});

  const resumeExperienceData = await prisma.resumeWorkExperience.findMany({
    orderBy: { startDate: "desc" },
  });

  const resumeWorkExperienceHistoryData = await prisma.resumeWorkExperienceHistory.findMany(
    {
      orderBy: { startDate: "desc" },
    }
  );

  const resumeEducationData = await prisma.resumeEducation.findMany({
    orderBy: { startDate: "desc" },
  });

  return {
    props: {
      resumeData: JSON.parse(JSON.stringify(resumeData)),
      resumeExperienceData: JSON.parse(JSON.stringify(resumeExperienceData)),
      resumeWorkExperienceHistoryData: JSON.parse(
        JSON.stringify(resumeWorkExperienceHistoryData)
      ),
      resumeEducationData: JSON.parse(JSON.stringify(resumeEducationData)),
    },
  };
}
