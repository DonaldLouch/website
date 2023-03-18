import { 
    Stack, 
    HStack,
    useToast,
    Box, 
    Link,
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


export default function AboutMePortal({ resumeExperienceHistoryData }:any) {
  const resumeExperience = resumeExperienceHistoryData
  console.log(resumeExperience)

  const toast = useToast()

  const onSubmit =  async (values: any, actions: any) => {
    const updateResumeData = {
      id: values.id,
      position: values.position,
      startDate: values.startDate,
      endDate: values.endDate,
      description: values.description
      }
      await updateResume(updateResumeData)
      actions.setSubmitting(false)
  }
  async function updateResume(updateResumeData: any) {
    const response = await fetch('/api/resume/updateExperienceHistory', {
      method: 'POST',
      body: JSON.stringify(updateResumeData)
    })
    
    if (response.ok) {
        toast({
          title: "Resume Page Updated 🎉",
          description: `You've successfully updated the Resume page!`,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
      if (response.status === 500) {
        toast({
          title: "An Error Occurred",
          description: "It seems like an error occurred while trying to update the resume page. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
  }
    const initialValues = {
      id: resumeExperience.id,
      position: resumeExperience.position,
      startDate: resumeExperience.startDate,
      endDate: resumeExperience.endDate,
      description: resumeExperience.description,
    }
    
      const validationSchema = Yup.object({
        position: Yup.string().required('Position is required'),
        startDate: Yup.string().required('Start Date is required'),
        description: Yup.string().required('Description is required'),
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
                      <Link variant="primary" href={`../resumeEdit/${resumeExperience.resumeID}`}>
                        &larr; Go Back To Experience Manager
                      </Link>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {({ handleSubmit }: any) => (
                        <Stack as="form" onSubmit={handleSubmit as any}>
                            <FormInputReadOnly inputID="id" inputLabel="" inputType="text" />
                            <FormInput inputID="position" inputLabel="Position" inputType="text" />
      
                                <HStack spacing="2rem">
                                    <FormInput inputID="startDate" inputLabel="Start Date" inputType="datetime-local" />
                                    <FormInput inputID="endDate" inputLabel="End Date" inputType="datetime-local" />
                                </HStack>
                                
                                <FormTextArea inputID="description" inputLabel="Description" textRows={4} />
                            
                            <SubmitButton variant="blackFormButton">Update  History</SubmitButton> 
                        </Stack>
                        )}
                    </Formik>
                    </Box>
            </PortalLayout>
        </>
    )
}


export async function getServerSideProps(router: any) {
    const { resumeID } = router.query
    console.log(resumeID)

    const resumeExperienceHistoryData = await prisma.resumeWorkExperienceHistory.findUnique({
      where: {
        id: resumeID
      }
    })

    return { 
        props: { 
          resumeExperienceHistoryData: JSON.parse(JSON.stringify(resumeExperienceHistoryData)),
        } 
    }
}