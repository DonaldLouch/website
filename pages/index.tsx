// import { Box } from '@chakra-ui/react'

import {Metadata} from "../components/Metadata"

import { Box, useColorModeValue, Flex, Heading, Link, Image, Text } from "@chakra-ui/react"

export default function Home() {
  return (
    <>  
      <Metadata
          title={`${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
        />
        <Box 
        as="section"
        id="homeHero"

        w="100vw" 
        h="100vh"
        maxW="100vw"
        maxH="100vh"
        pos="absolute" 
        top="0" 
        left="0"  
        zIndex="overlay"
        // overflowY="hidden"
        // overflow="hidden"

        boxShadow="bsOrange" 
        bg={useColorModeValue("white", "black")}
      >
        {/* <GradientBox /> */}
        <Flex id="heroWrap" pos="absolute" top="0" left="0" align="center" justify="center" w="100vw" h="100%" px="3rem" direction={{ base: 'column', lg: 'row' }}>
          <Box>
              <Image
                // src="/titleLogo.svg"
                src={useColorModeValue("/titleLogo.svg", "/titleLogoWhite.svg")}
                alt="DevLexicon"
                width="35vw"
                m="0.5rem auto"
              />
              <Heading as="h1" textAlign="center" fontSize="4rem" fontWeight="bold" color={useColorModeValue('primary', 'white')}>🚨 CURRENTLY OFFLINE 🚨</Heading>
              <Text textAlign="center" color={useColorModeValue('black', 'white')} fontSize="xl">Please note that DonaldLouch.ca and DevLexicon.ca are currently offline for preperation of a major update which will be announced on Tuesday on my <Link href="https://facebook.com/DonaldLouchProductions" variant="primary">Facebook Page</Link>.</Text>
            </Box>
          </Flex>
        </Box>
    </>
  )
}