import {
  Box,
  AspectRatio,
  Stack,
  Link,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../lib/fontAwesome";

import { Metadata } from "../../components/Metadata";
import { SectionTitle } from "../../components/SectionTitle";
import useSWR from "swr";

export default function PortfolioVideography() {
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const pageID = "pageL4UBHMANczw" as string;
  useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  return (
    <>
      <Metadata
        title={`Videography | Donald Louch Portfolio`}
        keywords={`${process.env.KEYWORDS}, portfolio, Donald Louch, donald, louch, videography`}
        description={`${process.env.DESCRIPTION}`}
      />
      <Box
        position="absolute"
        top={{ base: "1.4%", md: "1%" }}
        left={{ base: "4%", md: "1%" }}
        zIndex="overlay"
        color={"white"}
      >
        <Link href="../" variant="unstyled" _hover={{ textDecoration: "none" }}>
          <Tooltip label="Go Back Home">
            <IconButton
              aria-label="Go Back Home"
              variant="unstyled"
              _hover={{ color: "secondary" }}
              h="auto"
              icon={<FontAwesomeIcon icon={["fal", "house"]}  color="currentColor"/>}
            />
          </Tooltip>
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
