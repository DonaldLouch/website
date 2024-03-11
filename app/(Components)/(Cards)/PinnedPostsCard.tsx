'use client'

import { AspectRatio, Card, Heading, Stack, Text, Box } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link'
import Image from 'next/image'
import DisplayDate from '@/lib/DisplayDate'
import { BsPinAngle } from 'react-icons/bs'

interface PinnedPostsProps {
    id: string
    slug: string
    thumbnail: string
    title: string
    postedOn: any
}

export default function PinnedPostsCard(post: PinnedPostsProps) {
    // console.log("Date Type", post.postedOn)
    // moment(new Date(post.postedOn)).utcOffset(8).format("MMMM Do, YYYY [at] h:mma")
    return (
        <Link href={`/post/${post.slug}`}>
            <Card bg="none" boxShadow="bsBoldWhite" borderRadius="0 2rem" m={{base: "1.5rem 1rem", lg: "1rem 2rem"}} key={post.id} direction={{base: "column", md:"row"}} gap="1.5rem" alignItems="center" textAlign={{base: "center", md: "initial"}} pb={{base: "2rem", md: "0"}} pos="relative" p="0" _hover={{background: "backgroundGradient"}}>
                <Box color="white" pos="absolute" w="2%" zIndex="2" top={{base: "-4.5%", md: "-19%"}} left={{base: "-3%", md: "-1.5%" }}transform="rotate(-90deg)"  fontSize="4xl"><BsPinAngle /></Box>
                <AspectRatio
                    ratio={16/9}
                    w={{base: "100%", md: "20vw", lg:"15%"}}
                    overflow="hidden"
                    bg="mainGradient"
                    borderBottomLeftRadius={{base: "0", md:"2rem"}}
                    borderTopRightRadius={{base: "2rem", md:"0"}}
                >
                    <Image src={post.thumbnail} alt={post.title} width="3840" height="2160" />
                </AspectRatio>
                <Stack whiteSpace={{base: "initial", md: "nowrap"}} overflowX="scroll" w="60%">
                    <Heading color="white" m="0" fontSize={{base: "1.5rem", lg: "3vw", xl: "2vw"}}>{post.title}</Heading>
                    <Text textShadow="3px 2px 4px rgb(193 93 79 / 20%)" fontSize="sm" color="gray.500" mt="-0.5rem" mb={{base: "2rem", md: "0"}}>Posted On: <DisplayDate source={post.postedOn} /></Text>
                </Stack>
            </Card>
        </Link>
    )
}
