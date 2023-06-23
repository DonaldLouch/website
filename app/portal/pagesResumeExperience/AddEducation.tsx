'use client'

import { FormInput } from '@/app/(Components)/(Form)/FormInput'
import { FormTextArea } from '@/app/(Components)/(Form)/FormTextArea'
import { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, HStack, ModalFooter, Button, useDisclosure } from '@chakra-ui/react'
import { Formik } from 'formik'
import { SubmitButton } from 'formik-chakra-ui'
import * as Yup from 'yup'

export default function AddEducation() {
    const { isOpen, onClose } = useDisclosure()
    const onSubmit =  async (values: any, actions: any) => {
        // const { status: supabaseStatus , error: supabaseError } = await supabase.from("Resume").update({ 
        //   lastUpdatedOn: updateResumeData.lastUpdatedOn 
        // }).eq('id', updateResumeData.id)
        // console.log(supabaseStatus)
        // supabaseStatus && !toast.isActive(toastID) &&
        //   toast({
        //       id: toastID,
        //       title: `${supabaseStatus === 204 ? "Page Updated 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
        //       description: `${supabaseStatus === 204 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
        //       status: `${supabaseStatus === 204 ? "success" : "error"}`,
        //       duration: 9000,
        //       isClosable: true,
        //   })
        //   actions.setSubmitting(false)
    }
    const initialValues = {
    }
    const validationSchema = Yup.object({
    })
    return (
        <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="3xl">
            <ModalContent>
                <ModalHeader>Add Education</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {({ handleSubmit }: any) => (
                            <Stack as="form" onSubmit={handleSubmit as any} px="1rem">
                                <HStack spacing="2rem">
                                    <FormInput inputID="school" inputLabel="School Name" inputType="text" />
                                    <FormInput inputID="degree" inputLabel="Degree" inputType="text" />
                                </HStack>

                                <HStack spacing="2rem">
                                    <FormInput inputID="startDate" inputLabel="Start Date" inputType="number" />
                                    <FormInput inputID="endDate" inputLabel="End Date" inputType="number" />
                                </HStack>

                                <FormTextArea inputID="description" inputLabel="Description" textRows={4} />

                                <SubmitButton variant="blackFormButton">Add Education</SubmitButton> 
                            </Stack>
                        )}
                    </Formik>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
