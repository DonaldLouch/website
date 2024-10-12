'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box, Button, Grid, SimpleGrid } from "@mantine/core"

import Pagination from "@/app/(Config)/(Layout)/(Pagination)"
import AdminPostCard from "./AdminPostCard"
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton"

export default function BlogContent({ posts, pagination}: any) {
  const breadCrumbs = [
    {"pageLink": "/admin/blog", "pageName": "Blog Post Manager"},
  ]

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box component="main" color="white">
        <PrimaryLinkedButton link="/admin/postNew">Create New Blog Post</PrimaryLinkedButton>

        {/* <SectionCard id="posts" styleType="primaryCard"><> */}
          <SectionTitle headingTitle={`Admin Blog Posts`} />
          {/* {pinnedPosts.map((post: any) => (
              <Box key={post.id} mt="2rem">
                  <PinnedPostsCard {...post} />
              </Box>
          ))} */}
          <SimpleGrid
              cols={3}
              spacing={{ base: 0, sm: "2rem" }}
              w="100%"
              my="1rem"
          >
              { posts?.map((post: any) => ( <AdminPostCard {...post} key={post.id} /> )) }
          </SimpleGrid>
          <Pagination {...pagination} />
        {/* </></SectionCard> */}
      </Box>
    </>
  )
}
