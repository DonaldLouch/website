'use client'

import { 
    Box,
    Text,
    Heading,
    AspectRatio,
    Stack,
    Link
} from '@chakra-ui/react'

import { PostCard } from '../PostCard'
import { TagsCard } from '../TagsCard'
import { SidebarCard } from '../SidebarCard'
import { MetaDataCard } from '../MetaDataCard'
import PostContent from '../PostContent'

export const VideoPostType = (post: any) => {
    const videoPath = post?.media?.split(" || ")?.[1]
    const mediaCreditSplit = post?.mediaCredit?.split(";;")
    return (
        <>
            <Box bg="white"pos="absolute" top="0" left="0" w="100vw" justifyContent="center" alignItems="center" h={{base: "60vw", md:"100vh"}} zIndex="banner"></Box>
            <Stack bg="mainGradient" pos="absolute" top="0" left="0" w="100vw" justifyContent="center" alignItems="center" h={{base: "60vw", md:"100vh"}} zIndex="banner">
                <AspectRatio 
                    ratio={16/9}
                    w="88%"
                    m={{ base: "0 -4rem", xl: "0"}}
                    overflow="hidden"
                    zIndex="10000"
                    bg="mainGradient"
                    borderRadius="0 2rem"
                >
                {post?.media?.includes("<opusvid>") ? (
                    <iframe src={`https://opusvid.donaldlouch.ca/embed?id=${videoPath}`} allowFullScreen></iframe>
                ) : post?.media?.includes("<youtube>") && (
                    <iframe src={`https://www.youtube.com/embed/${videoPath}`} allowFullScreen></iframe>
                )}
                </AspectRatio>
            </Stack>

            <Box pt={{base: "45%", md: "87vh", lg: "87vh", xl: "89vh"}}></Box>

            <PostCard>
                {post.mediaCredit && (
                    <Text id="videoTitle" fontSize="1.5rem" textAlign="center" fontWeight="600" mt="3.5rem" mb="2rem"><strong>&#34;<Link href={mediaCreditSplit?.[0]}>{mediaCreditSplit?.[1]}</Link>&#34;</strong> by <strong><Link href={mediaCreditSplit?.[2]}>{mediaCreditSplit?.[3]}</Link></strong> on <strong><Link href={mediaCreditSplit?.[4]}>{mediaCreditSplit?.[5]}</Link></strong></Text>
                )}
                <Heading as="h2" fontSize="2.5rem" fontWeight="300" m="0 0 2rem" textShadow="3px 2px 4px rgb(193 93 79 / 20%)">{post.headingText}</Heading>
                {post.sidebar === true ? (
                    <>
                        <SidebarCard {...post} />
                        <MetaDataCard {...post} />
                        <TagsCard {...post} />
                    </>
                ) : (
                    <>
                        <PostContent {...post} />
                        <MetaDataCard {...post} />
                        <TagsCard {...post} />
                    </>
                )}
            </PostCard>
        </>
    )
}