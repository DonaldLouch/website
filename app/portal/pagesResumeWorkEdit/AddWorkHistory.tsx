'use client'

import { FormInput } from '@/app/(Components)/(Form)/FormInput'
import { FormInputReadOnly } from '@/app/(Components)/(Form)/FormInputReadOnly'
import { FormInputRow } from '@/app/(Components)/(Form)/FormInputRow'
import { FormTextArea } from '@/app/(Components)/(Form)/FormTextArea'
import supabase from '@/lib/supabase'
import { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, HStack, ModalFooter, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { SubmitButton } from 'formik-chakra-ui'
import * as Yup from 'yup'

export default function AddWorkHistory({ resumeID, company, workID }: any) {
    const toast = useToast()
    const toastID = "toastID"
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onSubmit =  async (values: any, actions: any) => {
         const submitEducationData = {
            id: "workHistory"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
            workID,
            position: values.position,
            startDate: values.startDate,
            endDate: values.endDate,
            description: values.description
         }
        const { status: supabaseStatus , error: supabaseError  } = await supabase.from("ResumeWorkExperienceHistory").insert({ 
          id: submitEducationData.id,
          workID: submitEducationData.workID,
          position: submitEducationData.position,
          startDate: submitEducationData.startDate,
          endDate: submitEducationData.endDate,
          description: submitEducationData.description,
        })
        await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })
        supabaseStatus && !toast.isActive(toastID) &&
          toast({
              id: toastID,
              title: `${supabaseStatus === 201 ? `Added New ${company} History 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
              description: `${supabaseStatus === 201 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
              status: `${supabaseStatus === 201 ? "success" : "error"}`,
              duration: 9000,
              isClosable: true,
          })
          actions.setSubmitting(false)
    }
    const initialValues = { id: workID }
    const validationSchema = Yup.object({
        position: Yup.string().required('Position is required'),
        startDate: Yup.string().required('Start Date is required'),
        description: Yup.string().required('Description is required'),
    })
    return (
        <>
            <Button variant="primary" onClick={onOpen} background="primary"color="white" my="1rem !important" w="100%" py="2rem">Add New {company} History</Button> 
            <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
                <ModalContent background="blurredPurple">
                    <ModalHeader>Add New {company} History</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            {({ handleSubmit }: any) => (
                                <Stack as="form" onSubmit={handleSubmit as any} gap="1rem">
                                    <FormInputReadOnly inputID="id" inputLabel="" inputType="text" />
                                
                                    <FormInput inputID="position" inputLabel="Position" inputType="text" />
                                    
                                    <Stack direction="row" spacing="2rem">
                                        <FormInputRow inputID="startDate" inputLabel="Start Date" inputType="datetime-local" />
                                        <FormInputRow inputID="endDate" inputLabel="End Date" inputType="datetime-local" />
                                    </Stack>
                                    
                                    <FormTextArea inputID="description" inputLabel="Description" textRows={4} />

                                    <SubmitButton variant="blackFormButton" my="1rem !important">Add New {company} History</SubmitButton> 
                                </Stack>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
