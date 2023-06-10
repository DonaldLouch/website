import { Button, Heading, Link, Stack, Text } from "@chakra-ui/react"
import { Metadata } from "./Metadata"

export default function MaintenanceModePage() {
    return (
        <>
            <Metadata
                title={`UNDER DEVELOPMENT`}
                keywords={`UNDER DEVELOPMENT`}
                description={`UNDER DEVELOPMENT`}
            />
            <Stack w="100vw" h="100vh" background="black" overflow="hidden" color="white" pos="absolute" top="0" left="0" zIndex="100000" justifyContent="center" alignItems="center" px="2rem">
                <Button pos="absolute" top="2%" right="2%" opacity="0.1">Dev Login</Button>
                <Heading textAlign="center" fontSize="5xl" fontWeight="900" color="secondary">Under Development</Heading>
                <Text fontSize="2xl" textAlign="center" lineHeight="1.5"> Please note that this version of Donald Louch's Website is currently under development and will not be functional to the public at this time. You may visit the live version of the website at <Link href="https://donaldlouch.ca" variant="primary">https://donaldlouch.ca</Link>.</Text>
            </Stack>
        </>
    )
}