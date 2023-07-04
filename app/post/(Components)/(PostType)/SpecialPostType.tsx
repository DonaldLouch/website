'use client'

import { 
    Box,
    // Image,
    Text,
    keyframes,
    usePrefersReducedMotion,
    Heading,
    Link,
    AspectRatio
} from '@chakra-ui/react'

import Image from 'next/image'

import { PostCard } from '../PostCard'
import { TagsCard } from '../TagsCard'
import { SidebarCard } from '../SidebarCard'
import PostContent from '../PostContent'

const meta = keyframes `
    0% {
        left: -30vw;
    }
    100% {
        left: 0;
    }
`

export const SpecialPostType = ({post, mdxSource}: any) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const metaAnimation = prefersReducedMotion ? undefined : `${meta} ease 2s`

    const postedData = new Date(post.postedOn)
    const postedDay = postedData.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const postedTime = postedData.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

    const postedOn = postedDay +" at " + postedTime
    return (
        <>
            {/* <Box 
                as="section" 
                id="thumbWrap" 
                pos="absolute"
                top="0"
                left="0"
            >
                <Image src={post.thumbnail} alt={post.title} width="3840" height="2160"/> */}
                <AspectRatio 
                ratio={16/9}
                w="100%"
                overflow="hidden"
                bg="mainGradient"
                pos="absolute"
                top="0"
                left="0"
                p="0"
            >
                <Image src={post.thumbnail} alt={post.title} width="3840" height="2160" />
            </AspectRatio>
                <Box 
                    pos="absolute"
                    top={{ base: "30vw", md:"5vw" }}
                    fontSize="0.8rem" 
                    bg="backgroundGradient"
                    color="white"
                    p="1rem"
                    animation={metaAnimation}
                >
                    <Heading as="h1" fontSize="3rem" fontWeight="900" my="0.5rem">{post.title}</Heading>
                    <Text fontSize="1rem">By: <Link href="/about">{post.author}</Link> | Posted On: {postedOn} | Filed Under: <Link href={`/C/${post.categories}`}>{post.categories}</Link></Text>
                </Box>
            {/* </Box> */}

            <Box pt={{base: "43vh", md: "55vw", lg: "60vw", xl: "89vh"}}></Box>

            <PostCard>
                {post.sidebar === true ? (
                    <>
                        <SidebarCard post={post} />
                        <TagsCard post={post} />
                    </>
                ) : (
                    <>
                        <PostContent mdxSource={mdxSource} />
                        <TagsCard post={post} />
                    </>
                )}
            </PostCard>
        </>
    )
}