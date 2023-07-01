'use client'

import { Box, Grid } from '@chakra-ui/react'

import { SectionCard } from "../../(Components)/(Cards)/SectionCard"
import { SectionTitle } from "../../(Components)/SectionTitle"
import BlogPostCard from '../../blog/BlogPostCard'
import Pagination from "../../(Config)/(Layout)/(Pagination)"

import LoadingComponent from "../../(Config)/ContentLoading"

import supabase from "@/lib/supabase"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function CategoryContent({posts, pagination, postsNumber, category}: any) {
  // const [posts, setPosts] = useState<any>([])
  // const [pagination, setPagination] = useState<any>([])
  // const [postsNumber, setPostsNumber] = useState(null) as any
  // const [isLoading, setIsLoading] = useState<boolean>(true)
    
  // let pageParams = useSearchParams()
  // let pageRaw = pageParams.get("pg") as string
  // let page = parseInt(pageRaw) as number
  // let currentPage = (((page) - 1) as number) || 0

  // const {category} = props

  // useEffect(() => {
  //     const fetchSupabaseData = async () => {
  //         const postLimit = 12 as number
  //         const {count: postLength} = await supabase.from('BlogPost').select("*", { count: 'exact'}).ilike('categories', `%${category}%`).match({ postStatus: 'Public' }) as any
  //         let numberOfPages = (postLength / postLimit) as number;

  //         if (!Number.isInteger(numberOfPages)) {
  //             numberOfPages = Math.floor(numberOfPages) + 1;
  //         }

  //         if (numberOfPages < page) {
  //             currentPage = numberOfPages;
  //         }
  //         const pageCalc = currentPage * postLimit
  //         const { data: postData } = await supabase.from('BlogPost').select().ilike('categories', `%${category}%`).match({ postStatus: 'Public' }).order('postedOn', { ascending: false }).range(pageCalc, (pageCalc + postLimit - 1))
          
  //         const paginationArray = new Array();
  //         paginationArray.push(numberOfPages, currentPage);
          
  //         setPosts(postData)
  //         setPagination(paginationArray)
  //         setPostsNumber(parseInt(postLength)) as number
  //     }
  //     fetchSupabaseData()
  //     posts ? setIsLoading(false) : setIsLoading(true)
  // }, [page])

  let capitalizedCategoryTitle = category.charAt(0).toUpperCase() + category.slice(1) as string

  if (category === "graphic") {
    capitalizedCategoryTitle = "Graphic Design"
  }

  return (
    <>
        <Box as="main" color="white">
          <SectionCard id="posts" styleType="primaryCard">
            {/* {isLoading ? <LoadingComponent /> : ( */}
              <>
                <SectionTitle headingTitle={posts.length === 0 ? (`It seems that there is no blog posts under the category "${capitalizedCategoryTitle}".`) : (`"${capitalizedCategoryTitle}" has ${postsNumber} ${postsNumber === 1 ? ("post") : ("posts")} in it's category`)} />
                <Grid templateColumns={{base: "100%" , md:"50% 50%", lg: "33% 33% 33%"}} gap={{base: 0, md: "1rem", xl:"2rem"}} mt="3rem" pr={{base: "initial", lg: "3rem"}} w="100%">
                    {/* {posts?.map((post: any) => ( 
                      <Box 
                          key={post.id} 
                          id={post.id} 
                          as="article"
                          filter="opacity(98%)" 
                          p="2rem" 
                          borderRadius="0 3rem" 
                          w="100%"
                          mb="2rem" 
                          bg=
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
                    ))}  */}
                    { posts?.map((post: any) => ( <BlogPostCard {...post} /> )) }
                </Grid>
                <Pagination {...pagination} />
              </>
            {/* )} */}
          </SectionCard>
        </Box>
    </>
  )
}