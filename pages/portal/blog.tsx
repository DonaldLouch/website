

import React from 'react'

import { 
  AspectRatio,
  Box, 
  Grid, 
  Heading, 
  // Text,
  // Heading,
  Link,
  useColorModeValue,
  Image,
  Text,
  Stack,
  MenuButton,
  Menu,
  MenuItem,
  MenuList
} from '@chakra-ui/react'

import {Metadata} from "../../components/Metadata"

import prisma from '../../config/prisma'

import PortalLayout from '../../components/Portal/PortalLayout'
// import { SectionCard } from "../../components/Cards/SectionCard"
// import { SectionTitle } from "../../components/SectionTitle"

export default function Blog({ postData, pagination }: any) {
  
  const posts = postData

  const boxShadow = useColorModeValue("bsBoldOrange", "bsBoldWhite")
  const boxBigShadow = useColorModeValue("bsBigBoldBlue", "bsBigBoldWhite")
  const whiteBlack = useColorModeValue('white', 'black')
  const blackWhite = useColorModeValue('black', 'white')

  const paginationArray = pagination
  const currentPage = paginationArray?.[1] + 1
  
  const previousPages = new Array as any
  const nextPages = new Array as any

  for (let index = currentPage + 1; index < paginationArray?.[0] + 1; index++) {
    nextPages.push(index)
  }

  for (let indexPrev = currentPage - 1; indexPrev >= 1; indexPrev--) {
    previousPages.push(indexPrev)
  }

  console.log(previousPages)

  const pages = new Array as any
 
  if (currentPage <= 4) {
    pages.push(1,2,3,4,5,"...Nex", paginationArray?.[0])
  } else if (paginationArray?.[0] - 3 <=  currentPage) {
    pages.push(1, "...Prev",paginationArray?.[0] - 4,paginationArray?.[0] - 3,paginationArray?.[0] - 2,paginationArray?.[0] - 1, paginationArray?.[0])
  } else {
    pages.push(1, "...Prev",currentPage - 1, currentPage,currentPage + 1, "...Nex", paginationArray?.[0])
  }

  return (
    <>
    <PortalLayout pageTitle="Manage Blog Posts">
    <Metadata
          title={`${process.env.WEBSITE_NAME} Blog Posts`}
          keywords={`${process.env.KEYWORDS}, blog, posts, post, content, photography, videography, graphic design, audio, written, general, education, educational`}
          description={`${process.env.DESCRIPTION}`}
        />
        <Box as="main" color={useColorModeValue("black", "white")}>
          {/* <SectionCard id="signup" styleType="primaryCard"> */}
            <Link href="blogNew" variant="primaryButton">Create New Blog Post</Link>

            <Grid templateColumns={{base: "100%" , md:"50% 50%"}} gap={{base: 0, md: "1rem", xl:"2rem"}} mt="3rem" pr={{base: "initial", lg: "3rem"}} w="100%">
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
                      <Link href={`postEdit/${post.slug}`} variant="unstyled" _hover={{textDecoration: "none"}}>
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
                        <Heading as="h2" size="md" fontWeight="bold" mt="2rem" textTransform="uppercase" color="primary">{post.categories}</Heading>
                        <Heading as="h2" size="xl" fontWeight="bold" mb="1.5rem">{post.title}</Heading>
                        <Text textShadow="3px 2px 4px rgb(193 93 79 / 20%)" fontSize="sm" color="gray.500" mt="2rem">Posted On: {`${new Date(post?.postedOn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date(post?.postedOn).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`} | Last Updated: {`${new Date(post?.lastUpdatedOn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date(post?.lastUpdatedOn).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}</Text>
                      </Link>
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
            <Stack direction="row" justify="space-between" align="center" m="1rem" p="2rem" boxShadow="bsBoldBlue" borderRadius="0 2rem" color={blackWhite}>
              <Link href={`?pg=${currentPage - 1}`} variant="primary" color={blackWhite} _hover={{color: "primary"}}>Previous Page</Link>
              {pages.map((page: any) => (
                page === "...Prev" && (
                  <>
                    <Menu key={page.index} placement="top">
                      <MenuButton>...</MenuButton>
                      <MenuList>
                        {previousPages?.map((number: any) => (
                          <Link href={`?pg=${number}`} key={number}>
                            <MenuItem>{number}</MenuItem>
                          </Link>
                        ))}
                      </MenuList>
                    </Menu>
                  </>
                ) || page === "...Nex" && (
                  <>
                    <Menu key={page.index} placement="top">
                      <MenuButton>...</MenuButton>
                      <MenuList>
                        {nextPages?.map((number: any) => (
                          <Link href={`?pg=${number}`} key={number}>
                            <MenuItem>{number}</MenuItem>
                          </Link>
                        ))}
                      </MenuList>
                    </Menu>
                  </>
                ) || (
                page === currentPage ? (
                    <Link color="primary" fontWeight="900" _hover={{color: "primary"}} key={page?.index}>{page}</Link>
                ) : (
                  <Link href={`?pg=${page}`} variant="primary" color={blackWhite} _hover={{color: "primary"}} key={page?.index}>{page}</Link>
                )
                )
              ))}
              <Link href={`?pg=${currentPage + 1}`} variant="primary" color={blackWhite} _hover={{color: "primary"}}>Next Page</Link>
            </Stack>
        </Box>
        </PortalLayout>
    </>
  )
}

export async function getServerSideProps(router: any) {
  const page = router.query.pg as number
  let currentPage = page - 1 as number || 0

  const postLimit = 10 as number
  
  // console.log(currentPage)
  const postLength = await prisma.blogPost.count() as number
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