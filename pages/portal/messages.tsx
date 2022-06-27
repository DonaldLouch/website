import {
  Box,
  Link,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import PortalLayout from "../../components/Portal/PortalLayout";
import { Metadata } from "../../components/Metadata";
import { SectionTitle } from "../../components/SectionTitle";

import prisma from "../../config/prisma";

export default function Messages({ contactData, jobData }: any) {
  // console.log(contactData, jobData);

  return (
    <>
      <PortalLayout pageTitle="Messages">
        <Metadata
          title={`${process.env.WEBSITE_NAME} | Messages`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
        />
        <Box as="main" id="homeWrapper" color="white">
          <SectionTitle headingTitle="Messages" />
          <Tabs
            variant="soft-rounded"
            colorScheme="purple"
            my="1rem"
            // boxShadow={useColorModeValue("bsBoldBlue", "bsBoldWhite")}
            p="2rem 0"
            borderRadius="0 2rem"
          >
            <TabList display="flex" justifyContent="center">
              <Tab>Contact Form</Tab>
              <Tab>Job Requests</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {contactData?.map((contact: any) => (
                  <>
                    <Stack
                      key={contact.index}
                      boxShadow={useColorModeValue("bsBlue", "bsWhite")}
                      p="1.5rem"
                      color="black"
                      borderRadius="0 1.5rem"
                      justifyContent="center"
                      align="center"
                      m="1rem 2rem"
                      _hover={{
                        boxShadow: useColorModeValue(
                          "bsBoldBlue",
                          "bsBoldWhite"
                        ),
                      }}
                    >
                      <Text
                        fontWeight={500}
                        fontSize="2rem"
                        fontFamily="heading"
                        m="1rem 1rem 0"
                        alignSelf="start"
                      >
                        From: <strong>{contact.name}</strong>
                      </Text>
                      <Stack
                        direction="row"
                        align="center"
                        justify="space-between"
                        w="100%"
                      >
                        <Text fontSize="1.3rem">
                          Subject: <strong>{contact.subject}</strong>
                        </Text>
                        <Text fontSize="1rem" color="grey">
                          On: <strong>{contact.sentOn}</strong>
                        </Text>
                      </Stack>
                      <Link
                        href={`/portal/messagesC/${contact.id}`}
                        variant="primaryButton"
                        w="100%"
                      >
                        View Message
                      </Link>
                    </Stack>
                  </>
                ))}
              </TabPanel>
              <TabPanel>
                {jobData?.map((contact: any) => (
                  <>
                    <Stack
                      key={contact.index}
                      boxShadow={useColorModeValue("bsBlue", "bsWhite")}
                      p="1.5rem"
                      color="black"
                      borderRadius="0 1.5rem"
                      justifyContent="center"
                      align="center"
                      m="1rem 2rem"
                      _hover={{
                        boxShadow: useColorModeValue(
                          "bsBoldBlue",
                          "bsBoldWhite"
                        ),
                      }}
                    >
                      <Text
                        fontWeight={500}
                        fontSize="2rem"
                        fontFamily="heading"
                        m="1rem 1rem 0"
                        alignSelf="start"
                      >
                        From:
                        <strong>
                          {contact.name}
                          {contact.company != null
                            ? ` (${contact.company})`
                            : null}
                        </strong>
                      </Text>
                      <Stack
                        direction="row"
                        align="center"
                        justify="space-between"
                        w="100%"
                      >
                        <Text fontSize="1.3rem">
                          Job Request Type: <strong>{contact.type}</strong>
                        </Text>
                        <Text fontSize="1rem" color="grey">
                          On: <strong>{contact.sentOn}</strong>
                        </Text>
                      </Stack>
                      <Link
                        href={`/portal/messagesJ/${contact.id}`}
                        variant="primaryButton"
                        w="100%"
                      >
                        View Request
                      </Link>
                    </Stack>
                  </>
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </PortalLayout>
    </>
  );
}

export async function getServerSideProps() {
  const contactData = await prisma.contact.findMany({
    orderBy: {
      sentOn: "desc",
    },
  });

  const jobData = await prisma.job.findMany({
    orderBy: {
      sentOn: "desc",
    },
  });

  return {
    props: {
      contactData: JSON.parse(JSON.stringify(contactData)),
      jobData: JSON.parse(JSON.stringify(jobData)),
    },
  };
}
