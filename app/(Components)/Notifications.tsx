'use client'

import { Modal, Tooltip, Text, Alert } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import HugeIcon from "./HugeIcon";

export default function Notifications() {
    const [opened, { open, close }] = useDisclosure(false)
    
    return <>
        <Tooltip label={`Notifications (0)`}>
            <HugeIcon name="notification-03" variant="duotone" clickOption={open}/>
        </Tooltip>
        <Modal opened={opened} onClose={close} title="Notifications" yOffset="5rem" xOffset="5rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg">
                <Alert variant="light" color="secondary" title="Coming Soon!" icon={<HugeIcon name="cone-01" />}><Text my="0.5rem" c="white">The notifications function is currently being constructed at this time. Please check back later!</Text></Alert>
            {/* <Tabs defaultValue="all" style={{boxShadow: "none"}} mt="0">
                <Tabs.List grow justify="center">
                <Tabs.Tab value="all">All</Tabs.Tab>
                <Tabs.Tab value="active">Active</Tabs.Tab>
                <Tabs.Tab value="ended">Ended</Tabs.Tab>
                <Tabs.Tab value="dismissed">Dismissed</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="all"><Text>Function Coming Soon!</Text></Tabs.Panel>
                <Tabs.Panel value="active"><Text>Function Coming Soon!</Text></Tabs.Panel>
                <Tabs.Panel value="ended"><Text>Function Coming Soon!</Text></Tabs.Panel>
                <Tabs.Panel value="dismissed"><Text>Function Coming Soon!</Text></Tabs.Panel>
            </Tabs> */}
        </Modal>
    </>
}