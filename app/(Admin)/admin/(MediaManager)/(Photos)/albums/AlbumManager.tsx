'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box } from "@mantine/core"
import { AlbumCard } from "./AlbumCard"

export default function AlbumManager({photographyAlbum}: any) {

  const breadCrumbs = [
    {"pageLink": "/admin/photography", "pageName": "Photography Manager"},
    {"pageLink": "/admin/albums", "pageName": "Photography Album Manager"},
  ]

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box component="main" color="white">
        <Box px="2rem" color="white" m="2rem 0">
          {photographyAlbum.map((album:any) => (
            <AlbumCard albumData={album} key={album.id} />
          ))}
        </Box>
      </Box> 
    </>
  )
}
