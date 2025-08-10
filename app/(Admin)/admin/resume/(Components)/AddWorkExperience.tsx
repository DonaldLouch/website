'use client'

import { SectionTitle } from "@/app/(Components)/SectionTitle"
import supabase from "@/lib/supabase"

import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import { useRouter } from "next/navigation"
import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"
import z from "zod/v4"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import { useDisclosure } from "@mantine/hooks"
import { Box, Modal, SimpleGrid, Stack } from "@mantine/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormInput from "@/app/(Components)/(Form)/FormInput"
import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker"
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import { useEffect, useState } from "react"
import EditWorkHistory from "./EditWorkHistory"
import { notifications } from "@mantine/notifications"

export default function AddWorkExperience({ company, experienceID, resumeID }: any) {
  const router = useRouter()

  const [opened, { open, close }] = useDisclosure(false)
  
  const onSubmit =  async (values: any) => {
    const id = "workExperience"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()

    const { status: supabaseStatus , error: supabaseError  } = await supabase.from("ResumeWorkExperience").insert({
      id,
      company: values.company,
      position: values.position,
      startDate: values.startDate,
      endDate: values.endDate,
      description: values.description,
    })
   
    await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })
   
    supabaseStatus && notifications.show({
      id: `AddNewPosition${values.company}`,
      title: `${supabaseStatus === 201 ? `Added New History For ${values.company} 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
      message: `${supabaseStatus === 201 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
      color: supabaseStatus === 201 ? "green.0" : "red",
      icon: supabaseStatus === 201 ? <FontAwesomeIcon icon={["fal", "badge-check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
    })
    supabaseStatus === 201 && router.refresh()
  }

  const initialValues = {
    company: company
  }
   const schema = z.object({})

    const form = useForm({
      mode: 'controlled',
      initialValues,
      validate: zodResolver(schema)
    })

  return <>
    <PrimaryButton onClick={open} primNewIcon={{ name: "plus" }} colour="green" fontColour="black">Add New History Experience</PrimaryButton>
    <Modal
      opened={opened} onClose={close} title="Add New History Experience" yOffset="2rem" xOffset="2rem" size="100%"
      overlayProps={{
        backgroundOpacity: 0.5, 
        blur: 4,
      }} 
      styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
      radius="lg"
    >
        <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
          <SectionCard styleType="primaryCard" m="2rem 0">
            <SimpleGrid cols={2} spacing="2rem">
              <FormInput inputID="company" inputLabel="Company" {...form.getInputProps('company')} icon={<FontAwesomeIcon icon={["fal", "briefcase-blank"]} />} isRequired />
              <FormInput inputID="position" inputLabel="Position" {...form.getInputProps('position')} icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
            </SimpleGrid>
          </SectionCard>

          <SectionCard styleType="primaryCard" m="2rem 0">
            <SimpleGrid cols={2} spacing="2rem">
              <FormDatePicker dateLabel="Started On" datePlaceholder="When did you start?" {...form.getInputProps('startDate')} />
              <FormDatePicker dateLabel="End On" datePlaceholder="When did you end?" {...form.getInputProps('endDate')} />
            </SimpleGrid>
          </SectionCard>

          <SectionCard styleType="primaryCard" m="2rem 0">
            <FormTextArea inputID="description" inputLabel="Description" {...form.getInputProps('description')} textRows={4} icon={<FontAwesomeIcon icon={["fal", "quote-left"]} />} isRequired />
          </SectionCard>
          <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "pen"]} />} isNotFull>Add New Position Information</FormSubmitButton>

        </Box>
    </Modal>
  </>
}
