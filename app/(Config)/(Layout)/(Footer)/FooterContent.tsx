'use client'

import {
  Stack,
  Text,
  Image,
  Link,
  Heading,
  Grid,
  Icon,
  Box,
} from "@chakra-ui/react";

import { FooterIcon } from "./FooterIcon";
import { BsArchive, BsArchiveFill, BsBoxArrowInUpRight, BsFacebook, BsGithub, BsInstagram, BsThreads, BsTwitterX, BsYoutube } from "react-icons/bs";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

export default function FooterContent({isLoggedIn}: any){
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
        pos="relative"
      >
        <Stack alignItems={{base: "center", lg: "initial"}} w="100%">
          <Grid gridTemplateColumns={{base: "100%", lg: "50% 25% 25%", xl: "60% 20% 20%"}}>
            <Stack rowGap="1rem">
              <Link href="#">
                <Image
                  src="/titleLogoWhite.svg"
                  alt="Donald Louch"
                  width={{base: "60vw", lg: "20vw !important"}}
                  height="auto"
                />
              </Link>
              <Stack direction="row">
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
              <Text fontSize="sm" fontWeight="medium" p="0" lineHeight="auto" textAlign="left">&copy; 1994 - {new Date().getFullYear()} Donald Louch.</Text>
            </Stack>
            <Stack background="blurredPurpleRGBA" p="1rem" borderRadius="0 2rem" height="100%" minHeight="16vh" maxH="16vh" overflowY="scroll" mb="-4rem" mx="2rem" display={{base: "none", lg: "initial"}}>
              <Text fontFamily="heading" color="secondary"><Link href="/portfolio" _hover={{color: "white"}}>Portfolio</Link></Text>
               <Text fontSize="md" fontWeight="medium" p="0" lineHeight="auto" textAlign="left"><Link href="portfolio/resume">Resume</Link></Text>
               <Text fontSize="md" fontWeight="medium" p="0" lineHeight="auto" textAlign="left"><Link href="https://github.com/donaldlouch">Website <Icon as={BsBoxArrowInUpRight} ml="0.2rem" /></Link></Text>
               <Text fontSize="md" fontWeight="medium" p="0" lineHeight="auto" textAlign="left"><Link href="portfolio/photography">Photography</Link></Text>
               <Text fontSize="md" fontWeight="medium" p="0" lineHeight="auto" textAlign="left"><Link href="portfolio/videography">Videography</Link></Text>
            </Stack>
            <Stack background="blurredPurpleRGBA" p="1rem" borderRadius="0 2rem" height="100%" minHeight="16vh" maxH="16vh" overflowY="scroll" mb="-4rem" mx="2rem" display={{base: "none", lg: "initial"}}>
              <Text fontFamily="heading" color="secondary"><Link href="/feed" _hover={{color: "white"}}>Feeds</Link></Text>
               <Text fontSize="md" fontWeight="medium" p="0" lineHeight="auto" textAlign="left"><Link href="/about">About Me</Link></Text>
               <Text fontSize="md" fontWeight="medium" p="0" lineHeight="auto" textAlign="left"><Link href="/feed/photography">Photography</Link></Text>
               <Text fontSize="md" fontWeight="medium" p="0" lineHeight="auto" textAlign="left"><Link href="/feed/videography">Videography</Link></Text>
               <Text fontSize="md" fontWeight="medium" p="0" lineHeight="auto" textAlign="left"><Link href="/blog">LEGACY: Blog Posts <Icon as={BsArchiveFill} ml="0.2rem" /></Link></Text>
            </Stack>
            {/* <Stack
              // direction={{ base: "column", md: "row" }}
              // alignItems="center"
              // justifyContent={{ base: "center", md: "space-between" }}
              justifyContent={{ base: "center", lg: "flex-start" }}
            > */}
              
            {/* </Stack> */}
          </Grid>
        </Stack>
        <Box pos="absolute" top="5%" right="1%" zIndex="100000">{isLoggedIn ? <UserButton /> : <SignInButton mode="modal" afterSignInUrl="/portal"/>}</Box>
      </Stack>
  );
}
