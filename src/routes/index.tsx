import {  createFileRoute } from '@tanstack/react-router'
import { Box, Space, Tabs, Title } from '@mantine/core'

import { GetAboutMe, GetAllEmbeds, GetAllLinks, GetAllLinksSets, GetAllPrimaryLinks, GetAllPublicVideographyCount, GetFilteredBlogPosts, GetFilteredPhotography, GetPinnedVideography, GetPinnedVideographyCount } from "@/actions/database/GetDatabase.server";

import PrimaryLinkedButton from '@/components/buttons/PrimaryLinkedButton';
import PinnedPostsCard from '@/components/cards/PinnedPostsCard';
import StatsGroup from '@/components/cards/StatsGroup';
import HomeHeroSection from '../components/home/HomeHeroSection';
import LinksSection from '../components/home/LinksSection';
import PinnedAudio from '../components/home/PinnedAudio';
import PinnedPhotos from '../components/home/PinnedPhotos';
import PinnedVideos from '../components/home/PinnedVideos';

export const Route = createFileRoute('/')({ 
    component: Home, 
    loader: async () => ({
        aboutMe: await GetAboutMe(),
        
        allLinks: await GetAllLinks(),
        allPrimaryLinks: await GetAllPrimaryLinks(),
        allLinksSets: await GetAllLinksSets(),
        // allEmbeds: await GetAllEmbeds(),
        
        pinnedPhotos: await GetFilteredPhotography({ data: {action: "data", type: "pinned"} }) as any,
        photoAllPublicCounts: await GetFilteredPhotography({ data: {action: "count"} }) as any,
        pinnedPhotoCount: await GetFilteredPhotography({ data: {action: "count", type: "pinned"} }) as any,
        
        pinnedVideos: await GetPinnedVideography(),
        videoAllPublicCounts: await GetAllPublicVideographyCount(),
        // pinnedVideoCount: await GetPinnedVideographyCount(),
        
        pinnedBlogPosts: await GetFilteredBlogPosts({ data: { action: "data", type: "pinned" } }),
        blogPostAllPublicCounts: await GetFilteredBlogPosts({ data: { action: "count" } }) as any,
        // pinnedBlogPostCount: GetFilteredBlogPosts({ data: { action: "count", type: "pinned" } }) as any
    }),
}) 
function Home() {
    const { aboutMe, allLinks, allPrimaryLinks, allLinksSets, pinnedPhotos, photoAllPublicCounts, pinnedPhotoCount, pinnedVideos, videoAllPublicCounts, pinnedBlogPosts, blogPostAllPublicCounts } = Route.useLoaderData()
    const stats = [
        { title: 'Photos Uploaded', icon:  { name: "images" }, value: `${photoAllPublicCounts} Photos`},
        { title: 'Videos Uploaded', icon:  { name: "films" }, value: `${videoAllPublicCounts} Videos`},
        { title: 'Audio/Music Uploads', icon:  { name: "music" }, value: `1 Ambient Audio` },
        { title: 'Posts', icon:  { name: "blog" }, value: `${blogPostAllPublicCounts} Posts` }
    ] as any

    return <>
        <HomeHeroSection aboutMe={aboutMe} />
        <Space h="calc(90vh + 1rem)" />
        <Box component="main">
            <Title order={2} fz="3rem" fw="300" ta="center" mt="2rem">Donald Louch's Stats</Title>
            <Box my="2rem">
            <StatsGroup statsData={stats} />
            </Box>
            <Title order={2} fz="3rem" fw="300" ta="center" mt="2rem">Pinned Content</Title>
            <Tabs defaultValue="photos">
            <Tabs.List grow justify="center">
                <Tabs.Tab value="photos">Photography</Tabs.Tab>
                <Tabs.Tab value="videos">Videography</Tabs.Tab>
                <Tabs.Tab value="audio">Audio / Music</Tabs.Tab>
                <Tabs.Tab value="posts">Posts</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="photos">
                <PinnedPhotos photos={pinnedPhotos} photosAllCount={photoAllPublicCounts} photosPinnedCount={pinnedPhotoCount} />
            </Tabs.Panel>
            <Tabs.Panel value="videos">
                <PinnedVideos videos={pinnedVideos} videosAllCount={videoAllPublicCounts} />
            </Tabs.Panel>
            <Tabs.Panel value="audio">
                <PinnedAudio audios={allLinksSets} />
            </Tabs.Panel>
            <Tabs.Panel value="posts">
                <PinnedPostsCard pinnedPosts={pinnedBlogPosts} />
                <PrimaryLinkedButton link={{ to: "/blog" }} icon={{name: "blog"}}>All {blogPostAllPublicCounts} Posts</PrimaryLinkedButton>
            </Tabs.Panel>
            </Tabs>
            <LinksSection about={aboutMe} primaryLinks={allPrimaryLinks} links={allLinks} />
        </Box>
    </>
}