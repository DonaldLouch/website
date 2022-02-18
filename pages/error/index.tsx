import React from 'react'
import { useRouter } from 'next/router'

import { 
  Box, 
  Text,  
  Heading
} from '@chakra-ui/react'

import {Metadata} from "../../components/Metadata";
// import { parseCookies, destroyCookie } from 'nookies'

import { SectionCard } from "../../components/Cards/SectionCard"

const ErrorPage = () => {
  const router = useRouter()

  return (
    <>
    <Metadata
          title={`${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
        />
        <Box as="main" color="white">
          <SectionCard id="signup" styleType="primaryCard">
            <Box>
              <Heading as="h1" variant="sectionTitle" size="4xl">Error:{router.query.error}!</Heading>
              <Text>An error has occurred.</Text>
            </Box>
          </SectionCard>
        </Box>
    </>
  );
}

export default ErrorPage;