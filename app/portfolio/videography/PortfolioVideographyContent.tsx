'use client'

import {
  Box,
  AspectRatio,
  Stack
} from "@chakra-ui/react";

import { SectionTitle } from "@/app/(Components)/SectionTitle";
import HomeButton from "@/app/(Components)/(Buttons)/HomeButton";

export default function PortfolioVideographyContent() {
  return (
    <>
      <HomeButton />
      <Box
        bg="white"
        pos="absolute"
        top="0"
        left="0"
        w="100vw"
        justifyContent="center"
        alignItems="center"
        h="100vh"
        zIndex="banner"
      ></Box>
      <Stack
        bg="mainGradient"
        pos="absolute"
        top="0"
        left="0"
        w="100vw"
        justifyContent="center"
        alignItems="center"
        h="100vh"
        zIndex="banner"
      >
        <SectionTitle headingTitle="Videography Portfolio" />
        <AspectRatio
          ratio={16 / 9}
          w="80%"
          m={{ base: "0 -4rem", xl: "0" }}
          overflow="hidden"
          zIndex="10000"
          bg="mainGradient"
          borderRadius="0 2rem"
        >
          <iframe
            src="https://www.youtube.com/embed/?listType=playlist&list=PLxKFlee-68I4UlWPh55KH2FrJR-17eVWn&autoplay=0&modestbranding=1&rel=0&controls=0&enablejsapi=1&origin=https%3A%2F%2Fdonaldlouch.ca&widgetid=1"
            allowFullScreen
          ></iframe>
        </AspectRatio>
      </Stack>
    </>
  );
}
