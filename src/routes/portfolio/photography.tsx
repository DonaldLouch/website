import { GetAboutMe, GetFilteredPhotography } from '@/actions/database/GetDatabase.server'
import FeedLoader from '@/components/feed/FeedLoader'
import ViewPhotoFeed from '@/components/feed/photo/ViewPhotoFeed'
import { seo } from '@/utils/seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Tooltip, ActionIcon, Drawer, Stack, Anchor, Code, Flex, Text, Image, AspectRatio, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import Masonry from 'react-masonry-css'

export const Route = createFileRoute('/portfolio/photography')({
    component: RouteComponent,
    head: () => ({
        meta: [
            ...seo({
                title: "Photography | Donald Louch Portfolio",
                keywords: `${import.meta.env.VITE_KEYWORDS}, portfolio, Donald Louch, donald, louch, photography`,
                image: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg"
            }),
        ]
    }),
    loader: async () => {
        const contentLimit = 15
        return {
            contentLimit,

            photos: await GetFilteredPhotography({ data: {action: "data", type: "portfolio", contentLimit} }) as any,
            photosCount: await GetFilteredPhotography({ data: {action: "count", type: "portfolio"} }) as any,

            about: await GetAboutMe() as any
        }
    }
})
  
async function fetchPhotos(nextPage: number, contentLimit: number, photosCount: number) {
    const from = nextPage * contentLimit
    const to = Math.min(from + contentLimit - 1, photosCount) 

    const data = await GetFilteredPhotography({ data: {action: "data", type: "portfolio", contentLimit: to, contentStart: from} }) as any

    return data
}

function RouteComponent() {
    const { photos, photosCount, contentLimit, about } = Route.useLoaderData();

    const [opened, { open, close }] = useDisclosure(false)

    const initialRender = useRef(true)
    const [loadedPhotos, setLoadedPhotos] = useState(photos)
    const [page, setPage] = useState(0)
    const [isLastPage, setIsLastPage] = useState(contentLimit >= photosCount ? true : false)
    //   const navigate  = useNavigate()
    //   const router = useRouter()

    const [ref, inView] = useInView()

    const loadMorePhotos = useCallback(async () => {
        const nextPage = page + 1
        const newPhotos = await fetchPhotos(nextPage, contentLimit, photosCount) as any

        if (newPhotos && newPhotos.length > 0) {
            setIsLastPage(nextPage === Math.ceil(photosCount / contentLimit) - 1)
            setPage(nextPage)
            setLoadedPhotos((prevPhotos: any) => {
                const existingIds = new Set(prevPhotos?.map?.((p: any) => p.id) || [])
                const uniqueNewPhotos = newPhotos.filter((p: any) => !existingIds.has(p.id))
                return [...(prevPhotos?.length ? prevPhotos : []), ...uniqueNewPhotos]
            })
        }
    }, [page, contentLimit, photosCount])
    
//   useEffect(() => {
//       if (initialRender.current) {
//           initialRender.current = false
//           return
//       }
//       router.invalidate()
//       close()
//   }, [searchType, searchValue, router])

  useEffect(() => {
      setLoadedPhotos(photos)
      setPage(0)
      setIsLastPage(contentLimit >= photosCount ? true : false)
  }, [photos, photosCount, contentLimit])

    useEffect(() => {
        if (inView && !isLastPage) {
            loadMorePhotos()
        }
    }, [inView, isLastPage, loadMorePhotos])

    const breakpointColumnsObj = useMemo(() => ({
        default: 5,
        1500: 4,
        800: 3,
    }), [])

    return <Box id="feed" pos="relative" w="100%">
        <Tooltip label={`About ${about.firstName} ${about.lastName}`}>
            <ActionIcon variant="filled" aria-label={`About ${about.firstName} ${about.lastName}`} color="black"
                pos="fixed"
                bottom={{ base: "1.4%", md: "2%" }}
                right={{ base: "4%", md: "1.5%" }}
                onClick={open}
            >
                <FontAwesomeIcon icon={["fadl", "id-badge"]} size="lg" />
            </ActionIcon>
        </Tooltip>
        <Drawer size="full" opened={opened} onClose={close} title={`About ${about.firstName} ${about.lastName}`} 
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }}
            offset="2rem"
            radius="0 0 0 2rem"
            position="top"
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
        >
            <Box id="bio" my="1rem">
                <Flex
                    direction={{base: "column", lg: "row"}}
                    gap="1rem"
                    justify="flex-start"
                    align="center"
                >
                    <AspectRatio 
                        ratio={1/1}
                        w={{base: "50%", sm: "25%"}}
                    >
                        <Image
                            src={about.avatar}
                            alt={`${about.firstName} ${about.lastName}`}
                            radius="md"
                            style={{ objectPosition: "top", boxShadow: "var(--mantine-shadow-bsSMPrimary)"}}
                        />
                    </AspectRatio>

                    <Stack mt={{base: "1rem", lg: "0"}} gap="0">
                        <Title
                            order={1}
                            fz="4rem"
                            fw="800"
                            styles={{root: {
                                textDecoration: "underline",
                                textDecorationThickness: "0.4rem",
                                textDecorationColor: "primary"
                            } }}
                        >
                            {about.firstName} {about.middleName} {about.lastName}
                        </Title>
                        <Text fz="1.5rem" fw="300" m="0">
                            {about.pronouns}
                        </Text>
                    </Stack>
                </Flex>
                <Box style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}} p="0.5rem 1.5rem" my="1rem">
                    <Text>{about.bio}</Text>
                </Box>
            </Box>
        </Drawer>

        <Flex 
            component={Masonry}
            breakpointCols={breakpointColumnsObj}
            m={{base: "0rem -1rem 2rem", sm: "1rem -5rem 1rem"}} 
            p="1rem 1rem 1rem"
            gap="0.5rem"
        >
            {loadedPhotos?.map((photo: any, index: number) => (<ViewPhotoFeed photo={photo} key={index} />))}
        </Flex>
        <FeedLoader ref={ref} isLastPage={isLastPage} loaderTitle="Loading More Photos" />
    </Box> 
}