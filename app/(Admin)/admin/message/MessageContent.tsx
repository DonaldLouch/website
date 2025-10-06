'use client'
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard";
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent";
import DisplayDate from "@/lib/DisplayDate";
import { Stack, Title, Text, Box } from "@mantine/core";

export default function MessageContent({ contactData, jobData, type }: any) {
  const contact = contactData
  const job = jobData

  const isContact = type === "contact"
  const isJob = type === "job"

  console.log(contact, job, type)
  // const postedData = new Date(contact.sentOn);
  // const postedDay = postedData.toLocaleDateString();
  // const postedTime = postedData.toLocaleTimeString();

  // const postedOnString = postedDay + " at " + postedTime;

  const breadCrumbs = [
    {"pageLink": "/admin/messages", "pageName": "Messages"},
    {"pageLink": `/admin/messageC/${contact.id}`, "pageName": `Contact: ${contact.id}`}
  ]

  return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <SectionCard styleType="primaryCard" m="2rem 0 0">
          <Stack gap="0">
            <Title order={2} ff="heading" fw={700}>
              {isContact ? <strong>{contact.name}{`<${contact.email}>`}</strong> : `Job: ${job.id}`}
            </Title>
            <Text>{isContact ? contact.subject : job.description}</Text>
            <Text fz="1rem" c="grey" lh="0">
              {isContact ? <DisplayDate source={contact.sentOn} /> : <DisplayDate source={job.sentOn} />}
            </Text>
          </Stack>
        </SectionCard>
          <Box
            p="1rem 2rem"
            h="50vh"
            mah="50vh"
            m="2rem 1rem"
            style={{
              boxShadow: "var(--mantine-shadow-bsSMSecondary)",
              borderRadius: "var(--mantine-radius-md)",
              overflow: "scroll"
            }}
          >
            <Text>{contact.message}</Text>
          </Box>
          {/* body=Original%20Message%20via%2E%20donaldlouch%2Eca%3A%0D%0A${contact.message} */}
          <PrimaryLinkedButton
            primNewIcon={{ name: "reply", pack: "fadl" }}
            link={`mailto:${contact.name}<${contact.email}>?subject=Re: ${contact.subject}`}
            isFullWidth
          >
            Reply via. Email
          </PrimaryLinkedButton>
        {/* 
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
        </Link> */}
    </>
  );
}
