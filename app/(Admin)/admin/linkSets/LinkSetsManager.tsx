'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box } from "@mantine/core"
import AddNewLinkSet from "./AddNewLinkSet"


export default function LinkSetsManager() {
  const breadCrumbs = [
    {"pageLink": "/admin/linkSets", "pageName": "Link Sets Manager"}
  ]

  return <>
    <BreadCrumb breads={breadCrumbs} />
    <Box component="main">
      <AddNewLinkSet />
    </Box>
  </>
}
