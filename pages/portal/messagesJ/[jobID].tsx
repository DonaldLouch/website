import { Stack, Link, Box, Text, useColorModeValue } from "@chakra-ui/react";

import prisma from "../../../lib/prisma";

import { Metadata } from "../../../components/Metadata";

import PortalLayout from "../../../components/Portal/PortalLayout";

export default function Post({ contactData }: any) {
  const contact = contactData;
  // console.log(post.body)

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
        <Box as="main" id="contact" color="black">
          {/* <Link href="../" variant="primaryButton2" w="fit-content" mx="0"> */}
          <Link href="/portal/messages" variant="primary" fontSize="1.1rem">
            Go Back To All Messages
          </Link>
          <Stack
            key={contact.index}
            boxShadow={useColorModeValue("bsBlue", "bsWhite")}
            p="1.5rem"
            color="black"
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
              <Text>
                {contact.company != null ? `At: ${contact.company}` : null}
              </Text>
              <Text>{contact.phone}</Text>
            </Stack>
            <Stack
              direction="row"
              align="center"
              justify="space-between"
              w="100%"
            >
              <Text fontSize="1.3rem">
                Job Type: <strong>{contact.type}</strong>
              </Text>
              <Text fontSize="1rem" color="grey">
                On: <strong>{postedOnString}</strong>
              </Text>
            </Stack>

            {/* <Link
              href={`/portal/messages/${contact.id}`}
              variant="primaryButton"
              w="100%"
            >
              View Message
            </Link> */}
          </Stack>
          <Box
            boxShadow="bsBoldOrange"
            borderRadius="0 2rem"
            p="2rem"
            h="40vh"
            maxH="40vh"
            overflow="scroll"
          >
            <Text>{contact.description}</Text>
          </Box>
        </Box>
        <Text>The Proposed Budget Is: {contact.budget}</Text>
        <Link
          href={`mailto:${contact.name}<${contact.email}>?subject=Re: ${contact.subject}&body=Original%20Message%20via%2E%20donaldlouch%2Eca%3A%0D%0A${contact.description}%0D%0A%0D%0AThe%20Proposed Budget%20Is%3A%20${contact.budget}`}
          variant="primaryButton2"
        >
          Reply via. Email
        </Link>
      </PortalLayout>
    </>
  );
}

export async function getServerSideProps(router: any) {
  const messageID = router.params.jobID;

  const contactData = await prisma.job.findUnique({
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
