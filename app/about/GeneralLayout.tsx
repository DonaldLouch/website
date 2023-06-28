'use client'

import { Box } from "@chakra-ui/react";

import AboutMeBio from "./(Sections)/AboutMeBio";
import LinksSection from "./(Sections)/LinksSection";
import Contact from "./(Sections)/Contact";

// import { useEffect, useState } from "react";

// import supabase from "@/lib/supabase"
// import LoadingComponent from "../(Config)/ContentLoading";
import HomeButton from "../(Components)/(Buttons)/HomeButton";

export default function AboutGeneralLayout({about, posts, primaryLinks, links, embeds}: any) {
    // const [about, setAbout] = useState([])
    // const [posts, setPosts] = useState([])
    // const [primaryLinks, setPrimaryLinks] = useState([])
    // const [links, setLinks] = useState([])
    // const [embeds, setEmbeds] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    // useEffect(() => {
    //     const fetchSupabaseData = async () => {
    //         const { data: aboutMe } = await supabase.from('About').select().single()
    //         const { data: pinnedPostsData } = await supabase.from('BlogPost').select().match({ pinned: true, postStatus: 'Public' }).order('postedOn', { ascending: false }) as any
    //         const { data: primaryLinksData } = await supabase.from('PrimaryLinks').select().order('orderNumber', { ascending: true }) as any
    //         const { data: linksData } = await supabase.from('Links').select().order('lastUpdatedOn', { ascending: false }) as any
    //         const { data: embedsData } = await supabase.from('Embed').select().order('lastUpdatedOn', { ascending: false }) as any
    //         setAbout(aboutMe)
    //         setPosts(pinnedPostsData)
    //         setPrimaryLinks(primaryLinksData)
    //         setLinks(linksData)
    //         setEmbeds(embedsData)
    //     }
    //     fetchSupabaseData()
    //     about && posts && primaryLinks && links && embeds && setIsLoading(false)
    // }, [])
    return (
        <>
            {/* {isLoading ? <LoadingComponent /> : <> */}
                <HomeButton />
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    zIndex="overlay"
                    background="black"
                    width="100%"
                    maxW="100%"
                    >
                    <Box
                        as="section"
                        color="white"
                        padding={{ base: "0.5rem", md: "2rem 5rem" }}
                        // position="relative"
                        background="blurredBackground"
                        width="100%"
                        maxW="100%"
                    >
                        <AboutMeBio {...about} />
                        <LinksSection about={about} posts={...posts} primaryLinks={...primaryLinks} links={...links} embeds={...embeds}/>
                        <Contact />
                    </Box>
                </Box>
            {/* </>} */}
        </>
    )
}
