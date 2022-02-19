import React, { useState } from 'react'
import { Box, Button, Stack, Link, useToast, Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from '@chakra-ui/react'

import PortalLayout from '../../components/Portal/PortalLayout'
import { Metadata } from '../../components/Metadata'
import { SectionCard } from '../../components/Cards/SectionCard'
import { SectionTitle } from '../../components/SectionTitle'
import { MediaCard } from '../../components/Cards/MediaCard'

import prisma from '../../config/prisma'

import { useRouter } from 'next/router'

// import { v2 as cloudinary } from 'cloudinary'

export default function MediaManager({mediaData, pagination}: any) {
  const router = useRouter()

  const toast = useToast()

  const [uploaded, setUploaded] = useState(false)
  const [uploading, setUploading] = useState(false)

  const blackWhite = useColorModeValue('black', 'white')

  const paginationArray = pagination
  const currentPage = paginationArray?.[1] + 1
  
  const previousPages = new Array as any
  const nextPages = new Array as any

  for (let index = currentPage + 1; index < paginationArray?.[0] + 1; index++) {
    nextPages.push(index)
  }

  for (let indexPrev = currentPage - 1; indexPrev >= 1; indexPrev--) {
    previousPages.push(indexPrev)
  }

  console.log(previousPages)

  const pages = new Array as any
 
  if (currentPage <= 4) {
    pages.push(1,2,3,4,5,"...Nex", paginationArray?.[0])
  } else if (paginationArray?.[0] - 3 <=  currentPage) {
    pages.push(1, "...Prev",paginationArray?.[0] - 4,paginationArray?.[0] - 3,paginationArray?.[0] - 2,paginationArray?.[0] - 1, paginationArray?.[0])
  } else {
    pages.push(1, "...Prev",currentPage - 1, currentPage,currentPage + 1, "...Nex", paginationArray?.[0])
  }

  function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    // reader.onload = function(onLoadEvent: any) {
    reader.onload = function() {
      // setImageSrc(onLoadEvent.target.result);
      setUploaded(false);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  
  async function handleOnSubmit(e: any) {
    setUploading(true)

    e.preventDefault()

    const findFileName = ({ name }: any) => name === 'file[]'

    const form = e.currentTarget
    const fileInput = Array.from(form.elements).find(findFileName) as any
    
    const formData = new FormData()

    for ( const file of fileInput.files ) {
      formData.append('file', file)
    // }
    formData.append('upload_preset', 'donaldlouch')

    const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    }).then(r => r.json())

    console.log(data)

    const submitMediaData = {
      mediaPublicID: data.public_id,
      mediaSignature: data.signature,
      mediaKind: data.resource_type,
      mediaTitle: data.original_filename,
      mediaExtension: data.format,
      mediaPath: data.secure_url,
      mediaSize: data.bytes,
      mediaDimensions: `${data.width}px x ${data.height}px`,
    }

    if (submitMediaData) {
      await addMedia(submitMediaData)
    }
  }

    // console.log(submitMediaData)

    // setImageSrc(data.secure_url)
    setUploaded(true)
    setUploading(false)

    // if (uploaded === true) {
      router.replace('/portal/media')
    // }
  }

  async function addMedia(submitMediaData: any) {
    const response = await fetch('/api/media/addMedia', {
      method: 'POST',
      body: JSON.stringify(submitMediaData)
    })
  
    if (response.ok) {
      toast({
        title: "Media Uploaded 🎉",
        description: `You have successfully uploaded ${submitMediaData.mediaTitle}!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }

    if (!response.ok) {
      // throw new Error(response.statusText);

      toast({
        title: "An Error Occurred",
        description: `${response.statusText}: when uploading ${submitMediaData.mediaTitle}!`,
        status: "success",
        duration: 90000,
        isClosable: true,
      })
    }
      return await response.json()
  }

  return (
    <>  
      <PortalLayout pageTitle="Media Manger">
        <Metadata
              title={`${process.env.WEBSITE_NAME} Media Manger`}
              keywords={`${process.env.KEYWORDS}, portal, media, manager, admin`}
              description={`Manage the media for Donald Louch.`}
            />
            <Box as="main" id="homeWrapper" color="white">
              <SectionCard styleType="primaryCard" id="mediaUpload">
                <SectionTitle headingTitle="Upload New Media" />
                <Stack as="form" method="post" onChange={handleOnChange} onSubmit={handleOnSubmit} mt={3}>

                  <input type="file" name="file[]" id="file" multiple />
                  
                  {uploaded != true && (
                      <Button variant="blackFormButton" type="submit" isLoading={uploading === true}>Confirm File(s) Upload</Button>
                  )}
                </Stack>
              </SectionCard>
              <Box px="2rem" color="black" m="0">
                <SectionTitle headingTitle="Uploaded Media" />
                  {mediaData?.map((media: any) => (
                    <>
                      <MediaCard 
                        key={media.mediaID}
                        mediaID={media.mediaID}
                        path={media.mediaPath}
                        title={media.mediaTitle}
                        kind={media.mediaKind}
                        extension={media.mediaExtension}
                        uploadedOn={media.uploadedOn}
                        mediaPublicID={media.mediaPublicID}
                      />
                    </>
                  ))}
              </Box>
              <Stack direction="row" justify="space-between" align="center" m="1rem" p="2rem" boxShadow="bsBoldBlue" borderRadius="0 2rem" color={blackWhite}>
              <Link href={`?pg=${currentPage - 1}`} variant="primary" color="black" _hover={{color: "primary"}}>Previous Page</Link>
              {pages.map((page: any) => (
                page === "...Prev" && (
                  <>
                    <Menu key={page.index} placement="top">
                      <MenuButton>...</MenuButton>
                      <MenuList>
                        {previousPages?.map((number: any) => (
                          <Link href={`?pg=${number}`} key={number}>
                            <MenuItem>{number}</MenuItem>
                          </Link>
                        ))}
                      </MenuList>
                    </Menu>
                  </>
                ) || page === "...Nex" && (
                  <>
                    <Menu key={page.index} placement="top">
                      <MenuButton>...</MenuButton>
                      <MenuList>
                        {nextPages?.map((number: any) => (
                          <Link href={`?pg=${number}`} key={number}>
                            <MenuItem>{number}</MenuItem>
                          </Link>
                        ))}
                      </MenuList>
                    </Menu>
                  </>
                ) || (
                page === currentPage ? (
                    <Link color="primary" fontWeight="900" _hover={{color: "primary"}} key={page?.index}>{page}</Link>
                ) : (
                  <Link href={`?pg=${page}`} variant="primary" color="black" _hover={{color: "primary"}} key={page?.index}>{page}</Link>
                )
                )
              ))}
              <Link href={`?pg=${currentPage + 1}`} variant="primary" color="black" _hover={{color: "primary"}}>Next Page</Link>
            </Stack>
            </Box>
      </PortalLayout>
    </>  
  )
}

export async function getServerSideProps(router: any) {
  const page = router.query.pg as number
  let currentPage = page - 1 as number || 0

  const postLimit = 10 as number
  
  // console.log(currentPage)
  const mediaLength = await prisma.media.count() as number
  let numberOfPages = mediaLength / postLimit as number


  if (!Number.isInteger(numberOfPages)) {
    numberOfPages = Math.floor(numberOfPages) + 1
  }

  if (numberOfPages < page) {
    currentPage = numberOfPages
  }
  // if (currentPage > numberOfPages) {
  //   // currentPage = 0
  // }

  const pagination = new Array
  pagination.push(numberOfPages, currentPage)

  const mediaData = await prisma.media.findMany({
    orderBy: [{
      uploadedOn: 'desc'
    }],
    skip: currentPage * postLimit,
    take: postLimit,
  }) as any
  
  return {
    props: {
      mediaData: JSON.parse(JSON.stringify(mediaData)),
      pagination
    },
  }
}