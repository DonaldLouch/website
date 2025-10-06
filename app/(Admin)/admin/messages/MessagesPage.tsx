'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import { Stack, Tabs, Text } from "@mantine/core"
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton"
import DisplayDate from "@/lib/DisplayDate"

export default function MessagesPage({contactData, jobData}: any) {
  const breadCrumbs = [
    {"pageLink": "/admin/blog", "pageName": "Messages"}
  ]
  return <>
    <BreadCrumb breads={breadCrumbs} />
    <SectionTitle headingTitle="Messages" />
    <Tabs defaultValue="contact">
      <Tabs.List grow justify="center">
        <Tabs.Tab value="contact">Contact Form</Tabs.Tab>
        <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="contact">{contactData.map((contact: any) => (
        <Stack key={contact.id} p="1.5rem" m="1rem 2rem" style={{boxShadow: "var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)", borderBottom: "1px solid", borderColor: "gray.200"}} gap="0">
          <Text fw="500" ff="heading">From: <strong>{contact.name}</strong></Text>
          <Stack gap="0">
            <Text><strong>Subject:</strong> {contact.subject}</Text>
            <Text fz="1rem" c="grey"><strong>Sent On:</strong> <DisplayDate source={contact.sentOn} /></Text>
          </Stack>
          <PrimaryLinkedButton link={`/admin/message/${contact.id}`} primNewIcon={{name: "envelope"}}>View Message</PrimaryLinkedButton>
        </Stack>
      ))}</Tabs.Panel>
      <Tabs.Panel value="job">{jobData.map((job: any) => (
        <Stack key={job.id} p="1.5rem" m="1rem 2rem" style={{boxShadow: "var(--mantine-shadow-bsBoldWhite)", borderRadius: "var(--mantine-radius-md)", borderBottom: "1px solid", borderColor: "gray.200"}} gap="0">
          <Text fw="500" ff="heading">From: <strong>{job.name}</strong></Text>
          <Stack gap="0">
            {/* <Text><strong>Subject:</strong> {job.subject}</Text> */}
            <Text fz="1rem" c="grey"><strong>Sent On:</strong> {job.sentOn}</Text>
          </Stack>
          <PrimaryLinkedButton link={`/admin/messagesC/${job.id}`} primNewIcon={{name: "envelope"}}>View Message</PrimaryLinkedButton>
        </Stack>
      ))}</Tabs.Panel>
    </Tabs>
  </>
}
