

import React from 'react'

import { 
  Box, 
//   Text,  
//   Heading
} from '@chakra-ui/react'

import {Metadata} from "../components/Metadata"

// import { SectionCard } from "../components/Cards/SectionCard"
import Hire from "../components/Hire"

export default function HireMe() {

  return (
    <>
    <Metadata
          title={`Hire Donald Louch`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
        />
        <Box as="main" color="black">
          {/* <SectionCard id="signup" styleType="primaryCard"> */}
            <Box>
              <Hire />
            </Box>
          {/* </SectionCard> */}
        </Box>
    </>
  );
}