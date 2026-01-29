import { useState, useEffect, useRef, useCallback, useMemo } from "react"

import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { seo } from '@/utils/seo'

import { GetAllLocationData, GetAllPhotographyAlbums, GetAllTagData, GetFilteredPhotos, GetFilteredPhotosCount } from '@/actions/database/GetDatabase.server'

import {
  Box,
  Text,
  Flex,
  Drawer,
  Tooltip,
  Stack,
  Input,
  ActionIcon,
  Group,
  Title,
  Loader,
  Anchor,
  Paper,
  Code,
} from "@mantine/core";

import Masonry from 'react-masonry-css'
import { useInView } from 'react-intersection-observer'
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";

import ViewPhotoFeed from "@/components/feed/photo/ViewPhotoFeed";
import PrimaryLinkedButton from "@/components/buttons/PrimaryLinkedButton";
import InlineLink from "@/components/InlineLink";
import FilterField from "@/components/feed/photo/FilterField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdminAccessCheck, UserLoggedInCheck } from "@/actions/auth.server";
import FeedLoader from "@/components/feed/FeedLoader";

export const Route = createFileRoute('/feed/photography')({
  component: RouteComponent,
  head: () => ({
    meta: [
        ...seo({
            title: `Photography Feed | ${import.meta.env.VITE_WEBSITE_NAME}`,
            description: "Donald Louch's Photography Feed!",
            keywords: `${import.meta.env.VITE_KEYWORDS}, feed, photography`,
            image: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg"
        }),
        ]
      }),
    loaderDeps: ({ search: { search,  value }}: any) => ({ search,  value }),
    loader:  async ({ deps: { search: searchType,  value: searchValue} }) => {
      const postLimit = 15

      const keyword = searchType === "tag" || searchType === "keyword"
        && searchValue?.includes("HASHTAG") ? searchValue?.replace('HASHTAG', '#') 
        : searchValue?.includes("%20") ? searchValue?.replace('%20', ' ') 
        : searchValue

        return {
            postLimit,
            searchType,
            keyword,
            searchValue,
            photographyAlbum: await GetAllPhotographyAlbums(),
            locationData: await GetAllLocationData(),
            tagData: await GetAllTagData(),

            photos: await GetFilteredPhotos({ data: {postLimit, searchType, keyword}}),
            photosCount: await GetFilteredPhotosCount({ data: {searchType, keyword}}),

            isUser: await UserLoggedInCheck(),
            isAdmin: await AdminAccessCheck()
      }
    }
})

async function fetchPhotos(nextPage: number, photoLimit: number, photosCount: number, searchType?: string, keyword?: string) {
    const from = nextPage * photoLimit
    const to = Math.min(from + photoLimit - 1, photosCount) 
    
    const data = GetFilteredPhotos({data: {from, to, searchType, keyword}}) 

    return data
}

