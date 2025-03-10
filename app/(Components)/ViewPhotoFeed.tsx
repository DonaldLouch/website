'use client'

import { Modal, Stack, Text, Box, Badge, Group, Flex, Anchor } from '@mantine/core'

import DisplayDate from '@/lib/DisplayDate'
import { useUser } from '@clerk/nextjs'

import classes from "./Components.module.css"
import { useDisclosure } from '@mantine/hooks'
import PrimaryLinkedButton from './(Buttons)/PrimaryLinkedButton'
import ClipboardButton from '@/app/(Components)/(Buttons)/ClipboardButton'

// import LazyLoad from 'react-lazyload';
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useImageSize } from 'react-image-size';
import HugeIcon from './HugeIcon'
import LinkBadge from './LinkBadge'
// import { checkRole } from '@/lib/roles'


export default function ViewPhotoFeed({ imageData, hideElement }: {imageData: any,hideElement?: any}) {
    const {user} = useUser() as any
    
    const isAdmin = user && user.publicMetadata.role === "admin" ? true : false

    const [opened, { open, close }] = useDisclosure(false)
    const { album: albumData } = imageData
    
    const imageURL = imageData.fileID.filePath
    const [dimensions, { loading, error }] = useImageSize(imageURL)
    
    const [photoWidth, setPhotoWidth] = useState(1920)
    const [photoHeight, setPhotoHeight] = useState(1080)

    const [imageQuality, setImageQuality] = useState(50)

    useEffect(() => {
        !loading || error && setImageQuality(100)
        dimensions && !loading || error && setPhotoWidth(Number(dimensions?.width))
        dimensions && !loading || error && setPhotoHeight(Number(dimensions?.height))
    }, [imageURL, dimensions, loading, error])
    
    // className={classes.imageCardView}
    return (<>
        <Box  onClick={open} display="inline-block">
                {/* <Suspense fallback={<Skeleton />}> */}
                    {/* <LazyLoad height={200}> */}
                    {/* <Anchor href={`/photo/${imageData.id}`}> */}
                        <Image src={imageData.fileID.filePath} alt={`${imageData.fileID.fileID}-${imageData.fileID.fileTitle}`}
                            quality={imageQuality} 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                            width={photoWidth}
                            height={photoHeight}
                            // layout={"responsive"}
                            className={classes.imageCardView}
                        />
                    {/* </Anchor> */}
                    {/* </LazyLoad> */}
                {/* </Suspense> */}
        </Box>

        <Modal opened={opened} onClose={close} title={imageData.photoName} yOffset="2rem" xOffset="2rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Flex direction={{base: "column", md: "row"}} gap="2rem" px={{base: "1rem", md: "2rem"}} w={{base: "calc(100% - 1rem)", md: "calc(100% - 4rem)"}} justify="flex-start" py="2rem">
                <Stack w={{base: "100%", md: "50%"}} justify="flex-start" align="flex-start">
                    <Image src={imageData.fileID.filePath} alt={`${imageData.fileID.fileID}-${imageData.fileID.fileTitle}`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                            width={photoWidth}
                            height={photoHeight}
                        />
                    <Group gap="0.5rem">
                        <ClipboardButton copyValue={`${process.env.NEXT_PUBLIC_SITE_URL}/photo/${imageData.id}`} copyText="Copy Photo Link" copiedText="Copied Photo Link" />
                        <PrimaryLinkedButton link={`/photo/${imageData.id}`} primNewIcon={{name: "view", variant: "duotone"}}>View Photo</PrimaryLinkedButton>
                    </Group>
                </Stack>
                <Stack w={{base: "100%", md: "50%"}}> 
                    {user && isAdmin &&
                        <Group gap="0.5rem">
                            <ClipboardButton copyValue={imageData.fileID.filePath} copyText="Copy S3 URI" copiedText="Copied Photo URI" />
                            <PrimaryLinkedButton link={`/admin/photography/${imageData.id}`} primNewIcon={{name: "edit-02"}}>Edit Photo</PrimaryLinkedButton>
                            <Badge color="white" leftSection={<HugeIcon name="grid" />}>
                                {imageData.id}
                            </Badge> 
                        </Group>
                    }
                    <Text style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "0 2rem", whiteSpace: "break-spaces"}} p="2rem">{imageData.caption}</Text>
                    <Group gap="0.5rem">
                            {imageData.album && hideElement != "album" && <Anchor href={`/album/${albumData.slug}`} style={{color: "currentColor"}}>
                            <Badge color="primary" leftSection={<HugeIcon name="album-02" />}>
                                {albumData.albumName}
                            </Badge>
                        </Anchor>} 
                            {imageData.location && <Anchor href={`/feed/photography?search=location&value=${imageData.location}`} style={{color: "currentColor"}}>
                            <Badge color='blue' leftSection={<HugeIcon name="pin-location-03" />}>
                                {imageData.location}
                            </Badge>
                        </Anchor>}
                    </Group>
                    <Badge color="red" leftSection={<HugeIcon name="calendar-03" />}>
                        <DisplayDate source={imageData.fileID.capturedOn} />
                    </Badge>
                    <Group gap="0.5rem">
                        {imageData.links.length > 0 && imageData.links.map((link: any, index: number) => (
                            <LinkBadge linkName={link.name} link={link.link} linkType={link.linkType} linkIcon={{name: link.icon.name, variant: link.icon.variant}} key={index} />
                        ))}
                    </Group>
                    <Group gap="0.5rem">
                        <HugeIcon name="tags" />
                        {imageData.tags && imageData.tags.map((tag: any, index: number) => (<Anchor key={index} href={tag.includes("#") ? `/feed/photography?search=tag&value=${tag.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${tag}`} style={{color: "currentColor"}}>
                            <Badge color="white" leftSection={<HugeIcon name="tag-01" />}>
                                {tag}
                            </Badge>
                        </Anchor> ))}
                    </Group>
                </Stack>
            </Flex>   
        </Modal>
    </>)
}

