

import React from 'react'

import { 
  Box, 
//   Text,  
//   Heading
} from '@chakra-ui/react'

import {Metadata} from "../components/Metadata"

// import { SectionCard } from "../components/Cards/SectionCard"
import Contact from "../components/Contact"

export default function Test() {

  return (
    <>
    <Metadata
          title={`Contact ${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
        />
        <Box as="main" color="black">
          {/* <SectionCard id="signup" styleType="primaryCard"> */}
            <Box>
              <Contact />
            </Box>
          {/* </SectionCard> */}
        </Box>
    </>
  );
}