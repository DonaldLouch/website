'use client'

import { FooterIcon } from "./FooterIcon";
import { Anchor, Group, Stack, Image, Text, Flex } from "@mantine/core";
// import { useUser } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";


export default function FooterContent(){
  
  // const { user } = useUser()
  const isSignedIn = false

  const [primaryLinksData, setPrimaryLinksData] = useState([])

  useEffect(() => {
    const fetchPrimaryLinks = async () => {
      const { data } = await supabase.from('PrimaryLinks').select().order('order', { ascending: true }) as any
      setPrimaryLinksData(data || [])
    }
    fetchPrimaryLinks()
  },[])

  // const { data: primaryLinksData } = await supabase.from('PrimaryLinks').select().order('order', { ascending: true }) as any

  // const [isSignedIn, setIsSignedIn] = useState(false) as any
  //   useEffect(() => {
  //       const userSignedIn = isUserSignedIn()
  //       setIsSignedIn(userSignedIn)
  //   }, [])

  // const footerLinks = [
  //   {
  //     linkURL: "https://facebook.com/DonaldLouchProductions",
  //     socialMedia: "Facebook",
  //     linkIcon: "facebook",
  //     iconVariant: "fab"
  //   },
  //   {
  //     linkURL: "https://twitter.com/DonaldLouch",
  //     socialMedia: "X (Twitter)",
  //     linkIcon: "x-twitter",
  //     iconVariant: "fab"
  //   },
  //   {
  //     linkURL: "https://instagram.com/donaldlouch",
  //     socialMedia: "Instagram",
  //     linkIcon: "instagram",
  //     iconVariant: "fab"
  //   },
  //   {
  //     linkURL: "https://www.tiktok.com/@donaldlouch",
  //     socialMedia: "TikTok",
  //     linkIcon: "tiktok",
  //     iconVariant: "fab"
  //   },
  //   {
  //     linkURL: "https://youtube.donaldlouch.ca",
  //     socialMedia: "YouTube",
  //     linkIcon: "youtube",
  //     iconVariant: "fab"
  //   },  
  //   {
  //     linkURL: "https://github.com/DonaldLouch",
  //     socialMedia: "GitHub",
  //     linkIcon: "github",
  //     iconVariant: "fab"
  //   },
  //   // {
  //   //   linkURL: !isSignedIn ? "/signin" : "/portal",
  //   //   socialMedia: !isSignedIn ? "Signin/Signup" : "Client Portal",
  //   //   linkIcon: !isSignedIn ? "login-01" : "dashboard-speed-02",
  //   //   iconVariant: "twotone"
  //   // },
  // ]
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
            w={{ base: "30vw", lg: "12vw" }}
          />
        </Anchor>
        <Text fz="sm" fw="medium" mt="-0.5rem" p="0" lh="auto" ta={{base: "center", sm: "left"}}>&copy; 1994 - {new Date().getFullYear()} Donald Louch.</Text>
      </Stack>
      <Group wrap="nowrap" style={{ overflow: "scroll" }} px="1rem" maw="80vw">
        {primaryLinksData && primaryLinksData?.map((link: any) => (
          <FooterIcon key={link.id} linkURL={link.link} socialMedia={link.title} icon={link.icon[0]} />
        ))}
      </Group>
    </Flex>
  );
}
