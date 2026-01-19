import { Code } from "@mantine/core";

export default function InlineCode({code, ...rest}: {code: any; [key: string]: any}) {
  return <Code p="0.5rem" bg="var(--blackRGBA)" c="white" fz="1rem" lh="2" {...rest}>{code}</Code>
}