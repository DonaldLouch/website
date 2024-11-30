import { Code, Text, Divider, Box } from "@mantine/core";

export default function CodeBlock({type, code, file}: {type?: string, code: any, file?: string}) {
  return <Code block bg="var(--blackRGBA)" c="white" style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)", whiteSpace: "pre-wrap"}} p="1rem 2rem 2rem" fz="1rem" lh="2">
    {type || file ? 
    <>
      {type && <Text fz="0.8rem" lh="1">// Code Type: .{type}</Text>}
      {file && <Text fz="0.8rem" lh="1">// Path: {file}</Text>}
      <Divider my="2rem" color="var(--darkPurple)" />
    </> : <Box my="1rem"></Box> }
    {code}
  </Code>
}