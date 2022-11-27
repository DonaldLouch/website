import * as React from "react"
import { Box, useColorModeValue } from '@chakra-ui/react'

import Header from "./Header";
import Footer from "./Footer";
import { Metadata } from "./Metadata";

interface LayoutProps {
    children: React.ReactNode
}

export const Layout = (props: LayoutProps) => {
    const { children } = props
    // const toast = useToast()

    // toast({
    //   title: "Under Construction",
    //   description: `Please note that this is a beta website in which features are still being developed and may not be functionable. Please visit https://devlexicon.ca for a fully functioning website. Or check back here later!`,
    //   status: "error",
    //  duration: null,
    //   isClosable: false,
    // })

  return (
    <>
      <Metadata 
          title={`${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}`}
          description={`${process.env.DESCRIPTION}`}
       />
      <Header />
      <Box as="main" bg={useColorModeValue('white', 'black')} minH="100vh" pt="4rem" pb="2rem" px={{base: "1rem", lg: 20}} overflowX="hidden">
        {children}
      </Box>
      <Footer />
    </>
  );
}
