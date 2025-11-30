'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box } from "@mantine/core"
import { notifications } from "@mantine/notifications"


export default function AccountsPage() {
  const breadCrumbs = [
    {"pageLink": "/admin/blog", "pageName": "Blog"}
  ]

  notifications.show({
    id: "test",
    title: `TEST NOTIFICATION`,
    message: "This is a test notification message .",
    icon: <FontAwesomeIcon icon={["fal", "info-circle"]} />,
    autoClose: false,
  })

  return <>
    <BreadCrumb breads={breadCrumbs} />
    <Box component="main">
      
    </Box>
  </>
}
