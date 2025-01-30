'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import DisplayDate from "@/lib/DisplayDate"
import { Alert, Box, Title, Text, Anchor } from "@mantine/core"
import NewAlert from "./NewAlert"
import EditAlert from "./EditAlert"
import HugeIcon from "@/app/(Components)/HugeIcon"


export default function AlertsManager({alerts}: any) {
  const breadCrumbs = [
    {"pageLink": "/admin/alerts", "pageName": "Alerts Manager"}
  ]

  return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Box component="main" color="white">
          <NewAlert />
          {alerts?.length === 0 || !alerts ? <Alert variant="light" color="green" title="No Alerts!" icon={<HugeIcon name="checkmark-badge-03" variant="twotone" />}><Text my="0.5rem" c="white">There are no alerts for the website at this time!</Text></Alert> : alerts.length >= 1 && alerts && alerts?.map((alert: any) => (
            <EditAlert alert={alert} key={alert.id} />
          ))}
        </Box>
    </>
  )
}
