'use client'
import { Box, Stack } from "@mantine/core";
import { SignIn } from "@clerk/nextjs";
import HomeButton from "../../../../(Components)/(Buttons)/HomeButton";

export default function Signin() {
  const imageLink = "https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LWEIJJ2O4srNRK7or.jpeg"

  return <Box component="section" id="homeHero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflow: "hidden !Important"}} bg="var(--blurredBackground)">
    <Box bg="var(--mainGradient)" w="100vw" h="100%" opacity="0.7" pos="absolute" bgsz="150% 150%"></Box>
    <Box bg={`no-repeat url(${imageLink ? imageLink : "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/g4os77p6ityhxn0ki74v.jpg"}) #333 40% 40%`} bgsz="cover" h="100%" w="100vw"></Box>
    <Stack id="hero" pos="absolute" top="0" left="0" align="center" justify="center" w="100%" h="100%" px={{base: "0", md: "2rem", lg: "3rem", xl: "5rem"}} style={{overflow: "hidden"}}>
      <HomeButton />
      <SignIn />
    </Stack>  
  </Box>
}