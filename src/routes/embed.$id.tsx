import { createFileRoute } from '@tanstack/react-router'
import { seo } from '@/utils/seo'

import { AdminAccessCheck, UserLoggedInCheck } from '@/actions/auth.server'
import { GetVideo } from '@/actions/database/GetDatabase.server'
import { GetMarkdown } from '@/actions/markdown.server'

import VideoPlayer from '@/components/feed/video/VideoPlayer'

export const Route = createFileRoute('/embed/$id')({
  component: RouteComponent,
    loader:  async ({ params }) => {
        const { id } = params as any
        const video = await GetVideo({ data: {id} }) as any
        const description = await GetMarkdown({ data: { content: video.description } })
        return { 
          video,
          description,

          isUser: await UserLoggedInCheck(),
          isAdmin: await AdminAccessCheck()
        }
    },

    head: ({ loaderData }) => ({
        meta: [
            ...seo({
                title: `${loaderData?.video?.title} | ${import.meta.env.VITE_WEBSITE_NAME}`,
                description: loaderData?.video?.excerpt || "No description at this time",
                keywords: `${import.meta.env.VITE_KEYWORDS}, ${loaderData?.video?.tags}`,
                image: loaderData?.video?.ThumbnailMedia?.filePath!
            }),
        ]
    })
})

function RouteComponent() {
  const { video, description, isUser, isAdmin } = Route.useLoaderData()
  return <VideoPlayer video={video} description={description} playerType="embed" isUser={isUser} isAdmin={isAdmin} />
}
