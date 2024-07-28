'use client'
import { Title, Loader, Stack, Text, Paper, Group, Anchor, Center } from "@mantine/core";

export default function loading() {
    return (<Center mih="100vh" mah="100vh">
        <Paper p="2rem" color="white" bg="none" shadow="bsBoldSecondary" radius="lg" mx={{base: "2rem", sm: "0"}}>
            <Stack align="center">
            <Group gap="2rem" align="center">
                <Loader color="white" size="md" />
                <Title order={1} fz={{base: "2rem", md: "3rem"}} fw="900">Loading Content</Title>
            </Group>
            <Text>If the content is still not loaded after a minute please contact Donald Louch at <Anchor href="mailto:hello@donaldlouch.ca" c="var(--secondary)" underline="hover">hello@donaldlouch.ca</Anchor> for further assistance.</Text>
            </Stack>
        </Paper>
    </Center> )
}