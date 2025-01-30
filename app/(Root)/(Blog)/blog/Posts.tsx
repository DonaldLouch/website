
'use client'

import { Alert, Box, Code, Grid, Anchor, Space, SimpleGrid } from "@mantine/core"

import { SectionCard } from "../../../(Components)/(Cards)/SectionCard";
import { SectionTitle } from "../../../(Components)/SectionTitle";
import PinnedPostsCard from "../../../(Components)/(Cards)/PinnedPostsCard";
import BlogPostCard from "./BlogPostCard";

import Pagination from "../../../(Config)/(Layout)/(Pagination)";

import DividerInlineText from "@/app/(Components)/DividerInlineText";

export default function Posts({posts, pinnedPosts, pagination, postsNumber}: any){
    return (
        <>
            <Space h="100vh" />
            <Box component="main">
                <SectionCard id="posts" styleType="primaryCard"><>
                    <SectionTitle headingTitle={`Blog Posts (${postsNumber})`} />
                    {/* <DividerInlineText text="Pinned Posts" /> */}
                    <PinnedPostsCard pinnedPosts={pinnedPosts} />
                    <DividerInlineText text="Blog Posts" />
                    <SimpleGrid
                        cols={{base: 1, sm: 2, md: 3}}
                        spacing="2rem"
                        w="100%"
                    >
                        { posts?.map((post: any) => ( <BlogPostCard {...post} key={post.id} /> )) }
                    </SimpleGrid>
                    <Pagination {...pagination} />
                </></SectionCard>
            </Box>
        </>
    );
}
