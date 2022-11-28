// import Image from "next/image";

import {
  Box,
  Stack,
  Text,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

import { FooterIcon } from "./FooterIcon";

export default function Footer() {

  return (
    <Box
      bg="black"
      maxW="100vw"
      boxShadow={useColorModeValue("bsBoldBlue", "bsBoldWhite")}
    >
      <Box
        as="footer"
        role="contentinfo"
        mx="auto"
        py="10"
        px={32}
        color="white"
      >
        <Stack>
          <Stack
            direction={{ base: "column", lg: "row" }}
            spacing="4"
            align="center"
            justify="space-between"
          >
            <Link href="#">
              <Image
                src="/titleLogoChristmas.svg"
                alt="Donald Louch"
                width={{base: "100%", lg: "20vw !important"}}
                height="auto"
              />
            </Link>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing="4"
              align="center"
              justify="space-between"
              pb={{ base: "1rem", lg: "0" }}
              mx={{ base: "4rem", lg: "0" }}
            >
              <iframe
                src="https://github.com/sponsors/DonaldLouch/button"
                title="Sponsor DonaldLouch"
                height="35"
                width="116"
              ></iframe>
              <Stack direction="row" alignItems="baseline">
                <FooterIcon
                  linkURL="https://facebook.com/DonaldLouchProductions"
                  socialMedia="Facebook"
                  linkIcon="facebook"
                />
                <FooterIcon
                  linkURL="https://twitter.com/DonaldLouch"
                  socialMedia="Twitter"
                  linkIcon="twitter"
                />
                <FooterIcon
                  linkURL="https://instagram.com/donaldlouch"
                  socialMedia="Instagram"
                  linkIcon="instagram"
                />
                <FooterIcon
                  linkURL="https://youtube.donaldlouch.ca"
                  socialMedia="YouTube"
                  linkIcon="youtube"
                />
                <FooterIcon
                  linkURL="https://github.com/DonaldLouch"
                  socialMedia="GitHub"
                  linkIcon="github"
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            justify={{ base: "center", md: "space-between" }}
            align={{ base: "center", md: "flex-start" }}
          >
            <Text fontSize="sm" fontWeight="medium" m="0">
              &copy; 1994 - {new Date().getFullYear()} Donald Louch.
            </Text>
            <iframe
              src="https://donaldlouch.instatus.com/embed-status/dark-md"
              width="250"
              height="50"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
