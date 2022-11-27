import React from 'react'

import { 
  Box, 
  Text,  
  Button
} from '@chakra-ui/react'

import {Metadata} from "../components/Metadata";

import { SectionCard } from "../components/Cards/SectionCard"
import { SectionTitle } from '../components/SectionTitle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../lib/fontAwesome'

export default function Email() {

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
            <SectionTitle headingTitle="Check Your Emails 👀" />
              <Text textAlign="center">We have sent you a link to sign in to Donald Louch, to your email address.</Text>
            </Box>
            <Button as="a" leftIcon={<FontAwesomeIcon icon={['fas', 'long-arrow-alt-left']} color="white" />} href="../login" variant="blackFormButton" display="flex" mx="auto">Back to Login Page</Button>
          </SectionCard>
        </Box>
    </>
  );
}