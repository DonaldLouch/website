'use client'

import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import Pagination from "@/app/(Config)/(Layout)/(Pagination)"
import supabase from "@/lib/supabase"
import { Box, Button, Input, InputGroup, InputLeftElement, Stack, Text, useToast } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import {MediaCard} from "./MediaCard"

export default function MediaManager({mediaData, pagination}: any) {
  const router = useRouter()
  const toast = useToast()
  const toastID = "toastID"

  const [isUploaded, setUploaded] = useState(false)
  const [isUploading, setUploading] = useState(false)
  // const [mediaData, setMediaData] = useState<any>([])
  // const [pagination, setPagination] = useState<any>([])
  // const [isError, setError] = useState(false)

  const breadCrumbs = [
    {"pageLink": "/portal/media", "pageName": "Media Manager"},
  ]

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

      console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!)

      const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`, {
        method: 'POST',
        body: formData
      }).then(response => response.json())

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
      const response = await fetch('/api/media/newMedia', {
        method: 'POST',
        body: JSON.stringify(submitMediaData),
      })
      response.ok ? !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: "Media Uploaded 🎉",
            description: `You have successfully uploaded ${submitMediaData.mediaTitle}!`,
            status: "success",
            duration: 9000,
            isClosable: true,
        })
    : !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: "An Error Occurred",
            description: `${response.statusText}: when uploading ${submitMediaData.mediaTitle}.`,
            status: "error",
            duration: 9000,
            isClosable: true,
        })
    }

    setUploaded(true)
    setUploading(false)

    router.push('/portal/media')
  }
  // let pageParams = useSearchParams()
  // let pageRaw = pageParams.get("pg") as string
  // let page = parseInt(pageRaw) as number
  // let currentPage = (((page) - 1) as number) || 0
  // useEffect(() => {
  //   const fetchSupabaseData = async () => {
  //     const postLimit = 15 as number
  //     const {count: postLength} = await supabase.from('Media').select("*", { count: 'exact'}) as any
  //     let numberOfPages = (postLength / postLimit) as number;

  //     if (!Number.isInteger(numberOfPages)) {
  //       numberOfPages = Math.floor(numberOfPages) + 1;
  //     }

  //     if (numberOfPages < page) {
  //       currentPage = numberOfPages;
  //     }
  //     const pageCalc = currentPage * postLimit
  //     const { data: theMediaData } = await supabase.from('Media').select().order('uploadedOn', { ascending: false }).range(pageCalc, (pageCalc + postLimit - 1))

  //     const paginationArray = new Array();
  //     paginationArray.push(numberOfPages, currentPage);

  //     setMediaData(theMediaData)
  //     setPagination(paginationArray)
  //   }
  //   fetchSupabaseData()
  // }, [page])
  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box as="main" id="homeWrapper" color="white">
        <Box m="1rem">
          <SectionCard styleType="primaryCard" id="mediaUpload"> 
          <SectionTitle headingTitle="Upload New Media" />
          <Text textAlign="center">Please note that once you have selected your media or media's you MUST click on the "<strong>Confirm Media Upload</strong>" Button to upload your media.</Text> 
          <Stack as="form" method="post" onChange={handleOnChange} onSubmit={handleOnSubmit} boxShadow="bsBoldPrimary" p="2rem" direction="row" alignItems="center" borderRadius="0 2rem" my="1rem"> 
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

        <Box px="2rem" color="white" m="0 0 2rem">
          <SectionTitle headingTitle="Uploaded Media" />
          {mediaData?.map((media: any) => ( <Box key={media.mediaID}><MediaCard {...media} /></Box> ))} 
        </Box>
        <Pagination {...pagination} />
      </Box> 
    </>
  )
}
