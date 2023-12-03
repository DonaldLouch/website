'use client'

import { FormInput } from '@/app/(Components)/(Form)/FormInput'
import { FormInputReadOnly } from '@/app/(Components)/(Form)/FormInputReadOnly'
import { FormInputRow } from '@/app/(Components)/(Form)/FormInputRow'
import { FormTextArea } from '@/app/(Components)/(Form)/FormTextArea'
import supabase from '@/lib/supabase'
import { Text, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, HStack, ModalFooter, Button, useDisclosure, useToast, IconButton, Code } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FieldArray, Formik } from 'formik'
import { SubmitButton } from 'formik-chakra-ui'
import * as Yup from 'yup'
import ViewPhoto from '../../(Components)/ViewPhoto'
import { FormSwitch } from '@/app/(Components)/(Form)/FormSwitch'
import { SectionCard } from '@/app/(Components)/(Cards)/SectionCard'
import { SectionTitle } from '@/app/(Components)/SectionTitle'
import { useState } from 'react'
import { FormInputCard } from '@/app/(Components)/(Form)/FormInputCard'
import { FormSelect } from '@/app/(Components)/(Form)/FormSelect'

export default function EditPhotography({ fileID, fileTitle }: any) {
    const toast = useToast()
    const toastID = "toastID"
    // const { fileID, fileTitle, filePath } = media
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [linkIndex, setLinkIndex] = useState(1)
    const [albumID, setAlbumID] = useState(null)
    
    // filePath, photographyAlbum }
    
    // const { data: photographyAlbum } = await supabase.from('PhotographyAlbum').select().order('lastUpdatedOn', { ascending: false }) as any
    // console.log("Edit", photographyAlbum)

    
    // const onSubmit =  async (values: any, actions: any) => {
    //       actions.setSubmitting(false)
    // }
    const initialValues = { 
        fileID: fileID, 
        fileTitle: fileTitle,
        links: false,
        album: false,
        isPublic: true
    }
    const validationSchema = Yup.object({
        // position: Yup.string().required('Position is required'),
        // startDate: Yup.string().required('Start Date is required'),
        // description: Yup.string().required('Description is required'),
    })
    return (
        <>
            <Button variant="portalButton" color="white" onClick={onOpen} leftIcon={<FontAwesomeIcon icon={["fal", "pen-to-square"]} width="100%" color='currentColor' />}></Button> 
            {/* <Button variant="primary" onClick={onOpen} background="primary"color="white" my="1rem !important" w="100%" py="2rem">Add New {company} History</Button>  */}
            <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
                <ModalContent background="blurredPurple">
                    <ModalHeader>Edit Photo: {fileTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            {({ handleSubmit, values }: any) => (
                                <Stack as="form" onSubmit={handleSubmit as any} gap="2rem">
                                    <Stack direction="row" gap="2rem" alignItems="baseline">
                                        <ViewPhoto fileID={fileID} fileTitle={fileTitle} filePath={filePath} />
                                        <FormInputReadOnly inputID="fileID" inputLabel="" inputType="text" />
                                    </Stack>
                                    <FormInput inputID="fileTitle" inputLabel="Photo Title" inputType="text" inputDescription="If you would like the title of the photo to be a different title than what was uploaded; you can change that here." />
                                    <FormTextArea inputID="caption" inputLabel="Caption" textRows={4} />
                                    <FormInput inputID="tags" inputLabel="Tags" inputType="text" inputDescription={`Please separate each tag with a comma and a space; such as: ", "`} />
                                    <FormSwitch 
                                        inputID="links" 
                                        helperText="Toggle on if there are any link(s) associated with this photo" 
                                    />
                                    {values.links === true && (
                                        <Stack boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="-1rem 0.5rem 1.5rem">
                                            <SectionTitle headingTitle="Links" />

                                            <Code p={3} colorScheme='yellow' mt="1rem" color="primary" textAlign="center" m="0">For proper formatting of the credit, please include the &#34;http(s)://&#34; in the inputting of the link.</Code>
                                            <Stack id="theLinksSection">
                                                {Array.from(Array(Number(linkIndex)).keys()).map((index) => (
                                                    <Stack id={`link[${index}]`} key={index}>
                                                        <FormInputRow inputID={`linkURL[${index}]`} inputLabel="Link URL" inputType="text" />
                                                        <FormInputRow inputID={`linkTitle[${index}]`} inputLabel="Link Title" inputType="text" />
                                                        {/* <Button
                                                            aria-label="Delete Link"
                                                            variant="unstyled"
                                                            _hover={{ color: "primary" }}
                                                            h="auto"
                                                            w="auto"
                                                            color="red"
                                                            fontSize="3xl"
                                                            leftIcon={<i className="fa-kit fa-light-link-circle-xmark"></i>}
                                                            mt="2rem"
                                                            // value={index}
                                                            // onClick={() => link[1].remove() }
                                                        />
                                                    </Stack>
                                                ))}
                                            </Stack>
                                            <Button 
                                                variant="portalButton" 
                                                color="white"
                                                w="100%"
                                                py="2rem"
                                                name="addNewLink"
                                                value={linkIndex}
                                                onClick={(e:any) => setLinkIndex(Number(e.target.value ++))}
                                                leftIcon={<i className="fa-kit fa-light-link-circle-plus"></i>}
                                            >Add More Links</Button>
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
                                            <FormSelect selectLabel="Select and Album" selectID="albumSelect" selectPlaceholder="Select An Album">
                                                <option value="newAlbum">Create New Album</option>
                                                <option value="">---</option>
                                                {photographyAlbum.map((album: any) => (
                                                    <option key={album.id} value={album.id}>{album.albumName}</option>
                                                ))}
                                            </FormSelect>
                                        </Stack>
                                    )}
                                    <FormInput inputID="location" inputLabel="Location" inputType="text" inputDescription="If you would like you can add a general location chip to the photo; you can add that here." />
                                    <Stack direction="row" gap="2rem"  boxShadow="bsBoldWhite" p="2rem 2rem 3rem" borderRadius="0 2rem" m="1.5rem 0.5rem">
                                        <FormInputRow inputID="takenOn" inputLabel="Taken On" inputType="datetime-local" />
                                        <FormInputRow inputID="uploadedOn" inputLabel="Uploaded On" inputType="datetime-local" />
                                    </Stack>
                                    <FormSwitch 
                                        inputID="isPublic" 
                                        helperText="Keep toggled on if you want this photo to be seen publicly" 
                                    />
                                    <SubmitButton variant="blackFormButton" my="1rem !important">Edit Photo: {fileTitle}</SubmitButton> 
                                </Stack>
                            )}
                        </Formik> */}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
