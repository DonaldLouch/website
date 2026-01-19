import { Modal, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import Image from 'next/image'

import { useEffect, useState } from 'react'
import { useImageSize } from 'react-image-size'

export default function ViewFullPhoto({photoData}: any) {
    const [opened, { open, close }] = useDisclosure(false)

    const imageURL = photoData.fileID.filePath
    const [dimensions, { loading, error }] = useImageSize(imageURL)
    
    const [photoWidth, setPhotoWidth] = useState(1920)
    const [photoHeight, setPhotoHeight] = useState(1080)


    useEffect(() => {
        dimensions && !loading || error && setPhotoWidth(Number(dimensions?.width))
        dimensions && !loading || error && setPhotoHeight(Number(dimensions?.height))
    }, [dimensions])
    
    return (<>
        <Stack w={{base: "100%", lg: "50%"}} onClick={open}>
            <Image src={photoData.fileID.filePath} alt={`${photoData.fileID.fileID}-${photoData.fileID.fileTitle}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: "var(--mantine-radius-md)",
                    boxShadow: "var(--mantine-shadow-bsWhite)"
                }}
                width={photoWidth}
                height={photoHeight}
                // layout={"responsive"}
            />
            {/* <Image src={photoData.fileID.filePath} alt={`${photoData.fileID.fileID}-${photoData.fileID.fileTitle}`} radius="md" style={{boxShadow: "var(--mantine-shadow-bsWhite)" }} /> */}
        </Stack>
        <Modal opened={opened} onClose={close} size="100%" yOffset="0" xOffset="0" title={`View: ${photoData.photoName}`}
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Image src={photoData.fileID.filePath} alt={`${photoData.fileID.fileID}-${photoData.fileID.fileTitle}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                    width: '100%',
                    height: 'auto'
                }}
                width={photoWidth}
                height={photoHeight}
                // layout={"responsive"}
            />
        </Modal>
    </>)
}
