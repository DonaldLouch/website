import { 
    // Box,
    // Text,
    // useColorModeValue
  } from '@chakra-ui/react'

// import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
  
  import { heading1, heading2, heading3, heading4, heading5, heading6, newSection, toggle, image, songInfo, blockquote, unorderedList, videoFrame, tabSection, paragraph, underline, links, inlinePhotoGallery, tables, lineBreak, text, heading } from "./MarkDownComponents"

    const components = { 
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
    
  export const PostContent = ( source: any ) => { 
    // console.log(source)
      return (
        <>
        <MDXRemote {...source}  components={components}/>
        </>
      )
  }
