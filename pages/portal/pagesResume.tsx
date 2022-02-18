import { 
    Stack, 
    HStack,
    useToast,
    Box, 
    Heading,
    useColorModeValue,
    useDisclosure,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Link
    // ModalOverlay
} from '@chakra-ui/react'

import { Formik } from 'formik'
import {
    SubmitButton
} from 'formik-chakra-ui'

import prisma from '../../config/prisma'

import {Metadata} from "../../components/Metadata"


import PortalLayout from '../../components/Portal/PortalLayout'
// import { SectionTitle } from "../../../components/SectionTitle"

import * as React from 'react'
import * as Yup from 'yup'

import { FormInput } from '../../components/Form/FormInput'
import { FormPhone } from '../../components/Form/FormPhone'
import { FormTextArea } from '../../components/Form/FormTextArea'
import { FormInputReadOnly } from '../../components/Form/FormInputReadOnly'

export default function AboutMePortal({ resumeData, resumeExperienceData }:any) {
  const resume = resumeData?.[0]
  const resumeExperience = resumeExperienceData

  const { isOpen: isExperienceOpen, onOpen: onExperienceOpen, onClose: onExperienceClose } = useDisclosure()
  const { isOpen: isEducationOpen, onOpen: onEducationOpen, onClose: onEducationClose } = useDisclosure()

    const toast = useToast()

  const boxShadow = useColorModeValue('bsBoldBlue', 'bsBoldWhite')
  const primeWhite = useColorModeValue('primary', 'white')

  const onSubmit =  async (values: any, actions: any) => {
    let avatar = resume.avatar

    const findFileName = ({ name }: any) => name === 'file'
    const form = document.querySelector('form') as any
    const fileInput = Array.from(form.elements).find(findFileName) as any

    const formData = new FormData()

    for ( const file of fileInput.files ) {
        formData.append('file', file)
        formData.append('upload_preset', 'donaldlouch')

        const thumbnailData = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
        }).then(r => r.json())

        const submitMediaData = {
            mediaPublicID: thumbnailData.public_id,
            mediaSignature: thumbnailData.signature,
            mediaKind: thumbnailData.resource_type,
            mediaTitle: thumbnailData.original_filename,
            mediaExtension: thumbnailData.format,
            mediaPath: thumbnailData.secure_url,
            mediaSize: thumbnailData.bytes,
            mediaDimensions: `${thumbnailData.width}px x ${thumbnailData.height}px`,
          }
      
          if (submitMediaData) {
            await addMedia(submitMediaData)
          }

          avatar = thumbnailData.secure_url
    }

    const updateResumeData = {
        id: values.id,

        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        pronouns: values.pronouns,
        currentAge: values.currentAge,
        address: values.address,
        email: values.email,
        phone: values.phone,
        linkedin: values.linkedin,
        bioExcerpt: values.bioExcerpt,
        profile: values.profile,
        skills: values.skills,
        avatar: avatar,

        lastUpdatedOn: new Date()
      }
      await updateResume(updateResumeData)

      actions.setSubmitting(false)
  }

  const onSubmitExperience =  async (values: any, actions: any) => {
    const ExperienceData = {
      company: values.company,
      position: values.position,
      startDate: values.startDate,
      endDate: values.endDate,
      description: values.description,
    }
    await addExperience(ExperienceData)

    actions.setSubmitting(false)
  }

  const onSubmitEducation =  async (values: any, actions: any) => {
    const EducationData = {
      school: values.school,
      degree: values.degree,
      startDate: values.startDate,
      endDate: values.endDate,
      description: values.description,
    }
    await addEducation(EducationData)

    actions.setSubmitting(false)
  }

  async function addMedia(submitMediaData: any) {
    const response = await fetch('/api/media/addMedia', {
      method: 'POST',
      body: JSON.stringify(submitMediaData)
    })
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
      return await response.json()
  }

  async function addExperience(ExperienceData: any) {
    const response = await fetch('/api/resume/addExperience', {
      method: 'POST',
      body: JSON.stringify(ExperienceData)
    })
  
    if (response.ok) {
      toast({
        title: "Work Experience Added 🎉",
        description: `You've successfully a new work experience!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }

    if (response.status === 500) {
      toast({
        title: "An Error Occurred",
        description: "It seems like an error occurred while trying to the new work experience. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }

      return await response.json()
  }
  
  async function addEducation(EducationData: any) {
    const response = await fetch('/api/resume/addEducation', {
      method: 'POST',
      body: JSON.stringify(EducationData)
    })
  
    if (response.ok) {
      toast({
        title: "Education Added 🎉",
        description: `You've successfully a new education!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }

    if (response.status === 500) {
      toast({
        title: "An Error Occurred",
        description: "It seems like an error occurred while trying to the new education. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }

      return await response.json()
  }
  
  async function updateResume(updateResumeData: any) {
    const response = await fetch('/api/resume/updateResume', {
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
      id: resume.id,

      firstName: resume.firstName,
      middleName: resume.middleName,
      lastName: resume.lastName,
      pronouns: resume.pronouns,
      currentAge: resume.currentAge,
      address: resume.address,
      email: resume.email,
      phone: resume.phone,
      linkedin: resume.linkedin,
      bioExcerpt: resume.bioExcerpt,
      profile: resume.profile,
      skills: resume.skills,
    }

    const initialValuesExperience = {}
    
    const initialValuesEducation = {}
    
      const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        middleName: Yup.string().required('Middle Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        pronouns: Yup.string().required('Pronouns is required'),
        currentAge: Yup.number().required('Age is required'),
        address: Yup.string().required('Address is required'),
        email: Yup.string().email().required('Email is required'),
        phone: Yup.string().required('Phone Number is required'),
        linkedin: Yup.string().required('LinkedIn is required'),
        bioExcerpt: Yup.string().max(300, 'Bio Excerpt cannot exceed 300 characters.').required('Bio Excerpt is required'),
        profile: Yup.string().required('Profile is required'),
        skills: Yup.string().required('Skills is required'),
      })
      
      const validationSchemaExperience = Yup.object({
        company: Yup.string().required('Company is required'),
        position: Yup.string().required('Position is required'),
        startDate: Yup.string().required('Start Date is required'),
        // endDate: Yup.string().required('End Date is required'),
        description: Yup.string().required('Description is required'),
      })

      const validationSchemaEducation = Yup.object({
        school: Yup.string().required('School is required'),
        degree: Yup.string().required('Degree is required'),
        startDate: Yup.string().required('Start Date is required'),
        endDate: Yup.string().required('End Date is required'),
      })

      // const postedData = new Date(post.postedOn)
      // const postedDay = postedData.toLocaleDateString()
      // const postedTime = postedData.toLocaleTimeString()

      // const postedOnString = postedDay +" at " + postedTime
    

    return (
        <>  
            <PortalLayout pageTitle={`Edit: Resume Page`}>
                <Metadata
                    title={`${process.env.WEBSITE_NAME} | Edit: Resume Page`}
                    keywords={`${process.env.KEYWORDS}`}
                    description={`${process.env.DESCRIPTION}`}
                    />
                    <Box as="main" id="editAbout" color="black">
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {({ handleSubmit }: any) => (
                        <Stack as="form" onSubmit={handleSubmit as any}>
                            <FormInputReadOnly inputID="id" inputLabel="" inputType="hidden" />
                          
                            <HStack spacing="2rem">
                                <FormInput inputID="firstName" inputLabel="First Name" inputType="text" />
                                <FormInput inputID="middleName" inputLabel="Middle Name" inputType="text" />
                                <FormInput inputID="lastName" inputLabel="Last Name" inputType="text" />
                            </HStack>
                            
                            <FormInput inputID="pronouns" inputLabel="Pronouns" inputType="text" />
                            
                            <FormInput inputID="currentAge" inputLabel="Current Age" inputType="number" />
                            
                            <FormInput inputID="address" inputLabel="Address" inputType="text" />

                            <HStack spacing="2rem">
                              <FormInput inputID="email" inputLabel="Email Address" inputType="email" />
                              <FormPhone inputID="phone" inputLabel="Phone Number" />
                            </HStack>

                            <FormInput inputID="linkedin" inputLabel="LinkedIn" inputType="text" />

                            <FormTextArea inputID="bioExcerpt" inputLabel="Biography Excerpt" textRows={4} />

                            <FormTextArea inputID="profile" inputLabel="Profile" textRows={10} />

                            <FormTextArea inputID="skills" inputLabel="Skills" textRows={10} />
                            
                            <Box
                              boxShadow={boxShadow}
                              _focus={{boxShadow: "bsBoldOrange"}}
                              _invalid={{boxShadow: "bsBoldRed"}}
                              p="1.5rem 2rem"
                              color={primeWhite}
                              borderRadius="0 2rem 0 2rem"
                              m="1.5rem 0"
                            >
                              <Heading as="h2" fontSize="1.5rem" color={primeWhite} mb="0.5rem">Update Avatar</Heading>
                              <input type="file" name="file" id="file" />
                            </Box>
                            
                            <SubmitButton variant="blackFormButton">Update Resume Page</SubmitButton> 
                        </Stack>
                        )}
                    </Formik>
                    <Button onClick={onExperienceOpen}>Add Experience</Button>

                    <Modal isOpen={isExperienceOpen} onClose={onExperienceClose} id="addExperience" size="3xl">
                      <ModalContent>
                        <ModalHeader>Add Experience</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        </ModalBody>
                          <Formik initialValues={initialValuesExperience} onSubmit={onSubmitExperience} validationSchema={validationSchemaExperience}>
                          {({ handleSubmit }: any) => (
                            <Stack as="form" onSubmit={handleSubmit as any} px="1rem">
                              
                                <HStack spacing="2rem">
                                    <FormInput inputID="company" inputLabel="Company" inputType="text" />
                                    <FormInput inputID="position" inputLabel="Position" inputType="text" />
                                </HStack>
                                
                                <HStack spacing="2rem">
                                    <FormInput inputID="startDate" inputLabel="Start Date" inputType="datetime-local" />
                                    <FormInput inputID="endDate" inputLabel="End Date" inputType="datetime-local" />
                                </HStack>
                                
                                <FormTextArea inputID="description" inputLabel="Description" textRows={4} />

                                <SubmitButton variant="blackFormButton">Add Experience</SubmitButton> 
                            </Stack>
                            )}
                        </Formik>

                        <ModalFooter>
                          <Button colorScheme='blue' mr={3} onClick={onExperienceClose}>
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    <Button onClick={onEducationOpen}>Add Education</Button>
                    <Modal isOpen={isEducationOpen} onClose={onEducationClose} id="addEduction" size="3xl">
                      <ModalContent>
                        <ModalHeader>Add Education</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        </ModalBody>
                          <Formik initialValues={initialValuesEducation} onSubmit={onSubmitEducation} validationSchema={validationSchemaEducation}>
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

                        <ModalFooter>
                          <Button colorScheme='blue' mr={3} onClick={onEducationClose}>
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    <Stack m="2rem">
                      {resumeExperience?.map((experience: any) => (
                        <>
                          <Link key={experience.id} variant="primary" href={`resumeEdit/${experience.id}`}>{experience.company}</Link>
                        </>
                      ))}
                    </Stack>

                    </Box>
            </PortalLayout>
        </>
    )
}


export async function getServerSideProps() {
    const resumeData = await prisma.resume.findMany({})
    const resumeExperienceData = await prisma.resumeWorkExperience.findMany({
      orderBy: {startDate: "desc"},
    })

    return { 
        props: { 
          resumeData: JSON.parse(JSON.stringify(resumeData)),
          resumeExperienceData: JSON.parse(JSON.stringify(resumeExperienceData))
        } 
    }
}