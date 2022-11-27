import React from 'react'

import { 
  AspectRatio,
  Box, 
  Image,
  Text,
  Heading,
  Grid,
  // Image,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'

import { useRouter } from 'next/router'

import {Metadata} from "../../components/Metadata"

import prisma from '../../lib/prisma'

import { SectionCard } from "../../components/Cards/SectionCard"
import { SectionTitle } from "../../components/SectionTitle"
import Pagination from '../../components/Pagination'

// import { FormInput } from '../../components/Form/FormInput'
// import { Formik } from 'formik'

// import * as Yup from 'yup'

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
// console.log(pagination)
//   const paginationArray = pagination
// const currentPage = paginationArray?.[1] + 1
  
//   const previousPages = new Array as any
//   const nextPages = new Array as any

//   for (let index = currentPage + 1; index < paginationArray?.[0] + 1; index++) {
//     nextPages.push(index)
//   }

//   for (let indexPrev = currentPage - 1; indexPrev >= 1; indexPrev--) {
//     previousPages.push(indexPrev)
//   }

//   const pages = new Array as any
 
//   if (currentPage <= 4) {
//     pages.push(1,2,3,4,5,"...Nex", paginationArray?.[0])
//   } else if (paginationArray?.[0] - 3 <=  currentPage) {
//     pages.push(1, "...Prev",paginationArray?.[0] - 4,paginationArray?.[0] - 3,paginationArray?.[0] - 2,paginationArray?.[0] - 1, paginationArray?.[0])
//   } else {
//     pages.push(1, "...Prev",currentPage - 1, currentPage,currentPage + 1, "...Nex", paginationArray?.[0])
//   }

// const onSubmit =  async (values: any, e: any) => {
//   e.preventDefault()
//   // console.log(values.search)
//   posts.forEach((post:any) => {
//     const isFound = post.title.includes(values.search)
//     // console.log(post.title.includes(values.search))
//     posts.push("isFound", isFound ? true : false)
//     // post.element.styles.toggle(", !isFound)
//   })
// }

// const initialValues = {}
// const validationSchema = Yup.object({})

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
                {/* <Grid templateColumns={{base: "100%" , md:"50% 50%"}} gap={{base: 0, md: "1rem", xl:"2rem"}} pr="3rem"> */}
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
                        // w={{base: "calc(100% - -6rem);", xl: "95%"}}
                        w="calc(100% + 4rem) "
                        m="-2rem"
                        mb="1rem"
                        overflow="hidden"
                        // zIndex="10000"
                        bg="mainGradient"
                        borderRadius="0 3rem"
                        >
                          <Image src={post.thumbnail} alt={post.title}/>
                        </AspectRatio>
                        <Heading as="h2" size="md" fontWeight="bold" mt="2rem" textTransform="uppercase" color="primary">{post?.categories.split(",").length >= 1 ? (post.categories.replace(",", ", ")) : (post.categories)}</Heading>
                        <Heading as="h2" size="3xl" fontWeight="bold" mb="1.5rem">{post.title}</Heading>
                        <Text>{post.excerpt}</Text>
                      </Link>
                      {/* <Link 
                      as="a" 
                      href={`post/${post.slug}`} 
                      // key={post.id}
                      boxShadow={boxShadow}
                      _hover={{boxShadow: "bsBoldOrange", textDecoration: "none", color: "secondary"}}
                      p="1.5rem 2rem"
                      color={primeWhite}
                      borderRadius="0 2rem 0 2rem"
                      m="1.5rem 0"
                      fontSize="2xl" 
                      display="flex"
                      >
                        <Image src={post.thumbnail} alt={post.title} w="50%" />
                        {post.title}
                      </Link> */}
                      </Box>
                  ))} 
                {/* </Grid> */}
                {/* <Box as="aside" id="sidebar">
                  <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {({ handleSubmit }: any) => (
                      <Stack as="form" onChange={handleSubmit as any}>
                        <FormInput inputID="search" inputLabel="" inputType="search" />
                      </Stack>
                    )}
                  </Formik>
                    </Box>*/}
              </Grid>

              {/* <Pagination pages={pages} currentPage={currentPage} nextPages={nextPages} previousPages={previousPages} /> */}
              <Pagination {...pagination} />
             
          </SectionCard>
        </Box>
    </>
  )
}

export async function getServerSideProps(router: any) {
  const { category } = router.query
  // console.log(category.toUpperCase())

  const page = router.query.pg as number
  let currentPage = page - 1 as number || 0

  const postLimit = 12 as number
  
  // console.log(currentPage)
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
  // if (currentPage > numberOfPages) {
  //   // currentPage = 0
  // }

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