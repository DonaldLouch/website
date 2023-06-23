'use client'

import { Box, Grid } from "@chakra-ui/react";

import { SectionCard } from "../(Components)/(Cards)/SectionCard";
import { SectionTitle } from "../(Components)/SectionTitle";
import PinnedPostsCard from "../(Components)/(Cards)/PinnedPostsCard";
import BlogPostCard from "./BlogPostCard";

import LoadingComponent from "../(Config)/ContentLoading";

import supabase from "@/lib/supabase"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "../(Config)/(Layout)/(Pagination)";

export default function Posts(){
    const [posts, setPosts] = useState<any>([])
    const [pinnedPosts, setPinnedPosts] = useState<any>([])
    const [pagination, setPagination] = useState<any>([])
    const [postsNumber, setPostsNumber] = useState(null) as any
    const [isLoading, setIsLoading] = useState<boolean>(true)
    
    let pageParams = useSearchParams()
    let pageRaw = pageParams.get("pg") as string
    let page = parseInt(pageRaw) as number
    let currentPage = (((page) - 1) as number) || 0

    useEffect(() => {
        const fetchSupabaseData = async () => {
            const postLimit = 9 as number
            const {count: postLength} = await supabase.from('BlogPost').select("*", { count: 'exact'}).match({ postStatus: 'Public' }) as any
            let numberOfPages = (postLength / postLimit) as number;

            if (!Number.isInteger(numberOfPages)) {
                numberOfPages = Math.floor(numberOfPages) + 1;
            }

            if (numberOfPages < page) {
                currentPage = numberOfPages;
            }
            const pageCalc = currentPage * postLimit
            const { data: postData } = await supabase.from('BlogPost').select().match({ postStatus: 'Public' }).order('postedOn', { ascending: false }).range(pageCalc, (pageCalc + postLimit - 1))
            const { data: pinnedPosts } = await supabase.from('BlogPost').select().match({ postStatus: 'Public', pinned: true }).order('postedOn', { ascending: false })
           
            const paginationArray = new Array();
            paginationArray.push(numberOfPages, currentPage);
           
            setPosts(postData)
            setPinnedPosts(pinnedPosts)
            setPagination(paginationArray)
            setPostsNumber(parseInt(postLength)) as number
        }
        fetchSupabaseData()
        posts && pinnedPosts ? setIsLoading(false) : setIsLoading(true)
    }, [page])
    
    return (
        <>
            <Box as="main" color="white" mt="96vh"></Box>
            <SectionCard id="posts" styleType="primaryCard">
                {isLoading ? <LoadingComponent /> : (
                    <>
                        <SectionTitle headingTitle={`Blog Posts (${postsNumber})`} />
                        {pinnedPosts.map((post: any) => (
                            <Box key={post.id} mt="2rem">
                                <PinnedPostsCard {...post} />
                            </Box>
                        ))}
                        <Grid
                            templateColumns={{ base: "100%", md: "50% 50%", lg: "33% 33% 33%" }}
                            gap={{ base: 0, md: "1rem", xl: "2rem" }}
                            mt="3rem"
                            pr={{ base: "initial", lg: "3rem" }}
                            w="100%"
                        >
                            { posts?.map((post: any) => ( <BlogPostCard {...post} /> )) }
                        </Grid>
                        <Pagination {...pagination} />
                    </>
                )}
            </SectionCard>
        </>
    );
}
