'use client'

import { MDXClient } from "next-mdx-remote-client/csr";

import { heading1, heading2, heading3, heading4, heading5, heading6, newSection, toggle, image, songInfo, blockquote, unorderedList, orderedList, videoFrame, tabSection, paragraph, divider, links, inlinePhotoGallery, tables, lineBreak, text, heading, codeBlock, code } from "@/app/(Config)/MarkDownComponents"
// import { heading1, heading2, heading3, heading4, heading5, heading6, paragraph, links, text, heading, newSection, toggle, image, inlinePhotoGallery, tabSection, videoFrame, unorderedList } from "@/app/(Config)/MarkDownComponents"
import { Suspense } from "react";
import { Anchor, Group, Loader, Paper, Stack, Title, Text } from "@mantine/core";

const MdxComponents = {
    h1: heading1,
    h2: heading2,
    h3: heading3,
    h4: heading4,
    h5: heading5,
    h6: heading6,
    p: paragraph,
    img: image,
    NewSection: newSection,
    Toggle: toggle,
    SongInfo: songInfo,
    blockquote: blockquote,
    TabSection: tabSection,
    VideoFrame: videoFrame,
    ul: unorderedList,
    ol: orderedList,
    hr: divider,
    a: links,
    InlinePhotoGallery: inlinePhotoGallery,
    Table: tables,
    br: lineBreak,
    Text: text,
    Heading: heading,
    pre: codeBlock,
    code: code
}

export function MdxContent({ source }: any) {

  return <Suspense fallback={
    <Paper p="2rem" color="white" bg="none" shadow="bsBoldSecondary" radius="lg">
      <Stack align="center">
        <Group gap="2rem" align="center">
          <Loader color="white" size="md" type="dots" />
          <Title fz={{base: "2rem", md: "3rem"}}>Loading Content</Title>
        </Group>
        <Text>If the content is still not loaded after a minute please contact Donald Louch at <Anchor href="mailto:hello@donaldlouch.ca">hello@donaldlouch.ca</Anchor> for further assistance.</Text>
      </Stack>
    </Paper>
  }><MDXClient {...source} components={MdxComponents}/></Suspense>
}