import { useEffect, useState } from "react"

import { createFileRoute } from '@tanstack/react-router'
import { seo } from '@/utils/seo'

import { AdminAccessCheck, UserLoggedInCheck } from '@/actions/auth.server'
import { GetAllPublicVideographyCount, GetAllPublicVideos } from '@/actions/database/GetDatabase.server'

import { AspectRatio, Grid, Title, Stack, Text, Image, Anchor, Box, Paper, Group, Loader, Tooltip } from "@mantine/core"
import DisplayDate from "@/lib/DisplayDate"

import { useInView } from "react-intersection-observer"

import classes from "@/components/Components.module.css"
import InlineLink from "@/components/InlineLink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Route = createFileRoute('/feed/videography')({
    component: RouteComponent,
    head: () => ({
        meta: [
            ...seo({
                title: `Videography Feed | ${import.meta.env.VITE_WEBSITE_NAME}`,
                description: "Donald Louch's Videography Feed!",
                keywords: `${import.meta.env.VITE_KEYWORDS}, feed, videography`,
                image: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg"
            }),
        ]
    }),
    loader:  async () => {
        const postLimit = 12
        const videos = await GetAllPublicVideos({ data: { postLimit }})

        let tags = new Array()
        videos.forEach((video: {tags: any}) => {
            const videoTags = video.tags
            
            videoTags.forEach((tag: any) => {
                !tags.includes(tag) && tags.push(tag)
            })
            // !locations.includes(photoLocation) && locations.push(photoLocation)
        })

        return {
            videoLimit: postLimit,

            videos,
            videosCount: await GetAllPublicVideographyCount(),

            tags: tags.sort(),

            isUser: await UserLoggedInCheck(),
            isAdmin: await AdminAccessCheck()
        }
    }
})

async function fetchVideos(offset: number, limit: number, videosCount: number) {
  const from = offset * limit
  const to = Math.min(from + limit - 1, videosCount) 

  const data = await GetAllPublicVideos({ data: { from, to }})

  return data
}

function RouteComponent() {
    const { videos, videosCount, videoLimit, tags, isUser, isAdmin } = Route.useLoaderData()
    // const { ThumbnailMedia } = videos

    const [loadedVideos, setLoadedVideos] = useState(videos)
    const [page, setPage] = useState(0)
    const [isLastPage, setIsLastPage] = useState(videoLimit >= videosCount ? true : false)

    const [ref, inView] = useInView()

    async function loadMoreVideos() {
        if (!isLastPage) {
        const nextPage = page + 1
        const newVideos = await fetchVideos(nextPage, videoLimit, videosCount) as any
        setIsLastPage(nextPage === Math.ceil(videosCount / videoLimit) - 1)
        setPage(nextPage)
        setLoadedVideos((prevVideos: any) => {
            const combinedVideos = [...(prevVideos?.length ? prevVideos : []), ...newVideos]
            return Array.from(new Set(combinedVideos.map((video: any) => video.id)))
                .map((id: any) => combinedVideos.find((video: any) => video.id === id))
        })
        }
    }

    useEffect(() => {
        inView && loadMoreVideos()
    }, [inView])

    return <Box id="feed" pos="relative" w="100%">
        <Grid 
            gutter="1rem"
            m={{base: "0rem -1rem 2rem", sm: "1rem -5rem 1rem"}} 
            p="1rem 1rem 1rem"
        >
            {loadedVideos?.map((video: any, index: number) => (<>
                <Grid.Col key={index} span={{base: 12, sm: 6, md: 4}} pos="relative">
                    <Anchor href={`/video/${video.id}`} unstyled>
                        <Box
                            style={{
                                overflow: "hidden",
                                borderRadius: "var(--mantine-radius-md",
                                boxShadow: "var(--mantine-shadow-bsSMWhite)",
                                transition: "all 0.1s"
                            }}
                            color="white"
                            className={classes.videoThumbnail}
                        >
                            <AspectRatio ratio={16/9}>
                                <Image src={video.ThumbnailMedia.filePath} alt={video.title} radius="md" style={{ objectPosition: "top", boxShadow: "var(--mantine-shadow-bsSMPrimary)"}} />
                            </AspectRatio>   
                            <Box p="1rem" pos="absolute" w="calc(100% - 1rem)" bg="var(--darkPurpleRGBA)" style={{backdropBlur: "10px", boxShadow: "tsPrimary", zIndex: 100, borderRadius: "0 1rem 0 0"}} top="0.5rem" c="white">
                                <Tooltip label={video.title}>
                                    <Title order={2} fz="1.2rem" fw={700} c="currentColor" lineClamp={1}>{video.title}</Title>
                                </Tooltip>
                                <Text fw={200} fz="1rem" lh="0" c="currentColor" mt="0.5rem"><DisplayDate source={video.uploadedOn} format="MMM Do YYYY" /></Text>
                            </Box>
                            <Box pos="absolute" top="calc(50% - 3rem)" left="calc(50% - 3rem)" style={{zIndex: 100}}c="var(--secondary)"><FontAwesomeIcon icon={["fajdr", "play"]} size="5x" /></Box>
                        </Box>
                    </Anchor>
                </Grid.Col>
            </>))}
        </Grid>
        <Paper ref={ref} p="2rem" color="white" style={{display: isLastPage ? "none" : "block"}} bg="none" shadow="bsBoldSecondary" radius="lg" my="2rem">
            <Stack align="center">
                <Group gap="2rem" align="center">
                <Loader color="white" size="md" type="bars" />
                    <Title fz={{base: "2rem", md: "3rem"}}>Loading More Videos</Title>
                </Group>
                <Text component="div">If the content is still not loaded after a minute please contact Donald Louch at <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{name: "light-envelope-at", pack: "fak"}} /> for further assistance.</Text>
            </Stack>
        </Paper>
    </Box>
}
