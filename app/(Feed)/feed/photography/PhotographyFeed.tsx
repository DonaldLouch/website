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
  Heading
} from "@chakra-ui/react";

import Masonry from 'react-masonry-css'

import ViewPhotoFeed from "./ViewPhotoFeed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useRouter } from "next/navigation"

// import Link from 'next/link'
import { FormInput } from "@/app/(Components)/(Form)/FormInput";
import { InputControl } from "formik-chakra-ui";

import { useDebounce } from 'use-debounce'
import { BsChevronDown, BsFilter, BsSearch } from "react-icons/bs";
import DisplayDate from "@/lib/DisplayDate";

import { useInView } from 'react-intersection-observer'


async function fetchPhotos(offset: number, limit: number, searchType?: string, searchValue?: string) {
  const from = offset * limit
  const to = from + limit - 1
  console.log(from, to)
  const keyword = searchType === "tag" 
    && searchValue?.includes("HASHTAG") ? searchValue?.replace('HASHTAG', '#') 
    : searchValue?.includes("%20") ? searchValue?.replace('%20', ' ') 
    : searchValue

  let query = supabase
    .from('Photography')
    .select(`*, fileID (*), album (*)`)
    .range(from, to)
    .order('uploadedOn', { ascending: false })
    .match({ isPublic: true, isSetup: true })
    searchType && searchValue && searchType === "keyword" && query.or(`caption.ilike.%${keyword}%,photoName.ilike.%${keyword}%`) //TODO: Add Tags
    searchType && searchValue && searchType === "location" && query.ilike('location', `%${keyword}%`) 
    searchType && searchValue && searchType === "tag" && query.contains("tags", [`${keyword}`]) 
    searchType && searchValue && searchType === "order" && searchValue === "old" ? query.order('uploadedOn', { ascending: true }) : query.order('uploadedOn', { ascending: false })
    searchType && searchValue && searchType === "view" && searchValue === "pinned" ? query.match({ isPublic: true, isSetup: true, isPinned: true }) : query.match({ isPublic: true, isSetup: true }) 
    const { data } = await query

  return data
}

