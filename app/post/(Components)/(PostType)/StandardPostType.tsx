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
import { PostContent } from '../PostContent'

const meta = keyframes `
    0% {
        left: -30vw;
    }
    100% {
        left: 0;
    }
`

export const StandardPostType = (post: any) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const metaAnimation = prefersReducedMotion ? undefined : `${meta} ease 2s`

    const postedData = new Date(post.postedOn)
    const postedDay = postedData.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const postedTime = postedData.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

    const postedOn = postedDay +" at " + postedTime
    const categorySplit = post.categories.split(",")
    return (
        <>
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
                <Image src={post.thumbnail} alt={post.title} width="1080" height="1920" />
            </AspectRatio>
            <Box 
                pos="absolute"
                top={{ base: "40vw", md:"5vw" }}
                fontSize="0.8rem" 
                bg="backgroundGradient"
                color="white"
                p="1.5rem"
                animation={metaAnimation}
                borderRadius="0 2rem"
                ml={{base: "-2rem", md:"-4rem"}}
            >
                <Heading as="h1" fontSize="3rem" fontWeight="900" m="0.5rem">{post.title}</Heading>
                <Text fontSize="1rem">By: <Link href="/about">{post.author}</Link> | Posted On: {postedOn} | Filed Under: {categorySplit.map((category: any) => (<Link key={category}href={`/C/${category}`} boxShadow="bsBoldWhite" p="0.5rem" borderRadius="0 0.5rem" mx="0.2rem" _hover={{boxShadow: "bsBoldOrange"}}>{category}</Link>))}</Text>
            </Box>

            <Box pt={{base: "43vh", md: "50vw"}}></Box>

            <PostCard>
                <Heading as="h2" fontSize="2.5rem" fontWeight="300" m="0 0 2rem" textShadow="3px 2px 4px rgb(193 93 79 / 20%)">{post.headingText}</Heading>
                {post.sidebar === true ? (
                    <>
                        <SidebarCard {...post} />
                        <TagsCard {...post} />
                    </>
                ) : (
                    <>
                        {/* @ts-ignore */}
                        <PostContent {...post} />
                        <TagsCard {...post} />
                    </>
                )}
            </PostCard>
        </>
    )
}