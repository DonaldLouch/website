'use client'

// import {
//   Stack,
//   Text,
//   Image,
//   Link,
//   Heading,
//   Grid,
//   Icon,
//   Box,
// } from "@chakra-ui/react";

import { FooterIcon } from "./FooterIcon";
import { BsArchive, BsArchiveFill, BsBoxArrowInUpRight, BsFacebook, BsGithub, BsInstagram, BsThreads, BsTwitterX, BsYoutube } from "react-icons/bs";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { Anchor, Group, Stack, Image, Text, Box } from "@mantine/core";
import { Facebook02Icon, GithubIcon, InstagramIcon, ThreadsIcon, TwitterIcon, YoutubeIcon } from "@hugeicons/react";


export default function FooterContent({isLoggedIn}: any){
  const footerLinks = [
    {
      linkURL: "https://facebook.com/DonaldLouchProductions",
      socialMedia: "Facebook",
      linkIcon: <Facebook02Icon />,
    },
    {
      linkURL: "https://twitter.com/DonaldLouch",
      socialMedia: "X (Twitter)",
      linkIcon: <TwitterIcon />,
    },
    {
      linkURL: "https://instagram.com/donaldlouch",
      socialMedia: "Instagram",
      linkIcon: <InstagramIcon />,
    },
    {
      linkURL: "https://www.threads.net/@donaldlouch",
      socialMedia: "Threads",
      linkIcon: <ThreadsIcon />,
    },
    {
      linkURL: "https://youtube.donaldlouch.ca",
      socialMedia: "YouTube",
      linkIcon: <YoutubeIcon />,
    },  
    {
      linkURL: "https://github.com/DonaldLouch",
      socialMedia: "GitHub",
      linkIcon: <GithubIcon />,
    },
  ]
  return (
      <Group
        py={{base: "2rem", lg: "2rem" }}
        px={{base: "0", lg: "4rem"}}
        color="white"
        align="baseline"
        justify="space-between"
        w="100%"
        styles={{root: {boxShadow: "bsBoldPrimary"}}}
        pos="relative"
        bg="black"
      >
      <Stack gap="0">
        <Anchor href="/">
          <Image
            src="/titleLogoWhite.svg"
            alt="Donald Louch"
            w={{base: "60vw", lg: "20vw !important"}}
            height="auto"
          />
        </Anchor>
        <Text fz="sm" fw="medium" my="-0.5rem" p="0" lh="auto" ta="left">&copy; 1994 - {new Date().getFullYear()} Donald Louch.</Text>
      </Stack>
      <Group>
        {footerLinks.map((link: any) => (
          <FooterIcon key={link.socialMedia} linkURL={link.linkURL} socialMedia={link.socialMedia} linkIcon={link.linkIcon} />
        ))}
      </Group>
      <Box pos="absolute" top="5%" right="1%" opacity="0.02" fz="sm">{isLoggedIn ? <UserButton /> : <SignInButton mode="modal"/>}</Box> 
    </Group>
  );
}
