'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box, Button, Grid } from "@chakra-ui/react"

import Pagination from "@/app/(Config)/(Layout)/(Pagination)"
import AdminPostCard from "./AdminPostCard"

export default function BlogContent({ posts, pagination}: any) {
  const breadCrumbs = [
    {"pageLink": "/portal/blog", "pageName": "Blog Post Manager"},
  ]

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box as="main" color="white">
        <Button as="a" href="/portal/postNew" variant="primary" background="primary" color="white" my="1rem !important">Create New Blog Post</Button>
          <Grid templateColumns={{base: "100%" , md:"50% 50%"}} gap={{base: 0, md: "1rem", xl:"2rem"}} mt="1rem" pr={{base: "initial", lg: "3rem"}} w="100%">
            {posts?.map((post: any) => ( <AdminPostCard {...post} /> ))} 
          </Grid>
          <Pagination {...pagination} />
      </Box>
    </>
  )
}
