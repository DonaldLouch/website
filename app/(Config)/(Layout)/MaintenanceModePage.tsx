'use client'

import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"
import HugeIcon from "@/app/(Components)/HugeIcon"
import InlineLink from "@/app/(Components)/InlineLink"
import supabase from "@/lib/supabase"
import { useClerk } from "@clerk/nextjs"
import { Stack, Title, Text, Box, Skeleton } from "@mantine/core"
import { useEffect, useState } from "react"

async function getMMData() {
    const { data } = await supabase.from('MaintenanceMode').select().single() as any
    return data
}

export default function MaintenanceModePage({ isUser }: { isUser: boolean }) {
    const { openSignIn } = useClerk()

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    const defaultProps = {
        title: "Website Under Maintenance",
        description: "I'm currently performing some maintenance on the website to ensure you have the best possible experience. Please bear with me during this downtime as I work hard to improve services for you.",
    }

    const [data, setData] = useState<{ [key: string]: any }>(defaultProps)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      async function getData() {
        const { data, status } = await supabase.from('MaintenanceMode').select().single() as any
        (status === 200 && data) && setData(data)
        sleep(500).then(() => setLoading(false))
      }
      getData()
    }, [])

    console.log("Maintenance Mode Data:", data)



    // const data = await getMMData()

    // console.log("Maintenance Mode Data:", data)

    return (
        <>
            <Stack w="100vw" h="100vh" bg="var(--darkPurple)" style={{ overflow: "hidden", zIndex: "10" }} pos="absolute" top="0" left="0" justify="center" align="center" px="2rem">
                {!isUser &&
                    <PrimaryButton primNewIcon={{name: "login-01", variant: "twotone" }} opacity="0.09" action={() => openSignIn({ redirectUrl: '/' })}>Developer Login</PrimaryButton>
                }
                {loading ? <Stack w="75%" gap="var(--text-lh, var(--mantine-line-height-md))">
                    <Skeleton height="var(--text-fz, var(--mantine-font-size-md))" radius="sm" />
                    <Skeleton height="var(--text-fz, var(--mantine-font-size-md))" radius="sm" />
                    <Skeleton height="var(--text-fz, var(--mantine-font-size-md))" radius="sm" />
                    <Skeleton height="var(--text-fz, var(--mantine-font-size-md))" radius="sm" />
                    <Skeleton height="var(--text-fz, var(--mantine-font-size-md))" width="70%" radius="sm" />
                </Stack> : <Box maw="65vw">
                    <Title order={1} ta="center" fz="3rem" fw="900" c="var(--secondary)" visibleFrom="sm"><HugeIcon name="cone-01" variant="duotone" size="2.1rem" />{data.title}</Title>
                    <Text>{data.description}</Text>

                    <Text component="div">If you have any urgent concerns, feel free to reach out to me at <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{ name: "mail-at-sign-02", variant: "twotone"}} /> or on my social media platforms.</Text>

                    <Text>Thank you for your understanding!</Text>
                </Box>}
            </Stack>
        </>
    )
}