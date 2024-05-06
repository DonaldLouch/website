'use client'

import FormInput from '@/app/(Components)/(Form)/FormInput'
import { FormInputRow } from '@/app/(Components)/(Form)/FormInputRow'
import supabase from '@/lib/supabase'
import { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { SubmitButton } from 'formik-chakra-ui'
import * as Yup from 'yup'

export default function AddLink() {
    const toast = useToast()
    const toastID = "toastID"
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onSubmit =  async (values: any, actions: any) => {
    const { status: supabaseStatus , error: supabaseError  } = await supabase.from("Links").insert({ 
        id: "link"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
        iconPrefix: values.iconPrefix,
        iconName: values.iconName,
        title: values.title,
        subTitle: values.subTitle,
        link: values.link
    })
    supabaseStatus && !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: `${supabaseStatus === 201 ? "Added New Link 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
            description: `${supabaseStatus === 201 ? `You have successfully added a new link!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
            status: `${supabaseStatus === 201 ? "success" : "error"}`,
            duration: 9000,
            isClosable: true,
        })
        actions.setSubmitting(false)
    }
    const initialValues = {}
    const validationSchema = Yup.object({
        iconPrefix: Yup.string().required("Icon Prefix is required."),
        iconName: Yup.string().required("Icon Name is required."),
        title: Yup.string().required("Title is required."),
        subTitle: Yup.string().required("Sub Title is required."),
    })
    return (
        <>
            <Button variant="primary" onClick={onOpen} background="primary"color="white" my="1rem !important" w="100%">Add New Link</Button> 
            <Modal isOpen={isOpen} onClose={onClose} id="addLink" size="5xl">
                <ModalContent background="blurredPurple">
                    <ModalHeader>Add New Link</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            {({ handleSubmit }: any) => (
                                <Stack as="form" onSubmit={handleSubmit as any} gap="1rem">
                                     <Stack
                                        direction="row"
                                        alignItems="center"
                                        justify="center"
                                        spacing="2rem"
                                        >
                                        <FormInputRow
                                            inputID="iconPrefix"
                                            inputLabel="Icon Prefix"
                                            inputType="text"
                                        />
                                        <FormInputRow
                                            inputID="iconName"
                                            inputLabel="Icon Name"
                                            inputType="text"
                                        />
                                        </Stack>
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

                                    <SubmitButton variant="blackFormButton" my="1rem !important">Add New Link</SubmitButton> 
                                </Stack>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
