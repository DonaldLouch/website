'use client'

import {
  Stack,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";

import { FooterIcon } from "./FooterIcon";
import { BsFacebook, BsGithub, BsInstagram, BsThreads, BsTwitterX, BsYoutube } from "react-icons/bs";

export default function FooterContent(){
  return (
      <Stack
        as="footer"
        role="contentinfo"
        py={{base: "2rem", lg: "4rem" }}
        px={{base: "0", lg: "4rem"}}
        color="white"
        alignItems="center"
        w="100%"
        direction={{base: "column", lg: "row"}}
        boxShadow="bsBoldPrimary"
      >
        <Stack alignItems={{base: "center", lg: "initial"}} w="100%">
          <Stack
            direction={{ base: "column", lg: "row" }}
            // spacing="4"
            alignItems="center"
            // justifyCont="space-between"
            // gap="0.5rem"
            justifyContent={{base: "initial", lg: "space-between"}}
            w="100%"
          >
            <Link href="#">
              <Image
                src="/titleLogoPride.svg"
                alt="Donald Louch"
                width={{base: "60vw", lg: "20vw !important"}}
                height="auto"
              />
            </Link>
            <Stack direction="row" alignItems="baseline" mt="-0.5rem" mx="0">
              <FooterIcon
                linkURL="https://facebook.com/DonaldLouchProductions"
                socialMedia="Facebook"
                linkIcon={BsFacebook}
              />
              <FooterIcon
                linkURL="https://twitter.com/DonaldLouch"
                socialMedia="X (Twitter)"
                linkIcon={BsTwitterX}
              />
              <FooterIcon
                linkURL="https://instagram.com/donaldlouch"
                socialMedia="Instagram"
                linkIcon={BsInstagram}
              />
              <FooterIcon
                linkURL="https://www.threads.net/@donaldlouch"
                socialMedia="Threads"
                linkIcon={BsThreads}
              />
              <FooterIcon
                linkURL="https://youtube.donaldlouch.ca"
                socialMedia="YouTube"
                linkIcon={BsYoutube}
              />
              <FooterIcon
                linkURL="https://github.com/DonaldLouch"
                socialMedia="GitHub"
                linkIcon={BsGithub}
              />
            </Stack>
            {/* <Stack
              direction={{ base: "column", md: "row" }}
              // gap="1rem"
              // spacing="4"
              alignItems="center"
              // justifyContent="space-between"
              // pb={{ base: "0", lg: "0" }}
              // mx={{ base: "4rem", lg: "0" }}
            >
            <iframe
              src="https://github.com/sponsors/DonaldLouch/button"
              title="Sponsor DonaldLouch"
              height="35"
              width="116"
            ></iframe>
            {/* <Stack direction="row" alignItems="baseline" mt="-0.5rem" mx="0">
              <FooterIcon
                linkURL="https://facebook.com/DonaldLouchProductions"
                socialMedia="Facebook"
                linkIcon={BsFacebook}
              />
              <FooterIcon
                linkURL="https://twitter.com/DonaldLouch"
                socialMedia="X (Twitter)"
                linkIcon={BsTwitterX}
              />
              <FooterIcon
                linkURL="https://instagram.com/donaldlouch"
                socialMedia="Instagram"
                linkIcon={BsInstagram}
              />
              <FooterIcon
                linkURL="https://www.threads.net/@donaldlouch"
                socialMedia="Threads"
                linkIcon={BsThreads}
              />
              <FooterIcon
                linkURL="https://youtube.donaldlouch.ca"
                socialMedia="YouTube"
                linkIcon={BsYoutube}
              />
              <FooterIcon
                linkURL="https://github.com/DonaldLouch"
                socialMedia="GitHub"
                linkIcon={BsGithub}
              />
            </Stack>
            </Stack> */}
          </Stack>
          {/* <Stack
            // direction={{ base: "column", md: "row" }}
            // alignItems="center"
            // justifyContent={{ base: "center", md: "space-between" }}
            justifyContent={{ base: "center", lg: "flex-start" }}
          > */}
            <Text fontSize="sm" fontWeight="medium" p="0" lineHeight="auto" textAlign="left">&copy; 1994 - {new Date().getFullYear()} Donald Louch.</Text>
          {/* </Stack> */}
        </Stack>
      </Stack>
  );
}
