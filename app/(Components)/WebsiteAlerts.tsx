'use client'

import DisplayDate from "@/lib/DisplayDate";
import supabase from "@/lib/supabase";
// import { Alert01Icon, Alert02Icon, AlertCircleIcon, AlertDiamondIcon, Archive02Icon, Bookmark01Icon, CancelCircleIcon, CheckmarkBadge03Icon, CheckmarkCircle02Icon, Cone01Icon, DashboardBrowsingIcon, DashboardSpeed02Icon, Delete02Icon, FavouriteIcon, Flag02Icon, Folder01Icon, Home01Icon, Image02Icon, InformationCircleIcon, LaurelWreath02Icon, Link01Icon, Loading03Icon, Location01Icon, Mail01Icon, Notification03Icon, PencilIcon, Search01Icon, SecurityCheckIcon, Settings02Icon, StarIcon, Tag01Icon } from "@hugeicons/react"
import { Modal, Tooltip, Text, Tabs, Alert, Title, Loader, Box, Stack } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import HugeIcon from "./HugeIcon";

export default function WebsiteAlerts() {
    const [loading, setLoading] = useState(true)
    
    const [alertData, setAlertData] = useState() as any
    const [activeAlerts] = useState([]) as any
    const [endedAlerts] = useState([]) as any
    
    const [opened, { open, close }] = useDisclosure(false)

    useEffect(() => {
        const GetAlerts = async () => {
            const { data } = await supabase.from('WebsiteAlerts').select().order('LastUpdated', { ascending: false }) as any
            setAlertData(data)
            setLoading(false)
        }
        
        GetAlerts().catch(console.error)
        
        alertData && alertData.forEach((alert: any) => {
            const isActive = !alert.EndedOn || alert.EndedOn && new Date(alert.EndedOn && alert.EndedOn) >= new Date()
            isActive && activeAlerts.push(alert)
            !isActive && endedAlerts.push(alert)
        })

    }, [loading])

    return <>
        <Tooltip label={`Website Notifications (${!loading && alertData?.length ? alertData.length : 0})`}>
            <HugeIcon name="alert-diamond" variant="duotone" clickOption={open}/>
            {/* <AlertDiamondIcon variant="duotone" onClick={open}/> */}
        </Tooltip>
        <Modal opened={opened} onClose={close} title="Website Notifications" yOffset="5rem" xOffset="5rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg">
            {loading ? <Alert variant="light" color="blue" title="Loading!" icon={<Loader color="blue" size="sm" />}><Text my="0.5rem" c="white">Currently loading the website alerts!</Text></Alert> 
            : alertData?.length === 0 || !alertData ? <Alert variant="light" color="green" title="No Alerts!" icon={<HugeIcon name="checkmark-badge-03" variant="twotone"/>}><Text my="0.5rem" c="white">There are no alerts for the website at this time!</Text></Alert> :
                <Tabs defaultValue="all" style={{boxShadow: "none"}} mt="0">
                    <Tabs.List grow justify="center">
                    <Tabs.Tab value="all">All ({!loading && alertData?.length})</Tabs.Tab>
                    <Tabs.Tab value="active">Active ({!loading && activeAlerts?.length})</Tabs.Tab>
                    <Tabs.Tab value="ended">Ended ({!loading && endedAlerts?.length})</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="all">
                        {activeAlerts.length >= 1 && <>
                            <Title order={2} ta="center">Active Alerts ({!loading && activeAlerts.length})</Title>
                            {alertData && activeAlerts?.map((alert: any) => {
                                const isActive = !alert.EndedOn || alert.EndedOn && new Date(alert.EndedOn && alert.EndedOn) >= new Date()
                                // const icon = alert.AlertIcon === "Cone01Icon" ? <Cone01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} /> 
                                // : alert.AlertIcon === "Alert01Icon" ? <Alert01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Tag01Icon" ?  <Tag01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "StarIcon" ? <StarIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "FavouriteIcon" ? <FavouriteIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Settings02Icon" ? <Settings02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "SecurityCheckIcon" ? <SecurityCheckIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Search01Icon" ? <Search01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "PencilIcon" ? <PencilIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Notification03Icon" ? <Notification03Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Mail01Icon" ? <Mail01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Location01Icon" ? <Location01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Link01Icon" ? <Link01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "InformationCircleIcon" ? <InformationCircleIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Image02Icon" ? <Image02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Home01Icon" ? <Home01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Folder01Icon" ? <Folder01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Delete02Icon" ? <Delete02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "CheckmarkCircle02Icon" ? <CheckmarkCircle02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "CancelCircleIcon" ? <CancelCircleIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Bookmark01Icon" ? <Bookmark01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Archive02Icon" ? <Archive02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "Flag02Icon" ? <Flag02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "LaurelWreath02Icon" ? <LaurelWreath02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "DashboardBrowsingIcon" ? <DashboardBrowsingIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : alert.AlertIcon === "DashboardSpeed02Icon" ? <DashboardSpeed02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // : <Alert02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                                // TO DO: Add icons to the alert: alert.AlertIcon

                                return <Alert key={alert.id} variant="light" color={alert.AlertColour ? alert.AlertColour : "blue"} title={alert.AlertTitle} icon={<HugeIcon name="file-unknown" variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />}>
                                    <Text my="0.5rem" c="white">{alert.AlertMessage}</Text>
                                    <Text m="1rem 0 0" size="sm" c="gray">Created on <strong><DisplayDate source={alert.CreatedOn} /></strong>{alert.EndedOn && isActive && (<> and ends on <strong><DisplayDate source={alert.EndedOn} /></strong></>)}</Text>  
                                </Alert>
                            })}
                        </>}
                        {endedAlerts.length >= 1 && <>
                            <Title order={2} ta="center">Ended Alerts ({!loading && endedAlerts.length})</Title>
                            {alertData && endedAlerts?.map((alert: any) => (<Box key={alert.id} p="2rem" m="1rem 2rem" style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}}>
                                <Stack style={{borderBottom: "1px solid"}} gap="0">
                                    <Title order={3} fz="1.5rem">{alert.AlertTitle}</Title>
                                    <Text my="0" size="sm" c="gray" pb="0.5rem">Created on <strong><DisplayDate source={alert.CreatedOn} /></strong> and ended on <strong><DisplayDate source={alert.EndedOn} /></strong></Text>  
                                </Stack>
                                <Text>{alert.AlertMessage}</Text>
                            </Box>))}
                        </>}
                    </Tabs.Panel>
                    <Tabs.Panel value="active">
                        {!loading && activeAlerts.length === 0 ? <Alert variant="light" color="green" title="No Alerts!" icon={<HugeIcon name="checkmark-badge-03" variant="twotone" />}><Text my="0.5rem" c="white">There are no active alerts for the website at this time!</Text></Alert> : alertData && activeAlerts?.map((alert: any) => {
                            const isActive = !alert.EndedOn || alert.EndedOn && new Date(alert.EndedOn && alert.EndedOn) >= new Date()
                            const icon = alert.AlertIcon === "Cone01Icon" ? <HugeIcon name="cone-01" variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
                            : <HugeIcon name="alert-circle" variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />

                            return <Alert key={alert.id} variant="light" color={alert.AlertColour ? alert.AlertColour : "blue"} title={alert.AlertTitle} icon={icon}>
                                <Text my="0.5rem" c="white">{alert.AlertMessage}</Text>
                                <Text m="1rem 0 0" size="sm" c="gray">Created on <strong><DisplayDate source={alert.CreatedOn} /></strong>{alert.EndedOn && isActive && (<> and ends on <strong><DisplayDate source={alert.EndedOn} /></strong></>)}</Text>  
                            </Alert>
                        })}
                    </Tabs.Panel>
                    <Tabs.Panel value="ended">
                        {!loading && endedAlerts.length === 0 ? <Alert variant="light" color="green" title="No Alerts!" icon={<HugeIcon name="checkmark-badge-03" variant="twotone" />}><Text my="0.5rem" c="white">There are no alerts that have ended at this time!</Text></Alert> : alertData && endedAlerts.map((alert: any) => (<Box key={alert.id} p="2rem" m="1rem 2rem" style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}}>
                                <Stack style={{borderBottom: "1px solid"}} gap="0">
                                    <Title order={3} fz="1.5rem">{alert.AlertTitle}</Title>
                                    <Text my="0" size="sm" c="gray" pb="0.5rem">Created on <strong><DisplayDate source={alert.CreatedOn} /></strong> and ended on <strong><DisplayDate source={alert.EndedOn} /></strong></Text>  
                                </Stack>
                                <Text>{alert.AlertMessage}</Text>
                            </Box>))}
                    </Tabs.Panel>
                </Tabs>
            }
        </Modal>
    </>
}