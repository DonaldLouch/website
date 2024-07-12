'use client'

// import { Box } from "@chakra-ui/react"

import Header from "./(Header)"
import Footer from "./(Footer)"
import { AppShell, Group, Image, Box, rem, Text, Title } from "@mantine/core"
import { useHeadroom } from "@mantine/hooks"
import { useAuth } from "@clerk/nextjs"

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
    const pinned = useHeadroom({ fixedAt: 120 })
    return (
        <>
        {/* <Box> */}
        {/* <AppShell header={{height: 60, collapsed: !pinned, offset: false }} padding="md">
            <AppShell.Header>
                <Group w="10%" px="md">
                     <Image
                        src="/titleLogoPride.svg"
                        alt="Donald Louch"
                        // width={{ base: "30vw", lg: "12vw" }}
                        />
                </Group>
            </AppShell.Header>
            <AppShell.Main pt="60rem"> 
                {children}
                {/* </Box> 
            </AppShell.Main>
        </AppShell> */}
        <AppShell header={{ height: 60, collapsed: !pinned, offset: false }}>
            <AppShell.Header>
                <Group h="100%" px="md" bg="primary">
                    <Title>Donald Louch Website</Title>
                </Group>
            </AppShell.Header>

            <AppShell.Main>
               {children}
            </AppShell.Main>
            </AppShell>
            {/* <Header /> */}
            {/* Breaking code: whiteSpace="break-spaces" */}
            {/* <Box as="main" bg="blurredBackground" minH="100vh" pt={{base: "4.5rem", lg: "5.8rem"}} pb={{base: "1rem", lg: "2rem"}} px={{base: "1rem", lg: "5rem"}} overflowX="clip" backdropBlur={"20px"}  wordBreak="break-word"> */}
            {/* </Box> */}
            {/* <Footer /> */}
        </>
    )
}