import { Box, Image, Modal, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import classes from "@/app/(Config)/Components.module.css"

export default function ViewFullPhoto({photoData}: any) {
    const [opened, { open, close }] = useDisclosure(false)
    return (<>
        <Stack w={{base: "100%", lg: "50%"}} onClick={open}>
            <Image src={photoData.fileID.filePath} alt={`${photoData.fileID.fileID}-${photoData.fileID.fileTitle}`} radius="md" style={{boxShadow: "var(--mantine-shadow-bsWhite)" }} />
        </Stack>
        <Modal opened={opened} onClose={close} size="100%" yOffset="0" xOffset="0" title={`View: ${photoData.photoName}`}
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Image src={photoData.fileID.filePath} alt={`${photoData.fileID.fileID}-${photoData.fileID.fileTitle}`} />
        </Modal>
    </>)
}
