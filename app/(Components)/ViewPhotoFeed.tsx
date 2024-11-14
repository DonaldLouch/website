'use client'

import { Modal, Stack, Text, Box, Badge, Group, Flex, Anchor, Skeleton } from '@mantine/core'

import DisplayDate from '@/lib/DisplayDate'
import { useUser } from '@clerk/nextjs'
// import { BsCalendar2, BsEye, BsHash, BsImages, BsPencilSquare, BsPinMap, BsTag, BsTags } from 'react-icons/bs'

import classes from "./Components.module.css"
import { useDisclosure } from '@mantine/hooks'
import PrimaryLinkedButton from './(Buttons)/PrimaryLinkedButton'
import ClipboardButton from '@/app/(Components)/(Buttons)/ClipboardButton'
import { Album02Icon, ArrowUpRight01Icon, Calendar03Icon, CameraVideoIcon, Edit02Icon, GithubIcon, GridIcon, Link04Icon, LinkSquare02Icon, NewsIcon, PinLocation03Icon, Tag01Icon, TagsIcon, ViewIcon } from '@hugeicons/react'

// import LazyLoad from 'react-lazyload';
import Image from 'next/image'
import { Suspense, useEffect, useState } from 'react'

import { useImageSize } from 'react-image-size';
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

    const [imageQuality, setImageQuality] = useState(1)

    useEffect(() => {
        dimensions && !loading || error && setPhotoWidth(Number(dimensions?.width))
        dimensions && !loading || error && setPhotoHeight(Number(dimensions?.height))
        !loading || error && setImageQuality(100)
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
                        <PrimaryLinkedButton link={`/photo/${imageData.id}`} icon={<ViewIcon />}>View Photo</PrimaryLinkedButton>
                    </Group>
                </Stack>
                <Stack w={{base: "100%", md: "50%"}}> 
                    {user && isAdmin &&
                        <Group gap="0.5rem">
                            <ClipboardButton copyValue={imageData.fileID.filePath} copyText="Copy S3 URI" copiedText="Copied Photo URI" />
                            <PrimaryLinkedButton link={`/admin/photography/${imageData.id}`} icon={<Edit02Icon />}>Edit Photo</PrimaryLinkedButton>
                            <Badge color="white" leftSection={<GridIcon />}>
                                {imageData.id}
                            </Badge> 
                        </Group>
                    }
                    <Text style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "0 2rem", whiteSpace: "break-spaces"}} p="2rem">{imageData.caption}</Text>
                    <Group gap="0.5rem">
                            {imageData.album && hideElement != "album" && <Anchor href={`/album/${albumData.slug}`} style={{color: "currentColor"}}>
                            <Badge color="primary" leftSection={<Album02Icon />}>
                                {albumData.albumName}
                            </Badge>
                        </Anchor>} 
                            {imageData.location && <Anchor href={`/feed/photography?search=location&value=${imageData.location}`} style={{color: "currentColor"}}>
                            <Badge color='blue' leftSection={<PinLocation03Icon />}>
                                {imageData.location}
                            </Badge>
                        </Anchor>}
                    </Group>
                    <Badge color="red" leftSection={<Calendar03Icon />}>
                        <DisplayDate source={imageData.fileID.capturedOn} />
                    </Badge>
                    <Group gap="0.5rem">
                         {imageData.links.length > 0 && imageData.links.map((link: any) => {
                            // console.log("Icon", link.icon)
                            const linkIcon = link.icon === "CameraVideo" ? <CameraVideoIcon />
                            : link.icon === "Github" ? <GithubIcon />
                            : link.icon === "news" ? <NewsIcon />
                            : link.icon === "" && link.linkType.includes("ex") ? <ArrowUpRight01Icon />
                            : link.icon === "" && link.linkType.includes("in") ? <LinkSquare02Icon />
                            : <Link04Icon />

                            return <Anchor href={link.link} key={link.link} target={link.linkType === "exLink" ? "_blank" : "_self"} m="0"><Badge color="blue" leftSection={linkIcon ? linkIcon : <Link04Icon />}>
                                {link.name}
                            </Badge></Anchor>
                        })} 
                    </Group>
                    <Group gap="0.5rem">
                        <TagsIcon />
                        {imageData.tags.map((tag: any, index: number) => (<Anchor key={index} href={tag.includes("#") ? `/feed/photography?search=tag&value=${tag.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${tag}`} style={{color: "currentColor"}}>
                            <Badge color="white" leftSection={<Tag01Icon />}>
                                {tag}
                            </Badge>
                        </Anchor> ))}
                    </Group>
                </Stack>
            </Flex>   
        </Modal>
    </>)
}

