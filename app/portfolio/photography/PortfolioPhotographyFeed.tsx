'use client'

import supabase from "@/lib/supabase"
// import { debounce, forEach } from "lodash"
import { useState, useEffect, useRef } from "react"

import {
  Box,
  useToast,
  Text,
  Alert,
  Icon,
  AlertDescription,
  Flex,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Tooltip,
  IconButton,
  Stack,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spinner,
  Heading,
  AspectRatio,
} from "@chakra-ui/react";

import Image from "next/image";

import Masonry from 'react-masonry-css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useRouter } from "next/navigation"

// import Link from 'next/link'
import { FormInput } from "@/app/(Components)/(Form)/FormInput";
import { InputControl } from "formik-chakra-ui";

import { useDebounce } from 'use-debounce'
import { BsChevronDown, BsFilter, BsPersonBadge, BsSearch } from "react-icons/bs";
import DisplayDate from "@/lib/DisplayDate";

import { useInView } from 'react-intersection-observer'
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import { MdxContent } from "@/app/mdx-content";
import ViewPhotoFeed from "@/app/(Components)/ViewPhotoFeed";


async function fetchPhotos(nextPage: number, photoLimit: number) {
  const from = nextPage * photoLimit
  const to = from + photoLimit - 1

  const { data: data } = await supabase
    .from('Photography')
    .select(`*, fileID (*), album (*)`)
    .range(from, to)
    .order('uploadedOn', { ascending: false })
    .match({ isPublic: true, isSetup: true, isPortfolio: true })
  
    return data
}

export default function PortfolioPhotographyFeed({ photos, about, mdxSource, photosCount }: {photos: any, about: any, mdxSource: any, photosCount: any})  {
  const photoLimit = 20 as number
  // const initialRender = useRef(true)
  const [loadedPhotos, setLoadedPhotos] = useState(photos)
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  // const router = useRouter()

  const [ref, inView] = useInView()

  // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  async function loadMorePhotos() {
    // setIsLoading(true)
      const nextPage = page + 1
      const newPhotos = await fetchPhotos(nextPage, photoLimit) as any
      setIsLastPage(nextPage * photoLimit <= photosCount - photoLimit ? false : true)

      if (!isLastPage) {
        setPage(nextPage)
        setLoadedPhotos((prevPhotos: any) => [
          ...(prevPhotos?.length ? prevPhotos : []),
          ...newPhotos
        ])
      }
      // setIsLoading(false)
  }

  useEffect(() => {
    inView && loadMorePhotos()
  }, [inView])

  const breakpointColumnsObj = {
		default: 5,
		1500: 4,
		800: 3,
	}
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const [search, setSearch] = useState(searchValue)
  // const [ focused, setFocused] = useState(false)
  // const [ completed, setCompleted] = useState(false)
  // const [prevSearch] = useState(searchValue)

  // const [query] = useDebounce(search, 750)

  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false
  //     return
  //   }
  //   focused && completed && router.push(`/feed/photography?search=keyword&value=${query}`)
  // }, [focused, completed, query]);

  // useEffect(() => {
  //   if (prevSearch != search && window && window.location) window.location.reload();
  // }, [photos])

  return (<>      
    <Box id="feed" pos="relative" w="100%" bg="blurredPurple" m={{base: "-4.5rem -1rem -1rem", lg: "-5.8rem -5rem -2rem"}} width="100vw" pt={{base: "0.5rem", lg: "1.5rem"}}>
      <Alert status='info' color="black" width="95vw" m="4.5rem auto 0">
        <Icon>
          <FontAwesomeIcon icon={["fas", "circle-info"]} color="currentColor"/>
        </Icon>
        <AlertDescription mx="1rem" fontSize="lg">
          Please note that this Photography Feed is in a alpha state right now, and things will change and may not work properly. Please further note, that in future iterations I will be modifying and completing all captions, tags and proper meta data for all the photos.
        </AlertDescription>
      </Alert>
      <Box 
        position="fixed"
        bottom={{ base: "1.4%", md: "2%" }}
        right={{ base: "4%", md: "1.5%" }}
        zIndex="overlay"
        color="white"
        background="primary"
        boxShadow="bsBoldWhite"
        _hover={{background: "blurredPurpleRGBA", boxShadow: "none"}}
        // padding="0.5rem"
        borderRadius="0 1rem"
        p="1rem"
        onClick={onOpen}
      >
        <Tooltip label="About Donald Louch"><BsPersonBadge size="2rem" /></Tooltip>
      </Box>

      <Drawer onClose={onClose} isOpen={isOpen} size="xl">
      <DrawerOverlay />
        <DrawerContent background="blurredPurple" m="0.5rem" borderRadius="0 0 0 2rem">
          <DrawerCloseButton />
          <DrawerHeader m="-0.3rem 0rem 0.3rem">About {about.firstName} {about.lastName}</DrawerHeader>

          <DrawerBody>
             <Box id="bio">
                    <Stack
                        direction={{base: "column", lg: "row"}}
                        gap={{base: "0.5rem", lg: "2rem", xl: "3rem"}}
                        justifyContent="flex-start"
                        alignItems="center"
                        // mb="1rem"
                    >
                        <AspectRatio 
                            // ratio={2/3}
                            ratio={1/1}
                            // w={{base: "50%", md: "28%"}}
                            w={{base: "70%", lg: "30%", xl: "28%"}}
                            objectPosition="top !important"
                        >
                            <Image
                                src={about.avatar}
                                alt={`${about.firstName} ${about.lastName}`}
                                height="2100" 
                                width="1500"
                                style={{ borderRadius: "0 2rem", objectPosition: "top"}}
                            />
                        </AspectRatio>
                        <Stack alignItems={{base: "center", lg: "flex-start"}} mt={{base: "1rem", lg: "0"}}>
                            <Heading
                                as="h2"
                                fontSize="3rem"
                                textDecoration="underline"
                                textDecorationThickness="0.4rem"
                                textDecorationColor="primary"
                            >
                            {about.firstName} {about.middleName} {about.lastName}
                            </Heading>
                            <Text fontSize="2rem" m="0.5rem 0">
                                {about.pronouns}
                            </Text>
                        </Stack>
                    </Stack>
                    {/* <Heading
                        as="h3"
                        fontSize={{base: "5vw", lg: "4vw", xl: "3vw"}}
                        fontFamily="body"
                        fontWeight="300"
                        my="1rem"
                        textDecor="underline"
                        textDecorationThickness="0.2rem"
                        textDecorationColor="primary"
                    >
                        {about.tagLine}
                    </Heading> */}
                    <Box whiteSpace="break-spaces" p="1rem" mb="1rem">
                      <MdxContent source={mdxSource} />
                    </Box>
                </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer> 
        <Flex 
          as={Masonry}
          breakpointCols={breakpointColumnsObj}
          // p="4.5rem 1rem 1rem"
          p="1rem 1rem 1rem"
          gap="0.5rem"
        >
          {loadedPhotos?.map((image: any, index: number) => (<>
            {/* <Text key={index} background="primary" p="2rem" my="1rem">(<DisplayDate source={image.fileID.takenOn} format="MM/DD/YY" />) {image.id}</Text> */}
            <ViewPhotoFeed imageData={image} key={index} />
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
    </Box>
  </>)
}
