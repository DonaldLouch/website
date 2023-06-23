// "use client"

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};

import { heading1, heading2, heading3, heading4, heading5, heading6, newSection, toggle, image, songInfo, blockquote, unorderedList, videoFrame, tabSection, paragraph, underline, links, inlinePhotoGallery, tables, lineBreak, text, heading } from "@/app/(Config)/MarkDownComponents"

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
    hr: underline,
    a: links,
    InlinePhotoGallery: inlinePhotoGallery,
    Table: tables,
    br: lineBreak,
    Text: text,
    Heading: heading
}

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source } components={MdxComponents} />
}