function RouteComponent() {
    const {photos, photosCount, photographyAlbum, locationData, tagData, postLimit: photoLimit, searchType, keyword, searchValue, isUser, isAdmin} = Route.useLoaderData();

    const [opened, { open, close }] = useDisclosure(false)

    const initialRender = useRef(true)
    const [loadedPhotos, setLoadedPhotos] = useState(photos)
    const [page, setPage] = useState(0)
    const [isLastPage, setIsLastPage] = useState(photoLimit >= photosCount ? true : false)
    const navigate  = useNavigate()
    const router = useRouter()

    const [ref, inView] = useInView()

    const loadMorePhotos = useCallback(async () => {
        const nextPage = page + 1
        const newPhotos = await fetchPhotos(nextPage, photoLimit, photosCount, searchType, keyword) as any
        
        if (newPhotos && newPhotos.length > 0) {
            setIsLastPage(nextPage === Math.ceil(photosCount / photoLimit) - 1)
            setPage(nextPage)
            setLoadedPhotos((prevPhotos: any) => {
                const existingIds = new Set(prevPhotos?.map?.((p: any) => p.id) || [])
                const uniqueNewPhotos = newPhotos.filter((p: any) => !existingIds.has(p.id))
                return [...(prevPhotos?.length ? prevPhotos : []), ...uniqueNewPhotos]
            })
        }
    }, [page, photoLimit, photosCount, searchType, keyword])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        router.invalidate()
        close()
    }, [searchType, searchValue, router])

    useEffect(() => {
        setLoadedPhotos(photos)
        setPage(0)
        setIsLastPage(photoLimit >= photosCount ? true : false)
    }, [photos, photosCount, photoLimit])

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

    const [ search, setSearch ] = useState(searchValue)
    const [ focused, setFocused] = useState(false)
    const [ completed, setCompleted] = useState(false)

    const [debounced] = useDebouncedValue(search, 1000)
    
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        if (focused && completed && debounced) {
            navigate({to: '/feed/photography', search: { search: "keyword", value: debounced }})
        }
    }, [debounced, focused, completed, navigate])

    return <Box id="feed" pos="relative" w="100%">
        <Tooltip label="Filters">
            <ActionIcon variant="filled" aria-label="Filter" color="black"
                pos="fixed"
                bottom={{ base: "1.4%", md: "2%" }}
                right={{ base: "4%", md: "1.5%" }}
                onClick={open}
            >
                <FontAwesomeIcon icon={["fadl", "filter-list"]} size="xl" />
            </ActionIcon>
        </Tooltip>
        <Drawer size="sm" opened={opened} onClose={close} title="Filters" 
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }}
            offset="2rem"
            radius="0 0 0 2rem"
            position="right"
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
        >
            <Text>Search</Text>
                <Input placeholder="Donald Louch" leftSection={<FontAwesomeIcon icon={["fal", "magnifying-glass"]} />} type="search" onFocus={() => {setFocused(true)}} onChange={(e: any) => {setSearch(e.target.value)}} onMouseOut={() => {setCompleted(true)}}/>

            <Text>Filter By:</Text>
                <Stack gap="1rem">
                    <FilterField filterType="album" data={photographyAlbum} />
                    <FilterField filterType="tag" data={tagData} />
                    <FilterField filterType="location" data={locationData} />
                </Stack>

            <Text>Sort By:</Text>
                <PrimaryLinkedButton isFullWidth isHidden={searchValue != "old"} link={{ to: "/feed/photography" }} icon={{ name: "arrow-down-1-9", pack: "fal" }} >New-Old</PrimaryLinkedButton>
                <PrimaryLinkedButton isFullWidth isHidden={searchType === "order" && searchValue === "old" } link={{ to: "/feed/photography", search: { search: "order", value: "old" }}} icon={{ name: "arrow-down-9-1", pack: "fal" }}>Old-New</PrimaryLinkedButton>

            <Text>View:</Text>
                <Stack gap="1rem">
                    <PrimaryLinkedButton isFullWidth isHidden={searchValue != "pinned"} link={{ to: "/feed/photography" }} icon={{ name: "images", pack: "fadl" }} >All Photos</PrimaryLinkedButton>
                    <PrimaryLinkedButton isFullWidth isHidden={searchType === "view" && searchValue === "pinned"} link={{ to: "/feed/photography", search: { search: "view", value: "pinned" } }} icon={{ name: "thumbtack", pack: "fadl" }} >Pinned Photos</PrimaryLinkedButton>
                    <PrimaryLinkedButton isFullWidth link={{ to: "/portfolio/photography" }} icon={{ name: "briefcase-blank", pack: "fadl" }}>Portfolio Photos</PrimaryLinkedButton>
                    {/* TO DO: Make Random Sorting Function*/}
                </Stack>
        </Drawer>

        {searchType && searchValue && <Box m="2rem -4rem 1rem">
            <Anchor href="/feed/photography" underline="never">
                <Tooltip label="Click to Remove Filter">
                    <Code p="0.8rem" bg="var(--darkPurple)" c="white" fz="1rem" lh="2" tt="capitalize">Filtering {searchType}: "{keyword}"</Code>
                </Tooltip>
            </Anchor>
        </Box>}

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
