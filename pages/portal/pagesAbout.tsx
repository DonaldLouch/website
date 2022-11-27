import { 
    Stack, 
    HStack,
    useToast,
    Box, 
    Heading,
    useColorModeValue
} from '@chakra-ui/react'

import { Formik } from 'formik'
import {
    SubmitButton
} from 'formik-chakra-ui'

import prisma from '../../lib/prisma'

import {Metadata} from "../../components/Metadata"


import PortalLayout from '../../components/Portal/PortalLayout'
// import { SectionTitle } from "../../../components/SectionTitle"

import * as React from 'react'
import * as Yup from 'yup'

import { FormInput } from '../../components/Form/FormInput'
import { FormTextArea } from '../../components/Form/FormTextArea'
import { FormInputReadOnly } from '../../components/Form/FormInputReadOnly'

export default function AboutMePortal({ aboutData }:any) {
    const about = aboutData?.[0]
    // console.log(post.body)

    const toast = useToast()

  const boxShadow = useColorModeValue('bsBoldBlue', 'bsBoldWhite')
  const primeWhite = useColorModeValue('primary', 'white')

  const onSubmit =  async (values: any, actions: any) => {
    let avatar = about.avatar

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

    const updateAboutData = {
        id: values.id,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        currentAge: values.currentAge,
        city: values.city,
        province: values.province,
        country: values.country,
        tagLine: values.tagLine,
        bio: values.bio,
        email: values.email,
        avatar: avatar,
        pronouns: values.pronouns,
        bioExcerpt: values.bioExcerpt,
        lastUpdatedOn: new Date()
      }
      await updateAbout(updateAboutData)

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
  
  async function updateAbout(updateAboutData: any) {
    const response = await fetch('/api/updateAbout', {
      method: 'POST',
      body: JSON.stringify(updateAboutData)
    })
    
    if (response.ok) {
        toast({
          title: "About Me Page Updated 🎉",
          description: `You've successfully updated the About Me page!`,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
      if (response.status === 500) {
        toast({
          title: "An Error Occurred",
          description: "It seems like an error occurred while trying to update the About Me page. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
  }
  
    const initialValues = {
      id: about.id,

      firstName: about.firstName,
      middleName: about.middleName,
      lastName: about.lastName,
      currentAge: about.currentAge,
      city: about.city,
      province: about.province,
      country: about.country,
      tagLine: about.tagLine,
      bio: about.bio,
      email: about.email,
      pronouns: about.pronouns,
      bioExcerpt: about.bioExcerpt,
      }
    
      const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        middleName: Yup.string().required('Middle Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        currentAge: Yup.number().required('Age is required'),
        city: Yup.string().required('City is required'),
        province: Yup.string().required('Province is required'),
        country: Yup.string().required('Country is required'),
        tagLine: Yup.string().required('Tag Line is required'),
        bio: Yup.string().required('Bio is required'),
        pronouns: Yup.string().required('Pronouns is required'),
        bioExcerpt: Yup.string().max(300, 'Bio Excerpt cannot exceed 300 characters.').required('Bio Excerpt is required'),
        email: Yup.string().email().required('Email is required'),
      })
      // const postedData = new Date(post.postedOn)
      // const postedDay = postedData.toLocaleDateString()
      // const postedTime = postedData.toLocaleTimeString()

      // const postedOnString = postedDay +" at " + postedTime
    

    return (
        <>  
            <PortalLayout pageTitle={`Edit: About Me Page`}>
                <Metadata
                    title={`Edit: About Me Page | ${process.env.WEBSITE_NAME}`}
                    keywords={`${process.env.KEYWORDS}, portal, edit, admin`}
                    description={`Edit the About Me page on the ${process.env.WEBSITE_NAME} portal.`}
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
                            
                            <HStack spacing="2rem">
                                <FormInput inputID="city" inputLabel="City" inputType="text" />
                                <FormInput inputID="province" inputLabel="Province" inputType="text" />
                                <FormInput inputID="country" inputLabel="Country" inputType="text" />
                            </HStack>

                            <FormInput inputID="tagLine" inputLabel="Tag Line" inputType="text" />

                            <FormTextArea inputID="bio" inputLabel="Biography" textRows={10} />

                            <FormTextArea inputID="bioExcerpt" inputLabel="Biography Excerpt" textRows={4} />

                            <FormInput inputID="email" inputLabel="Email Address" inputType="email" />
                            
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
                            
                            <SubmitButton variant="blackFormButton">Update About Page</SubmitButton> 
                        </Stack>
                        )}
                    </Formik>
                    </Box>
            </PortalLayout>
        </>
    )
}


export async function getServerSideProps() {

    const aboutData = await prisma.about.findMany({})

    return { 
        props: { 
            aboutData: JSON.parse(JSON.stringify(aboutData))
        } 
    }
}