import { Stack, Link, Box, Text, useColorModeValue, Button } from "@chakra-ui/react";

import prisma from "../../../lib/prisma";

import { Metadata } from "../../../components/Metadata";

import PortalLayout from "../../../components/Portal/PortalLayout";

export default function Post({ contactData }: any) {
  const contact = contactData;

  const postedData = new Date(contact.sentOn);
  const postedDay = postedData.toLocaleDateString();
  const postedTime = postedData.toLocaleTimeString();

  const postedOnString = postedDay + " at " + postedTime;

  return (
    <>
      <PortalLayout pageTitle={`Contact Message: ${contact.id}`}>
        <Metadata
          title={`Contact Message ${contact.id} | ${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}, portal, edit, admin`}
          description={`Contact Message: ${contact.od}`}
        />
        <Box as="main" id="contact" color={useColorModeValue("black", "white")}>
          <Button as="a" href="/portal/messages" variant="primary" background="primary" color="white" my="1rem !important">
            &larr; Go Back To All Messages
          </Button>
          <Stack
            key={contact.index}
            boxShadow={useColorModeValue("bsBlue", "bsWhite")}
            p="1.5rem"
            color={useColorModeValue("black", "white")}
            borderRadius="0 1.5rem"
            justifyContent="center"
            align="center"
            m="1rem 2rem"
          >
            <Text
              fontWeight={500}
              fontSize="2rem"
              fontFamily="heading"
              m="1rem 1rem 0"
              alignSelf="start"
            >
              From:{" "}
              <strong>
                {contact.name}
                {`<${contact.email}>`}
              </strong>
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
                On: <strong>{postedOnString}</strong>
              </Text>
            </Stack>
          </Stack>
          <Box
            boxShadow="bsBoldOrange"
            borderRadius="0 2rem"
            p="2rem"
            h="40vh"
            maxH="40vh"
            overflow="scroll"
          >
            <Text>{contact.message}</Text>
          </Box>
        </Box>
        <Link
          href={`mailto:${contact.name}<${contact.email}>?subject=Re: ${contact.subject}&body=Original%20Message%20via%2E%20donaldlouch%2Eca%3A%0D%0A${contact.message}`}
          variant="primaryButton2"
        >
          Reply via. Email
        </Link>
      </PortalLayout>
    </>
  );
}

export async function getServerSideProps(router: any) {
  const messageID = router.params.contactID;

  const contactData = await prisma.contact.findUnique({
    where: {
      id: messageID,
    },
  });

  return {
    props: {
      contactData: JSON.parse(JSON.stringify(contactData)),
    },
  };
}
