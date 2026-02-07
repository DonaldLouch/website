import {
  Title,
  Loader,
  Stack,
  Text,
  Paper,
  Group,
  Anchor,
  Center,
} from "@mantine/core";
import PrimaryLinkedButton from "./buttons/PrimaryLinkedButton";
import PrimaryButton from "./buttons/PrimaryButton";

export default function Loading({
  loadingTitle,
  loadingText,
  loaderStyle,
  loaderLocation
}: {
  loadingTitle?: string;
  loadingText?: string;
  loaderStyle?: "bars" | "dots" | undefined;
  loaderLocation?: "fullpage" | "inline" | undefined; 
}) {
  const button = () => (
    <Anchor
      href="mailto:hello@donaldlouch.ca"
      c="var(--secondary)"
      underline="hover"
    >
      hello@donaldlouch.ca
    </Anchor>
  );

  const DefaultLoader = () => {
    return <Paper
        p={{ base: "2rem", lg: "4rem" }}
        color="white"
        bg="none"
        shadow="bsBoldSecondary"
        radius="lg"
        mx={{ base: "1rem", sm: "2rem" }}
      >
        <Stack align="center">
          <Group gap="2rem" align="center">
            <Loader
              color="white"
              size="md"
              type={loaderStyle ? loaderStyle : undefined}
            />
            <Title order={1} fz={{ base: "2rem", sm: "3rem" }} fw="900">
              {loadingTitle ? loadingTitle : "Loading Content"}
            </Title>
          </Group>
          <Text ta="center">
            {loadingText
              ? loadingText
              : "If the content is still not loaded after a minute please contact Donald Louch for further assistance."}
          </Text>
          <Group align="center" justify="center" gap="1rem" m="0" p="0">
            <PrimaryLinkedButton
              link={{ to: "mailto:hello@donaldlouch.ca" }}
              icon={{ name: "light-envelope-at", pack: "fak" }}
            >
              Contact Donald Louch
            </PrimaryLinkedButton>
            <PrimaryLinkedButton
              link={{ to: "/" }}
              icon={{ name: "house", pack: "fajdr" }}
            >
              Try Going To The Home Page
            </PrimaryLinkedButton>
            <PrimaryButton
              action={() => window.location.reload()}
              icon={{ name: "rotate-right" }}
            >
              Reload Page
            </PrimaryButton>
          </Group>
        </Stack>
    </Paper>
  }

  return <>
    {loaderLocation === "inline" ? <DefaultLoader /> :
    <Center
      mih="100vh"
      mah="100vh"
      pos="fixed"
      top=" 0"
      left="0"
      style={{ zIndex: "9000", boxShadow: "bsSecondary", overflowY: "hidden" }}
      bg="var(--blackPurple)"
      miw="100vw"
      maw="100vw"
    >
      <DefaultLoader />
    </Center>
    }
  </>
}
