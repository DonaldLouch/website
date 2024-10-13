'use client'

// import { FormInput } from '@/app/(Components)/(Form)/FormInput'
// import { FormInputReadOnly } from '@/app/(Components)/(Form)/FormInputReadOnly'
// import { FormInputRow } from '@/app/(Components)/(Form)/FormInputRow'
// import { FormTextArea } from '@/app/(Components)/(Form)/FormTextArea'
import supabase from '@/lib/supabase'
import { FieldArray, Formik } from 'formik'
import { SubmitButton } from 'formik-chakra-ui'
import * as Yup from 'yup'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import { FormSwitch } from '@/app/(Components)/(Form)/FormSwitch'
import { SectionTitle } from '@/app/(Components)/SectionTitle'
import { FormInputCard } from '@/app/(Components)/(Form)/FormInputCard'
import { FormSelect } from '@/app/(Components)/(Form)/FormSelect'
// import ViewPhoto from '../../../(Components)/ViewPhoto'
import { Box, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useImageSize } from 'react-image-size'
import { useEffect, useState } from 'react'
// import { BsLink45Deg, BsPencilSquare, BsPlusLg, BsTrash2 } from 'react-icons/bs'

import classes from "@/app/(Components)/Components.module.css"

export default function ViewPhotoEditAlbum({ imageData, albumData, locations }: any) {
    // const toast = useToast()
    // const toastID = "toastID"
    // const router = useRouter()

    const [opened, { open, close }] = useDisclosure(false)

    // locations
    
    // const {fileID, fileTitle, filePath, takenOn, uploadedOn, fileKey, fileVersionID } = photoData.fileID
    // const { photoName, caption, tags, links, album, location, id: photoID, isPublic, isPortfolio, isPinned } = photoData as any

    // async function deletePhoto() {
    //     const id = fileID.replace("_", "/");
    //     const formData = new FormData()
    //     formData.append("fileKey", fileKey)
    //     formData.append("versionID", fileVersionID)
    //     const deleteFile = await fetch(`/api/media/delete/${fileID}`, {method: "POST", body: formData}).then(response => response.json())
    //     // // console.log(deleteFile)

    //     const { error: mediaDeleteError, status: mediaDeleteStatus } = await supabase.from("PhotographyMedia").delete().eq('fileID', fileID);
    //     mediaDeleteStatus &&
    //         toast({
    //             description: `${mediaDeleteStatus === 204 ? `You have successfully deleted the media file ${fileTitle}!` : `An error has occurred: ${mediaDeleteError?.message}. ${mediaDeleteError?.hint && `${mediaDeleteError?.hint}.`}`}`,
    //             status: `${mediaDeleteStatus === 204 ? "success" : "error"}`,
    //             duration: 9000,
    //             isClosable: true,
    //         })
    //     mediaDeleteStatus === 204 && router.refresh()
    // }


    // const onSubmit =  async (values: any, actions: any) => {
    //     const tagArray =  values.tags && values?.tags.split(",")
        
    //     await supabase.from("PhotographyAlbum").update({ 
    //         lastUploadedOn: moment()
    //     }).eq('id', album)

    //     if (values.takenOn || values.uploadedOn) {
    //         const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyMedia").update({ 
    //             takenOn: moment(values.takenOn),
    //             uploadedOn: moment(values.uploadedOn)
    //         }).eq('fileID', fileID)
    //         // // console.log("Update Datetime Info: ", supabaseStatus, supabaseError)
    //     }

    //     const { status: supabaseStatus , error: supabaseError } = await supabase.from("Photography").update({ 
    //         photoName: values.photoName,
    //         caption: values.caption ? values.caption : photoData.caption,
    //         tags: tagArray ? tagArray : photoData.tags,
    //         location: values.locationSelect === "noLocation" ? null : values.locationSelect === "newLocation" ? values.location : values.locationSelect,
    //         takenOn: moment(values.takenOn),
    //         uploadedOn: moment(values.uploadedOn),
    //         isPublic: values.isPublic,
    //         isSetup: values.takenOn && values.uploadedOn && values.caption && values.tags ? true : false,
    //         isPortfolio: values.isPortfolio,
    //         isPinned: values.isPinned
    //     }).eq('id', photoID)
    //     supabaseStatus && !toast.isActive(toastID) &&
    //         toast({
    //             id: toastID,
    //             title: `${supabaseStatus === 204 ? `Photo ${photoName} Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
    //             description: `${supabaseStatus === 204 ? `You have successfully edited the selected photos!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
    //             status: `${supabaseStatus === 204 ? "success" : "error"}`,
    //             duration: 9000,
    //             isClosable: true,
    //         })
    //     actions.setSubmitting(false)
    //     router.refresh()
    // }

    // const hiddenElement = true

    // const initialValues = { 
    //     fileID: fileID, 
    //     photoID: photoID, 
    //     photoName: photoName,
    //     links: links ? true : false,
    //     isPublic: isPublic ? true : false,
    //     isPortfolio: isPortfolio ? true : false,
    //     isPinned: isPinned ? true : false,
    //     takenOn: moment(takenOn).format("yyyy-MM-DDTkk:mm"),
    //     uploadedOn: moment(uploadedOn).format("yyyy-MM-DDTkk:mm"),
    //     caption: caption,
    //     locationSelect: location ? location : "noLocation",
    //     tags: tags ? tags.toString() : null,
    //     albumSelect: album ? album : null,
    //     linksRow: links
    // }

    // const validationSchema = Yup.object({ })
    const imageURL = imageData.fileID.filePath
    const [dimensions, { loading, error }] = useImageSize(imageURL)
    
    const [photoWidth, setPhotoWidth] = useState(1920)
    const [photoHeight, setPhotoHeight] = useState(1080)

    const [imageQuality, setImageQuality] = useState(1)

    useEffect(() => {
        dimensions && !loading || error && setPhotoWidth(Number(dimensions?.width))
        dimensions && !loading || error && setPhotoHeight(Number(dimensions?.height))
        !loading || error && setImageQuality(100)
    }, [imageURL, dimensions, loading, error])
    
    
    return (<>
        <Box  onClick={open} display="inline-block">
            <Image src={imageData.fileID.filePath} alt={`${imageData.fileID.fileID}-${imageData.fileID.fileTitle}`}
                quality={imageQuality} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
                width={photoWidth}
                height={photoHeight}
                // layout={"responsive"}
                className={classes.imageCardView}
            />
        </Box>
        <Modal opened={opened} onClose={close} title={`${imageData.photoName} (${imageData.id})`} yOffset="2rem" xOffset="2rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
            id={`viewPhoto${imageData.id}`}
        >
            <Text>Content Coming Soon!</Text>
            {/* <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit, values }: any) => (
                    <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
                        <Grid gridTemplateColumns="18% 41% 41%" gap="2rem" alignItems="baseline" width="calc(100% - (2rem * 2))">
                            <ViewPhoto fileID={fileID} fileTitle={photoName} filePath={filePath} />
                            <FormInputReadOnly inputID="fileID" inputLabel="" inputType="text" />
                            <FormInputReadOnly inputID="photoID" inputLabel="" inputType="text" />
                        </Grid>
                        <FormInput inputID="photoName" inputLabel="Photo Title" inputType="text" inputDescription="If you would like the title of the photo to be a different title than what was uploaded; you can change that here." />
                        {!hiddenElement && (<>
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
                        </>)}
                        

                        <Stack direction="row" gap="2rem"  boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="1.5rem 0.5rem">
                            <FormInputRow inputID="takenOn" inputLabel="Taken On" inputType="datetime-local" />
                            <FormInputRow inputID="uploadedOn" inputLabel="Uploaded On" inputType="datetime-local" />
                        </Stack>
                    {!hiddenElement && (<>
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
                        </>)}
                        <Stack direction="row" gap="2rem">
                            <SubmitButton variant="blackFormButton" my="1rem !important" leftIcon={<BsPencilSquare />}>Edit Photo: {photoName}</SubmitButton> 
                            <Button variant="blackFormButton" my="1rem !important" onClick={deletePhoto} background="red" leftIcon={<BsTrash2 />}>Delete Photo</Button> 
                        </Stack>
                    </Stack>
                )}
            </Formik> */}
        </Modal>
    </>)
}
