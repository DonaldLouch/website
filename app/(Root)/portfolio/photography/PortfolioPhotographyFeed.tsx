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

// import { BsCamera, BsPersonBadge } from "react-icons/bs";

import { useInView } from 'react-intersection-observer'
import ViewPhotoFeed from "@/app/(Components)/ViewPhotoFeed";

import { ActionIcon, Paper, Group, Loader, Title, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import HugeIcon from "@/app/(Components)/HugeIcon";


async function fetchPhotos(nextPage: number, photoLimit: number, photosCount: number) {
  const from = nextPage * photoLimit
  const to = Math.min(from + photoLimit - 1, photosCount)

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
  const [isLastPage, setIsLastPage] = useState(photoLimit >= photosCount ? true : false)

  const [ref, inView] = useInView()

  async function loadMorePhotos() {
    if (!isLastPage) {
      const nextPage = page + 1
      const newPhotos = await fetchPhotos(nextPage, photoLimit, photosCount) as any
      setIsLastPage(nextPage === Math.ceil(photosCount / photoLimit) - 1)
      setPage(nextPage)
      setLoadedPhotos((prevPhotos: any) => {
          const combinedPhotos = [...(prevPhotos?.length ? prevPhotos : []), ...newPhotos]
          return Array.from(new Set(combinedPhotos.map((photo: any) => photo.id)))
              .map((id: any) => combinedPhotos.find((photo: any) => photo.id === id))
      })
    }
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
      <Alert icon={<HugeIcon name="camera-01" />} color="indigo">
          Please note that moving forward, all photos will have completed captions, tags, and accurate metadata for improved organization and searchability.
      </Alert>

      <Tooltip label={`About ${about.firstName} ${about.lastName}`}>
        <ActionIcon variant="filled" aria-label={`About ${about.firstName} ${about.lastName}`} color="black"
          pos="fixed"
          bottom={{ base: "1.4%", md: "2%" }}
          right={{ base: "4%", md: "1.5%" }}
          onClick={open}
        >
          <HugeIcon name="contact" size="2rem" />
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
            
            <Stack mt={{base: "1rem", lg: "0"}} gap="0">
              <Title
                order={1}
                fz="4rem"
                fw="800"
                styles={{root: {
                  textDecoration: "underline",
                  textDecorationThickness: "0.4rem",
                  textDecorationColor: "primary"
                } }}
              >
                {about.firstName} {about.middleName} {about.lastName}
              </Title>
              <Text fz="1.5rem" fw="300" m="0">
                {about.pronouns}
              </Text>
            </Stack>
          </Flex>
          <Box style={{boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)"}} p="0.5rem 1.5rem" my="1rem">
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