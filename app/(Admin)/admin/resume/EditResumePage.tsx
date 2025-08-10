'use client'

import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton"
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import FormInput from "@/app/(Components)/(Form)/FormInput"
import FormInputPhone from "@/app/(Components)/(Form)/FormInputPhone"
import FormNumber from "@/app/(Components)/(Form)/FormNumber"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { SectionTitle } from "@/app/(Components)/SectionTitle"
import supabase from "@/lib/supabase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, SimpleGrid, Stack } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { zodResolver } from "mantine-form-zod-resolver"
import { useRouter } from "next/navigation"

import * as Yup from 'yup'
import z from "zod/v4"

import AddWork from "./(Components)/AddWork"
import WorkExperience from "./(Components)/WorkExperience"
import AddEducation from "./(Components)/AddEducation"
import EducationExperience from "./(Components)/EducationExperience"

export default function EditResumePage({ resume, resumeExperience, resumeEducation }: any) {
  // const toast = useToast()
  // const toastID = "toastID"

  const router = useRouter()
  
  const breadCrumbs = [
    {"pageLink": "/admin/pages", "pageName": "Page Manager"},
    {"pageLink": "/admin/pagesResume", "pageName": "Edit: Resume Page"}
  ]

  const onSubmit =  async (values: any) => {
    let avatar = resume.avatar

    // const findFileName = ({ name }: any) => name === 'file'
    // const form = document.querySelector('form') as any
    // const fileInput = Array.from(form.elements).find(findFileName) as any

    // const formData = new FormData()

    // for ( const file of fileInput.files ) {
    //   formData.append('file', file)
    //   formData.append('upload_preset', 'thumbnail')

    //   // const thumbnailData = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`, {
    //   //   method: 'POST',
    //   //   body: formData
    //   // }).then(r => r.json())

    //   // const submitMediaData = {
    //   //   mediaPublicID: thumbnailData.public_id,
    //   //   mediaSignature: thumbnailData.signature,
    //   //   mediaKind: thumbnailData.resource_type,
    //   //   mediaTitle: thumbnailData.original_filename,
    //   //   mediaExtension: thumbnailData.format,
    //   //   mediaPath: thumbnailData.secure_url,
    //   //   mediaSize: thumbnailData.bytes,
    //   //   mediaDimensions: `${thumbnailData.width}px x ${thumbnailData.height}px`,
    //   // }
    //   // const response = await fetch('/api/media/newMedia', {
    //   //   method: 'POST',
    //   //   body: JSON.stringify(submitMediaData),
    //   // })
    //   // avatar = response ? thumbnailData.secure_url : avatar
    //   avatar
    // }
    // const updateResumeData = {
    //   id: values.id,

    //   firstName: values.firstName,
    //   middleName: values.middleName,
    //   lastName: values.lastName,
    //   pronouns: values.pronouns,
    //   currentAge: values.currentAge,
    //   address: values.address,
    //   email: values.email,
    //   phone: values.phone,
    //   linkedin: values.linkedin,
    //   bioExcerpt: values.bioExcerpt,
    //   profile: values.profile,
    //   skills: values.skills,
    //   avatar: avatar,

    //   lastUpdatedOn: new Date()
    // }
    const { status: supabaseStatus , error: supabaseError } = await supabase.from("Resume").update({ 
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
      lastUpdatedOn: values.lastUpdatedOn 
    }).eq('id', resume.id)
    supabaseStatus && notifications.show({
      id: `EditResume`,
      title: `${supabaseStatus === 204 ? "Resume Information Updated 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
      message: `${supabaseStatus === 204 ? `You have successfully updated the resume information!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
      color: supabaseStatus === 204 ? "green.0" : "red",
      icon: supabaseStatus === 204 ? <FontAwesomeIcon icon={["fal", "badge-check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
    })
    supabaseStatus === 204 && router.refresh()
  }

  const initialValues = {
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

  const schema = z.object({
    // firstName: Yup.string().required('First Name is required'),
    // middleName: Yup.string().required('Middle Name is required'),
    // lastName: Yup.string().required('Last Name is required'),
    // pronouns: Yup.string().required('Pronouns is required'),
    // currentAge: Yup.number().required('Age is required'),
    // address: Yup.string().required('Address is required'),
    // email: Yup.string().email().required('Email is required'),
    // phone: Yup.string().required('Phone Number is required'),
    // linkedin: Yup.string().required('LinkedIn is required'),
    // bioExcerpt: Yup.string().max(300, 'Bio Excerpt cannot exceed 300 characters.').required('Bio Excerpt is required'),
    // profile: Yup.string().required('Profile is required'),
    // skills: Yup.string().required('Skills is required'),
  })

  const form = useForm({
    mode: 'controlled',
    initialValues,
    validate: zodResolver(schema)
  })

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <SimpleGrid cols={2} mt="2rem" mb="0">
        <PrimaryLinkedButton link="/portfolio/resume" primNewIcon={{name: "id-badge", pack: "fadl"}}>View Resume Page</PrimaryLinkedButton>
        <PrimaryLinkedButton link="#experienceManager" primNewIcon={{name: "briefcase-blank", pack: "fal"}} isFullWidth colour="primary">Experience Manager</PrimaryLinkedButton>
      </SimpleGrid>
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
          <SimpleGrid cols={2} spacing="2rem">
            <FormInput inputID="email" inputLabel="Email Address" {...form.getInputProps('email')} icon={<FontAwesomeIcon icon={["fajr", "envelope"]} />} isRequired type="email" />
            <FormInputPhone inputID="phone" inputLabel="Phone Number" {...form.getInputProps('phone')} icon={<FontAwesomeIcon icon={["fajr", "phone"]} />} isRequired />
          </SimpleGrid>
        </SectionCard>

        <SectionCard styleType="primaryCard" m="2rem 0">
          <FormInput inputID="linkedin" inputLabel="Linkedin" inputDescription="What is your Linkedin profile link" {...form.getInputProps('linkedin')} icon={<FontAwesomeIcon icon={["fab", "linkedin"]} />} isRequired />
        </SectionCard>
        
        <SectionCard styleType="primaryCard" m="2rem 0">
          <FormTextArea inputID="bioExcerpt" inputLabel="Biography Excerpt" {...form.getInputProps('bioExcerpt')} textRows={4} icon={<FontAwesomeIcon icon={["fal", "quote-left"]} />} isRequired />
        </SectionCard>

        <SectionCard styleType="primaryCard" m="2rem 0">
          <FormTextArea inputID="profile" inputLabel="Profile" {...form.getInputProps('profile')} textRows={4} icon={<FontAwesomeIcon icon={["fal", "quote-left"]} />} isRequired />
          <FormTextArea inputID="skills" inputLabel="Skills" {...form.getInputProps('skills')} textRows={4} icon={<FontAwesomeIcon icon={["fal", "quote-left"]} />} isRequired />
        </SectionCard>
        {/* TODO: Thumbnail Update */}
        <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "pen"]} />}>Update Resume Information</FormSubmitButton>
      </Box>
      <SectionTitle headingTitle="Experience Manager" id="experienceManager" />
      <SimpleGrid cols={2} my="1rem" spacing="2rem">
        <Stack gap="1rem">
          <SectionTitle headingTitle="Work Experience"/>
          <AddWork resumeID={resume.id} />
          {resumeExperience?.map((experience: any) => ( <WorkExperience experience={experience} resumeID={resume.id} /> ))}
        </Stack>
        <Stack gap="1rem">
          <SectionTitle headingTitle="Education"/>
          <AddEducation resumeID={resume.id} />
          {resumeEducation?.map((education: any) => ( <EducationExperience education={education} resumeID={resume.id} /> ))}
        </Stack>
      </SimpleGrid>
    </>
  )
}
