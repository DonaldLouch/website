import { Box, Heading } from '@chakra-ui/react'

import PortalLayout from '../../components/Portal/PortalLayout'
import {Metadata} from '../../components/Metadata'

export default function PortalHome() {
  return (
    <>  
      <PortalLayout pageTitle="Portal Home">
        <Metadata
              title={`${process.env.WEBSITE_NAME}`}
              keywords={`${process.env.KEYWORDS}`}
              description={`${process.env.DESCRIPTION}`}
            />
            <Box as="main" id="homeWrapper" color="white">
                <Heading as="h2" variant="sectionTitle" size="3xl">Portal</Heading>
            </Box>
      </PortalLayout>
    </>  
  )
}