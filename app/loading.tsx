
'use client'
import { Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import Link from "next/link"

export default function loading() {
    return (
        <Stack alignItems="center" minH="100vh" maxH="100vh" pt="2rem" w="100%" background="none" color="white">
            <Stack direction="row" gap={{base: "0.5rem", md: "2rem"}} alignItems="center">
                <Spinner color="white" size="xl" />
                <Heading  fontSize={{base: "2rem", md: "3rem", lg:"5rem"}}>Loading Content</Heading>
            </Stack>
            <Text pt="1rem">If the content is still not loaded after a minute please contact Donald Louch at <Link href="mailto:hello@donaldlouch.ca">hello@donaldlouch.ca</Link> for further assistance.</Text>
        </Stack>
    )
}