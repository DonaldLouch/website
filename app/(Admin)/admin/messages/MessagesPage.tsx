'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import { Box, Link, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"

export default function MessagesPage({contactData, jobData}: any) {
  const breadCrumbs = [
    {"pageLink": "/admin/blog", "pageName": "Messages"}
  ]
  return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Box as="main" id="homeWrapper" color="white">
          <SectionTitle headingTitle="Messages" />
          <Tabs p="1rem" borderRadius="0 2rem" isFitted>
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
            boxShadow="bsWhite"
            p="1.5rem"
            color="white"
            borderRadius="0 1.5rem"
            justifyContent="center"
            align="center"
            m="1rem 2rem"
            _hover={{ boxShadow: "bsBoldSecondary" }}
          >
          <Text
            fontWeight={500}
            fontSize="2rem"
            fontFamily="heading"
            m="1rem 1rem 0"
            alignSelf="start"
          > From: <strong>{contact.name}</strong></Text>
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
          href={`/admin/messagesC/${contact.id}`}
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
            boxShadow="bsWhite"
            p="1.5rem"
            color="white"
            borderRadius="0 1.5rem"
            justifyContent="center"
            align="center"
            m="1rem 2rem"
            _hover={{ boxShadow: "bsBoldSecondary" }}
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
          href={`/admin/messagesJ/${contact.id}`}
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
    </>
  )
}
