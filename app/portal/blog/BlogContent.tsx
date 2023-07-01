'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box, Button, Grid } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import Pagination from "@/app/(Config)/(Layout)/(Pagination)"
import supabase from "@/lib/supabase"
import AdminPostCard from "./AdminPostCard"
import LoadingComponent from "@/app/(Config)/ContentLoading"

export default function BlogContent({ posts, pagination}: any) {
  const breadCrumbs = [
    {"pageLink": "/portal/blog", "pageName": "Blog Post Manager"},
  ]

  // const [posts, setPostData] = useState<any>([])
  // const [pagination, setPagination] = useState<any>([])
  // const [isLoading, setIsLoading] = useState<boolean>(true)

  // let pageParams = useSearchParams()
  // let pageRaw = pageParams.get("pg") as string
  // let page = parseInt(pageRaw) as number
  // let currentPage = (((page) - 1) as number) || 0
  // useEffect(() => {
  //   const fetchSupabaseData = async () => {
  //     const postLimit = 10 as number
  //     const {count: postLength} = await supabase.from('BlogPost').select("*", { count: 'exact'}) as any
  //     let numberOfPages = (postLength / postLimit) as number;

  //     if (!Number.isInteger(numberOfPages)) {
  //       numberOfPages = Math.floor(numberOfPages) + 1;
  //     }

  //     if (numberOfPages < page) {
  //       currentPage = numberOfPages;
  //     }
  //     const pageCalc = currentPage * postLimit
  //     const { data: theBlogData } = await supabase.from('BlogPost').select().order('postedOn', { ascending: false }).range(pageCalc, (pageCalc + postLimit - 1))

  //     const paginationArray = new Array();
  //     paginationArray.push(numberOfPages, currentPage);

  //     setPostData(theBlogData)
  //     setPagination(paginationArray)
  //     setIsLoading(false)
  //   }
  //   fetchSupabaseData()
  // }, [page])
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
