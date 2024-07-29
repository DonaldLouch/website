'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponentPortal"
import { Box } from "@mantine/core"


export default function PAGETITLEPage(){
  const breadCrumbs = [
    {"pageLink": "/portal/test", "pageName": "Test"}
  ]
  return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Box component="main" color="white">
            {/* CONTENT GOES HERE! */}
        </Box>
    </>
  )
}
