'use client'

import { Box, SimpleGrid } from '@mantine/core'

import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import BlogPostCard from "../../BlogPostCard"
import Pagination from "@/app/(Config)/(Layout)/(Pagination)"

export default function CategoryContent({posts, pagination, postsNumber, category}: any) {
  let capitalizedCategoryTitle = category.charAt(0).toUpperCase() + category.slice(1) as string

  return <Box component="main">
    <SectionCard id="posts" styleType="primaryCard">
      <SectionTitle headingTitle={posts.length === 0 ? (`It seems that there is no blog posts under the category "${capitalizedCategoryTitle}".`) : (`"${capitalizedCategoryTitle}" has ${postsNumber} ${postsNumber === 1 ? ("post") : ("posts")} in it's category`)} />
      {/* {pinnedPosts.map((post: any) => (<Box key={post.id} mt="2rem">
        <PinnedPostsCard {...post} />
      </Box>))} */}
      <SimpleGrid
        cols={{base: 1, sm: 2, md: 3}}
        spacing="2rem"
        w="100%"
        my="1rem"
      >
        {posts?.map((post: any) => ( <BlogPostCard {...post} key={post.id} /> ))}
      </SimpleGrid>
      <Pagination {...pagination} />
    </SectionCard>
  </Box>
}