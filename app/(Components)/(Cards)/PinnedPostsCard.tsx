'use client'

import { AspectRatio, Card, Heading, Stack, Text, Box } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link'
import Image from 'next/image'

interface PinnedPostsProps {
    id: string
    slug: string
    thumbnail: string
    title: string
    postedOn: any
}

export default function PinnedPostsCard(post: PinnedPostsProps) {
    return (
        <Link href={`/post/${post.slug}`}>
            <Card bg="none" boxShadow="bsBoldWhite" borderRadius="0 2rem" m="1rem 2rem" key={post.id} direction={{base: "column", md:"row"}} gap="1.5rem" alignItems="center" textAlign={{base: "center", md: "initial"}} pb={{base: "1rem", md: "0"}} pos="relative">
                <Box color="white" pos="absolute" w="2%" zIndex="2" top="-15%" left="-1%" transform="rotate(-25deg)" display={{base: "none", md: 'initial'}} fontSize="3xl"><FontAwesomeIcon icon={['fal', 'thumbtack']} color="currentColor"/></Box>
                <AspectRatio
                    ratio={16/9}
                    w={{base: "100%", md: "20vw", lg:"15%"}}
                    overflow="hidden"
                    bg="mainGradient"
                    borderBottomLeftRadius={{base: "0", md:"2rem"}}
                    borderTopRightRadius={{base: "2rem", md:"0"}}
                >
                    <Image src={post.thumbnail} alt={post.title} width="200" height="200"/>
                </AspectRatio>
                <Stack whiteSpace={{base: "initial", md: "nowrap"}} overflowX="scroll" w="60%">
                    <Heading color="white" m="0">{post.title}</Heading>
                    <Text textShadow="3px 2px 4px rgb(193 93 79 / 20%)" fontSize="sm" color="gray.500" mt="-0.5rem">Posted On: {`${new Date(post?.postedOn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date(post?.postedOn).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}</Text>
                </Stack>
            </Card>
        </Link>
    )
}
