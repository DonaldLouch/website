'use client'

import supabase from "@/lib/supabase"
import { AspectRatio, Grid, Title, Stack, Text, Image, Anchor, Box, Paper, Group, Loader } from "@mantine/core"
import { useEffect, useState } from "react"
import DisplayDate from "@/lib/DisplayDate"
import classes from "@/app/(Components)/Components.module.css"
import { BsPlayFill } from "react-icons/bs"
import { useInView } from "react-intersection-observer"
import { PlayIcon } from "@hugeicons/react-pro"

async function fetchVideos(offset: number, limit: number) {
  const from = offset * limit
  const to = from + limit - 1

  const { data } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).match({ videoPrivacy: "Public", isSetup: true }).order('uploadedOn', { ascending: false }).range(from, to) as any

  return data
}

export default function VideoFeed({ videoData, videosCount }: { videoData: any, videosCount: any }) {
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
    <Grid gutter="1rem" m={{base: "1rem 0 0rem", md: "1rem -5rem 0rem"}} p={{base: "0.5rem", md: "0 0.5rem"}}>
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
              <Title order={2} fz="1.2rem" fw={900} c="currentColor">{video.title}</Title>
              <Text fw={300} fz="1rem" lh="0" c="currentColor"><DisplayDate source={video.uploadedOn} format="MMM Do YYYY" /></Text>
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
  </>)
}
