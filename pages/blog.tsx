

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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  // textDecoration,
  // Stack,
} from '@chakra-ui/react'

import {Metadata} from "../components/Metadata"

import prisma from '../config/prisma'

import { SectionCard } from "../components/Cards/SectionCard"
import { SectionTitle } from "../components/SectionTitle"
import HeroPage from "../components/HeroPage"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../config/fontAwesome'
// import { FormInput } from '../components/Form/FormInput'
// import { Formik } from 'formik'

// import * as Yup from 'yup'

export default function Blog({ postData, pagination }: any) {
  const posts = postData

  const boxShadow = useColorModeValue("bsBoldOrange", "bsBoldWhite")
  const boxBigShadow = useColorModeValue("bsBigBoldBlue", "bsBigBoldWhite")
  const whiteBlack = useColorModeValue('white', 'black')
  const blackWhite = useColorModeValue('black', 'white')

  const pageLinks = [
    {
        'linkTitle': 'Photography',
        'linkUrl': '/C/photography'
    },
    {
        'linkTitle': 'Videography',
        'linkUrl': '/C/videography'
    },
    {
        'linkTitle': 'Audio', 
        'linkUrl': '/C/audio'
    },
    {
        'linkTitle': 'Graphic Design', 
        'linkUrl': '/C/design'
    },
    {
        'linkTitle': 'General', 
        'linkUrl': '/C/general'
    },
    {
        'linkTitle': 'Education', 
        'linkUrl': '/C/education'
    },
]

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

// posts.forEach((post:any) => {
//   posts?.post?.index.push("isFound", false)
// })s

// console.log(posts?.[0])

// const onSubmit =  async (values: any, e: any) => {
//   e.preventDefault()
//   // console.log(values.search)
//   posts.forEach((post:any) => {
  // .toLowerCase()
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
          title={`${process.env.WEBSITE_NAME} Blog Post's`}
          keywords={`${process.env.KEYWORDS}, blog. post, feed, photography, videography, audio, design, general, education`}
          description={`${process.env.DESCRIPTION}`}
        />
        
        <HeroPage name="Donald Louch" tagLine="and I'm a Canadian Digital Content Creator" links={pageLinks} cta={["About Me", "about"]} />

        <Box 
          position="absolute"
          top="95vh"
          left="50vw"
          zIndex="overlay"
          color="white"
          fontSize="1.5rem"
        >
          <Link href="#posts"><FontAwesomeIcon icon={['fas', 'circle-chevron-down']} width="100%" /></Link>
        </Box>
        
        <Box as="main" color={useColorModeValue("black", "white")} mt="88vh">
          <SectionCard id="posts" styleType="primaryCard">
              <SectionTitle headingTitle="Blog Posts" />
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
                      <Link href={`/post/${post.slug}`} variant="unstyled" _hover={{textDecoration: "none"}}>
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
          </SectionCard>
        </Box>
    </>
  )
}

export async function getServerSideProps(router:any) {
  const page = router.query.pg as number
  let currentPage = page - 1 as number || 0

  const postLimit = 12 as number
  
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