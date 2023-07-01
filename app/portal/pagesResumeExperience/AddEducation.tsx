'use client'

import { FormInput } from '@/app/(Components)/(Form)/FormInput'
import { FormInputRow } from '@/app/(Components)/(Form)/FormInputRow'
import { FormTextArea } from '@/app/(Components)/(Form)/FormTextArea'
import supabase from '@/lib/supabase'
import { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, HStack, ModalFooter, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { SubmitButton } from 'formik-chakra-ui'
import * as Yup from 'yup'

export default function AddEducation({ resumeID }: any) {
    const toast = useToast()
    const toastID = "toastID"

    console.log("id", resumeID)
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onSubmit =  async (values: any, actions: any) => {
         const submitEducationData = {
            id: "education"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
            school: values.school,
            degree: values.degree,
            startDate: values.startDate,
            endDate: values.endDate,
            description: values.description
         }
        const { status: supabaseStatus , error: supabaseError  } = await supabase.from("ResumeEducation").insert({ 
          id: submitEducationData.id,
          school: submitEducationData.school,
          degree: submitEducationData.degree,
          startDate: submitEducationData.startDate,
          endDate: submitEducationData.endDate,
          description: submitEducationData.description,
        })
        await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })
        supabaseStatus && !toast.isActive(toastID) &&
          toast({
              id: toastID,
              title: `${supabaseStatus === 201 ? "Added New Education 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
              description: `${supabaseStatus === 201 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
              status: `${supabaseStatus === 201 ? "success" : "error"}`,
              duration: 9000,
              isClosable: true,
          })
          actions.setSubmitting(false)
    }
    const initialValues = {}
    const validationSchema = Yup.object({
        school: Yup.string().required('School is required'),
        degree: Yup.string().required('Degree is required'),
        startDate: Yup.string().required('Start Date is required'),
    })
    return (
        <>
            <Button variant="primary" onClick={onOpen} background="primary"color="white" my="1rem !important">Add New Education</Button> 
            <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
                <ModalContent background="blurredPurple">
                    <ModalHeader>Add New Education</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            {({ handleSubmit }: any) => (
                                <Stack as="form" onSubmit={handleSubmit as any} gap="1rem">
                                    <Stack direction="row" spacing="2rem">
                                        <FormInputRow inputID="school" inputLabel="School Name" inputType="text" />
                                        <FormInputRow inputID="degree" inputLabel="Degree" inputType="text" />
                                    </Stack>

                                    <Stack direction="row" spacing="2rem">
                                        <FormInputRow inputID="startDate" inputLabel="Start Date" inputType="number" />
                                        <FormInputRow inputID="endDate" inputLabel="End Date" inputType="number" />
                                    </Stack>

                                    <FormTextArea inputID="description" inputLabel="Description" textRows={4} />

                                    <SubmitButton variant="blackFormButton" my="1rem !important">Add New Education</SubmitButton> 
                                </Stack>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
