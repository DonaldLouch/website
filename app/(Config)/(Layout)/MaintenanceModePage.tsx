'use client'

import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"
import HugeIcon from "@/app/(Components)/HugeIcon"
import InlineLink from "@/app/(Components)/InlineLink"
import { SignInButton, useClerk } from "@clerk/nextjs"
import { Stack, Title, Text, Box } from "@mantine/core"

export default function MaintenanceModePage({ isUser }: { isUser: boolean }) {
    const { openSignIn } = useClerk()
    return (
        <>
            <Stack w="100vw" h="100vh" bg="var(--darkPurple)" style={{ overflow: "hidden", zIndex: "10" }} pos="absolute" top="0" left="0" justify="center" align="center" px="2rem">
                {!isUser &&
                    <PrimaryButton primNewIcon={{name: "login-01", variant: "twotone" }} opacity="0.09" action={() => openSignIn({ redirectUrl: '/' })}>Developer Login</PrimaryButton>
                }
                <Box maw="65vw">
                <Title order={1} ta="center" fz="3rem" fw="900" c="var(--secondary)" visibleFrom="sm"><HugeIcon name="cone-01" variant="duotone" size="2.1rem" /> Website Under Maintenance</Title>
                {/* <Text>I'm currently performing some maintenance on the website to ensure you have the best possible experience. Please bear with me during this  downtime as I work hard to improve services for you.</Text> */}
                <Text>I have disabled my beta website temporarily (until June 1st, 2025). So I can work on some general maintenance tasks. Implement new features, and fix bugs. In addition, I am testing out new functionalities within my website!</Text>

                <Text component="div">My website is still functional and up and running at <InlineLink isInternal link="https://donaldlouch.ca" body="donaldlouch.ca" leftIcon={{ name: "web-validation", variant: "twotone"}} />!</Text>

                <Text component="div">If you have any urgent concerns, feel free to reach out to me at <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{ name: "mail-at-sign-02", variant: "twotone"}} /> or on my social media platforms.</Text>

                <Text>Thank you for your understanding!</Text>
                </Box>
            </Stack>
        </>
    )
}