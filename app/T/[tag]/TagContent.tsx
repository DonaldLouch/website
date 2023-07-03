'use client'

import { Box, Grid } from '@chakra-ui/react'

import { SectionCard } from "../../(Components)/(Cards)/SectionCard"
import { SectionTitle } from "../../(Components)/SectionTitle"
import BlogPostCard from '../../blog/BlogPostCard';
import Pagination from "../../(Config)/(Layout)/(Pagination)";

export default function TagContent({posts, pagination, postsNumber, tag}: any) {
  return (
    <>
        <Box as="main" color="white">
          <SectionCard id="posts" styleType="primaryCard">
                <SectionTitle headingTitle={posts.length === 0 ? (`It seems that there is no blog posts under the tag "${tag}".`) : (`${tag === "design" ? ("Graphic Design") : (`"${tag}"`)} has ${postsNumber} ${postsNumber === 1 ? ("post") : ("posts")} in it's tag`)} />
                <Grid templateColumns={{base: "100%" , md:"50% 50%", lg: "33% 33% 33%"}} gap={{base: 0, md: "1rem", xl:"2rem"}} mt="3rem" pr={{base: "initial", lg: "3rem"}} w="100%">
                    { posts?.map((post: any) => ( <BlogPostCard {...post} /> )) }
                </Grid>
                <Pagination {...pagination} />
          </SectionCard>
        </Box>
    </>
  )
}