import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { seo } from '@/utils/seo'

import { GetAboutMe, GetFilteredBlogPosts } from '@/actions/database/GetDatabase.server'
import { AdminAccessCheck, UserLoggedInCheck } from '@/actions/auth.server'

import { Anchor, AspectRatio, Box, SimpleGrid, Space, Image, Title, Tooltip, Text } from '@mantine/core'

import { SectionCard } from '@/components/cards/SectionCard'
import HeroSection from '@/components/cards/HeroSection'
import { SectionTitle } from '@/components/SectionTitle'
import PinnedPostsCard from '@/components/cards/PinnedPostsCard'
import DividerInlineText from '@/components/DividerInlineText'
import Pagination from '@/components/pagination'
import ViewPostButton from '@/components/buttons/ViewPostButton'
import BlogPostCard from '@/components/feed/blog/BlogPostCard'

export const Route = createFileRoute('/blog/')({
  component: RouteComponent,
  loaderDeps: ({ search: { pg }}: any) => ({ pg }),
  loader:  async ({ deps: { pg } }) => {
    let page = parseInt(pg) as number
    let currentPage = (((page) - 1) as number) || 0

    const contentLimit = 9 as number
    const postCount = await GetFilteredBlogPosts({ data: { action: "count" } }) as any

    const numberOfPages = (Math.floor(postCount / contentLimit) + 1) as number

     if (numberOfPages < page) {
      currentPage = numberOfPages
    }
    // if (!Number.isInteger(numberOfPages)) {
    //   numberOfPages = Math.floor(numberOfPages) + 1
    // }
    // if (numberOfPages < page) {
    //   currentPage = numberOfPages
    // }
    const contentStart = currentPage * contentLimit

    const pagination = new Array()
    pagination.push(numberOfPages, currentPage)

    const posts = await GetFilteredBlogPosts({ data: { action: "data", contentLimit, contentStart } }) as any
    return { 
      posts,
      pinnedPosts: await GetFilteredBlogPosts({ data: { action: "data", type: "pinned" } }),
      
      postCount,
      pagination,

      aboutMe: await GetAboutMe(),

      isUser: await UserLoggedInCheck(),
      isAdmin: await AdminAccessCheck()
    }
  },

  head: () => ({
    meta: [
      ...seo({
        title: `${import.meta.env.VITE_WEBSITE_NAME}'s Blog Post's`,
        keywords: `${import.meta.env.VITE_KEYWORDS}, blog. post, feed, photography, videography, audio, design, general, education`,
        image: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg"
      }),
    ]
  })
})

function RouteComponent() {
  const {posts, pinnedPosts, postCount, pagination, aboutMe, isUser, isAdmin} = Route.useLoaderData();
  
  const navigate = useNavigate()

  const links = [
    {linkUrl: "/blog/C/life", linkTitle: "Life Updates", linkIcon: {name: "person", pack: "fadl"}},
    {linkUrl: "/blog/C/website", linkTitle: "Website Updates", linkIcon: {name: "globe-pointer", pack: "fadl"}},
    {linkUrl: "/blog/C/travel", linkTitle: "Travel", linkIcon: {name: "location-smile", pack: "fadl"}},
    {linkUrl: "/blog/C/education", linkTitle: "Education", linkIcon: {name: "graduation-cap", pack: "fadl"}},
    {linkUrl: "/feed/photography", linkTitle: "Photography Feed", linkIcon: {name: "images", pack: "fadl"}},
    {linkUrl: "/feed/videography", linkTitle: "Videography Feed", linkIcon: {name: "films", pack: "fadl"}},
  ]
  const cta = [
    { ctaTitle: "About Me", ctaLink: "/", ctaVector: {name: "id-badge", pack: "fadl"} },
  ]
  console.log(pagination)
  return <>
    <HeroSection
      links={links}
      aboutMe={aboutMe}
      cta= {cta}
      imageLink="https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LO3NICOBz1pJVUysp.jpg"
    />
    <ViewPostButton />
    <Space h="100vh" />
    <Box component="main">
      <SectionCard id="posts" styleType="primaryCard"><>
        <SectionTitle headingTitle={`Blog Posts (${postCount})`} />
        <PinnedPostsCard pinnedPosts={pinnedPosts} />
        <DividerInlineText text="Blog Posts" />
        <SimpleGrid
          cols={{base: 1, sm: 2, md: 3}}
          spacing="2rem"
          w="100%"
        >
          {posts?.map((post: any) => (<BlogPostCard post={post} />))}
        </SimpleGrid>
        <Pagination {...pagination} />
      </></SectionCard>
    </Box>
  </>
}
