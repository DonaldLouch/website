'use client'

import { Box, Flex, Group, } from "@mantine/core"

import Masonry from 'react-masonry-css'
import React from "react";

import ViewPhotoFeed from "@/app/(Components)/ViewPhotoFeed";

import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";

export default function PinnedPhotos({ photos, photosPinnedCount, photosAllCount }: {photos: any, photosAllCount: number, photosPinnedCount: number})  {

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
      <PrimaryLinkedButton link="/feed/photography?search=view&value=pinned" primNewIcon={{name: "thumbtack-angle", pack: "fadl"}}>+{photosPinnedCount - 20} More Pinned Photos</PrimaryLinkedButton>
      <PrimaryLinkedButton link="/feed/photography" primNewIcon={{name: "images", pack: "fadl"}}>All {photosAllCount} Photos</PrimaryLinkedButton>
    </Group>
  </Box>
}