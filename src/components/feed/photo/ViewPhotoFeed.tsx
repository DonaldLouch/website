import { Modal, Stack, Text, Box, Badge, Group, Flex, Anchor, Image } from '@mantine/core'

import DisplayDate from '@/lib/DisplayDate'
import classes from "../../Components.module.css"
import { useDisclosure } from '@mantine/hooks'
import PrimaryLinkedButton from '../../buttons/PrimaryLinkedButton'
import ClipboardButton from '../../buttons/ClipboardButton'

import { useEffect, useState, memo } from 'react'
import { useImageSize } from 'react-image-size'
import LinkBadge from '../../LinkBadge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { GetMarkdown } from '@/actions/markdown.server'
import { useQuery } from '@tanstack/react-query'
import { Markdown } from '@/components/markdown'
import { AdminAccessCheck, UserLoggedInCheck } from '@/actions/auth.server'

// async function GetCaption({ captionData }: any) {
//     return await GetMarkdown({ data: { content: captionData } }) 
// }

async function ViewPhotoFeed({ photo, hideElement }: { photo: any,hideElement?: any }) {
    const [opened, { open, close }] = useDisclosure(false)
    const { PhotographyAlbum: album, PhotographyMedia: media } = photo
    
    const imageURL = media.filePath
    const [dimensions, { loading, error }] = useImageSize(imageURL)
    
    const [photoWidth, setPhotoWidth] = useState(1920)
    const [photoHeight, setPhotoHeight] = useState(1080)

    const { data: caption } = useQuery({
        queryKey: ['caption'],
        queryFn: () => GetMarkdown({ data:  {content: photo.caption } })
    })
    
    const { data: isUser } = useQuery({
        queryKey: ['isUser'],
        queryFn: () => UserLoggedInCheck()
    })

    const { data: isAdmin } = useQuery({
        queryKey: ['isAdmin'],
        queryFn: () => AdminAccessCheck()
    })
    // const [caption, setCaption] = useState()

    // useEffect(() => {
    //     (async () => {
    //         const res = await GetCaption({ captionData:  photo.caption })
    //         setCaption(res)
    //     })
    // }, [photo])
    

    // const caption = await GetCaption({ captionData:  photo.caption })

    useEffect(() => {
        if (dimensions && !loading && !error) {
            setPhotoWidth(Number(dimensions.width))
            setPhotoHeight(Number(dimensions.height))
        }
    }, [imageURL, dimensions, loading, error])
    
    return (<>
        <Box  onClick={open} display="inline-block">
                {/* <Suspense fallback={<Skeleton />}> */}
                    {/* <LazyLoad height={200}> */}
                    {/* <Anchor href={`/photo/${photo.id}`}> */}
                        <Image src={media.filePath} alt={`${media.fileID}-${media.fileTitle}`}
                            // quality={imageQuality} 
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

        <Modal opened={opened} onClose={close} title={photo.photoName} yOffset="2rem" xOffset="2rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Flex direction={{base: "column", md: "row"}} gap="2rem" px={{base: "1rem", md: "2rem"}} w={{base: "calc(100% - 1rem)", md: "calc(100% - 4rem)"}} justify="flex-start" py="2rem">
                <Stack w={{base: "100%", md: "50%"}} justify="flex-start" align="flex-start">
                    <Image src={media.filePath} alt={`${media.fileID}-${media.fileTitle}`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                            width={photoWidth}
                            height={photoHeight}
                        />
                    <Group gap="0.5rem">
                        {/* <ClipboardButton copyValue={`${process.env.BETTER_AUTH_URL}/photo/${photo.id}`} copyText="Copy Photo Link" copiedText="Copied Photo Link" /> //TODO: Fix */}
                        <PrimaryLinkedButton link={{ to: "/photo/$id", params: { id: photo.id }}} icon={{name: "eye", variant: "fadl"}}>View Photo</PrimaryLinkedButton>
                    </Group>
                </Stack>
                <Stack w={{base: "100%", md: "50%"}}> 
                    {(isUser != undefined && isAdmin != undefined) && (isUser && isAdmin) &&
                        <Group gap="0.5rem">
                            <ClipboardButton copyValue={media.filePath} copyText="Copy S3 URI" copiedText="Copied Photo URI" />
                            <PrimaryLinkedButton link={{ to: "/admin/photography/$id", params: {id: photo.id} }} icon={{ name: "light-image-pen", pack: "fak" }}>Edit Photo</PrimaryLinkedButton>
                            <Badge color="white" leftSection={<FontAwesomeIcon icon={["fal", "hashtag"]} size="lg" />}>
                                {photo.id}
                            </Badge> 
                        </Group>
                    }
                    <Markdown source={caption} />
                    <Group gap="0.5rem">
                            {photo.album && hideElement != "album" && <Anchor href={`/album/${album.slug}`} style={{color: "currentColor"}}>
                            <Badge color="primary" leftSection={<FontAwesomeIcon icon={["fadl", "images"]} size="lg" />}>
                                {album.albumName}
                            </Badge>
                        </Anchor>} 
                            {photo.location && <Anchor href={`/feed/photography?search=location&value=${photo.location}`} style={{color: "currentColor"}}>
                            <Badge color='blue' leftSection={<FontAwesomeIcon icon={["fadl", "map-marker-smile"]} size="lg" />}>
                                {photo.location}
                            </Badge>
                        </Anchor>}
                    </Group>
                    <Badge color="red" leftSection={<FontAwesomeIcon icon={["fadl", "calendar"]} size="lg" />}>
                        <DisplayDate source={media.capturedOn} />
                    </Badge>
                    <Group gap="0.5rem">
                        {photo.links.length > 0 && photo.links.map((link: any, index: number) => (
                            <LinkBadge linkName={link.name} link={link.link} linkType={link.linkType} linkIcon={{name: link.icon.name, variant: link.icon.variant}} key={index} />
                        ))}
                    </Group>
                    <Group gap="0.5rem">
                        <FontAwesomeIcon icon={["fadl", "tags"]} size="lg" />
                        {photo.tags && photo.tags.map((tag: any, index: number) => (<Anchor key={index} href={tag.includes("#") ? `/feed/photography?search=tag&value=${tag.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${tag}`} style={{color: "currentColor"}}>
                            <Badge color="white" leftSection={<FontAwesomeIcon icon={["fadl", "tag"]} size="lg" />}>
                                {tag}
                            </Badge>
                        </Anchor> ))}
                    </Group>
                </Stack>
            </Flex>   
        </Modal>
    </>)
}

export default memo(ViewPhotoFeed)

