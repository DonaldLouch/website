'use client'

import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton"
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import { Box, Divider, Stack } from "@mantine/core"

export default function PagesContent() {
  const breadCrumbs = [
    {"pageLink": "/admin/pages", "pageName": "Pages Manager"}
  ]
  return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Box component="main" id="homeWrapper" color="white">
          <SectionTitle headingTitle="Page Manger" />
          <Stack w="100%" align="center" p="1rem" gap="1.5rem" mt="1rem">
            <PrimaryLinkedButton link="pagesAbout">About Me</PrimaryLinkedButton> 
            <PrimaryLinkedButton link="pagesResume">Resume</PrimaryLinkedButton>
            <PrimaryLinkedButton link="pagesLinks">Links</PrimaryLinkedButton>
            <PrimaryLinkedButton link="pagesTOS" >Terms of Service</PrimaryLinkedButton>
            <Divider></Divider>
            <PrimaryLinkedButton link="pagesNew">New Page</PrimaryLinkedButton>
          </Stack>
        </Box>
    </>
  )
}
