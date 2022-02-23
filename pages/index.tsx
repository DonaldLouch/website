import {Metadata} from "../components/Metadata"


import { Box, Flex, Heading, useColorModeValue, Image, Text, Link } from "@chakra-ui/react"

import GradientBox from "../components/GradientBox"

// import splitbee from '@splitbee/web'

// import nookies from "nookies"

export default function Home() {
  // const action: string = 'action';
  // const data: any = {};
  // splitbee.track(action, data);

  return (
    <>  
      <Metadata
        title={`Welcome to ${process.env.WEBSITE_NAME}`}
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
        <GradientBox />
        <Flex id="heroWrap" pos="absolute" top="0" left="0" align="center" justify="center" w="100vw" h="100%" px="3rem" direction={{ base: 'column', lg: 'row' }}>
          <Box>
            <Image
              // src="/titleLogo.svg"
              src={useColorModeValue("/titleLogo.svg", "/titleLogoWhite.svg")}
              alt="Donald Louch Title Logo"
              width="35vw"
              m="0.5rem auto"
            />
            <Heading as="h1" textAlign="center" fontSize="4rem" fontWeight="bold" color={useColorModeValue('primary', 'white')}>Welcome to Donald Louch!</Heading>
            <Text textAlign="center" color={useColorModeValue('black', 'white')} fontSize="lg">Please note that at this time this website is under construction. Although, most features and content are available, some features may not or may not be fully developed.</Text>
            <Text textAlign="center" color={useColorModeValue('black', 'white')} fontSize="lg" mt="1rem">You may <Link  href="homePage"  variant="primary">Continue To The Beta Version Here</Link> or you may visit the legacy version at <Link href="https://legacy.donaldlouch.ca" variant="primary">legacy.donaldlouch.ca</Link>.</Text>
          </Box>
        </Flex>
      </Box>
    </>
  )
}