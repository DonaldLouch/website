'use client'

import supabase from "@/lib/supabase"
import { useState, useEffect, useRef } from "react"

import {
  Box,
  Text,
  Alert,
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

import ViewPhotoFeed from "@/app/(Components)/ViewPhotoFeed";
import React from "react";
import { useRouter } from "next/navigation"

// import { BsArrowDown, BsArrowUp, BsCamera, BsFilter, BsFolder2Open, BsImages, BsPinAngle, BsSearch } from "react-icons/bs";


import { useInView } from 'react-intersection-observer'
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import TagFilter from "./TagFilter";
import AlbumFilter from "./AlbumFilter";
import LocationFilter from "./LocationFilter";
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";
import { Album02Icon, Briefcase02Icon, Camera01Icon, FilterIcon, PinIcon, Search01Icon, Sorting19Icon, Sorting91Icon } from "@hugeicons/react";


async function fetchPhotos(nextPage: number, photoLimit: number, searchType?: string, searchValue?: string) {
  const from = nextPage * photoLimit
  const to = from + photoLimit - 1
  // console.log(from, to)
  const keyword = searchType === "tag" 
    && searchValue?.includes("HASHTAG") ? searchValue?.replace('HASHTAG', '#') 
    : searchValue?.includes("%20") ? searchValue?.replace('%20', ' ') 
    : searchValue

  let query = supabase
    .from('Photography')
    .select(`*, fileID (*), album (*)`)
    .range(from, to)
    .order('uploadedOn', { ascending: false })
    .match({ isPublic: true, isSetup: true })
    searchType && searchValue && searchType === "keyword" && query.or(`caption.ilike.%${keyword}%,photoName.ilike.%${keyword}%`) //TODO: Add Tags
    searchType && searchValue && searchType === "location" && query.ilike('location', `%${keyword}%`) 
    searchType && searchValue && searchType === "tag" && query.contains("tags", [`${keyword}`]) 
    searchType && searchValue && searchType === "order" && searchValue === "old" ? query.order('uploadedOn', { ascending: true }) : query.order('uploadedOn', { ascending: false })
    searchType && searchValue && searchType === "view" && searchValue === "pinned" ? query.match({ isPublic: true, isSetup: true, isPinned: true }) : query.match({ isPublic: true, isSetup: true }) 
    const { data } = await query

  return data
}

export default function PhotographyFeed({ photos, photographyAlbum, locationData, tagData, searchType, searchValue, photosCount}: {photos: any, photographyAlbum: any, locationData: any, tagData: any, searchType?: string, searchValue?: string, photosCount: any})  {
  const [opened, { open, close }] = useDisclosure(false)
  
  const photoLimit = 15 as number
  const initialRender = useRef(true)
  const [loadedPhotos, setLoadedPhotos] = useState(photos)
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const router = useRouter()

  const [ref, inView] = useInView()

  // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  async function loadMorePhotos() {
    // setIsLoading(true)
      const nextPage = page + 1
      const newPhotos = await fetchPhotos(nextPage, photoLimit, searchType, searchValue) as any
      setIsLastPage(nextPage <= Math.ceil(photosCount / photoLimit) - 1 ? false : true)

      if (!isLastPage) {
        setPage(nextPage)
        setLoadedPhotos((prevPhotos: any) => [
          ...(prevPhotos?.length ? prevPhotos : []),
          ...newPhotos
        ])
      }
      // setIsLoading(false)
  }

  useEffect(() => {
    inView && loadMorePhotos()
  }, [inView])

  const breakpointColumnsObj = {
		default: 5,
		1500: 4,
		800: 3,
	}
  

  const [ search, setSearch ] = useState(searchValue)
  const [ focused, setFocused] = useState(false)
  const [ completed, setCompleted] = useState(false)
  const [ prevSearch ] = useState(searchValue)
  
  const [debounced] = useDebouncedValue(search, 1000);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    focused && completed && router.push(`/feed/photography?search=keyword&value=${debounced}`)
  }, [focused, completed, debounced]);

  useEffect(() => {
    if (prevSearch != search && window && window.location) window.location.reload();
  }, [photos])

  return (<>      
   {/* m="4.5rem auto 0" w="95vw" */}
   {/* m={{base: "-4.5rem -1rem -1rem", lg: "-5.8rem -5rem -2rem"}} pt={{base: "0.5rem", lg: "1.5rem"}} */}
    <Box id="feed" pos="relative" w="100%">
      <Alert icon={<Camera01Icon />} color="indigo">
        Please note that moving forward, all photos will have completed captions, tags, and accurate metadata for improved organization and searchability.
      </Alert>

      <Tooltip label="Filters">
        <ActionIcon variant="filled" aria-label="Filter" color="black"
          pos="fixed"
          bottom={{ base: "1.4%", md: "2%" }}
          right={{ base: "4%", md: "1.5%" }}
          onClick={open}
        >
          <FilterIcon size="2rem" />
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
          <Input placeholder="Donald Louch" leftSection={<Search01Icon size={16} />} type="search" onFocus={() => {setFocused(true)}} onChange={(e: any) => {setSearch(e.target.value)}} onMouseOut={() => {setCompleted(true)}}/>
        
        <Text>Filter By:</Text>
          <Stack gap="1rem">
            <AlbumFilter photographyAlbum={photographyAlbum} />
            <TagFilter tagData={tagData} />
            <LocationFilter locationData={locationData} />
          </Stack>
       
        <Text>Sort By:</Text>
          <PrimaryLinkedButton isFullWidth isHidden={searchValue != "old"} link={`/feed/photography`} icon={<Sorting19Icon />}>New-Old</PrimaryLinkedButton>
          <PrimaryLinkedButton isFullWidth isHidden={searchType === "order" && searchValue === "old" } link={`/feed/photography?search=order&value=old`} icon={<Sorting91Icon />}>Old-New</PrimaryLinkedButton>
        
        <Text>View:</Text>
          <Stack gap="1rem">
            <PrimaryLinkedButton isFullWidth isHidden={searchValue != "pinned"} link={`/feed/photography`} icon={<Album02Icon />}>All Photos</PrimaryLinkedButton>
            <PrimaryLinkedButton isFullWidth isHidden={searchType === "view" && searchValue === "pinned"} link={`/feed/photography?search=view&value=pinned`} icon={<PinIcon />}>Pinned Photos</PrimaryLinkedButton>
            <PrimaryLinkedButton isFullWidth link={`/portfolio/photography`} icon={<Briefcase02Icon />}>Portfolio Photos</PrimaryLinkedButton>
            {/* TO DO: Make Random Sorting Function*/}
          </Stack>
      </Drawer>
        {searchType && searchValue && <Box m="1rem -4rem">
          <Anchor href="/feed/photography" underline="never">
            <Tooltip label="Click to Remove Filter">
              <Code p="0.8rem" bg="var(--darkPurple)" c="white" fz="1rem" lh="2" tt="capitalize">Filtering {searchType}: "{searchValue}"</Code>
            </Tooltip>
          </Anchor>
        </Box>}
     
      <Flex 
        component={Masonry}
        breakpointCols={breakpointColumnsObj}
        // p="4.5rem 1rem 1rem"
        // m="4.5rem auto 0" w="95vw" 
        m={{base: "0rem -1rem 2rem", sm: "0 -5rem 2rem"}} 
        p={{base: "0.5rem", sm: "0 0.5rem"}}
        // p="1rem 1rem 1rem"
        gap="0.5rem"
      >
        {loadedPhotos?.map((image: any, index: number) => (<ViewPhotoFeed imageData={image} key={index} />))}
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
