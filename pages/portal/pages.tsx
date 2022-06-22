import { Box, Link, Divider, Stack } from '@chakra-ui/react'

import PortalLayout from '../../components/Portal/PortalLayout'
import { Metadata } from '../../components/Metadata'
import { SectionTitle } from '../../components/SectionTitle'

export default function PageManager() {

  return (
    <>  
      <PortalLayout pageTitle="Page Manager">
        <Metadata
              title={`${process.env.WEBSITE_NAME} Page Manger`}
              keywords={`${process.env.KEYWORDS}, portal, page, manager, admin`}
              description={`Manage the pages for Donald Louch.`}
            />
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
      </PortalLayout>
    </>  
  )
}