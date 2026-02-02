import { Box, Text, Title } from "@mantine/core";
import { Html } from "@react-email/components";

export default function EmailTemplate({ body }: any) {
  return <Html lang="en">
    <Title order={1} fz="h2">This is a test</Title>
    <Text>{body}</Text>
  </Html>
}
