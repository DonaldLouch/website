// // "use client"

import PrimaryButton from "@/components/(Buttons)/PrimaryButton"
import PrimaryLinkedButton from "@/components/(Buttons)/PrimaryLinkedButton"
import HugeIcon from "@/components/HugeIcon"
import InlineLink from "@/components/InlineLink"
import supabase from "@/lib/supabase"
// import { useClerk } from "@clerk/nextjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Stack, Title, Text, Box, Skeleton } from "@mantine/core"
import { useEffect, useState } from "react"

import "@/lib/FontAwesome"
import { useServerFn } from "@tanstack/react-start"
import { useQuery } from "@tanstack/react-query"
import { GetMaintenanceMode } from "@/actions/database/GetDatabase.server"

export default function MaintenanceModePage() {
    // const { openSignIn } = useClerk()

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    const defaultProps = {
        title: "Website Under Maintenance",
        description: "I'm currently performing some maintenance on the website to ensure you have the best possible experience. Please bear with me during this downtime as I work hard to improve services for you.",
        lastUpdated: new Date(),
        id: 0,
    }

    const [loading, setLoading] = useState(true)
    
    const getData = useServerFn(GetMaintenanceMode)
    const { data: data, status } = useQuery({
        queryKey: ['getMaintenanceModeData'],
        queryFn: () => getData(),
        initialData: defaultProps,
    })
    status === "success" && useEffect(() => {
        sleep(500).then(() => setLoading(false))
    }, [data])

    return (
        <>
            <Stack w="100vw" h="100vh" bg="var(--darkPurple)" style={{ overflow: "hidden", zIndex: "10" }} pos="absolute" top="0" left="0" justify="center" align="center" px="2rem">
                <PrimaryLinkedButton primNewIcon={{name: "person-to-portal" }} opacity="0.09" link="/auth">Developer Login</PrimaryLinkedButton>
              
                {loading ? <Stack w="75%" gap="var(--text-lh, var(--mantine-line-height-md))">
                    <Skeleton height="var(--text-fz, var(--mantine-font-size-md))" radius="sm" />
                    <Skeleton height="var(--text-fz, var(--mantine-font-size-md))" radius="sm" />
                    <Skeleton height="var(--text-fz, var(--mantine-font-size-md))" radius="sm" />
                    <Skeleton height="var(--text-fz, var(--mantine-font-size-md))" radius="sm" />
                    <Skeleton height="var(--text-fz, var(--mantine-font-size-md))" width="70%" radius="sm" />
                </Stack> : <Box maw="65vw">
                    <Title order={1} ta="center" fz="3rem" fw="900" c="var(--secondary)" visibleFrom="sm"><FontAwesomeIcon icon={["fadl", "traffic-cone"]} />{data?.title}</Title>
                    <Text>{data?.description}</Text>

                    <Text component="div">If you have any urgent concerns, feel free to reach out to me at <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{ name: "light-envelope-at", pack: "fak" }} /> or on my social media platforms.</Text>

                    <Text>Thank you for your understanding!</Text>
                </Box>}
            </Stack>
        </>
    )
}