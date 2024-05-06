'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box } from "@chakra-ui/react"

export default function PAGECONTENT() {
  const breadCrumbs = [
    {"pageLink": "/admin/blog", "pageName": "Blog"}
  ]
  return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Box as="main" id="homeWrapper" color="white">
            {/* CONTENT GOES HERE! */}
        </Box>
    </>
  )
}
