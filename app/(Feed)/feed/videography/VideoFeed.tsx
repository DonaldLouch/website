'use client'

import supabase from "@/lib/supabase"
import { AspectRatio, Grid, Heading, Stack, useToast, Text, Alert, Icon, AlertDescription } from "@chakra-ui/react"
import { debounce } from "lodash"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import moment from "moment"
import DisplayDate from "@/lib/DisplayDate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

async function fetchVideos(offset: number, limit: number) {
  const from = offset * limit
  const to = from + limit - 1

  const { data } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).match({ videoPrivacy: "Public", isSetup: true }).order('uploadedOn', { ascending: false }).range(from, to) as any

  return data
}

export default function VideoFeed({ videoData }: { videoData: any }) {
  const videos = videoData
  const toast = useToast()
  const toastID = "toastID"
  const PAGE_COUNT = 12 as number
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
  <Alert status='info' color="black" width="95vw" my="0.5rem" mx="-2rem">
      <Icon>
        <FontAwesomeIcon icon={["fal", "circle-info"]} color="currentColor"/>
      </Icon>
      <AlertDescription mx="1rem" fontSize="lg">
        Please note that this Videography Feed is in a alpha state right now, and things will change and may not work properly. Please further note, that in future iterations I will be modifying and completing all tags, chapters, credits, and complete and have proper meta data for all the videos. At this time, embeds and playlists are under construction and not ready to be functional features.
      </AlertDescription>
    </Alert>
    <Grid gridTemplateColumns="repeat(4, 1fr)" gap="1.5rem" ref={containerRef} w="calc(100% + (2rem * 2))" mx="-2rem">
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
      {/* {videos.map((video:any, index: number) => ( */}
        {/* <Link href={`/video/${video.id}`} key={index}>
          <Stack
            w="100%"
            overflow="hidden"
            bg="blurredPurple"
            borderRadius="0 2rem"
          >
            <Stack>
              <AspectRatio
                ratio={16/9}
                w="100%"
                borderRadius="0 2rem"
              >
                <Image src={video.thumbnailFileID.filePath} alt={video.title} width="1920" height="1080" />
              </AspectRatio>
              <Stack color="white" p="1rem 1rem 1.5rem">
              <Heading as ="h2" size="md" fontWeight="bold">{video.title}</Heading>
              <Text fontWeight={300}><DisplayDate source={video.uploadedOn} format="MMM Do YYYY" /></Text>
              </Stack>
            </Stack>
          </Stack>
        </Link> */}
        <Link href={`/video/${video.id}`} key={index}>
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
                    <Image  src={video.thumbnailFileID.filePath} alt={video.title} width="1920" height="1080" />
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
