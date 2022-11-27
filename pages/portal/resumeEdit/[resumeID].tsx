import { 
    Stack, 
    HStack,
    useToast,
    Box, 
    useDisclosure,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@chakra-ui/react'

import { Formik } from 'formik'
import {
    SubmitButton
} from 'formik-chakra-ui'

import prisma from '../../../lib/prisma'

import {Metadata} from "../../../components/Metadata"


import PortalLayout from '../../../components/Portal/PortalLayout'

import * as React from 'react'
import * as Yup from 'yup'

import { FormInput } from '../../../components/Form/FormInput'
import { FormTextArea } from '../../../components/Form/FormTextArea'
import { FormInputReadOnly } from '../../../components/Form/FormInputReadOnly'


export default function AboutMePortal({ resumeExperienceData }:any) {
  const resumeExperience = resumeExperienceData

  const { isOpen: isHistoryOpen, onOpen: onHistoryOpen, onClose: onHistoryClose } = useDisclosure()

    const toast = useToast()

  const onSubmit =  async (values: any, actions: any) => {
    console.log(values)
      actions.setSubmitting(false)
  }

  const onSubmitHistory =  async (values: any, actions: any) => {
    const HistoryData = {
      company: values.id,
      position: values.position,
      startDate: values.startDate,
      endDate: values.endDate,
      description: values.description,
    }
    await addHistory(HistoryData)

    actions.setSubmitting(false)
  }

  async function addHistory(HistoryData: any) {
    const response = await fetch('/api/resume/addHistory', {
      method: 'POST',
      body: JSON.stringify(HistoryData)
    })
  
    if (response.ok) {
      toast({
        title: "Work History Added 🎉",
        description: `You've successfully a new work history!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }

    if (response.status === 500) {
      toast({
        title: "An Error Occurred",
        description: "It seems like an error occurred while trying to the new work history. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }

      return await response.json()
  }
    
  // async function updateResume(updateResumeData: any) {
  //   const response = await fetch('/api/resume/updateResume', {
  //     method: 'POST',
  //     body: JSON.stringify(updateResumeData)
  //   })
    
  //   if (response.ok) {
  //       toast({
  //         title: "Resume Page Updated 🎉",
  //         description: `You've successfully updated the Resume page!`,
  //         status: "success",
  //         duration: 9000,
  //         isClosable: true,
  //       })
  //     }
  //     if (response.status === 500) {
  //       toast({
  //         title: "An Error Occurred",
  //         description: "It seems like an error occurred while trying to update the resume page. Please try again.",
  //         status: "error",
  //         duration: 9000,
  //         isClosable: true,
  //       })
  //     }
  // }
  
    // const initialValues = {
    //   id: resume.id,

    //   firstName: resume.firstName,
    //   middleName: resume.middleName,
    //   lastName: resume.lastName,
    //   pronouns: resume.pronouns,
    //   currentAge: resume.currentAge,
    //   address: resume.address,
    //   email: resume.email,
    //   phone: resume.phone,
    //   linkedin: resume.linkedin,
    //   bioExcerpt: resume.bioExcerpt,
    //   profile: resume.profile,
    //   skills: resume.skills,
    // }

    const initialValues = {
      id: resumeExperience.id,
      company: resumeExperience.company,
      position: resumeExperience.position,
      startDate: resumeExperience.startDate,
      endDate: resumeExperience.endDate,
      description: resumeExperience.description,
    }
    
    const initialValuesHistory = {
      id: resumeExperience.id,
    }
    
      const validationSchema = Yup.object({
        company: Yup.string().required('Company is required'),
        position: Yup.string().required('Position is required'),
        startDate: Yup.string().required('Start Date is required'),
        // endDate: Yup.string().required('End Date is required'),
        description: Yup.string().required('Description is required'),
      })

      const validationSchemaHistory = Yup.object({
      })

    return (
        <>  
            <PortalLayout pageTitle={`Edit: Resume Experience Page`}>
                <Metadata
                    title={`Edit: Resume Experience | ${process.env.WEBSITE_NAME}`}
                    keywords={`${process.env.KEYWORDS}, portal, edit, new, admin`}
                    description={`Edit the resume work experience page.`}
                    />
                    <Box as="main" id="editAbout" color="black">
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {({ handleSubmit }: any) => (
                        <Stack as="form" onSubmit={handleSubmit as any}>
                            <FormInputReadOnly inputID="id" inputLabel="" inputType="hidden" />
                          
                            <HStack spacing="2rem">
                                    <FormInput inputID="company" inputLabel="Company" inputType="text" />
                                    <FormInput inputID="position" inputLabel="Position" inputType="text" />
                                </HStack>
                                
                                <HStack spacing="2rem">
                                    <FormInput inputID="startDate" inputLabel="Start Date" inputType="datetime-local" />
                                    <FormInput inputID="endDate" inputLabel="End Date" inputType="datetime-local" />
                                </HStack>
                                
                                <FormTextArea inputID="description" inputLabel="Description" textRows={4} />
                            
                            <SubmitButton variant="blackFormButton">Update Resume Page</SubmitButton> 
                        </Stack>
                        )}
                    </Formik>
                    
                    <Button onClick={onHistoryOpen}>Add History</Button>

                    <Modal isOpen={isHistoryOpen} onClose={onHistoryClose} id="addExperience" size="3xl">
                      <ModalContent>
                        <ModalHeader>Add History</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        </ModalBody>
                          <Formik initialValues={initialValuesHistory} onSubmit={onSubmitHistory} validationSchema={validationSchemaHistory}>
                          {({ handleSubmit }: any) => (
                            <Stack as="form" onSubmit={handleSubmit as any} px="1rem">
                                <FormInputReadOnly inputID="id" inputLabel="" inputType="text" />
                                
                                <FormInput inputID="position" inputLabel="Position" inputType="text" />
                                
                                <HStack spacing="2rem">
                                    <FormInput inputID="startDate" inputLabel="Start Date" inputType="datetime-local" />
                                    <FormInput inputID="endDate" inputLabel="End Date" inputType="datetime-local" />
                                </HStack>
                                
                                <FormTextArea inputID="description" inputLabel="Description" textRows={4} />

                                <SubmitButton variant="blackFormButton">Add History</SubmitButton> 
                            </Stack>
                            )}
                        </Formik>

                        <ModalFooter>
                          <Button colorScheme='blue' mr={3} onClick={onHistoryClose}>
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    </Box>
            </PortalLayout>
        </>
    )
}


export async function getServerSideProps(router: any) {
    const { resumeID } = router.query

    const resumeExperienceData = await prisma.resumeWorkExperience.findUnique({
      where: {
        id: resumeID
      }
    })

    return { 
        props: { 
          resumeExperienceData: JSON.parse(JSON.stringify(resumeExperienceData))
        } 
    }
}