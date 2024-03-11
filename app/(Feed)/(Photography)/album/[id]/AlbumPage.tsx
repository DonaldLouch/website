'use client'

import { 
Box,
Heading,
Flex,
useToast,
Tooltip,
IconButton,
Drawer,
DrawerOverlay,
DrawerContent,
DrawerCloseButton,
DrawerBody,
useDisclosure,
Stack,
Tag,
TagLabel,
Link,
Icon
} from '@chakra-ui/react'

import { useEffect, useRef, useState } from 'react'
import Masonry from 'react-masonry-css'
import { debounce } from 'lodash'
import supabase from '@/lib/supabase'
import DisplayDate from '@/lib/DisplayDate'
import ViewPhotoAlbum from './ViewPhotoAlbum'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MdxContent } from '@/app/mdx-content'
import { BsCalendar2, BsInfo, BsPinMap, BsTag, BsTags } from 'react-icons/bs'

async function fetchPhotos(offset: number, limit: number, albumID: string) {
    const from = offset * limit
    const to = from + limit - 1

    let query = supabase
        .from('Photography')
        .select(`*, fileID (*), album (*)`)
        .range(from, to)
        .order('uploadedOn', { ascending: false })
        .match({ isPublic: true, isSetup: true, album: albumID })
    
    const { data } = await query

    return data
}

