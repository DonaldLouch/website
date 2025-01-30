'use client'

import { 
Box,
Flex,
Tooltip,
Drawer,
Stack,
Divider,
Text,
Grid,
ActionIcon,
Paper,
Group,
Loader,
Title,
Anchor,
Badge
} from '@mantine/core'

import { useEffect, useRef, useState } from 'react'
import Masonry from 'react-masonry-css'
import supabase from '@/lib/supabase'
import DisplayDate from '@/lib/DisplayDate'

import { MdxContent } from '@/app/mdx-content'
// import { Bs123, BsCalendar2, BsInfo, BsPinMap, BsTag, BsTags } from 'react-icons/bs'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/router'
import ViewPhotoFeed from '@/app/(Components)/ViewPhotoFeed'
import { useDisclosure } from '@mantine/hooks'
import { BreadCrumbPublic } from '@/app/(Components)/BreadCrumbsComponentPublic'
import HugeIcon from '@/app/(Components)/HugeIcon'

async function fetchPhotos(nextPage: number, photoLimit: number, albumID: string) {
    const from = nextPage * photoLimit
    const to = from + photoLimit - 1

    let query = supabase
        .from('Photography')
        .select(`*, fileID (*), album (*)`)
        .range(from, to)
        .order('capturedOn', { ascending: true })
        .match({ isPublic: true, isSetup: true, album: albumID })

    const { data } = await query

    return data
}

export const AlbumPage = ({albumData, photoData, mdxSource, tags, locations, getPhotoCount}: any) => {
    const [opened, { open, close }] = useDisclosure(false);

    // const theCount = photosCount as number

    const photoLimit = 20 as number
    const initialRender = useRef(true)
    const [loadedPhotos, setLoadedPhotos] = useState(photoData)
    const [page, setPage] = useState(0)
    const [isLastPage, setIsLastPage] = useState(false)

    const [ref, inView] = useInView()

    // console.log(Math.ceil(getPhotoCount / photoLimit))

    async function loadMorePhotos() {
        const nextPage = page + 1
        const newPhotos = await fetchPhotos(nextPage, photoLimit, albumData.id) as any
        setIsLastPage(nextPage <= Math.ceil(getPhotoCount / photoLimit) - 1 ? false : true)

        if (!isLastPage) {
            setPage(nextPage)
            setLoadedPhotos((prevPhotos: any) => [
                ...(prevPhotos?.length ? prevPhotos : []),
                ...newPhotos
            ])
        }
    }

    useEffect(() => {
        inView && loadMorePhotos()
    }, [inView])

    const breakpointColumnsObj = {
        default: 5,
        1500: 4,
        800: 3,
    }

    const breadCrumbs = [
        {"pageLink": "/feed/photography", "pageName": "Photography Feed"},
        {"pageLink": `/album/${albumData.slug}`, "pageName": `View Album: ${albumData.albumName}`}
    ]

    return (<>
        <Box id="feed" pos="relative" w="100%">
            <BreadCrumbPublic breads={breadCrumbs} />
            <Tooltip label="Album Information">
                <ActionIcon variant="filled" aria-label="Filter" color="black"
                    pos="fixed"
                    bottom={{ base: "1.4%", md: "2%" }}
                    right={{ base: "4%", md: "1.5%" }}
                    onClick={open}
                >
                    <HugeIcon name="license" size="2rem" />
                </ActionIcon>
            </Tooltip>
            <Drawer size="full" opened={opened} onClose={close} title={albumData.albumName} 
                overlayProps={{
                    backgroundOpacity: 0.5, 
                    blur: 4,
                }}
                offset="2rem"
                radius="lg"
                position="top"
                styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            >      
                <Group gap="0.8rem" my="1rem">
                    <Badge color="white" leftSection={<HugeIcon name="calendar-03" />}>
                        <DisplayDate source={albumData.uploadedOn} />
                    </Badge>
                    {locations.map((location: any) => (
                        <Anchor href={`/feed/photography?search=location&value=${location}`} style={{color: "currentColor"}} key={`location_${location}`}><Badge color="blue" leftSection={<HugeIcon name="pin-location-03" />}>
                            {location}
                        </Badge></Anchor>
                    ))}
                    <Badge color="teal" leftSection={<HugeIcon name="grid" />}>
                        Contains {getPhotoCount} Photos
                    </Badge>
                    {albumData.links?.length > 0 && albumData.links.map((link: any) => {
                            // // console.log("Icon", link.icon)
                            // const linkIcon = link.icon === "CameraVideo" ? <CameraVideoIcon />
                            // : link.icon === "Github" ? <GithubIcon />
                            // : link.icon === "news" ? <NewsIcon />
                            // : link.icon === "" && link.linkType.includes("ex") ? <ArrowUpRight01Icon />
                            // : link.icon === "" && link.linkType.includes("in") ? <LinkSquare02Icon />
                            // : <Link04Icon />

                            // return <Anchor href={link.link} key={link.link} target={link.linkType === "exLink" ? "_blank" : "_self"} m="0"><Badge color="blue" leftSection={linkIcon ? linkIcon : <Link04Icon />}>
                            //     {link.name}
                            // </Badge></Anchor>
                        })}
                </Group>

                <Box style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}} p="1rem 2rem" m="0.5rem">
                    <MdxContent source={mdxSource} />
                </Box>
                <Group gap="0.5rem" m="2rem 1rem 1rem">
                    <HugeIcon name="tags" />
                    {tags.map((tag: any) => (<Anchor key={`tag_${tag}`} href={tag.includes("#") ? `/feed/photography?search=tag&value=${tag.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${tag}`} style={{color: "currentColor"}}>
                        <Badge color="white" leftSection={<HugeIcon name="tag-01" />}>
                            {tag}
                        </Badge>
                    </Anchor> ))}
                </Group>
            </Drawer>
            <Flex 
                component={Masonry}
                breakpointCols={breakpointColumnsObj}
                // p="4.5rem 1rem 1rem"
                // m="4.5rem auto 0" w="95vw" 
                m={{base: "1rem -1rem", sm: "1rem -5rem"}} 
                p={{base: "0.5rem", sm: "0 0.5rem"}}
                // p="1rem 1rem 1rem"
                gap="0.5rem"
            >
                {loadedPhotos?.map((image: any, index: number) => (<ViewPhotoFeed imageData={image} key={index} hideElement="album" />))}
            </Flex>

            <Paper ref={ref} p="2rem" color="white" style={{display: isLastPage ? "none" : "block"}} bg="none" shadow="bsBoldSecondary" radius="lg">
                <Stack align="center">
                <Group gap="2rem" align="center">
                    <Loader color="white" size="md" type="bars" />
                    <Title fz={{base: "2rem", md: "3rem"}}>Loading More Photos</Title>
                </Group>
                <Text>If the content is still not loaded after a minute please contact Donald Louch at <Anchor href="mailto:hello@donaldlouch.ca">hello@donaldlouch.ca</Anchor> for further assistance.</Text>
                </Stack>
            </Paper>
            </Box>
    </>)
}