import { Await, createFileRoute } from '@tanstack/react-router'
import { Box, Space, Tabs, Text, Title } from '@mantine/core'

import { GetAboutMe, GetAllEmbeds, GetAllLinks, GetAllLinksSets, GetAllPrimaryLinks, GetAllPublicBlogPostCount, GetAllPublicPhotographyCount, GetAllPublicVideographyCount, GetPinnedBlogPostCount, GetPinnedBlogPosts, GetPinnedPhotography, GetPinnedPhotographyCount, GetPinnedVideography, GetPinnedVideographyCount } from "@/actions/database/GetDatabase.server";

import Loading from '@/components/Loading';

import PrimaryLinkedButton from '@/components/(Buttons)/PrimaryLinkedButton';
import PinnedPostsCard from '@/components/(Cards)/PinnedPostsCard';
import StatsGroup from '@/components/(Cards)/StatsGroup';
import HomeHeroSection from '../components/(HomePage)/HomeHeroSection';
import LinksSection from '../components/(HomePage)/LinksSection';
import PinnedAudio from '../components/(HomePage)/PinnedAudio';
import PinnedPhotos from '../components/(HomePage)/PinnedPhotos';
import PinnedVideos from '../components/(HomePage)/PinnedVideos';

export const Route = createFileRoute('/')({ 
    component: Home, 
    loader: async () => ({
        aboutMe: await GetAboutMe(),
        
        allLinks: await GetAllLinks(),
        allPrimaryLinks: await GetAllPrimaryLinks(),
        allLinksSets: await GetAllLinksSets(),
        allEmbeds: await GetAllEmbeds(),
        
        pinnedPhotos: await GetPinnedPhotography(),
        photoAllPublicCounts: await GetAllPublicPhotographyCount(),
        pinnedPhotoCount: await GetPinnedPhotographyCount(),
        
        pinnedVideos: await GetPinnedVideography(),
        videoAllPublicCounts: await GetAllPublicVideographyCount(),
        pinnedVideoCount: await GetPinnedVideographyCount(),
        
        pinnedBlogPosts: await GetPinnedBlogPosts(),
        blogPostAllPublicCounts: await GetAllPublicBlogPostCount(),
        pinnedBlogPostCount: await GetPinnedBlogPostCount(),
    }),
}) 
function Home() {
    const { aboutMe, allLinks, allPrimaryLinks, allLinksSets, allEmbeds, pinnedPhotos, photoAllPublicCounts, pinnedPhotoCount, pinnedVideos, videoAllPublicCounts, pinnedVideoCount, pinnedBlogPosts, blogPostAllPublicCounts, pinnedBlogPostCount } = Route.useLoaderData()

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
                <PrimaryLinkedButton link="/blog" primNewIcon={{name: "blog"}}>All {blogPostAllPublicCounts} Posts</PrimaryLinkedButton>
            </Tabs.Panel>
            </Tabs>
            <LinksSection about={aboutMe} primaryLinks={allPrimaryLinks} links={allLinks} />
        </Box>
    </>
}