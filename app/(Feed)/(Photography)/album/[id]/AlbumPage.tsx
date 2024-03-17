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
Icon,
Divider,
Spinner,
Text
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
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/router'
import ViewPhotoFeed from '@/app/(Components)/ViewPhotoFeed'

async function fetchPhotos(nextPage: number, photoLimit: number, albumID: string) {
    const from = nextPage * photoLimit
    const to = from + photoLimit - 1

    let query = supabase
        .from('Photography')
        .select(`*, fileID (*), album (*)`)
        .range(from, to)
        .order('uploadedOn', { ascending: false })
        .match({ isPublic: true, isSetup: true, album: albumID })
    
    const { data } = await query

    return data
}

export const AlbumPage = ({albumData, photoData, mdxSource, tags, locations, photosCount}: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // const toast = useToast()
    // const toastID = "toastID"
    // const containerRef = useRef(null)

    // const [isLoading, setIsLoading] = useState(false)
    // const [loadedPhotos, setLoadedPhotos] = useState(photoData)
    // const [isInView, setIsInView] = useState(false)
    // const [offset, setOffset] = useState(1)

    // const photoLimit = 12 as number

    // // @ts-ignore
    // const handleScroll = (container) => {
    //     if (containerRef.current && typeof window !== 'undefined') {
    //     const container = containerRef.current
    //     //@ts-ignore
    //     const { bottom } = container.getBoundingClientRect()
    //     const { innerHeight } = window
    //     setIsInView(() => bottom <= innerHeight)
    //     }
    // }

    // useEffect(() => {
    //     debounce(() => handleScroll(containerRef), 200)
    //     window.addEventListener('scroll', handleScroll)
    // }, [])

    // useEffect(() => {
    //     isInView && loadMorePhotos(offset)
    // }, [isInView])

    // const loadMorePhotos = async (offset: number) => {
    //     setIsLoading(true)
    //     setOffset((prev: number) => prev + 1)
    //     const newPhotos = await fetchPhotos(offset, photoLimit, albumData.id) as any
    //     // setTimeout(()=>{
    //     setLoadedPhotos((prevPhotos: any) => [...prevPhotos, ...newPhotos])
    //     // }, 1000)
    //     setIsLoading(false)
    // }

    const photoLimit = 20 as number
  const initialRender = useRef(true)
  const [loadedPhotos, setLoadedPhotos] = useState(photoData)
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()

  const [ref, inView] = useInView()

  // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  async function loadMorePhotos() {
    // setIsLoading(true)
    // sleep(1000).then(async () => {
      const nextPage = page + 1
      const newPhotos = await fetchPhotos(nextPage, photoLimit, albumData.id) as any
    setIsLastPage(nextPage * photoLimit <= photosCount - photoLimit ? false : true)

      if (!isLastPage) {
        setPage(nextPage)
        setLoadedPhotos((prevPhotos: any) => [
          ...(prevPhotos?.length ? prevPhotos : []),
          ...newPhotos
        ])
      }
      // setIsLoading(false)
    // })
  }

  useEffect(() => {
    inView && loadMorePhotos()
  }, [inView])

    const breakpointColumnsObj = {
		default: 5,
		1500: 4,
		800: 3,
	}

    return (<>
        <Box id="photos" pos="relative" w="100%" bg="mainGradient" m={{base: "-4.5rem -1rem -1rem", lg: "-5.8rem -5rem -2rem"}} width="100vw" pt={{base: "0.5rem", lg: "1.5rem"}}>
            <Flex 
                as={Masonry}
                breakpointCols={breakpointColumnsObj}
                p="4.5rem 1rem 1rem"
                // p="1rem 1rem 1rem"
                gap="0.5rem"
            >
                {loadedPhotos?.map((image: any, index: number) => (<>
                    {/* <Text key={index} background="primary" p="2rem" my="1rem">(<DisplayDate source={image.fileID.takenOn} format="MM/DD/YY" />) {image.photoName}</Text> */}
                    <ViewPhotoFeed imageData={image} key={index} hideElement="album" />
                </>))}
            </Flex>
             <Stack  ref={ref} alignItems="center" p="2rem" color="white" hidden={isLastPage}>
                <Divider />
                <Stack direction="row" gap="2rem" alignItems="center" pt="1rem" width="calc(100% * 4rem)">
                    <Spinner color="white" size="xl" />
                    <Heading fontSize={{base: "2rem", md: "3rem", lg:"5rem"}}>Loading More Photos</Heading>
                </Stack>
                <Text pt="1rem" textAlign="center">If the content is still not loaded after a minute please contact Donald Louch at <Link href="mailto:hello@donaldlouch.ca">hello@donaldlouch.ca</Link> for further assistance.</Text>
            </Stack>
            <Box 
                position="fixed"
                bottom={{ base: "1.4%", md: "2%" }}
                right={{ base: "4%", md: "1.5%" }}
                zIndex="overlay"
                color="white"
                background="primary"
                boxShadow="bsBoldWhite"
                _hover={{background: "blurredPurpleRGBA", boxShadow: "none"}}
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