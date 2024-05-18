'use client'

import supabase from "@/lib/supabase"
import { useState, useEffect } from "react"

import {
  Box,
  Text,
  Alert,
  Flex,
  Drawer,
  Tooltip,
  Stack,
  AspectRatio,
  Image
} from "@mantine/core";

import Masonry from 'react-masonry-css'
import React from "react";

import { BsCamera, BsPersonBadge } from "react-icons/bs";

import { useInView } from 'react-intersection-observer'
import ViewPhotoFeed from "@/app/(Components)/ViewPhotoFeed";

import { ActionIcon, Paper, Group, Loader, Title, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Camera01Icon, ContactIcon, PassportIcon } from "@hugeicons/react";


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

export default function PortfolioPhotographyFeed({ photos, about, photosCount }: {photos: any, about: any, photosCount: any})  {
  const [opened, { open, close }] = useDisclosure(false);
  
  const photoLimit = 20 as number
  const [loadedPhotos, setLoadedPhotos] = useState(photos)
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)

  const [ref, inView] = useInView()

  async function loadMorePhotos() {
      const nextPage = page + 1
      const newPhotos = await fetchPhotos(nextPage, photoLimit) as any
      setIsLastPage(nextPage <= Math.ceil(photosCount / photoLimit) - 1 ? false : true)

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

  return (<>      
   {/* m="4.5rem auto 0" w="95vw" */}
   {/* m={{base: "-4.5rem -1rem -1rem", lg: "-5.8rem -5rem -2rem"}} pt={{base: "0.5rem", lg: "1.5rem"}} */}
    <Box id="feed" pos="relative" w="100%">
      <Alert icon={<Camera01Icon />} color="indigo">
          Please note that this Photography Feed is in a alpha state right now, and things will change and may not work properly. Please further note, that in future iterations I will be modifying and completing all captions, tags and proper meta data for all the photos.
      </Alert>

      <Tooltip label={`About ${about.firstName} ${about.lastName}`}>
        <ActionIcon variant="filled" aria-label={`About ${about.firstName} ${about.lastName}`} color="black"
          pos="fixed"
          bottom={{ base: "1.4%", md: "2%" }}
          right={{ base: "4%", md: "1.5%" }}
          onClick={open}
        >
          <ContactIcon size="2rem" />
        </ActionIcon>
      </Tooltip>
      <Drawer size="full" opened={opened} onClose={close} title={`About ${about.firstName} ${about.lastName}`} 
        overlayProps={{
          backgroundOpacity: 0.5, 
          blur: 4,
        }}
        offset="2rem"
        radius="0 0 0 2rem"
        position="top"
        styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
      >
        <Box id="bio" my="1rem">
          <Flex
              direction={{base: "column", lg: "row"}}
              gap="1rem"
              justify="flex-start"
              align="center"
          >
            <AspectRatio 
              ratio={1/1}
              w={{base: "50%", sm: "25%"}}
              >
              <Image
                src={about.avatar}
                alt={`${about.firstName} ${about.lastName}`}
                radius="md"
                style={{ objectPosition: "top", boxShadow: "var(--mantine-shadow-bsSMPrimary)"}}
              />
            </AspectRatio>
            
            <Stack mt={{base: "1rem", lg: "0"}}>
              <Title
                order={1}
                fz="3rem"
                styles={{root: {
                  textDecoration: "underline",
                  textDecorationThickness: "0.4rem",
                  textDecorationColor: "primary"
                } }}
              >
                {about.firstName} {about.middleName} {about.lastName}
              </Title>
              <Text fz="2rem" m="0.5rem 0">
                {about.pronouns}
              </Text>
            </Stack>
          </Flex>
          <Box style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}} p="1rem" my="1rem">
            <Text>{about.bio}</Text>
          </Box>
        </Box>
      </Drawer>
     
      <Flex 
        component={Masonry}
        breakpointCols={breakpointColumnsObj}
        // p="4.5rem 1rem 1rem"
        // m="4.5rem auto 0" w="95vw" 
        m={{base: "0rem -1rem 2rem", sm: "0 -5rem 2rem"}} 
        p={{base: "0.5rem", sm: "0 0.5rem"}}
        // p="1rem 1rem 1rem"
        gap="0.5rem"
      >
        {loadedPhotos?.map((image: any, index: number) => (<ViewPhotoFeed imageData={image} key={index} />))}
      </Flex>

      <Paper ref={ref} p="2rem" color="white" style={{display: isLastPage ? "none" : "block"}} bg="none" shadow="bsBoldSecondary" radius="lg">
        <Stack align="center">
          <Group gap="2rem" align="center">
            <Loader color="white" size="md" type="bars" />
            <Title fz={{base: "2rem", md: "3rem"}}>Loading More Photos</Title>
          </Group>
          <Text>If the content is still not loaded after a minute please contact Donald Louch at <Anchor href="mailto:hello@donaldlouch.ca">hello@donaldlouch.ca</Anchor> for further assistance.</Text>
        </Stack>
      </Paper>
    </Box> 
  </>)
}