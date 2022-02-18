import { 
    // Grid,
    // Image,
    // Heading,
    // Text,
    // Button,
    Box,
    useColorModeValue,
    // Accordion,
    // AccordionItem,
    // AccordionButton,
    // AccordionPanel,
    // Image,
    // Stack,
    // Tabs,
    // TabList,
    // Tab,
    // TabPanels,
    // TabPanel,
    // VisuallyHidden,
} from '@chakra-ui/react'

import prisma from '../../config/prisma'

import {Metadata} from "../../components/Metadata"

import { serialize } from 'next-mdx-remote/serialize'

import { VideoPostType } from '../../components/PostTypes/VideoPostType'
import { AudioPostType } from '../../components/PostTypes/AudioPostType'
import { StandardPostType } from '../../components/PostTypes/StandardPostType'
import { SpecialPostType } from '../../components/PostTypes/SpecialPostType'
import { GalleryPostType } from '../../components/PostTypes/GalleryPostType'
import { Photo1PostType } from '../../components/PostTypes/Photo1PostType'
import { Photo2PostType } from '../../components/PostTypes/Photo2PostType'
import { Photo3PostType } from '../../components/PostTypes/Photo3PostType'
import { Photo4PostType } from '../../components/PostTypes/Photo4PostType'

export default function Post({ source, postData }:any) {
    const post = postData

    return (
        <>  
            <Metadata
                title={`${post.title} | ${process.env.WEBSITE_NAME}`}
                keywords={`${process.env.KEYWORDS}, ${post.tags}`}
                description={`${post.excerpt}`}
            />

            <Box color={useColorModeValue("black", "white")}>
                {post.blogType === "Video" && (<VideoPostType {...post} {...source} />)}
                {post.blogType === "Audio" && (<AudioPostType {...post} {...source} />)}
                {post.blogType === "Standard" && (<StandardPostType {...post} {...source} />)}
                {post.blogType === "Special" && (<SpecialPostType {...post} {...source} />)}
                {post.blogType === "Gallery" && (<GalleryPostType {...post} {...source} />)}
                {post.blogType === "Photo 1" && (<Photo1PostType {...post} {...source} />)}
                {post.blogType === "Photo 2" && (<Photo2PostType {...post} {...source} />)}
                {post.blogType === "Photo 3" && (<Photo3PostType {...post} {...source} />)}
                {post.blogType === "Photo 4" && (<Photo4PostType {...post} {...source} />)}
                {/* {post.blogType && (<StandardPostType {...post} {...source} />)} */}
                {/* {post.postType === "Standard" && ()} */}
            </Box>
        </>
    )
}

export async function getServerSideProps(router: any) {
    const slug = router.params.slug

    const postData = await prisma.blogPost.findUnique({
        where: {
            slug: slug
        }
    })

    const source = postData?.body as any

    const mdxSource = await serialize(source)
    
    return { 
        props: { 
            postData: JSON.parse(JSON.stringify(postData)),
            source: mdxSource 
        } 
    }
  }