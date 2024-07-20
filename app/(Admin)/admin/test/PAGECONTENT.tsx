'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box } from "@mantine/core"


export default function PAGECONTENT() {
  const breadCrumbs = [
    {"pageLink": "/admin/blog", "pageName": "Blog"}
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
