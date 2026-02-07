import { Paper, Stack, Group, Loader, Title, Text } from "@mantine/core";
import InlineLink from "../InlineLink";

export default function FeedLoader({ loaderTitle, ref, isLastPage, ...rest }: any) {
    return <Paper ref={ref} p="2rem" color="white" style={{display: isLastPage ? "none" : "block"}} bg="none" shadow="bsBoldSecondary" radius="lg" mb="2rem">
        <Stack align="center">
            <Group gap="2rem" align="center">
                <Loader color="white" size="md" type="bars" />
                <Title fz={{base: "2rem", md: "3rem"}}>{loaderTitle || "Loading More Content"}</Title>
            </Group>
            <Text component="span">If the content is still not loaded after a minute please contact Donald Louch at <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{name: "light-envelope-at", pack: "fak"}} /> for further assistance.</Text>
        </Stack>
    </Paper>
}
