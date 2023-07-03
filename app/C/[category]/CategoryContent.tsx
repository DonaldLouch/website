'use client'

import { Box, Grid } from '@chakra-ui/react'

import { SectionCard } from "../../(Components)/(Cards)/SectionCard"
import { SectionTitle } from "../../(Components)/SectionTitle"
import BlogPostCard from '../../blog/BlogPostCard'
import Pagination from "../../(Config)/(Layout)/(Pagination)"

export default function CategoryContent({posts, pagination, postsNumber, category}: any) {

  let capitalizedCategoryTitle = category.charAt(0).toUpperCase() + category.slice(1) as string

  if (category === "graphic") {
    capitalizedCategoryTitle = "Graphic Design"
  }

  return (
    <>
        <Box as="main" color="white">
          <SectionCard id="posts" styleType="primaryCard">
                <SectionTitle headingTitle={posts.length === 0 ? (`It seems that there is no blog posts under the category "${capitalizedCategoryTitle}".`) : (`"${capitalizedCategoryTitle}" has ${postsNumber} ${postsNumber === 1 ? ("post") : ("posts")} in it's category`)} />
                <Grid templateColumns={{base: "100%" , md:"50% 50%", lg: "33% 33% 33%"}} gap={{base: 0, md: "1rem", xl:"2rem"}} mt="3rem" pr={{base: "initial", lg: "3rem"}} w="100%">
                    { posts?.map((post: any) => ( <BlogPostCard {...post} /> )) }
                </Grid>
                <Pagination {...pagination} />
          </SectionCard>
        </Box>
    </>
  )
}