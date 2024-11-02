'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import supabase from "@/lib/supabase"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

// import Image from "next/image"
import DisplayDate from "@/lib/DisplayDate"
import { CloudUploadIcon, FileUploadIcon, Home01Icon, PlayIcon } from "@hugeicons/react"
import { Anchor, AspectRatio, Box, Grid, Image, Title, Tooltip, Text, Paper, Stack, Group, Loader } from "@mantine/core"
// import { BsCloudPlus } from "react-icons/bs"

import classes from "@/app/(Components)/Components.module.css"
import { useInView } from "react-intersection-observer"
import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton"

// async function fetchVideos(offset: number, limit: number) {
//   const from = offset * limit
//   const to = from + limit - 1

//   const { data } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).order('uploadedOn', { ascending: false }).range(from, to) as any

//   return data
// }

async function fetchVideos(offset: number, limit: number) {
  const from = offset * limit
  const to = from + limit - 1

  const { data } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).order('uploadedOn', { ascending: false }).range(from, to) as any

  return data
}

export default function VideoManager({videoData, videosCount}: {videoData: any, videosCount: any}) {
    const breadCrumbs = [
        {"pageLink": "/admin/videography", "pageName": "Videography Manager"}
    ]
    
    const videos = videoData

    const videoLimit = 12 as number
    const [loadedVideos, setLoadedVideos] = useState(videos)
    const [page, setPage] = useState(0)
    const [isLastPage, setIsLastPage] = useState(false)


    const [ref, inView] = useInView()

    // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    async function loadMoreVideos() {
        // setIsLoading(true)
        const nextPage = page + 1
        const newVideos = await fetchVideos(nextPage, videoLimit) as any
        setIsLastPage(nextPage <= Math.ceil(videosCount / videoLimit) - 1 ? false : true)

        if (!isLastPage) {
        setPage(nextPage)
        setLoadedVideos((prevVideos: any) => [
            ...(prevVideos?.length ? prevVideos : []),
            ...newVideos
        ])
        }
        // setIsLoading(false)
    }

    useEffect(() => {
        inView && loadMoreVideos()
    }, [inView])

    // const videos = videoData
    // const toast = useToast()
    // const toastID = "toastID"
    // const PAGE_COUNT = 9 as number
    // const containerRef = useRef(null)
    // const initialRender = useRef(true)
    // const [loadedVideos, setLoadedVideos] = useState(videos)
    // const [offset, setOffset] = useState(1)
    // const [isLoading, setIsLoading] = useState(false)
    // const [isInView, setIsInView] = useState(false)
    // const router = useRouter()

    // // @ts-ignore
    // const handleScroll = (container) => {
    //     if (containerRef.current && typeof window !== 'undefined') {
    //     const container = containerRef.current
    //     //@ts-ignore
    //     const { bottom } = container.getBoundingClientRect()
    //     const { innerHeight } = window
    //     setIsInView(() => bottom <= innerHeight)
    //     }
    // }

    // // useEffect(() => {
    // //     debounce(() => handleScroll(containerRef), 200)
    // //     window.addEventListener('scroll', handleScroll)
    // // }, [])

    // useEffect(() => {
    //     isInView && loadMoreVideos(offset)
    // }, [isInView])

    // const loadMoreVideos = async (offset: number) => {
    //     setIsLoading(true)
    //     setOffset((prev: number) => prev + 1)
    //     const newVideos = await fetchVideos(offset, PAGE_COUNT) as any
    //     // setTimeout(()=>{
    //     setLoadedVideos((prevVideos: any) => [...prevVideos, ...newVideos])
    //     // }, 1000)
    //     setIsLoading(false)
    // }
  

    return <>
        <BreadCrumb breads={breadCrumbs} />
        <PrimaryLinkedButton link="/admin/videography/upload" icon={<CloudUploadIcon />} >Upload New Video</PrimaryLinkedButton>
          <Box id="feed" pos="relative" w="100%">
                {/* {loadedVideos?.map((video: any, index: number) => (<Text key={index}>{video.title}</Text>))} */}
                <Grid gutter="1rem" mt={{base: "1rem", md: "2rem"}} p={{base: "0.5rem", md: "0 0.5rem"}}>
                {loadedVideos?.map((video: any, index: number) => (<>
                    <Grid.Col key={index} span={{base: 12, sm: 6, md: 4}} pos="relative">
                    <Anchor href={`/admin/videography/${video.id}`} unstyled>
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
                            <Image src={video.thumbnailFileID?.filePath ? video.thumbnailFileID.filePath : "https://donaldlouch.s3.us-west-004.backblazeb2.com/thumbnail/thumbnail_LV70EIMNlto6VLuc8.jpeg"} alt={video.title} radius="md" style={{ objectPosition: "top", boxShadow: "var(--mantine-shadow-bsSMPrimary)"}} />
                        </AspectRatio>   
                        <Box p="1rem" pos="absolute" w="calc(100% - 1rem)" bg="var(--darkPurpleRGBA)" style={{backdropBlur: "10px", boxShadow: "tsPrimary", zIndex: 100, borderRadius: "0 1rem 0 0"}} top="0.5rem" c="white">
                        <Tooltip label={video.title}>
                            <Title order={2} fz="1.2rem" fw={700} c="currentColor" lineClamp={1}>{video.title}</Title>
                        </Tooltip>
                        <Text fw={200} fz="1rem" lh="0" c="currentColor" mt="0.5rem"><DisplayDate source={video.uploadedOn} format="MMM Do YYYY" /></Text>
                        </Box>
                        <Box pos="absolute" top="calc(50% - 3rem)" left="calc(50% - 3rem)" style={{zIndex: 100}}c="var(--secondary)"><PlayIcon variant="duotone" size="5rem" /></Box>
                    </Box>
                    </Anchor>
                    </Grid.Col>
                </>))}
                </Grid>
                <Paper ref={ref} p="2rem" color="white" style={{display: isLastPage ? "none" : "block"}} bg="none" shadow="bsBoldSecondary" radius="lg" mt="1rem">
                    <Stack align="center">
                    <Group gap="2rem" align="center">
                        <Loader color="white" size="md" type="bars" />
                        <Title fz={{base: "2rem", md: "3rem"}}>Loading More Videos</Title>
                    </Group>
                    <Text>If the content is still not loaded after a minute please contact Donald Louch at <Anchor href="mailto:hello@donaldlouch.ca">hello@donaldlouch.ca</Anchor> for further assistance.</Text>
                    </Stack>
                </Paper>
            </Box>
        {/* <Button as="a" variant="blackFormButton" href="/admin/videography/upload" leftIcon={<Home01Icon />}>Upload New Video</Button> */}
    </>
}