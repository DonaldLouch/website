"use client"
import { Button, Container, Group, Title, Text, Flex, Center, Paper, Stack } from '@mantine/core'
import React from 'react'
import PrimaryLinkedButton from './(Components)/(Buttons)/PrimaryLinkedButton'
import PrimaryButton from './(Components)/(Buttons)/PrimaryButton'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NotFound() {
    return <Center mih="100vh" mah="100vh" pos="fixed" top=" 0" left="0" style={{zIndex: "9000", boxShadow: "bsSecondary", overflowY: "hidden"}} bg="var(--blackPurple)" miw="100vw" maw="100vw">
        <Paper p={{base: "2rem", lg: "4rem"}} color="white" bg="none" shadow="bsBoldSecondary" radius="lg" mx={{base: "1rem", sm: "2rem"}}>
            <Stack align="center">
                <Group gap="2rem" align="center">
                    {/* <FontAwesomeIcon icon={["fadl", "block-question"]} size="3x" color="var(--secondary)" bounce /> */}
                    <Title order={1} fz={{base: "2rem", sm: "3rem" }} fw="900">404: Page Not Found!</Title>
                </Group>
                <Text ta="center">
                    The page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error please contact Donald Louch for further assistance.
                </Text>
                <Group align="center" justify="center" gap="1rem" m="0" p="0">
                    <PrimaryLinkedButton link="mailto:hello@donaldlouch.ca" primNewIcon={{name: "mail-01", variant: "twotone"}}>Contact Donald Louch</PrimaryLinkedButton>
                    <PrimaryLinkedButton link="/" primNewIcon={{ name: "home-03", variant: "twotone" }}>Go Back Home</PrimaryLinkedButton>
                    <PrimaryButton action={() => window.location.reload()} primNewIcon={{name: "reload", variant: "twotone"}}>Reload Page</PrimaryButton>
                    {/* <PrimaryLinkedButton link="mailto:hello@donaldlouch.ca" primNewIcon={{name: "envelope-circle-check", variant: "fadl"}}>Contact Donald Louch</PrimaryLinkedButton> */}
                    {/* <PrimaryLinkedButton link="/" primNewIcon={{ name: "house", variant: "fadl" }}>Go Back Home</PrimaryLinkedButton>
                    <PrimaryButton action={() => window.location.reload()} primNewIcon={{name: "rotate-right", variant: "fal"}}>Reload Page</PrimaryButton> */}
                </Group>
            </Stack>
        </Paper>
    </Center>
}