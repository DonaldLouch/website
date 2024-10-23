'use client'

import supabase from "@/lib/supabase"
import { useState, useEffect } from "react"

import {
  Box,
  Text,
  Alert,
  Flex,
  Drawer,
  Tooltip,
  Stack,
  AspectRatio,
  Image
} from "@mantine/core";

import Masonry from 'react-masonry-css'
import React from "react";

// import { BsCamera, BsImages, BsPersonBadge, BsPinAngle } from "react-icons/bs";

import { useInView } from 'react-intersection-observer'
import ViewPhotoFeed from "@/app/(Components)/ViewPhotoFeed";

import { ActionIcon, Paper, Group, Loader, Title, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";
import { Album02Icon, PinIcon } from "@hugeicons/react";


// async function fetchPhotos(nextPage: number, photoLimit: number) {
//   const from = nextPage * photoLimit
//   const to = from + photoLimit - 1

//   const { data: data } = await supabase
//     .from('Photography')
//     .select(`*, fileID (*), album (*)`)
//     .range(from, to)
//     .order('uploadedOn', { ascending: false })
//     .match({ isPublic: true, isSetup: true, isPortfolio: true })
  
//     return data
// }

export default function PinnedPhotos({ photos, photosPinnedCount, photosAllCount }: {photos: any, photosAllCount: number, photosPinnedCount: number})  {
  // const [opened, { open, close }] = useDisclosure(false);
  
  // const photoLimit = 20 as number
  // const [loadedPhotos, setLoadedPhotos] = useState(photos)
  // const [page, setPage] = useState(0)
  // const [isLastPage, setIsLastPage] = useState(false)

  // const [ref, inView] = useInView()

  // async function loadMorePhotos() {
  //     const nextPage = page + 1
  //     const newPhotos = await fetchPhotos(nextPage, photoLimit) as any
  //     setIsLastPage(nextPage <= Math.ceil(photosCount / photoLimit) - 1 ? false : true)

  //     if (!isLastPage) {
  //       setPage(nextPage)
  //       setLoadedPhotos((prevPhotos: any) => [
  //         ...(prevPhotos?.length ? prevPhotos : []),
  //         ...newPhotos
  //       ])
  //     }
  //     // setIsLoading(false)
  // }

  // useEffect(() => {
  //   inView && loadMorePhotos()
  // }, [inView])

  const breakpointColumnsObj = {
		default: 5,
		1500: 4,
		800: 3,
	}

  return <Box id="photos" my="1rem">
    <Flex 
      component={Masonry}
      breakpointCols={breakpointColumnsObj}
      my="-1rem"
      // p="4.5rem 1rem 1rem"
      // m="4.5rem auto 0" w="95vw" 
      // m={{base: "0rem -1rem 2rem", sm: "0 -5rem 2rem"}} 
      // p={{base: "0.5rem", sm: "0 0.5rem"}}
      mah="80vh"
      style={{
        overflow: "hidden",
        // boxShadow: "rgba(118, 70, 136, 0.8) 0px 11px 20px 1px"
      }}
      // p="1rem 1rem 1rem"
      gap="0.5rem"
    >
      {photos?.map((image: any, index: number) => (<ViewPhotoFeed imageData={image} key={`photo_${index}`} />))}
    </Flex>
    <Group justify="center" m="-1.5rem 0 -1rem">
      <PrimaryLinkedButton link="/feed/photography?search=view&value=pinned" icon={<PinIcon />}>+{photosPinnedCount - 20} More Pinned Photos</PrimaryLinkedButton>
      <PrimaryLinkedButton link="/feed/photography" icon={<Album02Icon />}>All {photosAllCount} Photos</PrimaryLinkedButton>
    </Group>
  </Box>
}