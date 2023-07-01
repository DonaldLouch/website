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

export default function EditWorkHistory({ resumeID, history, company }: any) {
    const toast = useToast()
    const toastID = "toastID"
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const deleteHistory = async () => {
        const { status: deleteStatus, error: deleteError } = await supabase.from("ResumeWorkExperienceHistory").delete().eq('id', history.id);
        deleteStatus && !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: `${deleteStatus === 204 ? `(${company}) ${history.position} (${new Date(history.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}) Deleted  🗑️` : `Error #${deleteError?.code} has Occurred`}`,
            description: `${deleteStatus === 204 ? `You have successfully deleted (${company}) ${history.position} (${new Date(history.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })})!` : `An error has occurred: ${deleteError?.message}. ${deleteError?.hint && `${deleteError?.hint}.`}`}`,
            status: `${deleteStatus === 204 ? "success" : "error"}`,
            duration: 9000,
            isClosable: true,
        })
    }
    const onSubmit =  async (values: any, actions: any) => {
         const submitEducationData = {
            id: values.id,
            position: values.position,
            startDate: values.startDate,
            endDate: values.endDate,
            description: values.description
         }
        const { status: supabaseStatus , error: supabaseError  } = await supabase.from("ResumeWorkExperienceHistory").update({ 
          position: submitEducationData.position,
          startDate: submitEducationData.startDate,
          endDate: submitEducationData.endDate,
          description: submitEducationData.description,
        }).match({ id: submitEducationData.id })
        await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })
        supabaseStatus && !toast.isActive(toastID) &&
          toast({
              id: toastID,
              title: `${supabaseStatus === 204 ? `Updated ${history.position} History 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
              description: `${supabaseStatus === 204 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
              status: `${supabaseStatus === 204 ? "success" : "error"}`,
              duration: 9000,
              isClosable: true,
          })
          actions.setSubmitting(false)
    }
    const initialValues = { 
        id: history.id,
        position: history.position,
        startDate: history.startDate,
        endDate: history.endDate,
        description: history.description,
     }
    const validationSchema = Yup.object({
        position: Yup.string().required('Position is required'),
        startDate: Yup.string().required('Start Date is required'),
        description: Yup.string().required('Description is required'),
    })
    return (
        <>
            <Button onClick={onOpen} variant="sectionButton" justifyContent="left" pl="3rem" fontSize="1.2rem" fontWeight="500">{history.position} ({new Date(history.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })})</Button> 
            <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
                <ModalContent background="blurredPurple">
                    <ModalHeader>Edit: ({company}) {history.position} ({new Date(history.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })})</ModalHeader>
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

                                    <SubmitButton variant="blackFormButton" my="1rem !important">Update: ({company}) {history.position} ({new Date(history.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })})</SubmitButton> 
                                </Stack>
                            )}
                        </Formik>
                        <Button onClick={deleteHistory} variant="primary" background="red" justifyContent="left" fontSize="1.2rem" fontWeight="500" w="100%" py="2rem">DELETE: {history.position} ({new Date(history.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })})</Button> 
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
