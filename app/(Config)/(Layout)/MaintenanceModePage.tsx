'use client'

import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"
import HugeIcon from "@/app/(Components)/HugeIcon"
import InlineLink from "@/app/(Components)/InlineLink"
import { Stack, Title, Text, Box } from "@mantine/core"

// import { useRouter } from "next/navigation"


// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function MaintenanceModePage() {
    // const router = useRouter()
    // const supabase = createClientComponentClient<Database>()
    // const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.NEXT_PUBLIC_SITE_URL
    // const signInWithGoogle = async () => {
    //     await supabase.auth.signInWithOAuth({
    //         provider: 'google',
    //         options: {
    //             queryParams: {
    //                 access_type: 'offline',
    //                 prompt: 'consent',
    //             },
    //             redirectTo: `${baseURL}/auth/callback`
    //         }
    //     })
    //     router.refresh();
    // }

    return (
        <>
            <Stack w="100vw" h="100vh" bg="var(--darkPurple)" style={{ overflow: "hidden", zIndex: "1000000" }} pos="absolute" top="0" left="0" justify="center" align="center" px="2rem">
                <PrimaryButton primNewIcon={{name: "login-01", variant: "twotone" }} opacity="0.09" >Developer Login</PrimaryButton>
                <Box maw="65vw">
                <Title order={1} ta="center" fz="3rem" fw="900" c="var(--secondary)" visibleFrom="sm"><HugeIcon name="cone-01" variant="duotone" size="2.1rem" /> Website Under Maintenance</Title>
                <Text>I'm currently performing some maintenance on the website to ensure you have the best possible experience. Please bear with me during this  downtime as I work hard to improve services for you.</Text>

                <Text>If you have any urgent concerns, feel free to reach out to me at <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{ name: "mail-at-sign-02", variant: "twotone"}} /> or on my social media platforms.</Text>
                <Text>Thank you for your understanding!</Text>
                </Box>
            </Stack>
        </>
    )
}