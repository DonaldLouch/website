'use client'

import HomeButton from "@/app/(Components)/(Buttons)/HomeButton"
import HugeIcon from "@/app/(Components)/HugeIcon"
import InlineLink from "@/app/(Components)/InlineLink"
import { Box, Flex, Stack, Title, Text, Grid, Center, Anchor, Image, Group, Alert } from "@mantine/core"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const imageLink = "https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LWEIJJ2O4srNRK7or.jpeg"
    
    return <Box component="section" id="homeHero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflow: "hidden !Important"}} bg="var(--blurredBackground)">
      <Box bg="var(--mainGradient)" w="100vw" h="100%" opacity="0.7" pos="absolute" bgsz="150% 150%"></Box>
      <Box bg={`no-repeat url(${imageLink ? imageLink : "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/g4os77p6ityhxn0ki74v.jpg"}) #333 40% 40%`} bgsz="cover" h="100%" w="100vw"></Box>
      <HomeButton />
      <Stack id="hero" pos="absolute" top="0" left="0" justify="center" h="100%" w="100%" style={{overflow: "hidden"}}>
        <Grid gutter="2rem">
          <Grid.Col span={{base: 12, md: 4}} h="100%">
            <Center>
              {children}
            </Center>
          </Grid.Col>
          <Grid.Col span={8} h="100%" style={{ justifyContent: "center" }} visibleFrom="md">
            <Stack component="section" mah={{base: "100%", sm: "calc(100vh - 2rem)"}} style={{ overflow: "scroll" }} justify="center">
              <Stack bg="var(--darkPurpleRGBA)" style={{
                boxShadow: "var(--mantine-shadow-bsSMPrimary)",
                backdropFilter: "blur(20px)",
                borderRadius: "var(--mantine-radius-lg)"
              }} w={{base:  "calc(100% - 1rem)",  md: "calc(100% - 2rem)"}} p={{base: "1rem", md: "1.5rem 3rem 2rem"}} gap="0.5rem">
                <Anchor href="/" underline="never">
                  <Group align="center">
                      <Image
                        src="/titleLogo/titleLogoWhiteColoured.svg"
                        alt="Donald Louch"
                        w={{base: "60vw", lg: "30vw !important"}}
                        height="auto"
                      />
                      <Title order={1} fz="2rem" c="var(--blackRGBA)">Client Portal</Title>
                  </Group>
                </Anchor>
                <Alert variant="light" color="red" title="Client Portal Currently disabled!" icon={<HugeIcon name="unavailable" />}>
                  <Text c="white" component="span">At this time, Donald Louch has decided to pause the implementation of the Client Portal and will be corresponding to client projects via. email with <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{name: "mail-at-sign-01"}} />.</Text>
                </Alert>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid> 
      </Stack>
    </Box>
    }