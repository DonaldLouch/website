'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import HugeIcon from "@/app/(Components)/HugeIcon"
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
    icon: <HugeIcon name="information-circle" variant="twotone" />,
    autoClose: false,
  })

  return <>
    <BreadCrumb breads={breadCrumbs} />
    <Box component="main">
      
    </Box>
  </>
}
