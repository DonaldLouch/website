'use client'

import FormInput from "@/app/(Components)/(Form)/FormInput"
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly"
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow"
import { FormPhoneRow } from "@/app/(Components)/(Form)/FormPhoneRow"
import { FormTextAreaRow } from "@/app/(Components)/(Form)/FormTextAreaRow"
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import supabase from "@/lib/supabase"
import { Box, Button, Heading, Stack, useToast } from "@chakra-ui/react"
import { Formik } from "formik"
import { SubmitButton } from "formik-chakra-ui"
import * as Yup from 'yup'

export default function EditResumePage({ resume }: any) {
  const toast = useToast()
  const toastID = "toastID"
  
  const breadCrumbs = [
    {"pageLink": "/admin/pages", "pageName": "Page Manager"},
    {"pageLink": "/admin/pagesResume", "pageName": "Edit: Resume Page"}
  ]

  const onSubmit =  async (values: any, actions: any) => {
    let avatar = resume.avatar

    const findFileName = ({ name }: any) => name === 'file'
    const form = document.querySelector('form') as any
    const fileInput = Array.from(form.elements).find(findFileName) as any

    const formData = new FormData()

    for ( const file of fileInput.files ) {
      formData.append('file', file)
      formData.append('upload_preset', 'thumbnail')

      const thumbnailData = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`, {
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
      const response = await fetch('/api/media/newMedia', {
        method: 'POST',
        body: JSON.stringify(submitMediaData),
      })
      avatar = response ? thumbnailData.secure_url : avatar
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
    const { status: supabaseStatus , error: supabaseError } = await supabase.from("Resume").update({ 
      firstName: updateResumeData.firstName,
      middleName: updateResumeData.middleName,
      lastName: updateResumeData.lastName,
      pronouns: updateResumeData.pronouns,
      currentAge: updateResumeData.currentAge,
      address: updateResumeData.address,
      email: updateResumeData.email,
      phone: updateResumeData.phone,
      linkedin: updateResumeData.linkedin,
      bioExcerpt: updateResumeData.bioExcerpt,
      profile: updateResumeData.profile,
      skills: updateResumeData.skills,
      avatar: updateResumeData.avatar,
      lastUpdatedOn: updateResumeData.lastUpdatedOn 
    }).eq('id', updateResumeData.id)
    // console.log(supabaseStatus)
    supabaseStatus && !toast.isActive(toastID) &&
      toast({
          id: toastID,
          title: `${supabaseStatus === 204 ? "Page Updated 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
          description: `${supabaseStatus === 204 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
          status: `${supabaseStatus === 204 ? "success" : "error"}`,
          duration: 9000,
          isClosable: true,
      })
      actions.setSubmitting(false)
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

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box as="main" id="homeWrapper" color="white">
        <Button as="a" href={`/portfolio/resume`} variant="primary" background="primary" color="white" my="1rem !important">View Resume Page</Button>
        <Button as="a" href={`/admin/pagesResumeExperience`} variant="primary" background="primary" color="white" my="1rem !important">Resume Experience Manager &rarr;</Button>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }: any) => (
            <Stack as="form" onSubmit={handleSubmit as any} rowGap="2.5rem" mb="2rem">
              <FormInputReadOnly inputID="id" inputLabel="" inputType="hidden" />
                          
              <Stack direction="row" spacing="2rem">
                  <FormInputRow inputID="firstName" inputLabel="First Name" inputType="text" />
                  <FormInputRow inputID="middleName" inputLabel="Middle Name" inputType="text" />
                  <FormInputRow inputID="lastName" inputLabel="Last Name" inputType="text" />
              </Stack>
              
              <FormInput inputID="pronouns" inputLabel="Pronouns" inputType="text" />
              
              <FormInput inputID="currentAge" inputLabel="Current Age" inputType="number" />
              
              <FormInput inputID="address" inputLabel="Address" inputType="text" />

              <Stack direction="row" spacing="2rem">
                <FormInputRow inputID="email" inputLabel="Email Address" inputType="email" />
                <FormPhoneRow inputID="phone" inputLabel="Phone Number" />
              </Stack>

              <FormInput inputID="linkedin" inputLabel="LinkedIn" inputType="text" />

              <FormTextAreaRow inputID="bioExcerpt" inputLabel="Biography Excerpt" textRows={4} />

              <FormTextAreaRow inputID="profile" inputLabel="Profile" textRows={10} />

              <FormTextAreaRow inputID="skills" inputLabel="Skills" textRows={10} />

              <Box
                boxShadow="bsBoldSecondary"
                _focus={{boxShadow: "bsBoldSecondary"}}
                _invalid={{boxShadow: "bsBoldRed"}}
                p="1.5rem 2rem"
                color="white"
                borderRadius="0 2rem"
                m="0rem 0 1.5rem"
              >
                <Heading as="h2" fontSize="1.5rem" color="white" mb="0.5rem">Update Avatar</Heading>
                <input type="file" name="file" id="file" />
              </Box>

              <SubmitButton variant="blackFormButton">Update Resume Page</SubmitButton> 
            </Stack>
            )}
        </Formik>
      </Box>
    </>
  )
}
