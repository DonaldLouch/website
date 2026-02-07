import { GetPinnedVideography, GetPinnedVideographyCount, GetAllPublicVideographyCount, GetFilteredBlogPosts, GetFilteredPhotography } from '@/actions/database/GetDatabase.server'
import { seo } from '@/utils/seo'
import { createFileRoute } from '@tanstack/react-router'

import { Box, Tabs, Image } from "@mantine/core";
import PinnedPhotos from "@/components/home/PinnedPhotos";
import PinnedVideos from "@/components/home/PinnedVideos";
import PinnedPostsCard from "@/components/cards/PinnedPostsCard";
import PrimaryLinkedButton from "@/components/buttons/PrimaryLinkedButton";
import HomeButton from "@/components/buttons/HomeButton";


export const Route = createFileRoute('/feed/')({
    component: RouteComponent,
    head: () => ({
        meta: [
            ...seo({
                title: `${import.meta.env.VITE_WEBSITE_NAME}'s Feed's`,
                keywords: `${import.meta.env.VITE_KEYWORDS}, blog, post, feed, photography, videography, audio, design, general, education`,
                image: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg"
            }),
        ]
    }),
    loader: async () => ({
        pinnedPosts: await GetFilteredBlogPosts({ data: { action: "data", type: "pinned" } }),
        postAllCount: await GetFilteredBlogPosts({ data: { action: "count" } }) as any,

        pinnedPhotos: await GetFilteredPhotography({ data: {action: "data", type: "view", keyword: "pinned" } }) as any,
        photosPinnedCount: await GetFilteredPhotography({ data: {action: "count", type: "pinned"} }) as any,
        photosAllCount: await GetFilteredPhotography({ data: {action: "count" } }) as any,

        videos: await GetPinnedVideography(),
        // pinnedVideoCount: await GetPinnedVideographyCount(),
        videosAllCount: await GetAllPublicVideographyCount(),
    })
})

function RouteComponent() {
    const { pinnedPosts, postAllCount, pinnedPhotos, photosPinnedCount, photosAllCount, videos, videosAllCount } = Route.useLoaderData();
    return <Box component="section" id="hero" w="100vw" h="100vh" maw="100vw" mah="100vh" pos="absolute" top="0" left="0" style={{zIndex: "1000", boxShadow: "bsSecondary", overflowY: "hidden"}} bg="var(--blurredBackground)">
            {/* <Box bg="var(--mainGradient)" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box> */}
            {/* <Box bg= {`no-repeat url(https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_M41U25E6mtuU256ls.jpeg) center`}  bgsz="cover" w="100vw" h="100%" opacity="0.5" pos="absolute"></Box> */}
        <Box bg="var(--mainGradient)" w="100vw" h="100%" opacity="0.4" pos="absolute"></Box>
                <Box w="100vw" h="100vh">
                    <Image src="https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LO3NHZ0Zy76ZCIifx.jpg" alt="Blog Feed Hero Image" w="100vw" h="100vh"/>
                </Box>
                <Box><HomeButton link="/" helperText="Go Back to Home" /></Box> 
            <Tabs defaultValue="photos" pos="absolute" top="-1%" left="1rem" h="100vh" mah={{base: "auto", sm: "calc(100vh - 2rem)"}} style={{ overflow: "scroll" }} w="calc(100% - 2rem)" bg="var(--darkPurpleRGBA)">
            <Tabs.List grow justify="center">
                <Tabs.Tab value="photos">Photography</Tabs.Tab>
                <Tabs.Tab value="videos">Videography</Tabs.Tab>
                <Tabs.Tab value="posts">Posts</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="photos">
                <PinnedPhotos photos={pinnedPhotos} photosAllCount={photosAllCount} photosPinnedCount={photosPinnedCount} />
            </Tabs.Panel>
            <Tabs.Panel value="videos">
                <PinnedVideos videos={videos} videosAllCount={videosAllCount} />
            </Tabs.Panel>
            <Tabs.Panel value="posts">
                <PinnedPostsCard pinnedPosts={pinnedPosts} />
                <PrimaryLinkedButton link={{ to: "/blog" }} icon={{ name: "blog", pack: "fadl" }}>All {postAllCount} Posts</PrimaryLinkedButton>
            </Tabs.Panel>
        </Tabs>
        </Box>
}
