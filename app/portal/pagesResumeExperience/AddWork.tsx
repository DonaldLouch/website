'use client'

import { FormInputRow } from '@/app/(Components)/(Form)/FormInputRow'
import { FormTextArea } from '@/app/(Components)/(Form)/FormTextArea'
import supabase from '@/lib/supabase'
import { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { SubmitButton } from 'formik-chakra-ui'
import * as Yup from 'yup'

export default function AddWork({ resumeID }: any) {
    const toast = useToast()
    const toastID = "toastID"
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onSubmit =  async (values: any, actions: any) => {
        const submitEducationData = {
        id: "work"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
        company: values.company,
        position: values.position,
        startDate: values.startDate,
        endDate: values.endDate,
        description: values.description
        }
    const { status: supabaseStatus , error: supabaseError  } = await supabase.from("ResumeWorkExperience").insert({ 
        id: submitEducationData.id,
        company: submitEducationData.company,
        position: submitEducationData.position,
        startDate: submitEducationData.startDate,
        endDate: submitEducationData.endDate,
        description: submitEducationData.description,
    })
    await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })
    supabaseStatus && !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: `${supabaseStatus === 201 ? "Added New Work Experience 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
            description: `${supabaseStatus === 201 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
            status: `${supabaseStatus === 201 ? "success" : "error"}`,
            duration: 9000,
            isClosable: true,
        })
        actions.setSubmitting(false)
    }
    const initialValues = {}
    const validationSchema = Yup.object({})
    return (
        <>
            <Button variant="primary" onClick={onOpen} background="primary"color="white" my="1rem !important">Add New Work Experience</Button> 
            <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
                <ModalContent background="blurredPurple">
                    <ModalHeader>Add New Work Experience</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            {({ handleSubmit }: any) => (
                                <Stack as="form" onSubmit={handleSubmit as any} gap="1rem">
                                     <Stack direction="row" spacing="2rem">
                                        <FormInputRow inputID="company" inputLabel="Company" inputType="text" />
                                        <FormInputRow inputID="position" inputLabel="Position" inputType="text" />
                                    </Stack>
                                    
                                    <Stack direction="row" spacing="2rem">
                                        <FormInputRow inputID="startDate" inputLabel="Start Date" inputType="datetime-local" />
                                        <FormInputRow inputID="endDate" inputLabel="End Date" inputType="datetime-local" />
                                    </Stack>
                                    
                                    <FormTextArea inputID="description" inputLabel="Description" textRows={4} />

                                    <SubmitButton variant="blackFormButton" my="1rem !important">Add New Work Experience</SubmitButton> 
                                </Stack>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