export const AlbumPage = ({albumData, photoData, mdxSource, tags, locations}: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()
    const toastID = "toastID"
    const containerRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false)
    const [loadedPhotos, setLoadedPhotos] = useState(photoData)
    const [isInView, setIsInView] = useState(false)
    const [offset, setOffset] = useState(1)

    const PAGE_COUNT = 12 as number

    // @ts-ignore
    const handleScroll = (container) => {
        if (containerRef.current && typeof window !== 'undefined') {
        const container = containerRef.current
        //@ts-ignore
        const { bottom } = container.getBoundingClientRect()
        const { innerHeight } = window
        setIsInView(() => bottom <= innerHeight)
        }
    }

    useEffect(() => {
        debounce(() => handleScroll(containerRef), 200)
        window.addEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        isInView && loadMorePhotos(offset)
    }, [isInView])

    const loadMorePhotos = async (offset: number) => {
        setIsLoading(true)
        setOffset((prev: number) => prev + 1)
        const newPhotos = await fetchPhotos(offset, PAGE_COUNT, albumData.id) as any
        // setTimeout(()=>{
        setLoadedPhotos((prevPhotos: any) => [...prevPhotos, ...newPhotos])
        // }, 1000)
        setIsLoading(false)
    }

    const breakpointColumnsObj = {
		default: 5,
		1500: 4,
		800: 3,
	}

    return (<>
        <Box id="photos" pos="relative" w="100%" bg="mainGradient" ref={containerRef} m={{base: "-4.5rem -1rem -1rem", lg: "-5.8rem -5rem -2rem"}} width="100vw" pt={{base: "0.5rem", lg: "1.5rem"}}>
            <Flex 
                as={Masonry}
                breakpointCols={breakpointColumnsObj}
                p="4.5rem 1rem 1rem"
                // p="1rem 1rem 1rem"
                gap="0.5rem"
            >
                {isLoading && !toast.isActive(toastID) &&
                    toast({
                        id: toastID,
                        title: "Photos Loading",
                        description: "Additional photos are currently loading",
                        status: "info",
                        duration: 9000,
                        isClosable: true,
                    })}
                {loadedPhotos?.map((image: any, index: number) => (<>
                    {/* <Text key={index} background="primary" p="2rem" my="1rem">(<DisplayDate source={image.fileID.takenOn} format="MM/DD/YY" />) {image.photoName}</Text> */}
                    <ViewPhotoAlbum imageData={image} key={index} isLoading={isLoading} />
                </>))}
            </Flex>
            <Box 
                position="fixed"
                bottom={{ base: "1.4%", md: "2%" }}
                right={{ base: "4%", md: "1.5%" }}
                zIndex="overlay"
                color="white"
                background="black"
                boxShadow="bsBoldWhite"
                // padding="0.5rem 1rem"
                borderRadius="0 1rem"
                p="1rem"
                onClick={onOpen}
            >
                <Tooltip label="Open Details">
                    <BsInfo size="2rem" />
                    {/* <Icon w="2rem" h="auto">
                        <FontAwesomeIcon icon={["fas", "circle-info"]} width="100%" color="currentColor" />
                    </Icon> */}
                {/* <IconButton
                    aria-label="Go Details"
                    variant="unstyled"
                    _hover={{ color: "secondary" }}
                    color="white"
                    fontSize="3xl"
                    icon={<FontAwesomeIcon icon={["fas", "circle-info"]} />}
                    onClick={onOpen}
                /> */}
                </Tooltip>
            </Box>
        </Box>
        <Drawer onClose={onClose} isOpen={isOpen} size="xl" placement="top">
            <DrawerOverlay />
                <DrawerContent background="blurredPurple" m="1rem" p="2rem" borderRadius="0 0 0 2rem" width="calc(100% - 1rem * 2)">
                <DrawerCloseButton />

                <DrawerBody>
                        <Heading as="h2" size="3xl" textDecoration="underline" textDecorationColor="primary" textAlign="left" color="white" mb="1rem" mt="-0.5rem">{albumData.albumName}</Heading>
                    <Stack direction="row" alignItems="center" flexWrap="wrap" gap="0.8rem" my="1rem">
                        <Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" whiteSpace="nowrap" wordBreak="keep-all" width="fit-content" my="1rem">
                            <BsCalendar2 />
                            {/* <FontAwesomeIcon icon={["fas", "calendar-image"]} color="currentColor" height="40%" /> */}
                            <TagLabel pl="0.5rem"><DisplayDate source={albumData.uploadedOn} /></TagLabel>
                        </Tag>
                        {locations.map((location: any) => (
                            <Link href={`/feed/photography?search=location&value=${location}`} style={{color: "currentColor"}}><Tag size='lg' colorScheme='messenger' borderRadius='0 1rem' p="1rem" whiteSpace="nowrap" wordBreak="keep-all" width="fit-content">
                                <BsPinMap />
                                {/* <FontAwesomeIcon icon={["fas", "location-pin"]} color="currentColor" height="40%" /> */}
                                <TagLabel pl="0.5rem">{location}</TagLabel>
                            </Tag></Link>
                        ))}
                    </Stack>

                    <Box boxShadow="bsBoldPrimary" p="2rem" m="0.5rem 0.5rem 0" borderRadius="0 2rem" whiteSpace="break-spaces">
                        {/* TODO: Fix the paragraph spacing? */}
                        <MdxContent source={mdxSource} />
                    </Box>

                    <Stack direction="row" alignItems="center" flexWrap="wrap" gap="0.8rem" my="2rem">
                        <BsTags />
                        {/* <Box mr="0.3rem" color="secondary">
                            <FontAwesomeIcon icon={["fas", "tags"]} color="currentColor" height="40%" />
                        </Box> */}
                        {tags.map((tag: any) => (
                            <Link href={tag.includes("#") ? `/feed/photography?search=tag&value=${tag.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${tag}`} style={{color: "currentColor"}}>
                                <Tag size='lg' colorScheme='whiteAlpha' borderRadius='0 1rem' p="1rem" key={tag} whiteSpace="nowrap" wordBreak="keep-all" width="fit-content">
                                    <BsTag />
                                    {/* <FontAwesomeIcon icon={["fas", "tag"]} color="currentColor" height="40%" /> */}
                                    <TagLabel pl="0.5rem">{tag}</TagLabel>
                                </Tag>
                            </Link>
                        ))}
                    </Stack>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
    </>)
}