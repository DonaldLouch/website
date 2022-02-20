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
        title={`COMING SOON!`}
        keywords={`${process.env.KEYWORDS}`}
        description={`COMING SOON!`}
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
              alt="DevLexicon"
              width="35vw"
              m="0.5rem auto"
            />
            <Heading as="h1" textAlign="center" fontSize="4rem" fontWeight="bold" color={useColorModeValue('primary', 'white')}>Welcome to Donald Louch!</Heading>
            <Text textAlign="center" color={useColorModeValue('black', 'white')} fontSize="lg">Please note that at this time the website is under construction still. Although, most features and content are available, some features may not or may not be fully developed. If you would like to continue to the beta version <Link href="homePage"  variant="primary">Please Click Here</Link> or you may visit the legacy version at <Link href="https://legacy.donaldlouch.ca" variant="primary">legacy.donaldlouch.ca</Link>.</Text>
          </Box>
        </Flex>
      </Box>
    </>
  )
}