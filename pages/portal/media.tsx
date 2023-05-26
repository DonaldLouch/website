import React, { useState } from 'react'
import { Box, Button, Stack, useColorModeValue, useToast, Text, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

import PortalLayout from '../../components/Portal/PortalLayout'
import { Metadata } from '../../components/Metadata'
import { SectionCard } from '../../components/Cards/SectionCard'
import { SectionTitle } from '../../components/SectionTitle'
import { MediaCard } from '../../components/Cards/MediaCard'

import Pagination from '../../components/Pagination'

import prisma from '../../lib/prisma'

import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MediaManager({mediaData, pagination}: any) {
  const router = useRouter()

  const toast = useToast()

  // const [uploaded, setUploaded] = useState(false)
  // const [uploading, setUploading] = useState(false)
  const [isUploaded, setUploaded] = useState(false)
  const [isUploading, setUploading] = useState(false)
  // const [isError, setError] = useState(false)


  const boxShadow1 = useColorModeValue("bsBoldBlue", "bsBoldWhite");
  // const boxShadow2 = useColorModeValue("bsBoldRed", "bsBoldWhite");

  function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function() {
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

    setUploaded(true)
    setUploading(false)

    router.replace('/portal/media')
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
              <Box m="1rem">
                <SectionCard styleType="primaryCard" id="mediaUpload"> 
                  <SectionTitle headingTitle="Upload New Media" />
                  <Text textAlign="center">Please note that once you have selected your media or media's you MUST click on the "<strong>Confirm Media Upload</strong>" Button to upload your media.</Text> 
                  <Stack as="form" method="post" onChange={handleOnChange} onSubmit={handleOnSubmit} boxShadow={boxShadow1} p="2rem" direction="row" alignItems="center" borderRadius="0 2rem" my="1rem"> 
                    <InputGroup border="none" appearance="none" outline="none">
                      <InputLeftElement pointerEvents='none'>
                        <FontAwesomeIcon icon={["fal", "cloud-arrow-up"]} width="100%" color='currentColor' />
                      </InputLeftElement>
                      <Input 
                        type='file' 
                        name="file[]" 
                        id="file"
                        multiple 
                        sx={{
                            "::file-selector-button": {
                              display: "none",
                            }
                          }}
                          p="0.4rem 3rem"
                          border="none"
                        />
                    </InputGroup>
                    {isUploaded != true && (
                        <Button variant="blackFormButton" type="submit" isLoading={isUploading === true} p="1.8rem 4rem" m="0">Confirm Media Upload</Button>
                    )}
                  </Stack>
                </SectionCard>
              </Box>

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
              <Pagination {...pagination} />
            </Box>
      </PortalLayout>
    </>  
  )
}

export async function getServerSideProps(router: any) {
  const page = router.query.pg as number
  let currentPage = page - 1 as number || 0

  const postLimit = 15 as number
  
  const mediaLength = await prisma.media.count() as number
  let numberOfPages = mediaLength / postLimit as number


  if (!Number.isInteger(numberOfPages)) {
    numberOfPages = Math.floor(numberOfPages) + 1
  }

  if (numberOfPages < page) {
    currentPage = numberOfPages
  }

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