import React from 'react'

import { 
  Box, 
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import {Metadata} from "../components/Metadata"

import { SectionCard } from "../components/Cards/SectionCard"
import { SectionTitle } from "../components/SectionTitle"

export default function Test() {
  return (
    <>
    <Metadata
          title={`${process.env.WEBSITE_NAME} | Test Page`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
        />
        <Box as="main" color={useColorModeValue("black", "white")}>
          <SectionCard id="signup" styleType="primaryCard">
            <Box>
              <SectionTitle headingTitle="This is a testing page" />
              <Text textAlign="center">This page can be ignored.</Text>
            </Box>
          </SectionCard>
        </Box>
    </>
  )
}