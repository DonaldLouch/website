import React from 'react'

import { 
  AspectRatio,
  Box, 
  Image,
  Text,
  Heading,
  Grid,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'

import { useRouter } from 'next/router'

import {Metadata} from "../../components/Metadata"

import prisma from '../../lib/prisma'

import { SectionCard } from "../../components/Cards/SectionCard"
import { SectionTitle } from "../../components/SectionTitle"
import Pagination from '../../components/Pagination'

export default function Blog({ postData, pagination }: any) {
  const posts = postData

  const router = useRouter()

  const categoryTitle = router?.query?.category as string

  let capitalizedCategoryTitle = categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1) as string

  if (categoryTitle === "graphic") {
    capitalizedCategoryTitle = "Graphic Design"
  }

  const boxShadow = useColorModeValue("bsBoldOrange", "bsBoldWhite")
  const boxBigShadow = useColorModeValue("bsBigBoldBlue", "bsBigBoldWhite")
  const whiteBlack = useColorModeValue('white', 'black')
  const blackWhite = useColorModeValue('black', 'white')

  return (
    <>
    <Metadata
          title={`(${posts.length}) ${capitalizedCategoryTitle} | ${process.env.WEBSITE_NAME}`}
          keywords={`${process.env.KEYWORDS}, blog, category, categories, ${router.query.category}`}
          description={`Blog posts by Donald Louch that are flagged with the category ${router.query.category}`}
        />

        <Box as="main" color={useColorModeValue("black", "white")}>
          <SectionCard id="posts" styleType="primaryCard">
              <SectionTitle headingTitle={posts.length === 0 ? (`It seems that there is no blog posts under the category "${router.query.category}".`) : (`"${capitalizedCategoryTitle}" has ${posts.length} ${posts.length === 1 ? ("post") : ("posts")} in it's category`)} />
              <Grid templateColumns={{base: "100%" , md:"50% 50%", lg: "33% 33% 33%"}} gap={{base: 0, md: "1rem", xl:"2rem"}} mt="3rem" pr={{base: "initial", lg: "3rem"}} w="100%">
                  {posts?.map((post: any) => ( 
                    <Box 
                        key={post.id} 
                        id={post.id} 
                        as="article"
                        filter="opacity(98%)" 
                        p="2rem" 
                        borderRadius="0 3rem" 
                        w="100%"
                        mb="2rem" 
                        bg={whiteBlack}
                        boxShadow={boxShadow}
                        _hover={{boxShadow: boxBigShadow}}
                        color={blackWhite}
                    >
                      <Link href={`../post/${post.slug}`} variant="unstyled" _hover={{textDecoration: "none"}}>
                        <AspectRatio
                        ratio={16/9}
                        w="calc(100% + 4rem) "
                        m="-2rem"
                        mb="1rem"
                        overflow="hidden"
                        bg="mainGradient"
                        borderRadius="0 3rem"
                        >
                          <Image src={post.thumbnail} alt={post.title}/>
                        </AspectRatio>
                        <Heading as="h2" size="md" fontWeight="bold" mt="2rem" textTransform="uppercase" color="primary">{post?.categories.split(",").length >= 1 ? (post.categories.replace(",", ", ")) : (post.categories)}</Heading>
                        <Heading as="h2" size="3xl" fontWeight="bold" mb="1.5rem">{post.title}</Heading>
                        <Text>{post.excerpt}</Text>
                      </Link>
                      </Box>
                  ))} 
              </Grid>
              <Pagination {...pagination} />
          </SectionCard>
        </Box>
    </>
  )
}

export async function getServerSideProps(router: any) {
  const { category } = router.query

  const page = router.query.pg as number
  let currentPage = page - 1 as number || 0

  const postLimit = 12 as number
  const postLength = await prisma.blogPost.count({
    where: {
      postStatus: 'Public',
      categories: {
        contains: category,
      }
    }
  }) as number
  let numberOfPages = postLength / postLimit as number


  if (!Number.isInteger(numberOfPages)) {
    numberOfPages = Math.floor(numberOfPages) + 1
  }

  if (numberOfPages < page) {
    currentPage = numberOfPages
  }

  const pagination = new Array
  pagination.push(numberOfPages, currentPage)

  const postData = await prisma.blogPost.findMany({
    where: {
      postStatus: 'Public',
      categories: {
        contains: category,
      }
    },
    orderBy: {
      postedOn: 'desc'
    },
    skip: currentPage * postLimit,
    take: postLimit,
  })
  return { 
      props: { 
          postData: JSON.parse(JSON.stringify(postData)),
          pagination
      } 
  }
}