import { createFileRoute } from '@tanstack/react-router'
import { Text, Title } from '@mantine/core'

import { GetAboutMe, GetAllEmbeds, GetAllLinks, GetAllLinksSets, GetAllPrimaryLinks, GetAllPublicPhotographyCount, GetAllPublicVideographyCount, GetPinnedPhotography, GetPinnedPhotographyCount, GetPinnedBlogPosts, GetPinnedVideography, GetPinnedVideographyCount, GetAllPublicBlogPostCount, GetPinnedBlogPostCount } from "@/actions/database/GetDatabase.server";
import CodeBlock from '@/components/markdown/CodeBlock';
import { all } from 'axios';
import { seo } from '@/utils/seo';

export const Route = createFileRoute('/test')({ 
    component: Test, 
    head: () => ({
        meta: [
            ...seo({
                title: `Test Page | ${import.meta.env.VITE_WEBSITE_NAME}`,
                description: import.meta.env.VITE_DESCRIPTION,
            }),
        ]
    }),
    loader: async () => ({
        aboutMe: await GetAboutMe(),
        
        allLinks: await GetAllLinks(),
        allPrimaryLinks: await GetAllPrimaryLinks(),
        allLinksSets: await GetAllLinksSets(),
        allEmbeds: await GetAllEmbeds(),
        
        pinnedPhotos: await GetPinnedPhotography(),
        photoCounts: await GetAllPublicPhotographyCount(),
        pinnedPhotoCount: await GetPinnedPhotographyCount(),
        
        pinnedVideos: await GetPinnedVideography(),
        videoCounts: await GetAllPublicVideographyCount(),
        pinnedVideoCount: await GetPinnedVideographyCount(),
        
        pinnedBlogPosts: await GetPinnedBlogPosts(),
        blogPostCounts: await GetAllPublicBlogPostCount(),
        pinnedBlogPostCount: await GetPinnedBlogPostCount(),
    })
}) 

function Test() {
    const {pinnedBlogPostCount} = Route.useLoaderData();
    const data = pinnedBlogPostCount
    return <>
    <Title>Test Page: page 3</Title>
    <CodeBlock code={JSON.stringify(data, null, 2)} />
    </>
}