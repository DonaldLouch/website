'use client'

import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import Pagination from "@/app/(Config)/(Layout)/(Pagination)"
import { Box, Button, Input, InputGroup, InputLeftElement, Stack, Text, useToast } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {MediaCard} from "../../(Components)/MediaCard"
import Link from "next/link"
import FileUploader from "../../(Components)/FileUploader"

export default function PhotographyManager({mediaData, pagination, photographyAlbum}: any) {
  // const router = useRouter()
  // const toast = useToast()

  // const [isUploading, setUploading] = useState(false)
  // const [isUploaded, setUploaded] = useState(false)
  // console.log(mediaData)

  const breadCrumbs = [
    {"pageLink": "/portal/photography", "pageName": "Photography Manager"},
  ]

    // function handleOnChange(changeEvent: any) {
    //   const reader = new FileReader();

    //   reader.onload = function() {
    //     setUploaded(false);
    //   }

    //   reader.readAsDataURL(changeEvent.target.files[0]);
    // }
    // async function handleOnSubmit(e: any) {
    //   setUploading(true)

    //   e.preventDefault()

    //   const findFileName = ({ name }: any) => name === 'file[]'
    //   const form = e.currentTarget
    //   const fileInput = Array.from(form.elements).find(findFileName) as any

    //   const uploadDestination = "photography"
    //    for ( const file of fileInput.files ) {
    //       const body = new FormData()
    //       body.append("file", file, file.name)
    //       body.append('uploadDestination', uploadDestination)
    //       const upload = await fetch('/api/media/upload', { method: "POST", body }).then(response => response.json())
    //       upload.supabaseStatus &&
    //         toast({
    //             title: `${upload.supabaseStatus === 201 ? "Media Uploaded 🎉" : `Error #${upload.supabaseError?.code} has Occurred`}`,
    //             description: `${upload.supabaseStatus === 201 ? `You have successfully uploaded ${upload.fileName} at ${upload.filePath}!` : `An error has occurred: ${upload.supabaseError?.message}. ${upload.supabaseError?.hint && `${upload.supabaseError?.hint}.`}`}`,
    //             status: `${upload.supabaseStatus === 201 ? "success" : "error"}`,
    //             duration: 9000,
    //             isClosable: true,
    //         })
    //     }
    //     router.refresh()
    //     setUploading(false)
    //     setUploaded(true)
    // }
  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Link href="/portal/batchEdit">Batch Edit</Link>
      <Box as="main" color="white">
        {/* <Box m="2rem 0 0rem">
          <SectionCard styleType="primaryCard" id="mediaUpload"> 
            <SectionTitle headingTitle="Upload New Media" />
            <Text textAlign="center">Please note that once you have selected your media or media's you MUST click on the "<strong>Confirm Media Upload</strong>" Button to upload your media.</Text> 
            <Stack as="form" method="post" onChange={handleOnChange} onSubmit={handleOnSubmit} boxShadow="bsBoldPrimary" p="2rem" direction="row" alignItems="center" borderRadius="0 2rem" m="1.5rem 0 0.5rem"> 
              <InputGroup border="none" appearance="none" outline="none">
                <InputLeftElement pointerEvents='none' fontSize="2xl">
                  <FontAwesomeIcon icon={["fas", "cloud-arrow-up"]} height="100%" width="100%" color='currentColor' />
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
                ></Input>
              </InputGroup>
              <Button variant="blackFormButton" type="submit" isLoading={isUploading === true} p="1.6rem 2rem" m="0">{isUploaded ? "Previous Files Uploaded! Reload to See or Select New FIles" : "Confirm Media Upload"}</Button>
            </Stack> 
          </SectionCard>
        </Box> */}

        <FileUploader mediaType={"photography"} />

        <Box px="2rem" color="white" m="2rem 0">
          <SectionTitle headingTitle="Uploaded Media" />
          <Box my="2rem"></Box>
          {mediaData?.map((media: any) => ( <Box key={media.fileID.fileID}><MediaCard media={media} photographyAlbum={photographyAlbum}/></Box> ))} 
        </Box>
        <Pagination {...pagination} />
      </Box> 
    </>
  )
}
