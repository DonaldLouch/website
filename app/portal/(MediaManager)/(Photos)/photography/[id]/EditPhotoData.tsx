'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box, Button, Code, Heading, Stack, useDisclosure, useToast , Text, Grid} from "@chakra-ui/react"

import { Field, FieldArray, Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import * as Yup from 'yup'

import { FormInput } from "@/app/(Components)/(Form)/FormInput";
import { FormTextArea } from "@/app/(Components)/(Form)/FormTextArea";
import { FormTextAreaRow } from "@/app/(Components)/(Form)/FormTextAreaRow";
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import { FormCheckGroup } from "@/app/(Components)/(Form)/FormCheckGroup";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import DisplayDate from "@/lib/DisplayDate";
import { useState } from "react";
import ViewPhoto from "../../../(Components)/ViewPhoto";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import { FormInputCard } from "@/app/(Components)/(Form)/FormInputCard";
import cuid from "cuid";
import moment from "moment";
import Link from "next/link";

export default function EditPhotoData({photoData, photographyAlbum, locations}: any) {
    const {fileID, fileTitle, filePath, takenOn, uploadedOn, fileKey, fileVersionID } = photoData.fileID
    const { photoName, caption, tags, links, album, location, id: photoID, isPublic, isPortfolio, isPinned } = photoData as any

    // console.log(photographyAlbum)

    const toast = useToast()
    const toastID = "toastID"
    const router = useRouter()
    // const { fileID, fileTitle, filePath } = media
    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const [linkIndex, setLinkIndex] = useState(links ? links.length : 1)
    // console.log(photoData.photoMetadata)

    const breadCrumbs = [
        {"pageLink": "/portal/photography", "pageName": "Photography Manager"},
        {"pageLink": `/portal/photography/${photoID}`, "pageName": `Edit Photo: ${photoName}`},
    ]

  async function deletePhoto() {

    const id = fileID.replace("_", "/");
    const formData = new FormData()
    formData.append("fileKey", fileKey)
    formData.append("versionID", fileVersionID)
    const deleteFile = await fetch(`/api/media/delete/${fileID}`, {method: "POST", body: formData}).then(response => response.json())
    // console.log(deleteFile)

    
    
    const { error: mediaDeleteError, status: mediaDeleteStatus } = await supabase.from("PhotographyMedia").delete().eq('fileID', fileID);
    mediaDeleteStatus &&
    toast({
        // id: toastID,
        // title: `${mediaDeleteStatus === 204 ? "Media Deleted  🗑️" : `Error #${mediaDeleteError?.code} has Occurred`}`,
        description: `${mediaDeleteStatus === 204 ? `You have successfully deleted the media file ${fileTitle}!` : `An error has occurred: ${mediaDeleteError?.message}. ${mediaDeleteError?.hint && `${mediaDeleteError?.hint}.`}`}`,
        status: `${mediaDeleteStatus === 204 ? "success" : "error"}`,
        duration: 9000,
        isClosable: true,
    })
    mediaDeleteStatus === 204 && router.back()
//     const { error: deletePostError, status: deletePostStatus } = await supabase.from("BlogPost").delete().eq('id', post.id);
//         deletePostStatus && !toast.isActive(toastID) &&
//         toast({
//             id: toastID,
//             title: `${deletePostStatus === 204 ? "Post ID Deleted  🗑️" : `Error #${deletePostError?.code} has Occurred`}`,
//             description: `${deletePostStatus === 204 ? `You have successfully deleted the post "${post.title}"!` : `An error has occurred: ${deletePostError?.message}. ${deletePostError?.hint && `${deletePostError?.hint}.`}`}`,
//             status: `${deletePostStatus === 204 ? "success" : "error"}`,
//             duration: 9000,
//             isClosable: true,
//         })
//         deletePostStatus === 204 && router.push("/portal/blog?message=deletedPost")
  }

 const onSubmit =  async (values: any, actions: any) => {
    // let photoIDs = new Array()
    //   if (values.checkALLPhotos) {
    //     mediaData.forEach((media: any) => {
    //       photoIDs.push(media.id)
    //     })
    //   } else {
    //     photoIDs = values.photoIDs
    //   }
    
    const albumID = values.albumSelect && values.albumSelect != "newAlbum" ? values.albumSelect 
      : values.albumSelect && values.albumSelect === "newAlbum" 
      ? cuid()
      : !values.albumSelect && null

    if (values.albumSelect === "newAlbum") { //Add new album
      const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyAlbum").insert({
        id: albumID,
        albumName: values.newAlbumName,
        slug: values.newAlbumSlug,
        createdOn: moment().utcOffset(8),
        lastUpdatedOn: moment().utcOffset(8),
      })
    //   console.log("Add New Album: ", supabaseStatus, supabaseError)
    } 
    if (values.albumSelect != "newAlbum") { //Update album
      const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyAlbum").update({ 
        lastUpdatedOn: moment().utcOffset(8)
      }).eq('id', values.albumSelect)
    //   console.log("Edit Album: ", supabaseStatus, supabaseError)
    }
      
    const tagArray =  values.tags && values?.tags.split(",")

    // const fileID = photoData.fileID.fileID

    if (values.takenOn || values.uploadedOn) {
        const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyMedia").update({ 
            takenOn: moment(values.takenOn).utcOffset(8),
            uploadedOn: moment(values.uploadedOn).utcOffset(8)
        }).eq('fileID', fileID)
        // console.log("Update Datetime Info: ", supabaseStatus, supabaseError)
    }

    const { status: supabaseStatus , error: supabaseError } = await supabase.from("Photography").update({ 
        photoName: values.photoName,
        caption: values.caption ? values.caption : photoData.caption,
        tags: tagArray ? tagArray : photoData.tags,
        album: albumID,
        location: values.locationSelect === "noLocation" ? null : values.locationSelect === "newLocation" ? values.location : values.locationSelect,
        uploadedOn: moment(values.uploadedOn).utcOffset(8),
        isPublic: values.isPublic,
        isSetup: values.takenOn && values.uploadedOn && values.caption && values.tags ? true : false,
        isPortfolio: values.isPortfolio,
        isPinned: values.isPinned
    }).eq('id', photoID)
    supabaseStatus && !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: `${supabaseStatus === 204 ? `Photo ${photoName} Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
            description: `${supabaseStatus === 204 ? `You have successfully edited the selected photos!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
            status: `${supabaseStatus === 204 ? "success" : "error"}`,
            duration: 9000,
            isClosable: true,
        })
    // console.log(`Photography (${photoID}) Update: `, supabaseStatus, supabaseError)
        // const tagArray =  values.tags ? values.tags.split(',') : null

        // const albumID = values.albumSelect && values.albumSelect != "newAlbum" ? values.albumSelect 
        //     : values.albumSelect && values.albumSelect === "newAlbum" 
        //     ? cuid()
        //     : !values.albumSelect && null
        // if (values.albumSelect && values.albumSelect === "newAlbum") {
        //     const photoIDArray = new Array(values.photoID)
        //     await supabase.from("PhotographyAlbum").insert({
        //         id: albumID,
        //         albumName: values.newAlbumName,
        //         slug: values.newAlbumSlug,
        //         photoIDs: photoIDArray,
        //         createdOn: moment(),
        //         lastUpdatedOn: moment(),
        //     })
        // } else if (values.albumSelect && values.albumSelect != "newAlbum" && values.albumSelect != album) {
        //     const oldPhotoArray = photographyAlbum.find(({ id }: any) => id === values.albumSelect).photoIDs.toString()
        //     const newPhotoArray = oldPhotoArray.split(",")
        //     newPhotoArray.push(photoID)
        //     const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyAlbum").update({ 
        //         photoIDs: newPhotoArray,
        //         lastUpdatedOn: moment()
        //     }).eq('id', values.albumSelect)
        //     console.log(supabaseStatus, supabaseError)
        // }
        // console.log(albumID)

        // await supabase.from("PhotographyMedia").update({ 
        //    takenOn: moment(values.takenOn),
        //    uploadedOn: moment(values.uploadedOn)
        //  }).eq('fileID', values.fileID)

        // const { status: supabaseStatus , error: supabaseError } = await supabase.from("Photography").update({ 
        //    photoName: values.photoName,
        //    links: values.links ? values.linksRow : null,
        //    album: albumID,
        //    caption: values.caption,
        //    location: values.locationSelect === "noLocation" ? null : values.locationSelect === "newLocation" ? values.location : values.locationSelect,
        //    tags: tagArray,
        //    lastUpdatedOn: moment(),
        //    isPublic: values.isPublic,
        //    isSetup: values.takenOn && values.uploadedOn && values.caption && values.tags ? true : false,
        //    isPortfolio: values.isPortfolio,
        //    isPinned: values.isPinned
        //  }).eq('id', values.photoID)
        // supabaseStatus && !toast.isActive(toastID) &&
        //     toast({
        //         id: toastID,
        //         title: `${supabaseStatus === 204 ? "Photo Edited 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
        //         description: `${supabaseStatus === 204 ? `You have successfully edited ${values.photoName}!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
        //         status: `${supabaseStatus === 204 ? "success" : "error"}`,
        //         duration: 9000,
        //         isClosable: true,
        //     })
        actions.setSubmitting(false)
        router.refresh()
    }
    const initialValues = { 
        fileID: fileID, 
        photoID: photoID, 
        photoName: photoName,
        links: links ? true : false,
        album: album ? true: false,
        isPublic: isPublic ? true : false,
        isPortfolio: isPortfolio ? true : false,
        isPinned: isPinned ? true : false,
        takenOn: moment(takenOn).format("yyyy-MM-DDTkk:mm"),
        uploadedOn: moment(uploadedOn).format("yyyy-MM-DDTkk:mm"),
        caption: caption,
        locationSelect: location ? location : "noLocation",
        tags: tags ? tags.toString() : null,
        albumSelect: album ? album : null,
        linksRow: links
    }
    const validationSchema = Yup.object({
        // caption: Yup.string().required('Caption is required'),
        // tags: Yup.string().required('Tag(s) is(are) required'),
        // startDate: Yup.string().required('Start Date is required'),
        // description: Yup.string().required('Description is required'),
    })

  
    return (
        <>
            <BreadCrumb breads={breadCrumbs} />
            <Link href="/portal/bulkEdit">Bulk Edit</Link>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit, values }: any) => (
                    <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
                        <Grid gridTemplateColumns="18% 41% 41%" gap="2rem" alignItems="baseline" width="calc(100% - (2rem * 2))">
                            <ViewPhoto fileID={fileID} fileTitle={photoName} filePath={filePath} />
                            <FormInputReadOnly inputID="fileID" inputLabel="" inputType="text" />
                            <FormInputReadOnly inputID="photoID" inputLabel="" inputType="text" />
                        </Grid>
                        <FormInput inputID="photoName" inputLabel="Photo Title" inputType="text" inputDescription="If you would like the title of the photo to be a different title than what was uploaded; you can change that here." />
                        <FormTextArea inputID="caption" inputLabel="Caption" textRows={4} />
                        <FormInput inputID="tags" inputLabel="Tags" inputType="text" inputDescription={`Please separate each tag with a comma (",")`} />
                        <FormSwitch 
                            inputID="links" 
                            helperText="Toggle on if there are any link(s) associated with this photo" 
                        />
                        {values.links === true && (
                            <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1rem 0.5rem 1.5rem">
                                <SectionTitle headingTitle="Links" />

                                <Code p={3} colorScheme='yellow' mt="1rem" color="primary" textAlign="center" m="0">For proper formatting of the credit, please include the &#34;http(s)://&#34; in the inputting of the link.</Code>
                                <Stack id="theLinksSection">
                                    <FieldArray
                                        name="linksRow"
                                        render={arrayHelpers => (
                                            <>
                                                {values.linksRow && values.linksRow.length > 0 ? (
                                                    values.linksRow.map((link: any, index: number) => (
                                                        <FormInputCard key={index} id={`${link.name}_${index}`}>
                                                            <FormInputRow inputID={`linksRow.${index}.link`} inputLabel="Link URL" inputType="text"/>
                                                            <FormInputRow inputID={`linksRow.${index}.name`} inputLabel="Link Title" inputType="text" />
                                                            <Button
                                                                aria-label="Delete Link"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="red"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            ><i className="fa-kit fa-light-link-circle-xmark"></i></Button>
                                                        
                                                            <Button
                                                                aria-label="Add Link"
                                                                variant="unstyled"
                                                                _hover={{ color: "primary" }}
                                                                h="auto"
                                                                w="auto"
                                                                color="secondary"
                                                                fontSize="3xl"
                                                                mt="2rem"
                                                                onClick={() => arrayHelpers.insert(index + 1, { link: '', name: '' })}
                                                            ><i className="fa-kit fa-light-link-circle-plus"></i></Button>
                                                        </FormInputCard>
                                                    ))
                                                    ) : (
                                                        <Button
                                                            aria-label="Add Link"
                                                            variant="unstyled"
                                                            _hover={{ color: "primary" }}
                                                            h="auto"
                                                            w="auto"
                                                            color="secondary"
                                                            fontSize="3xl"
                                                            // leftIcon={<i className="fa-kit fa-light-link-circle-xmark"></i>}
                                                            mt="2rem"
                                                            onClick={() => arrayHelpers.push('')}
                                                        ><i className="fa-kit fa-light-link-circle-plus"></i> Add a Link</Button>
                                                    )
                                                }
                                            </>
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        )} 
                        
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
                            <FormInputRow inputID="takenOn" inputLabel="Taken On" inputType="datetime-local" />
                            <FormInputRow inputID="uploadedOn" inputLabel="Uploaded On" inputType="datetime-local" />
                        </Stack>

                        <FormInputCard id="isSections">
                            <Stack direction="row" gap="2rem">
                                <FormSwitch 
                                    inputID="isPublic" 
                                    helperText="Toggle on if you want this photo to be seen publicly" 
                                />
                                <FormSwitch 
                                    inputID="isPortfolio" 
                                    helperText="Toggle on if you want this photo to be a portfolio photo" 
                                />
                                <FormSwitch 
                                    inputID="isPinned" 
                                    helperText="Toggle on if you want this photo to be pinned" 
                                />
                            </Stack>
                        </FormInputCard>
                        
                        <Stack direction="row" gap="2rem">
                            <SubmitButton variant="blackFormButton" my="1rem !important" leftIcon={<i className="fa-kit fa-light-image-pen"></i>}>Edit Photo: {photoName}</SubmitButton> 
                            <Button variant="blackFormButton" my="1rem !important" onClick={deletePhoto} background="red" leftIcon={<i className="fa-kit fa-light-image-slash"></i>}>Delete Photo</Button> 
                        </Stack>
                    </Stack>
                )}
            </Formik>
        </>
    )
}
