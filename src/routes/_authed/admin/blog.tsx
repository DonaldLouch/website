import { createFileRoute } from '@tanstack/react-router'
import { seo } from '@/utils/seo'

import { AdminAccessCheck, UserLoggedInCheck } from '@/actions/auth.functions'

import { Box, Text, Image } from '@mantine/core'
import { BlogData, GetFilteredBlogPosts } from '@/actions/database/GetDatabase.functions'

export const Route = createFileRoute('/_authed/admin/blog')({
    component: RouteComponent,
    loaderDeps: ({ search: { pg }}: any) => ({ pg }),
    loader:  async ({ deps: { pg } }) => {
        let page = parseInt(pg) as number
        let currentPage = (((page) - 1) as number) || 0

        const contentLimit = 15 as number
        const postCount =  await GetFilteredBlogPosts({ data: { action: "count" } }) as number
            
        const numberOfPages = (Math.floor(postCount / contentLimit) + 1) as number

        if (numberOfPages < page) {
            currentPage = numberOfPages
        }
        
        const contentStart = currentPage * contentLimit

        const pagination = new Array()
        pagination.push(numberOfPages, currentPage)

        const posts = await GetFilteredBlogPosts({ data: { action: "data", contentLimit, contentStart } }) as BlogData
        // const photo = await GetPhoto({ data: {ITEM} }) as any

        return {
            posts,
        
            postCount,
            pagination,
            isUser: await UserLoggedInCheck(),
            isAdmin: await AdminAccessCheck()
        }
    },

    // head: ({ loaderData }) => ({
    head: () => ({
        meta: [
            ...seo({
                title: `TITLE | ${import.meta.env.VITE_WEBSITE_NAME}`,
            }),
        ]
    })
})

function RouteComponent() {
    const { isUser, isAdmin } = Route.useLoaderData()
    return <>
        <Text>Hello "/admin/test"!</Text>
    </>
}