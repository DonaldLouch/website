import { Box, Heading } from '@chakra-ui/react'

import PortalLayout from '../../components/Portal/PortalLayout'
import {Metadata} from '../../components/Metadata'

export default function PortalHome() {
  return (
    <>  
      <PortalLayout pageTitle="Portal Home">
        <Metadata
              title={`COMING SOON!`}
              keywords={`${process.env.KEYWORDS}, portal`}
              description={`COMING SOON!`}
            />
            <Box as="main" id="homeWrapper" color="white">
                <Heading as="h2" variant="sectionTitle" size="3xl">Portal</Heading>
                <Heading as="h3" variant="sectionTitle" size="2xl">Coming Soon!</Heading>
            </Box>
      </PortalLayout>
    </>  
  )
}