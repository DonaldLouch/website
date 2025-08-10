'use client'

import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton"
import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker"
import FormInput from "@/app/(Components)/(Form)/FormInput"
import FormInputPhone from "@/app/(Components)/(Form)/FormInputPhone"
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, SimpleGrid } from "@mantine/core"
import { Form, useForm } from "@mantine/form"
// import supabase from "@/lib/supabase"

// import * as Yup from 'yup'

import { z } from 'zod/v4';
import { zodResolver } from 'mantine-form-zod-resolver';
import FormNumber from "@/app/(Components)/(Form)/FormNumber"
import { notifications } from "@mantine/notifications"
import { useRouter } from "next/navigation"
import supabase from "@/lib/supabase"
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"

export default function EditAboutPage( { about }: any ) {
  // { about }: any
  // const toast = useToast()
  // const toastID = "toastID"

  const router = useRouter()
  
  const breadCrumbs = [
    {"pageLink": "/admin/pages", "pageName": "Page Manager"},
    {"pageLink": "/admin/pagesAbout", "pageName": "Edit: About Me Page"}
  ]

  const onSubmit =  async (values: any) => {
    let avatar = about.avatar

  //   const findFileName = ({ name }: any) => name === 'file'
  //   const form = document.querySelector('form') as any
  //   const fileInput = Array.from(form.elements).find(findFileName) as any

  //   const formData = new FormData()

  //   for ( const file of fileInput.files ) {
  //     formData.append('file', file)
  //     formData.append('upload_preset', 'thumbnail')

  //     // const thumbnailData = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`, {
  //     //   method: 'POST',
  //     //   body: formData
  //     // }).then(r => r.json())

  //     // const submitMediaData = {
  //     //   mediaPublicID: thumbnailData.public_id,
  //     //   mediaSignature: thumbnailData.signature,
  //     //   mediaKind: thumbnailData.resource_type,
  //     //   mediaTitle: thumbnailData.original_filename,
  //     //   mediaExtension: thumbnailData.format,
  //     //   mediaPath: thumbnailData.secure_url,
  //     //   mediaSize: thumbnailData.bytes,
  //     //   mediaDimensions: `${thumbnailData.width}px x ${thumbnailData.height}px`,
  //     // }
  //     // const response = await fetch('/api/media/newMedia', {
  //     //   method: 'POST',
  //     //   body: JSON.stringify(submitMediaData),
  //     // })
  //     // avatar = response ? thumbnailData.secure_url : avatar
  //     avatar
  //   }

    const { status: supabaseStatus , error: supabaseError } = await supabase.from("About").update({ 
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
    }).eq('id', about.id)
    supabaseStatus && notifications.show({
      id: `EditAbout`,
      title: `${supabaseStatus === 204 ? "About Me Information Updated 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
      message: `${supabaseStatus === 204 ? `You have successfully updated the About Me information!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
      color: supabaseStatus === 204 ? "green.0" : "red",
      icon: supabaseStatus === 204 ? <FontAwesomeIcon icon={["fal", "badge-check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
    })
    supabaseStatus === 204 && router.refresh()
  }

  const initialValues = {
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

  const schema = z.object({
    // firstName: z.string().min(2).max(100).required({error: 'First Name is required'}),
    // middleName: z.string().min(2).max(100).required({error: 'Middle Name is required'}),
    // lastName: z.string().min(2).max(100).required({error: 'Last Name is required'}),
    // currentAge: z.number().min(0).required({error: 'Age is required'}),
    // city: z.string().min(2).max(100).required({error: 'City is required'}),
    // province: z.string().min(2).max(100).required({error: 'Province is required'}),
    // country: z.string().required({error: 'Country is required'}),
    // tagLine: z.string().required({error: 'Tag Line is required'}),
    // bio: z.string().required({error: 'Bio is required'}),
    // pronouns: z.string().required({error: 'Pronouns is required'}),
    // bioExcerpt: z.string().max(300, {error: 'Bio Excerpt cannot exceed 300 characters.'}).required({error: 'Bio Excerpt is required'}),
    // email: z.string().email().required({error: 'Email is required'}),
  })

  const form = useForm({
    mode: 'controlled',
    initialValues,
    validate: zodResolver(schema)
  })

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <PrimaryLinkedButton link="/" primNewIcon={{name: "house", pack: "fajr"}}>View Home Page</PrimaryLinkedButton>
      <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
        <SectionCard styleType="primaryCard" m="2rem 0">
          <SimpleGrid cols={3} spacing="2rem">
            <FormInput inputID="firstName" inputLabel="First Name" {...form.getInputProps('firstName')} icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
            <FormInput inputID="middleName" inputLabel="Middle Name" {...form.getInputProps('middleName')} icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} />
            <FormInput inputID="lastName" inputLabel="Last Name" {...form.getInputProps('lastName')} icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
          </SimpleGrid>
        </SectionCard>
        
        <SectionCard styleType="primaryCard" m="2rem 0">
          <FormInput inputID="pronouns" inputLabel="Pronouns" inputDescription="Please specify your preferred pronoun(s)" {...form.getInputProps('pronouns')} icon={<FontAwesomeIcon icon={["fal", "id-badge"]} />} isRequired />
          <FormNumber inputID="currentAge" inputLabel="Current Age" inputDescription="Please enter your current age" {...form.getInputProps('currentAge')} icon={<FontAwesomeIcon icon={["fal", "hashtag"]} />} isRequired />
        </SectionCard>

        <SectionCard styleType="primaryCard" m="2rem 0">
          <SimpleGrid cols={3} spacing="2rem">
            <FormInput inputID="city" inputLabel="City" {...form.getInputProps('city')} icon={<FontAwesomeIcon icon={["fal", "map-marker-smile"]} />} isRequired />
            <FormInput inputID="province" inputLabel="Province" {...form.getInputProps('province')} icon={<FontAwesomeIcon icon={["fal", "map-marker-smile"]} />} isRequired />
            <FormInput inputID="country" inputLabel="Country" {...form.getInputProps('country')} icon={<FontAwesomeIcon icon={["fal", "globe"]} />} isRequired />
          </SimpleGrid>
        </SectionCard>
        
        <SectionCard styleType="primaryCard" m="2rem 0">
          <FormInput inputID="tagLine" inputLabel="Tag Line" {...form.getInputProps('tagLine')} icon={<FontAwesomeIcon icon={["fal", "quote-left"]} />} isRequired />
          <FormTextArea inputID="bio" inputLabel="Biography" {...form.getInputProps('bio')} textRows={10} icon={<FontAwesomeIcon icon={["fal", "pen"]} />} isRequired />
          <FormTextArea inputID="bioExcerpt" inputLabel="Biography Excerpt" {...form.getInputProps('bioExcerpt')} textRows={4} icon={<FontAwesomeIcon icon={["fal", "quote-left"]} />} isRequired />
        </SectionCard>

        <SectionCard styleType="primaryCard" m="2rem 0">
          <FormInput inputID="email" inputLabel="Email Address" {...form.getInputProps('email')} icon={<FontAwesomeIcon icon={["fal", "envelope"]} />} isRequired />
        </SectionCard>

        {/* TODO: Thumbnail Update */}

        <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "pen"]} />}>Update About Me Information</FormSubmitButton>
      </Box>
    </>
  )
}