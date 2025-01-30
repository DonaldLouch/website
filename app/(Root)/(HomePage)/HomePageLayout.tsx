'use client'

import { AspectRatio, Box, Flex, Stack, Image, Title, Text, Center, Group, Space, Tabs } from "@mantine/core";
import PrimaryLinkedButton from "../../(Components)/(Buttons)/PrimaryLinkedButton";
// import { BsCameraReels, BsCode, BsConeStriped, BsFilePerson, BsFolder2Open, BsImages, BsPersonBadge, BsPostcard, BsSend } from "react-icons/bs";
import HomeHeroSection from "./(Sections)/HomeHeroSection";
import LinksSection from "./(Sections)/LinksSection";
import PinnedPhotos from "./(Sections)/PinnedPhotos";
import PinnedVideos from "./(Sections)/PinnedVideos";
import StatsGroup from "@/app/(Components)/(Cards)/StatsGroup";
import PinnedPostsCard from "@/app/(Components)/(Cards)/PinnedPostsCard";
import PinnedAudio from "./(Sections)/PinnedAudio";

export default function HomePageLayout({aboutMe, primaryLinksData, linksData, photosPinnedCount, photosAllCount, pinnedPhotos, videos, videosAllCount, pinnedPosts, postAllCount, audios}: any) {
  const stats = [
    { title: 'Photos Uploaded', icon:  { name: "album-02" }, value: `${photosAllCount} Photos`},
    { title: 'Videos Uploaded', icon:  { name: "camera-video" }, value: `${videosAllCount} Videos`},
    { title: 'Audio/Music Uploads', icon:  { name: "music-note-square-02" }, value: `1 Ambient Audio` },
    { title: 'Posts', icon:  { name: "news" }, value: `${postAllCount} Posts` }
  ] as any
  return (<>
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
              <PinnedPhotos photos={pinnedPhotos} photosAllCount={photosAllCount} photosPinnedCount={photosPinnedCount} />
            </Tabs.Panel>
            <Tabs.Panel value="videos">
              <PinnedVideos videos={videos} videosAllCount={videosAllCount} />
            </Tabs.Panel>
            <Tabs.Panel value="audio">
              <PinnedAudio audios={audios} />
            </Tabs.Panel>
            <Tabs.Panel value="posts">
                <PinnedPostsCard pinnedPosts={pinnedPosts} />
                <PrimaryLinkedButton link="/blog" primNewIcon={{name: "news"}}>All {postAllCount} Posts</PrimaryLinkedButton>
            </Tabs.Panel>
          </Tabs>
          <LinksSection about={aboutMe} primaryLinks={primaryLinksData} links={linksData} />
      </Box>
  </>
  )
}
