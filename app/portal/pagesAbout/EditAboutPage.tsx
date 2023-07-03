'use client'

import { FormInput } from "@/app/(Components)/(Form)/FormInput"
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly"
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow"
import { FormTextAreaRow } from "@/app/(Components)/(Form)/FormTextAreaRow"
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import supabase from "@/lib/supabase"
import { Box, Button, Heading, Stack, useToast } from "@chakra-ui/react"
import { Formik } from "formik"
import { SubmitButton } from "formik-chakra-ui"
import * as Yup from 'yup'

export default function EditAboutPage({ about }: any) {
  const toast = useToast()
  const toastID = "toastID"
  
  const breadCrumbs = [
    {"pageLink": "/portal/pages", "pageName": "Page Manager"},
    {"pageLink": "/portal/pagesAbout", "pageName": "Edit: About Me Page"}
  ]

  // const { data: about } = await supabase.from('About').select().single() as any

  const onSubmit =  async (values: any, actions: any) => {
    let avatar = about.avatar

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
    const { status: supabaseStatus , error: supabaseError } = await supabase.from("About").update({ 
      firstName: updateAboutData.firstName,
      middleName: updateAboutData.middleName,
      lastName: updateAboutData.lastName,
      currentAge: updateAboutData.currentAge,
      city: updateAboutData.city,
      province: updateAboutData.province,
      country: updateAboutData.country,
      tagLine: updateAboutData.tagLine,
      bio: updateAboutData.bio,
      email: updateAboutData.email,
      avatar: updateAboutData.avatar,
      pronouns: updateAboutData.pronouns,
      bioExcerpt: updateAboutData.bioExcerpt,
      lastUpdatedOn: updateAboutData.lastUpdatedOn 
    }).eq('id', updateAboutData.id)
    console.log(supabaseStatus)
    supabaseStatus && !toast.isActive(toastID) &&
      toast({
          id: toastID,
          title: `${supabaseStatus === 204 ? "Page Updated 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
          description: `${supabaseStatus === 204 ? `You have successfully updated the About Me page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
          status: `${supabaseStatus === 204 ? "success" : "error"}`,
          duration: 9000,
          isClosable: true,
      })
      actions.setSubmitting(false)
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

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box as="main" id="homeWrapper" color="white">
        <Button as="a" href={`/about`} variant="primary" background="primary" color="white" my="1rem !important">View About Me Page</Button>
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

              <Stack direction="row" spacing="2rem">
                <FormInputRow inputID="city" inputLabel="City" inputType="text" />
                <FormInputRow inputID="province" inputLabel="Province" inputType="text" />
                <FormInputRow inputID="country" inputLabel="Country" inputType="text" />
              </Stack>

              <FormInput inputID="tagLine" inputLabel="Tag Line" inputType="text" />

              <FormTextAreaRow inputID="bio" inputLabel="Biography" textRows={10} />

              <FormTextAreaRow inputID="bioExcerpt" inputLabel="Biography Excerpt" textRows={4} />

              <FormInput inputID="email" inputLabel="Email Address" inputType="email" />
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

              <SubmitButton variant="blackFormButton">Update About Page</SubmitButton> 
            </Stack>
            )}
        </Formik>
      </Box>
    </>
  )
}
