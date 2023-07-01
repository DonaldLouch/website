'use client'

import { Heading, Spinner, Stack, Text, Link } from "@chakra-ui/react"

export default function LoadingComponent() {
  return (
    <Stack alignItems="center" py="2rem" w="100%" color="white">
            <Stack direction="row" gap={{base: "0.5rem", md: "2rem"}} alignItems="center">
                <Spinner color="white" size="xl" />
                <Heading fontSize="5rem">Loading Content</Heading>
            </Stack>
            <Text pt="1rem">If the content is still not loaded after a minute please contact Donald Louch at <Link href="mailto:hello@donaldlouch.ca">hello@donaldlouch.ca</Link> for further assistance.</Text>
        </Stack>
  )
}
