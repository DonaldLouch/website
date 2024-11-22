'use client'

import { FooterIcon } from "./FooterIcon";
// import { BsArchive, BsArchiveFill, BsBoxArrowInUpRight, BsFacebook, BsGithub, BsInstagram, BsThreads, BsTwitterX, BsYoutube } from "react-icons/bs";
import { Anchor, Group, Stack, Image, Text, Box, Flex } from "@mantine/core";
import { DashboardSpeed02Icon, Facebook02Icon, GithubIcon, InstagramIcon, Login01Icon, ThreadsIcon, TiktokIcon, TwitterIcon, YoutubeIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { isUserSignedIn } from "@/app/actions/clerk";
import { useUser } from "@clerk/nextjs";


export default function FooterContent(){
  
  const { user } = useUser()
  const isSignedIn = user ? true : false

  // const [isSignedIn, setIsSignedIn] = useState(false) as any
  //   useEffect(() => {
  //       const userSignedIn = isUserSignedIn()
  //       setIsSignedIn(userSignedIn)
  //   }, [])

  const footerLinks = [
    {
      linkURL: "https://facebook.com/DonaldLouchProductions",
      socialMedia: "Facebook",
      linkIcon: "facebook-02",
      iconVariant: "duotone"
    },
    {
      linkURL: "https://twitter.com/DonaldLouch",
      socialMedia: "X (Twitter)",
      linkIcon: "new-twitter",
      iconVariant: "duotone"
    },
    {
      linkURL: "https://instagram.com/donaldlouch",
      socialMedia: "Instagram",
      linkIcon: "instagram",
      iconVariant: "twotone"
    },
    {
      linkURL: "https://www.tiktok.com/@donaldlouch",
      socialMedia: "TikTok",
      linkIcon: "tiktok",
      iconVariant: "duotone"
    },
    {
      linkURL: "https://youtube.donaldlouch.ca",
      socialMedia: "YouTube",
      linkIcon: "youtube",
      iconVariant: "duotone"
    },  
    {
      linkURL: "https://github.com/DonaldLouch",
      socialMedia: "GitHub",
      linkIcon: "github",
      iconVariant: "twotone"
    },
    {
      linkURL: !isSignedIn ? "/signin" : "/portal",
      socialMedia: !isSignedIn ? "Signin/Signup" : "Client Portal",
      linkIcon: !isSignedIn ? "login-01" : "dashboard-speed-02",
      iconVariant: "twotone"
    },
  ]
  return (
      <Flex
        py={{base: "2rem", md: "1rem" }}
        px="4rem"
        direction={{base: "column", md: "row"}}
        color="white"
        align="center"
        justify={{base: "center", md: "space-between"}}
        w="100%"
        styles={{root: {boxShadow: "var(--mantine-shadow-bsBoldPrimary)"}}}
        pos="relative"
        bg="var(--darkPurple)"
      >
      <Stack gap="0">
        <Anchor href="/">
          <Image
            src="/titleLogo/titleLogoWhiteColoured.svg"
            alt="Donald Louch"
          />
        </Anchor>
        <Text fz="sm" fw="medium" mt="-0.5rem" p="0" lh="auto" ta={{base: "center", sm: "left"}}>&copy; 1994 - {new Date().getFullYear()} Donald Louch.</Text>
      </Stack>
      <Group wrap="nowrap" style={{ overflow: "scroll" }} px="1rem" maw="80vw">
        {footerLinks.map((link: any) => (
          <FooterIcon key={link.socialMedia} linkURL={link.linkURL} socialMedia={link.socialMedia} linkIcon={link.linkIcon} iconVariant={link.iconVariant} />
        ))}
      </Group>
    </Flex>
  );
}
