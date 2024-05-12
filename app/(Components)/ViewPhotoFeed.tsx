'use client'

import { Modal, Stack, Text, Box, Badge, Group, Flex, Anchor, Skeleton } from '@mantine/core'

import DisplayDate from '@/lib/DisplayDate'
import { useUser } from '@clerk/nextjs'
import { BsCalendar2, BsEye, BsHash, BsImages, BsPencilSquare, BsPinMap, BsTag, BsTags } from 'react-icons/bs'

import classes from "./Components.module.css"
import { useDisclosure } from '@mantine/hooks'
import PrimaryLinkedButton from './(Buttons)/PrimaryLinkedButton'
import ClipboardButton from '@/app/(Components)/(Buttons)/ClipboardButton'
import { Album02Icon, Calendar03Icon, Edit02Icon, GridIcon, PinLocation03Icon, Tag01Icon, TagsIcon, ViewIcon } from '@hugeicons/react-pro'

import LazyLoad from 'react-lazyload';
import Image from 'next/image'
import { Suspense } from 'react'

export default function ViewPhotoFeed({ imageData, hideElement }: {imageData: any,hideElement?: any}) {
    const {user} = useUser()
    const [opened, { open, close }] = useDisclosure(false)
    const { album: albumData } = imageData

    // const [loaded, setIsLoading] = useState(false)

    // useEffect(() => {
    //     window.addEventListener("load", () => {
    //         setIsLoading(true)
    //     })
    // })
    
    return (<>
        <Box className={classes.imageCardView} onClick={open}>
                <Suspense fallback={<Skeleton />}>
                    {/* <LazyLoad height={200}> */}
                        <Image src={imageData.fileID.filePath} alt={`${imageData.fileID.fileID}-${imageData.fileID.fileTitle}`}
                        quality={1} 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        // fill={true}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        width={500}
                        height={300}
                        />
                    {/* </LazyLoad> */}
                </Suspense>
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
                    <LazyLoad height={200}>
                        {/* <Image src={imageData.fileID.filePath} alt={`${imageData.fileID.fileID}-${imageData.fileID.fileTitle}`} radius="md" style={{boxShadow: "var(--mantine-shadow-bsWhite)" }} /> */}
                    </LazyLoad>
                    <Group gap="0.5rem">
                        <ClipboardButton copyValue={`${process.env.NEXT_PUBLIC_SITE_URL}/photo/${imageData.id}`} copyText="Copy Photo Link" copiedText="Copied Photo Link" />
                        <PrimaryLinkedButton link={`/photo/${imageData.id}`} icon={<ViewIcon />}>View Photo</PrimaryLinkedButton>
                    </Group>
                </Stack>
                <Stack w={{base: "100%", md: "50%"}}> 
                    {user &&
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
                        <DisplayDate source={imageData.fileID.takenOn} />
                    </Badge>
                    <Group gap="0.5rem">
                        <TagsIcon />
                        {imageData.tags.map((tag: any) => (<Anchor href={tag.includes("#") ? `/feed/photography?search=tag&value=${tag.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${tag}`} style={{color: "currentColor"}}>
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
