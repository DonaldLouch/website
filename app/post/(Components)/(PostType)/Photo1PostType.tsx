'use client'

import { 
    Box,
    Link,
    Heading
} from '@chakra-ui/react'

import Image from 'next/image'

import { PostCard } from '../PostCard'
import { TagsCard } from '../TagsCard'
import { SidebarCard } from '../SidebarCard'
import PostContent from '../PostContent'
import { ImageMetaDataCard } from '../ImageMetaDataCard'

export const Photo1PostType = ({post, mdxSource}: any) => {
    // const gallerySplit = post?.media?.split(' || ')
    return (
        <>
            <Box 
                as="section" 
                id="photoShowcase" 
                padding={{base: "6rem 4.4rem 1rem", lg: "6rem 0.4rem 1rem"}}
                w="calc(100% + 10rem)"
                m="-6rem -5rem"
                sx={{ columnCount: "1", columnGap: "0.4rem", columnWidth: "100%" }}
                bg="mainGradient"
            >
                {/* {gallerySplit?.map((image: any) => ( */}
                    <Link href={post?.media.split(';;')?.[0]} _hover={{background: "blurredBackground", opacity: "0.6"}} transition="all 0.3s">
                        <Image src={post?.media.split(';;')?.[0]} alt={post?.media.split(';;')?.[1]} width="3840" height="2160" style={{display: "inherit"}}/>
                    </Link>
                {/* ))} */}
            </Box>

            <PostCard>
                <ImageMetaDataCard post={post} />
                <Heading as="h2" fontSize="2.5rem" fontWeight="300" m="0 0 2rem" pl="1rem" textShadow="3px 2px 4px rgb(193 93 79 / 20%)" borderLeft="0.1rem solid grey">{post.headingText}</Heading>
                {post.sidebar === true ? (
                    <>
                        <SidebarCard post={post} mdxSource={mdxSource} />
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