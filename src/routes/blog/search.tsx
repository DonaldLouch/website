import { GetFilteredBlogPosts } from '@/actions/database/GetDatabase.server'
import PinnedPostsCard from '@/components/cards/PinnedPostsCard'
import { SectionCard } from '@/components/cards/SectionCard'
import BlogPostCard from '@/components/feed/blog/BlogPostCard'
import Pagination from '@/components/pagination'
import { SectionTitle } from '@/components/SectionTitle'
import { seo } from '@/utils/seo'
import { Box, SimpleGrid } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/search')({
    component: RouteComponent,
    loaderDeps: ({ search: { pg, type, keyword }}: any) => ({ pg, type, keyword }),
        loader:  async ({ deps: { pg, type, keyword } }) => {
            let page = parseInt(pg) as number
            let currentPage = (((page) - 1) as number) || 0
    
            const contentLimit = 9 as number
            const postCount =  await GetFilteredBlogPosts({ data: { action: "count", type, keyword } }) as any
    
            const numberOfPages = (Math.floor(postCount / contentLimit) + 1) as number
    
            if (numberOfPages < page) {
                currentPage = numberOfPages
            }
            
            const contentStart = currentPage * contentLimit
    
            const pagination = new Array()
            pagination.push(numberOfPages, currentPage)
    
            const posts = await GetFilteredBlogPosts({ data: { action: "data", type, keyword, contentLimit, contentStart } }) as any
            return { 
                type,
                keyword,
                posts,
                pinnedPosts: await GetFilteredBlogPosts({ data: { action: "data", type: "pinned" } }),
    
                postCount,
                pagination
            }
        },
    
        head: ({ loaderData }) => ({
            meta: [
                ...seo({
                    title: `(${loaderData?.postCount}) ${loaderData?.keyword} | ${import.meta.env.VITE_WEBSITE_NAME}`,
                    description: `Blog posts by Donald Louch that are flagged with the ${loaderData?.type} ${loaderData?.keyword}`,
                }),
            ]
        })
    })
    
    function RouteComponent() {
        const { type, keyword, posts, postCount, pinnedPosts, pagination } = Route.useLoaderData()
    
        let capitalizedTitle = keyword.charAt(0).toUpperCase() + keyword.slice(1) as string
    
        return <Box component="main">
            <SectionCard id="posts" styleType="primaryCard">
                <PinnedPostsCard pinnedPosts={pinnedPosts} />
                <SectionTitle headingTitle={posts.length === 0 ? (`It seems that there is no blog posts under the ${type} "${capitalizedTitle}".`) : (`"${capitalizedTitle}" has ${postCount} ${postCount === 1 ? ("post") : ("posts")} in it's ${type}`)} />
                <SimpleGrid
                    cols={{base: 1, sm: 2, md: 3}}
                    spacing="2rem"
                    w="100%"
                    my="2rem"
                >
                    {posts?.map((post: any) => ( <BlogPostCard post={post} key={post.id} /> ))}
                </SimpleGrid>
                <Pagination {...pagination} />
            </SectionCard>
        </Box>
    }
