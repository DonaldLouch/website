'use client'

import supabase from "@/lib/supabase"
import { AspectRatio, Grid, Title, Stack, Text, Image, Anchor, Box, Paper, Group, Loader, Tooltip } from "@mantine/core"
import { useEffect, useState } from "react"
import DisplayDate from "@/lib/DisplayDate"
import classes from "@/app/(Components)/Components.module.css"
// import { BsPlayFill } from "react-icons/bs"
import { useInView } from "react-intersection-observer"
import InlineLink from "@/app/(Components)/InlineLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

async function fetchVideos(offset: number, limit: number, videosCount: number) {
  const from = offset * limit
  const to = Math.min(from + limit - 1, videosCount) 

  const { data } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).match({ videoPrivacy: "Public", isSetup: true }).order('uploadedOn', { ascending: false }).range(from, to) as any

  return data
}

export default function VideoFeed({ videoData, videosCount }: { videoData: any, videosCount: any }) {
  const videos = videoData

  const videoLimit = 12 as number
  const [loadedVideos, setLoadedVideos] = useState(videos)
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(videoLimit >= videosCount ? true : false)


  const [ref, inView] = useInView()

  // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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

 /*
  // const handleScroll = (container) => {
  //   if (containerRef.current && typeof window !== 'undefined') {
  //     const container = containerRef.current
  //     //@ts-ignore
  //     const { bottom } = container.getBoundingClientRect()
  //     const { innerHeight } = window
  //     setIsInView(() => bottom <= innerHeight)
  //   }
  // }

  // useEffect(() => {
  //   debounce(() => handleScroll(containerRef), 200)
  //   window.addEventListener('scroll', handleScroll)
  // }, [])

  // useEffect(() => {
  //   isInView && loadMoreVideos(offset)
  // }, [isInView])

  // const loadMoreVideos = async (offset: number) => {
  //   setIsLoading(true)
  //   setOffset((prev: number) => prev + 1)
  //   const newVideos = await fetchVideos(offset, PAGE_COUNT) as any
  //   // setTimeout(()=>{
  //   setLoadedVideos((prevVideos: any) => [...prevVideos, ...newVideos])
  //   // }, 1000)
  //   setIsLoading(false)
  // }
*/
  
  return (<>
  <Box id="feed" pos="relative" w="100%">
    {/* {loadedVideos?.map((video: any, index: number) => (<Text key={index}>{video.title}</Text>))} */}
    <Grid gutter="1rem" m={{base: "1rem 0 0rem", md: "2rem -3rem 0rem"}} p={{base: "0.5rem", md: "0 0.5rem"}}>
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
              <Image src={video.thumbnailFileID.filePath} alt={video.title} radius="md" style={{ objectPosition: "top", boxShadow: "var(--mantine-shadow-bsSMPrimary)"}} />
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
    <Paper ref={ref} p="2rem" color="white" style={{display: isLastPage ? "none" : "block"}} bg="none" shadow="bsBoldSecondary" radius="lg" mt="1rem">
        <Stack align="center">
          <Group gap="2rem" align="center">
            <Loader color="white" size="md" type="bars" />
            <Title fz={{base: "2rem", md: "3rem"}}>Loading More Videos</Title>
          </Group>
          <Text component="div">If the content is still not loaded after a minute please contact Donald Louch at <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{name: "light-envelope-at", pack: "fak"}} /> for further assistance.</Text>
        </Stack>
      </Paper>
  </Box>
  </>)
}
