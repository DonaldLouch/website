'use client'

import { Box, Grid } from "@chakra-ui/react";

import { SectionCard } from "../(Components)/(Cards)/SectionCard";
import { SectionTitle } from "../(Components)/SectionTitle";
import PinnedPostsCard from "../(Components)/(Cards)/PinnedPostsCard";
import BlogPostCard from "./BlogPostCard";

import Pagination from "../(Config)/(Layout)/(Pagination)";

export default function Posts({posts, pinnedPosts, pagination, postsNumber}: any){
    return (
        <>
            <Box as="main" color="white" mt="96vh"></Box>
            <SectionCard id="posts" styleType="primaryCard">
                    <>
                        <SectionTitle headingTitle={`Blog Posts (${postsNumber})`} />
                        {pinnedPosts.map((post: any) => (
                            <Box key={post.id} mt="2rem">
                                <PinnedPostsCard {...post} />
                            </Box>
                        ))}
                        <Grid
                            templateColumns={{ base: "100%", md: "50% 50%", lg: "33% 33% 33%" }}
                            gap={{ base: 0, md: "1rem", xl: "2rem" }}
                            mt="3rem"
                            pr={{ base: "initial", lg: "3rem" }}
                            w="100%"
                        >
                            { posts?.map((post: any) => ( <BlogPostCard {...post} /> )) }
                        </Grid>
                        <Pagination {...pagination} />
                    </>
            </SectionCard>
        </>
    );
}
