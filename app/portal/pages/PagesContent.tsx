'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import { Box, Divider, Link, Stack } from "@chakra-ui/react"

export default function PagesContent() {
  const breadCrumbs = [
    {"pageLink": "/portal/pages", "pageName": "Pages Manager"}
  ]
  return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Box as="main" id="homeWrapper" color="white">
          <SectionTitle headingTitle="Page Manger" />
          <Stack direction="column" w="100%" align="center" p="1rem" spacing="1.5rem" mt="1rem">
            <Link href="pagesAbout" variant="primaryButton" w="75%">About Me</Link>
            <Link href="pagesResume" variant="primaryButton" w="75%">Resume</Link>
            <Link href="pagesLinks" variant="primaryButton" w="75%">Links</Link>
            <Link href="pagesTOS" variant="primaryButton" w="75%">Terms of Service</Link>
            <Divider></Divider>
            <Link href="pagesNew" variant="primaryButton" w="75%">New Page</Link>
          </Stack>
        </Box>
    </>
  )
}
