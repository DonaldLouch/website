'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { AlertDiamondIcon } from "@hugeicons/react"
import { Box } from "@mantine/core"
import { notifications } from "@mantine/notifications"


export default function ADMINPAGECONTENT() {
  const breadCrumbs = [
    {"pageLink": "/admin/blog", "pageName": "Blog"}
  ]

  notifications.show({
    id: "test",
    title: `TEST NOTIFICATION`,
    message: "This is a test notification message .",
    icon: <AlertDiamondIcon variant="twotone" />,
    autoClose: false,
  })

  return <>
    <BreadCrumb breads={breadCrumbs} />
    <Box component="main">
      
    </Box>
  </>
}
