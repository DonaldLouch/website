'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import supabase from "@/lib/supabase"
import { AspectRatio, Grid, Heading, Stack, useToast, Text, Button } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import Image from "next/image"
import { debounce } from "lodash"
import DisplayDate from "@/lib/DisplayDate"
import { BsCloudPlus } from "react-icons/bs"

async function fetchVideos(offset: number, limit: number) {
  const from = offset * limit
  const to = from + limit - 1

  const { data } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).order('uploadedOn', { ascending: false }).range(from, to) as any

  return data
}

export default function VideoManager({videoData}: {videoData: any}) {
    const breadCrumbs = [
        {"pageLink": "/admin/videography", "pageName": "Videography Manager"}
    ]
    const videos = videoData
    const toast = useToast()
    const toastID = "toastID"
    const PAGE_COUNT = 9 as number
    const containerRef = useRef(null)
    const initialRender = useRef(true)
    const [loadedVideos, setLoadedVideos] = useState(videos)
    const [offset, setOffset] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isInView, setIsInView] = useState(false)
    const router = useRouter()

    // @ts-ignore
    const handleScroll = (container) => {
        if (containerRef.current && typeof window !== 'undefined') {
        const container = containerRef.current
        //@ts-ignore
        const { bottom } = container.getBoundingClientRect()
        const { innerHeight } = window
        setIsInView(() => bottom <= innerHeight)
        }
    }

    useEffect(() => {
        debounce(() => handleScroll(containerRef), 200)
        window.addEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        isInView && loadMoreVideos(offset)
    }, [isInView])

    const loadMoreVideos = async (offset: number) => {
        setIsLoading(true)
        setOffset((prev: number) => prev + 1)
        const newVideos = await fetchVideos(offset, PAGE_COUNT) as any
        // setTimeout(()=>{
        setLoadedVideos((prevVideos: any) => [...prevVideos, ...newVideos])
        // }, 1000)
        setIsLoading(false)
    }
  

    return (<>
        <BreadCrumb breads={breadCrumbs} />
        <Button as="a" variant="blackFormButton" href="/admin/videography/upload" leftIcon={<BsCloudPlus />}>Upload New Video</Button>
        <Grid gridTemplateColumns="repeat(3, 1fr)" gap="2rem" my="2rem" ref={containerRef}>
            {isLoading && !toast.isActive(toastID) &&
                toast({
                id: toastID,
                title: "Videos Loading",
                description: "Additional videos are currently loading",
                status: "info",
                duration: 9000,
                isClosable: true,
            })}
            {loadedVideos?.map((video: any, index: number) => (<>
                <Link href={`/admin/videography/${video.id}`} key={index}>
                    <Stack
                        overflow="hidden"
                        borderRadius="0 1rem"
                        my="1rem"
                        pos="relative"
                        boxShadow="bsWhite"
                        color="white"
                        _hover={{backgroundColor: "blurredPurpleRGBA !important", opacity: "0.5", color: "secondary"}} transition="all 0.1s"
                    >
                        <AspectRatio ratio={16/9}>
                            <Image src={video.thumbnailFileID?.filePath ? video.thumbnailFileID.filePath : "https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LNQWG1JG9acW6G4b1"} alt={video.title} width="1920" height="1080" />
                        </AspectRatio>
                        <Stack p="1rem" pos="absolute" background="blurredPurpleRGBA" backdropBlur="10px" w="100%" boxShadow="tsPrimary">
                            <Heading as ="h2" fontSize="1.2rem" fontWeight={900}>{video.title}</Heading>
                            <Text fontWeight={300} fontSize="1rem"><DisplayDate source={video.uploadedOn} format="MMM Do YYYY" /></Text>
                        </Stack>
                    </Stack>
                </Link>
            </>))}
        </Grid>
    </>)
}