import { MDXRemote } from "next-mdx-remote";
import { Suspense } from "react";


import { heading1, heading2, heading3, heading4, heading5, heading6, newSection, toggle, image, songInfo, blockquote, unorderedList, orderedList, videoFrame, tabSection, paragraph, divider, links, inlinePhotoGallery, tables, lineBreak, text, heading, codeBlock, code, internalEmbedVideo } from "./MarkDownComponents"
import Loading from "../Loading";
import { Box } from "@mantine/core";

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
    InternalEmbedVideo: internalEmbedVideo,
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

export function Markdown({ source, ...rest }: {source: any, [key: string]: any }) {
  return <Suspense fallback={ <Loading loaderLocation="inline" /> }>
    <Box style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}} p="1rem 2rem" m="0.5rem" {...rest}>
      <MDXRemote {...source} components={MdxComponents}/>
    </Box>
  </Suspense>
}