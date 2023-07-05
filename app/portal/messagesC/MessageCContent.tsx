'use client'
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent";
import DisplayDate from "@/lib/DisplayDate";
import { Stack, Link, Box, Text } from "@chakra-ui/react";

export default function MessageCContent({ contactData }: any) {
  const contact = contactData;

  // const postedData = new Date(contact.sentOn);
  // const postedDay = postedData.toLocaleDateString();
  // const postedTime = postedData.toLocaleTimeString();

  // const postedOnString = postedDay + " at " + postedTime;

  const breadCrumbs = [
    {"pageLink": "/portal/messages", "pageName": "Messages"},
    {"pageLink": `/portal/messageC/${contact.id}`, "pageName": `Contact: ${contact.id}`}
  ]

  return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Box as="main" id="contact">
          <Stack
            key={contact.index}
            boxShadow="bsWhite"
            p="1.5rem"
            color="white"
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
                On: <strong>{<DisplayDate source={contact.sentOn} />}</strong>
              </Text>
            </Stack>
          </Stack>
          <Box
            boxShadow="bsBoldSecondary"
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
    </>
  );
}
