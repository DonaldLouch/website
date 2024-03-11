'use client'

import { Alert, AlertDescription, Box, Code, Grid, Icon,Link } from "@chakra-ui/react";

import { SectionCard } from "../(Components)/(Cards)/SectionCard";
import { SectionTitle } from "../(Components)/SectionTitle";
import PinnedPostsCard from "../(Components)/(Cards)/PinnedPostsCard";
import BlogPostCard from "./BlogPostCard";

import Pagination from "../(Config)/(Layout)/(Pagination)";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NextLink from "next/link";

export default function Posts({posts, pinnedPosts, pagination, postsNumber}: any){
    return (
        <>
            <Box as="main" color="white" mt="96vh"></Box>
            <Alert status='warning' color="black" m="-1rem 0 2rem">
                <Icon>
                    <FontAwesomeIcon icon={["fas", "bell"]} color="currentColor"/>
                </Icon>
                    <AlertDescription mx="1rem" fontSize="lg">
                        Please note that the <Code>Blog Feed</Code> is entering legacy stages and is now integrating into a <Link href="/feed" as={NextLink} color="secondary"><Code>Feeds Directory</Code></Link> with separate feeds for <Link href="/feed/photography" as={NextLink} color="secondary"><Code>Photography</Code></Link>,<Link href="/feed/videography" as={NextLink} color="secondary"><Code> Videography</Code></Link>, and the <Link href="/C/General" as={NextLink} color="secondary"><Code>Written Posts</Code></Link> will remain in the same Feed format.
                    </AlertDescription>
            </Alert>
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
