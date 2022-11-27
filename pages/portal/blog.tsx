

import React from 'react'

import { 
  AspectRatio,
  Box, 
  Grid, 
  Heading,
  Link,
  useColorModeValue,
  Image,
  Text
} from '@chakra-ui/react'

import {Metadata} from "../../components/Metadata"

import prisma from '../../lib/prisma'

import PortalLayout from '../../components/Portal/PortalLayout'
import Pagination from '../../components/Pagination'

export default function Blog({ postData, pagination }: any) {
  
  const posts = postData

  const boxShadow = useColorModeValue("bsBoldOrange", "bsBoldWhite")
  const boxBigShadow = useColorModeValue("bsBigBoldBlue", "bsBigBoldWhite")
  const whiteBlack = useColorModeValue('white', 'black')
  const blackWhite = useColorModeValue('black', 'white')

  return (
    <>
    <PortalLayout pageTitle="Manage Blog Posts">
    <Metadata
          title={`${process.env.WEBSITE_NAME} Blog Posts`}
          keywords={`${process.env.KEYWORDS}, blog, posts, post, content, photography, videography, graphic design, audio, written, general, education, educational`}
          description={`${process.env.DESCRIPTION}`}
        />
        <Box as="main" color={useColorModeValue("black", "white")}>
            <Link href="blogNew" variant="primaryButton">Create New Blog Post</Link>

            <Grid templateColumns={{base: "100%" , md:"50% 50%"}} gap={{base: 0, md: "1rem", xl:"2rem"}} mt="3rem" pr={{base: "initial", lg: "3rem"}} w="100%">
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
                      <Link href={`postEdit/${post.slug}`} variant="unstyled" _hover={{textDecoration: "none"}}>
                        <AspectRatio
                        ratio={16/9}
                        w="calc(100% + 4rem) "
                        m="-2rem"
                        mb="1rem"
                        overflow="hidden"
                        bg="mainGradient"
                        borderRadius="0 3rem 0 0"
                        >
                          <Image src={post.thumbnail} alt={post.title}/>
                        </AspectRatio>
                        <Heading as="h2" size="md" fontWeight="bold" mt="2rem" textTransform="uppercase" color="primary">{post.categories}</Heading>
                        <Heading as="h2" size="xl" fontWeight="bold" mb="1.5rem">{post.title}</Heading>
                        <Text textShadow="3px 2px 4px rgb(193 93 79 / 20%)" fontSize="sm" color="gray.500" mt="2rem">Posted On: {`${new Date(post?.postedOn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date(post?.postedOn).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`} | Last Updated: {`${new Date(post?.lastUpdatedOn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date(post?.lastUpdatedOn).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}</Text>
                      </Link>
                    </Box>
                  ))} 
            </Grid>

            <Pagination {...pagination} />

        </Box>
        </PortalLayout>
    </>
  )
}

export async function getServerSideProps(router: any) {
  const page = router.query.pg as number
  let currentPage = page - 1 as number || 0

  const postLimit = 10 as number
  
  const postLength = await prisma.blogPost.count() as number
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