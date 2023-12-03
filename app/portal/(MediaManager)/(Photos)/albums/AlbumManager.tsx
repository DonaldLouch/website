'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box } from "@chakra-ui/react"
import { AlbumCard } from "./AlbumCard"

export default function AlbumManager({photographyAlbum}: any) {

  const breadCrumbs = [
    {"pageLink": "/portal/photography", "pageName": "Photography Manager"},
    {"pageLink": "/portal/albums", "pageName": "Photography Album Manager"},
  ]

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box as="main" color="white">
        <Box px="2rem" color="white" m="2rem 0">
          {photographyAlbum.map((album:any) => (
            <AlbumCard albumData={album} />
          ))}
        </Box>
      </Box> 
    </>
  )
}
