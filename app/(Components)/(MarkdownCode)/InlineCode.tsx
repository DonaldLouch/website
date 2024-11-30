import { Code } from "@mantine/core";

export default function InlineCode({code}: {code: any}) {
  return <Code p="0.5rem" bg="var(--blackRGBA)" c="white" fz="1rem" lh="2">{code}</Code>
}