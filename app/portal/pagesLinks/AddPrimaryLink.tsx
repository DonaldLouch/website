'use client'

import { FormInput } from '@/app/(Components)/(Form)/FormInput'
import { FormInputRow } from '@/app/(Components)/(Form)/FormInputRow'
import { FormTextArea } from '@/app/(Components)/(Form)/FormTextArea'
import supabase from '@/lib/supabase'
import { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, HStack, ModalFooter, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { SubmitButton } from 'formik-chakra-ui'
import * as Yup from 'yup'

export default function AddPrimaryLink({ primaryLength }: any) {
    const toast = useToast()
    const toastID = "toastID"
    const primaryLinkIndex = parseInt(primaryLength) as number
  
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onSubmit =  async (values: any, actions: any) => {
        // const submitEducationData = {
        // id: "work"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
        // company: values.company,
        // position: values.position,
        // startDate: values.startDate,
        // endDate: values.endDate,
        // description: values.description
        // }
    const { status: supabaseStatus , error: supabaseError  } = await supabase.from("PrimaryLinks").insert({ 
        id: "primaryLink"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
        icon: values.icon,
        title: values.title,
        subTitle: values.subTitle,
        link: values.link,
        orderNumber: primaryLinkIndex
    })
    supabaseStatus && !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: `${supabaseStatus === 201 ? "Added New Primary Link 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
            description: `${supabaseStatus === 201 ? `You have successfully added a new link!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
            status: `${supabaseStatus === 201 ? "success" : "error"}`,
            duration: 9000,
            isClosable: true,
        })
        actions.setSubmitting(false)
    }
    const initialValues = {}
    const validationSchema = Yup.object({
        icon: Yup.string().required("Icon is required."),
        title: Yup.string().required("Title is required."),
        subTitle: Yup.string().required("Sub Title is required."),
    })
    return (
        <>
            <Button variant="primary" onClick={onOpen} background="primary"color="white" my="1rem !important" w="100%">Add New Primary Link</Button> 
            <Modal isOpen={isOpen} onClose={onClose} id="addLink" size="5xl">
                <ModalContent background="blurredPurple">
                    <ModalHeader>Add New Primary Link</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            {({ handleSubmit }: any) => (
                                <Stack as="form" onSubmit={handleSubmit as any} gap="1rem">
                                     <FormInput
                                        inputID="icon"
                                        inputLabel="icon Name"
                                        inputType="text"
                                        />

                                        <Stack
                                        direction="row"
                                        alignItems="center"
                                        justify="center"
                                        spacing="2rem"
                                        >
                                        <FormInputRow
                                            inputID="title"
                                            inputLabel="Title"
                                            inputType="text"
                                        />
                                        <FormInputRow
                                            inputID="subTitle"
                                            inputLabel="Sub Title"
                                            inputType="text"
                                        />
                                        </Stack>

                                        <FormInput inputID="link" inputLabel="Link" inputType="text" />

                                    <SubmitButton variant="blackFormButton" my="1rem !important">Add New Primary Link</SubmitButton> 
                                </Stack>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
