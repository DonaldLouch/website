'use client'
import { Box, Stack, keyframes, usePrefersReducedMotion } from "@chakra-ui/react";
import { SignIn, SignUp } from "@clerk/nextjs";
import HomeButton from "../../(Components)/(Buttons)/HomeButton";

const spinningGradient = keyframes `
    0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

export default function Page() {

    const prefersReducedMotion = usePrefersReducedMotion()
    const spinningGradientAnimation = prefersReducedMotion
    ? undefined
    : `${spinningGradient} infinite 10s`


  return (
    <Box w="100vw" h="100vh" maxW="100vw" maxH="100vh" pos="absolute" top="0" left="0" zIndex="overlay" boxShadow="bsSecondary" bg="white" overflow="hidden !Important">
        <Box bg='mainGradient' animation={spinningGradientAnimation} w="100vw" h="100%" opacity="0.7" pos="absolute" backgroundSize="150% 150%"></Box>
        <Box bg={`no-repeat url("https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg") #333 40% 40%`} backgroundSize="cover" h="100%" w="100vw"></Box>
      <Stack alignItems="center" justifyContent="center" w="100%" h="100vh" zIndex="tooltip" position="absolute" top="0" left="0">
        <HomeButton />
        <SignUp redirectUrl={"/portal"} />
      </Stack>
      </Box>
  )
}