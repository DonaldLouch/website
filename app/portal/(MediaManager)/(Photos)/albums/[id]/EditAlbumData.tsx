'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Button, Code, Stack, useToast, Grid, IconButton, Flex, Divider, Icon} from "@chakra-ui/react"

import { FieldArray, Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import * as Yup from 'yup'

import { FormInput } from "@/app/(Components)/(Form)/FormInput";
import { FormTextArea } from "@/app/(Components)/(Form)/FormTextArea";
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import { FormInputCard } from "@/app/(Components)/(Form)/FormInputCard";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewPhotoEditAlbum from "./ViewPhotoEditAlbum";
import Masonry from "react-masonry-css";
import { BsEye, BsLink45Deg, BsPencilSquare, BsPlusLg, BsTrash2 } from "react-icons/bs";

export default function EditAlbumData({photoData, albumData, locations}: any) {
    const { id, albumName, slug, albumCaption, albumLinks, uploadedOn } = albumData

    const toast = useToast()
    const toastID = "toastID"
    const router = useRouter()

    const breadCrumbs = [
        {"pageLink": "/portal/photography", "pageName": "Photography Manager"},
        {"pageLink": "/portal/albums", "pageName": "Photography Album Manager"},
        {"pageLink": `/portal/albums/${id}`, "pageName": `Edit Album: ${albumName}`},
    ]

//   async function deletePhoto() {

//     const id = fileID.replace("_", "/");
//     const formData = new FormData()
//     formData.append("fileKey", fileKey)
//     formData.append("versionID", fileVersionID)
//     const deleteFile = await fetch(`/api/media/delete/${fileID}`, {method: "POST", body: formData}).then(response => response.json())
//     console.log(deleteFile)

    
    
//     const { error: mediaDeleteError, status: mediaDeleteStatus } = await supabase.from("PhotographyMedia").delete().eq('fileID', fileID);
//     mediaDeleteStatus &&
//     toast({
//         // id: toastID,
//         // title: `${mediaDeleteStatus === 204 ? "Media Deleted  🗑️" : `Error #${mediaDeleteError?.code} has Occurred`}`,
//         description: `${mediaDeleteStatus === 204 ? `You have successfully deleted the media file ${fileTitle}!` : `An error has occurred: ${mediaDeleteError?.message}. ${mediaDeleteError?.hint && `${mediaDeleteError?.hint}.`}`}`,
//         status: `${mediaDeleteStatus === 204 ? "success" : "error"}`,
//         duration: 9000,
//         isClosable: true,
//     })
//     mediaDeleteStatus === 204 && router.back()
// //     const { error: deletePostError, status: deletePostStatus } = await supabase.from("BlogPost").delete().eq('id', post.id);
// //         deletePostStatus && !toast.isActive(toastID) &&
// //         toast({
// //             id: toastID,
// //             title: `${deletePostStatus === 204 ? "Post ID Deleted  🗑️" : `Error #${deletePostError?.code} has Occurred`}`,
// //             description: `${deletePostStatus === 204 ? `You have successfully deleted the post "${post.title}"!` : `An error has occurred: ${deletePostError?.message}. ${deletePostError?.hint && `${deletePostError?.hint}.`}`}`,
// //             status: `${deletePostStatus === 204 ? "success" : "error"}`,
// //             duration: 9000,
// //             isClosable: true,
// //         })
// //         deletePostStatus === 204 && router.push("/portal/blog?message=deletedPost")
//   }

    const onSubmit =  async (values: any, actions: any) => {
        const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyAlbum").update({ 
            albumName: values.albumName,
            albumCaption: values.albumCaption ? values.albumCaption : photoData.albumCaption,
            uploadedOn: moment(values.uploadedOn),
            lastUploadedOn: moment()
        }).eq('id', id)
        supabaseStatus && !toast.isActive(toastID) &&
            toast({
                id: toastID,
                title: `${supabaseStatus === 204 ? `The Album ${albumName} Was Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
                description: `${supabaseStatus === 204 ? `You have successfully edited the selected album!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
                status: `${supabaseStatus === 204 ? "success" : "error"}`,
                duration: 9000,
                isClosable: true,
            })
        actions.setSubmitting(false)
        router.refresh()
    }

    const initialValues = { 
        albumID: id,
        albumName,
        albumCaption,
        links: albumLinks ? true : false,
        hideForm: false,
        uploadedOn: moment(uploadedOn).format("yyyy-MM-DDTkk:mm"),
        linksRow: albumLinks
    }

    const validationSchema = Yup.object({})

    const breakpointColumnsObj = {
        default: 7,
        1500: 5,
        800: 4,
    }
  
    return (<>
        <BreadCrumb breads={breadCrumbs} />
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit, values }: any) => (
                <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
                    <FormSwitch 
                        inputID="hideForm" 
                        helperText="Toggle off to hide the form if you're not editing the album information." 
                    />
                    {values.hideForm === true && (<>
                        <Grid gridTemplateColumns="20% 80%" gap="2rem" alignItems="baseline" width="calc(100% - (2rem * 2))">
                            <IconButton as="a" variant="portalButton" color="white" p="2rem" mb="1rem" href={`/album/${slug}`} icon={<BsEye />} aria-label={`view ${albumName}`}>Preview Photo</IconButton> 
                            <FormInputReadOnly inputID="albumID" inputLabel="" inputType="text" />
                        </Grid>
                        <FormInput inputID="albumName" inputLabel="Album Name" inputType="text" inputDescription="Please make sure to provide the name of the album" />
                        <FormTextArea inputID="albumCaption" inputLabel="Caption" textRows={4} />
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
                                                            ><BsTrash2 /></Button>
                                                        
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
                                                            ><BsPlusLg /></Button>
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
                                                            mt="2rem"
                                                            onClick={() => arrayHelpers.push('')}
                                                            leftIcon={<Icon as={BsLink45Deg} />}
                                                        >Add a Link</Button>
                                                    )
                                                }
                                            </>
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        )} 
                        
                        <FormInputRow inputID="uploadedOn" inputLabel="Uploaded On" inputType="datetime-local" />
                    
                        <SubmitButton variant="blackFormButton" my="1rem !important" leftIcon={<BsPencilSquare />}>Edit Album: {albumName}</SubmitButton> 
                        {/* <Button variant="blackFormButton" my="1rem !important" onClick={deletePhoto} background="red" leftIcon={<i className="fa-kit fa-light-image-slash"></i>}>Delete Photo</Button>  */}
                    </>)}
                </Stack>
            )}
        </Formik>
        
        <Divider m="2rem" width="calc(100% - 2rem * 2)" />
        <SectionTitle headingTitle="Photos in Album" />
        <Flex 
            as={Masonry}
            breakpointCols={breakpointColumnsObj}
            // p="4.5rem 1rem 1rem"
            m="2rem 1rem 1rem"
            gap="0.5rem"
        >
            {photoData.map((photo: any) => (
                <ViewPhotoEditAlbum locations={locations} albumData={albumData} photoData={photo} />
            ))}
        </Flex>
    </>)
}
