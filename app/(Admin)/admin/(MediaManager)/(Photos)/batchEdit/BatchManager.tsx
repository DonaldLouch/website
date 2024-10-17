'use client'

import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import Pagination from "@/app/(Config)/(Layout)/(Pagination)"
import { Box, Button, Grid, Input, Stack, Text } from "@mantine/core"

import { useRouter } from "next/navigation"
import { useState } from "react"
import {MediaCard} from "../../(Components)/MediaCard"
// import { Field, FieldArray, Formik } from "formik"

// import * as Yup from 'yup'
// import FormInput from "@/app/(Components)/(Form)/FormInput"
// import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"
// import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow"
// import { FormSelect } from "@/app/(Components)/(Form)/FormSelect"
// import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch"
// import { FormCheckGroup } from "@/app/(Components)/(Form)/FormCheckGroup"
// import { CheckboxContainer, CheckboxControl, SubmitButton } from "formik-chakra-ui"

import Image from "next/image"
import moment from "moment"
// import cuid from "cuid"
import supabase from "@/lib/supabase"

export default function BatchManager({mediaData}: any) {

  // locations, photographyAlbum
  const router = useRouter()

  const breadCrumbs = [
    {"pageLink": "/admin/photography", "pageName": "Photography Manager"},
    {"pageLink": "/admin/batchManager", "pageName": "Batch: Photography Manager"},
  ]
  
  const onSubmit =  async (values: any, actions: any) => {
    let photoIDs = new Array()
      if (values.checkALLPhotos) {
        mediaData.forEach((media: any) => {
          photoIDs.push(media.id)
        })
      } else {
        photoIDs = values.photoIDs
      }
    
    const albumID = values.albumSelect && values.albumSelect != "newAlbum" ? values.albumSelect 
      : values.albumSelect && values.albumSelect === "newAlbum" 
      ? "album"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
      : !values.albumSelect && null

    if (values.albumSelect === "newAlbum") { //Add new album
      // const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyAlbum").insert({
      //   id: albumID,
      //   albumName: values.newAlbumName,
      //   slug: values.newAlbumSlug,
      //   createdOn: moment(),
      //   lastUpdatedOn: moment(),
      // })
      // // console.log("Add New Album: ", supabaseStatus, supabaseError)
    } 
    if (values.albumSelect != "newAlbum") { //Update album
      // const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyAlbum").update({ 
      //   lastUpdatedOn: moment()
      // }).eq('id', values.albumSelect)
      // // console.log("Edit Album: ", supabaseStatus, supabaseError)
    }

    photoIDs.forEach(async (photoID: any) => {
      const photoData = mediaData.find(({ id }: any) => id ===  photoID)
      const tagArray =  values.tags && values?.tags.split(",")

      const fileID = photoData.fileID.fileID

      // if (values.capturedOn || values.uploadedOn) {
      //   const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyMedia").update({ 
      //     capturedOn: moment(values.capturedOn),
      //     uploadedOn: moment(values.uploadedOn)
      //   }).eq('fileID', fileID)
      //   // // console.log("Update Datetime Info: ", supabaseStatus, supabaseError)
      // }

      // const { status: supabaseStatus , error: supabaseError } = await supabase.from("Photography").update({ 
      //   id: photoID,
      //   caption: values.caption ? values.caption : photoData.caption,
      //   tags: tagArray ? tagArray : photoData.tags,
      //   album: albumID,
      //   location: values.locationSelect === "noLocation" ? null : values.locationSelect === "newLocation" ? values.location : values.locationSelect,
      //   capturedOn: moment(values.capturedOn),
      //   uploadedOn: moment(values.uploadedOn),
      //   isPublic: true,
      //   isSetup: true
      // }).eq('id', photoID)
      // supabaseStatus && !toast.isActive(toastID) &&
      //   toast({
      //     id: toastID,
      //     title: `${supabaseStatus === 204 ? "Photos Edited 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
      //     description: `${supabaseStatus === 204 ? `You have successfully edited the selected photos!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
      //     status: `${supabaseStatus === 204 ? "success" : "error"}`,
      //     duration: 9000,
      //     isClosable: true,
      //   })
      // // console.log(`Photography (${photoID}) Update: `, supabaseStatus, supabaseError)
    })
    router.refresh()
    actions.setSubmitting(false)
  }

  // const initialValues = {
  //   hidePhoto: true,
  //   checkALLPhotos: true,
  //   tags: null,
  //   caption: null,
  //   album: true
  // }
  // const validationSchema = Yup.object({})

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      {/* <Box as="main" color="white">
        <Box px="2rem" color="white" m="2rem 0">
          <Box my="2rem"></Box>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit, values }: any) => (
              <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
                <FormTextArea inputID="caption" inputLabel="Caption" textRows={4} />
                <FormInput inputID="tags" inputLabel="Tags" inputType="text" inputDescription={`Please separate each tag with a comma (",")`} />
                <FormSwitch 
                  inputID="album" 
                  helperText="Toggle on if this photo is apart of an album" 
                />
                {values.album === true && (
                  <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1rem 0.5rem 1.5rem">
                    <SectionTitle headingTitle="Album" />
                    {values.albumSelect === "newAlbum" ? (
                      <Stack direction="row" gap="2rem"  boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="1.5rem 0.5rem">
                        <FormInputRow inputID="newAlbumName" inputLabel="Album Name" inputType="text" />
                        <FormInputRow inputID="newAlbumSlug" inputLabel="Album Slug" inputType="text" />
                      </Stack>
                    ) : values.albumSelect ? (<Text my="1.5rem" textAlign="center" hidden={values.albumSelect === "newAlbum"}>You have selected the photo album: ({values.albumSelect}) "{photographyAlbum.find(({ id }: any) => id === values.albumSelect).albumName}"</Text>) : (<Text my="1.5rem" textAlign="center">Please Select an Album or Create a New Album!</Text>)}
                    <FormSelect selectLabel="Select an Album" selectID="albumSelect" selectPlaceholder="No Album Selected">
                      <option value="newAlbum">Create New Album</option>
                      <option disabled>---</option>
                      {photographyAlbum.length === 0 && <option>No Data Found</option>}
                      {photographyAlbum.length != 0 && photographyAlbum.map((album: any) => (
                      <option key={album.id} value={album.id} selected={album === values}>{album.albumName}</option>
                    ))}
                    </FormSelect>
                  </Stack>
                )}
                <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="1.5rem 0.5rem 0">
                <SectionTitle headingTitle="Location" />
                <Text fontSize="md" opacity="0.7" textAlign="center">If you would like you can add a general location chip to the photo; you can add that here. You can rather chose from a excising photos location or Create a New Location!</Text>
                {values.locationSelect === "newLocation" ? (
                <Stack direction="row" gap="2rem"  boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="1.5rem 0.5rem">
                <FormInputRow inputID="location" inputLabel="Location" inputType="text" />
                </Stack>
                ) : values.locationSelect ? (<Text my="1.5rem" textAlign="center" hidden={values.locationSelect === "newLocation"}>You have selected the location: "{values.locationSelect}"</Text>) : (<Text my="1.5rem" textAlign="center">Optional: Please select a location from an excising photo or Create a New Location!</Text>)}
                <FormSelect selectLabel="Select a Location" selectID="locationSelect" selectPlaceholder="">
                <option value="noLocation">No Location Specified!</option>
                <option value="newLocation">Create a New Location</option>
                <option disabled>---</option>
                {locations.length === 0 && <option>No Data Found</option>}
                {locations.length != 0 && locations.map((location: any, index: number) => (
                <option key={index} value={location} selected={location === values} hidden={location === null}>{location}</option>
                ))}
                </FormSelect>
                </Stack>
                <Stack direction="row" gap="2rem"  boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="1.5rem 0.5rem">
                  <FormInputRow inputID="capturedOn" inputLabel="Taken On" inputType="datetime-local" />
                  <FormInputRow inputID="uploadedOn" inputLabel="Uploaded On" inputType="datetime-local" />
                </Stack>
                <FormSwitch 
                  inputID="hidePhoto" 
                  helperText="Hide Photo Selection" 
                />
                <FormSwitch 
                  inputID="checkALLPhotos" 
                  helperText="Check All Photos" 
                />

                {values.hidePhoto === false && (
                  <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1.5rem 0.5rem 1.5rem">
                    {mediaData.map((photo: any) => (
                      <CheckboxControl name={"photoIDs"} value={photo.id} key={photo.id} colorScheme="purple">
                        <Grid gridTemplateColumns="10% 90%" gap="1rem" alignItems="center" boxShadow="bsBoldSecondary" p="0.5rem 1.5rem" borderRadius="0 2rem" m="0.5rem 0.5rem">
                          <Image src={photo.fileID.filePath} alt={photo.photoName} width="1000" height="2000"/>
                          {photo.photoName}
                        </Grid>
                      </CheckboxControl>
                    ))}
                  </Stack>
                )}
                <SubmitButton variant="blackFormButton" my="1rem !important" leftIcon={<i className="fa-kit fa-light-image-pen"></i>}>Edit Photos</SubmitButton> 
              </Stack>
            )}
          </Formik>
        </Box>
      </Box>  */}
    </>
  )
}
