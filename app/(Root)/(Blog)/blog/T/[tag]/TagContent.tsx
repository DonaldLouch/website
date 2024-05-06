'use client'

import { Box, SimpleGrid } from '@mantine/core'

import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import BlogPostCard from '../../BlogPostCard';
import Pagination from "@/app/(Config)/(Layout)/(Pagination)";

export default function TagContent({posts, pagination, postsNumber, tag}: any) {
  return (<Box component="main">
    <SectionCard id="posts" styleType="primaryCard">
      <SectionTitle headingTitle={posts.length === 0 ? (`It seems that there is no blog posts under the tag "${tag}".`) : (`${tag === "design" ? ("Graphic Design") : (`"${tag}"`)} has ${postsNumber} ${postsNumber === 1 ? ("post") : ("posts")} in it's tag`)} />
      {/* {pinnedPosts.map((post: any) => (<Box key={post.id} mt="2rem">
        <PinnedPostsCard {...post} />
      </Box>))} */}
      <SimpleGrid
        cols={3}
        spacing={{ base: 0, sm: "2rem" }}
        w="100%"
      >
        {posts?.map((post: any) => ( <BlogPostCard {...post} /> ))}
      </SimpleGrid>
      <Pagination {...pagination} />
    </SectionCard>
</Box>)
}