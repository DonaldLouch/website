import {
  Box,
  AspectRatio,
  Stack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../config/fontAwesome";

import { Metadata } from "../../components/Metadata";
import { SectionTitle } from "../../components/SectionTitle";

export default function PortfolioVideography() {
  // const pageID = "pageL4UBHMANczw" as string
  // updatePostView(pageID)
  // async function updatePostView(pageID: string) {
  //     await fetch('/api/pages/updateView', {
  //         method: 'POST',
  //         body: JSON.stringify(pageID)
  //     })
  // }

  return (
    <>
      <Metadata
        title={`Videography | Donald Louch Portfolio`}
        keywords={`${process.env.KEYWORDS}, portfolio, Donald Louch, donald, louch, videography`}
        description={`${process.env.DESCRIPTION}`}
      />
      <Box
        position="absolute"
        top="2%"
        left="2%"
        zIndex="overlay"
        color={useColorModeValue("primary", "white")}
        fontSize="1.5rem"
      >
        <Link href="/portfolio">
          <FontAwesomeIcon icon={["fas", "house"]} width="100%" />
        </Link>
      </Box>
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
          // w={{base: "calc(100% - -6rem);", xl: "95%"}}
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
