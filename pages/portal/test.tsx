import { Box } from '@chakra-ui/react'

import PortalLayout from '../../components/Portal/PortalLayout'
import { Metadata } from '../../components/Metadata'

export default function Test() {
  return (
    <>  
      <PortalLayout pageTitle="Test Page">
        <Metadata
              title={`${process.env.WEBSITE_NAME} | Portal Test`}
              keywords={`${process.env.KEYWORDS}`}
              description={`${process.env.DESCRIPTION}`}
            />
            <Box as="main" id="homeWrapper" color="white">
                {/* CONTENT GOES HERE! */}
            </Box>
      </PortalLayout>
    </>  
  )
}