export default function PhotographyFeed({ photos, photographyAlbum, locationData, tagData, searchType, searchValue }: {photos: any, photographyAlbum: any, locationData: any, tagData: any, searchType?: string, searchValue?: string})  {
  const PAGE_COUNT = 20 as number
  const initialRender = useRef(true)
  const [loadedPhotos, setLoadedPhotos] = useState(photos)
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [ref, inView] = useInView()

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  async function loadMorePhotos() {
    setIsLoading(true)
    sleep(1000).then(async () => {
      const nextPage = page + 1
      const newPhotos = await fetchPhotos(nextPage, PAGE_COUNT, searchType, searchValue) as any
      console.log(nextPage)

      if (loadedPhotos?.length) {
        setPage(nextPage)
        setLoadedPhotos((prevPhotos: any) => [
          ...(prevPhotos?.length ? prevPhotos : []),
          ...newPhotos
        ])
      }
      setIsLoading(false)
    })
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

  const [search, setSearch] = useState(searchValue)
  const [ focused, setFocused] = useState(false)
  const [ completed, setCompleted] = useState(false)
  const [prevSearch] = useState(searchValue)

  const [query] = useDebounce(search, 750)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    focused && completed && router.push(`/feed/photography?search=keyword&value=${query}`)
  }, [focused, completed, query]);

  useEffect(() => {
    if (prevSearch != search && window && window.location) window.location.reload();
  }, [photos])

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
        background="black"
        boxShadow="bsBoldWhite"
        // padding="0.5rem"
        borderRadius="0 1rem"
        p="1rem"
        onClick={onOpen}
      >
        <Tooltip label="Filters"><BsFilter size="2rem" /></Tooltip>
      </Box>

      <Drawer onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
        <DrawerContent background="blurredPurple" m="0.5rem" borderRadius="0 0 0 2rem">
          <DrawerCloseButton />
          <DrawerHeader m="-0.3rem 0 0.3rem">Filters</DrawerHeader>

          <DrawerBody>
            {/* <InputControl 
                name="search"
                label="Search"
                mt="0.5rem"
                inputProps={{
                    variant: "unstyled",
                    boxShadow: 'bsBoldSecondary',
                    _focus: {boxShadow: "bsBoldPrimary"},
                    _invalid: {boxShadow: "bsBoldRed"},
                    p: "1.5rem 2rem",
                    color: 'white',
                    borderRadius: "0 2rem",
                    type: "search"
                }}
                labelProps={{color: 'white'}}
            />  */}
            <Text>Search</Text>
            <InputGroup variant="unstyled" boxShadow='bsBoldSecondary' _focus={{boxShadow: "bsBoldPrimary"}} _invalid={{boxShadow: "bsBoldRed"}} color='white' borderRadius="0 1rem" my="1rem">
            <InputLeftElement pointerEvents='none' m="1.2rem 1rem">
              <BsSearch />
            </InputLeftElement>
            <Input placeholder='Me' p="1rem 3rem" onFocus={() => {setFocused(true)}} onChange={(e: any) => {setSearch(e.target.value)}} onMouseOut={() => {setCompleted(true)}} />
            </InputGroup>
            <Divider m="1.5rem 0 0.5rem" />
            <Text>Go to:</Text>
            <Menu>
              <MenuButton as={Button} rightIcon={<BsChevronDown />} width="100%" background="black" color="white" my="0.5rem" _hover={{background: "secondary"}} _active={{background: "secondary"}} borderRadius="0 0.5rem">
                Album Select
              </MenuButton>
              <MenuList background="black" outline="none" border="none" overflow="scroll" maxH="50vh">
                {photographyAlbum.map((album: any) => (
                    <MenuItem key={album.id} background="black" fontSize="1.2rem" _hover={{ background: "blurredPurple", color: "secondary" }}><Link href={`/album/${album.slug}`} style={{color: "currentColor"}}>{album.albumName}</Link></MenuItem>
                  ))}
              </MenuList>
            </Menu>
            <Divider my="0.5rem" />
            <Text>Filters:</Text>
            <Menu>
              <MenuButton as={Button} rightIcon={<BsChevronDown />} width="100%" background="black" color="white" my="0.5rem" _hover={{background: "secondary"}} _active={{background: "secondary"}} borderRadius="0 0.5rem">
                Location Select
              </MenuButton>
              <MenuList background="black" outline="none" border="none" overflow="scroll" maxH="50vh">
                {locationData.map((location: any, index: number) => (
                    <MenuItem key={index} background="black" fontSize="1.2rem" _hover={{ background: "blurredPurple", color: "secondary" }}><Link href={`/feed/photography?search=location&value=${location.location}`} style={{color: "currentColor"}}>{location.location}</Link></MenuItem>
                  ))}
              </MenuList>
            </Menu>
            <Text>Tags:</Text>
            <Menu>
              <MenuButton as={Button} rightIcon={<BsChevronDown />} width="100%" background="black" color="white" my="0.5rem" _hover={{background: "secondary"}} _active={{background: "secondary"}} borderRadius="0 0.5rem">
                Tag Select
              </MenuButton>
              <MenuList background="black" outline="none" border="none" overflow="scroll" maxH="50vh">
                {tagData.map((tag: any, index: number) => (
                    <MenuItem key={index} background="black" fontSize="1.2rem" _hover={{ background: "blurredPurple", color: "secondary" }}><Link href={tag.tag.includes("#") ? `/feed/photography?search=tag&value=${tag.tag.replace('#', 'HASHTAG')}` : `/feed/photography?search=tag&value=${tag.tag}`} style={{color: "currentColor"}}>{tag.tag}</Link></MenuItem>
                  ))}
              </MenuList>
            </Menu>
            <Divider my="0.5rem" />
            <Text>Order:</Text>
            {/* <Stack direction="row" gap="1rem" my="0.5rem">  */}
              <Button hidden={searchValue != "old"} as={"a"} href={`/feed/photography`} width="100%" background="black" color="white" _hover={{background: "secondary"}} my="0.5rem" borderRadius="0 0.5rem">New-Old</Button>
              <Button hidden={searchType === "order" && searchValue === "old"} as={"a"} href={`/feed/photography?search=order&value=old`} width="100%" background="black" color="white" _hover={{background: "secondary"}} my="0.5rem" borderRadius="0 0.5rem">Old-New</Button>
              {/* <Button as={"a"} href={`/feed/photography?search=order&value=random`} width="100%" background="black" color="white" _hover={{background: "secondary"}} isDisabled>Random</Button>  */}
            {/* </Stack>  */}
            <Divider my="0.5rem" />
            <Text>View:</Text>
            <Button hidden={searchValue != "pinned"} as={"a"} href={`/feed/photography`} width="100%" background="black" color="white" _hover={{background: "secondary"}} my="0.5rem" borderRadius="0 0.5rem">All Photos</Button>
            <Button hidden={searchType === "view" && searchValue === "pinned"} as={"a"} href={`/feed/photography?search=view&value=pinned`} width="100%" background="black" color="white" _hover={{background: "secondary"}} my="0.5rem" borderRadius="0 0.5rem">Pinned Photos</Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer> 
      <Box>
        <Flex 
          as={Masonry}
          breakpointCols={breakpointColumnsObj}
          // p="4.5rem 1rem 1rem"
          p="1rem 1rem 1rem"
          gap="0.5rem"
        >
          {loadedPhotos?.map((image: any, index: number) => (<>
            {/* <Text key={index} background="primary" p="2rem" my="1rem">(<DisplayDate source={image.fileID.takenOn} format="MM/DD/YY" />) {image.id}</Text> */}
            <ViewPhotoFeed imageData={image} key={index} isLoading={isLoading} />
          </>))}
        </Flex>
      </Box>
      <Stack  ref={ref} alignItems="center" p="2rem" color="white">
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
