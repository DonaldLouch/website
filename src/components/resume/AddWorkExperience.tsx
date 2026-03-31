import z from "zod/v4"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import { useDisclosure } from "@mantine/hooks"
import { Box, Modal, SimpleGrid, Stack } from "@mantine/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import EditWorkHistory from "./EditWorkHistory"
import { notifications } from "@mantine/notifications"
import { useRouter } from "@tanstack/react-router"
import PrimaryButton from "../buttons/PrimaryButton"
import { SectionCard } from "../cards/SectionCard"
import FormDatePicker from "../form/FormDatePicker"
import FormInput from "../form/FormInput"
import FormSubmitButton from "../form/FormSubmitButton"
import FormTextArea from "../form/FormTextArea"
import { UpdateResume_Time } from "@/actions/database/UpdateDatabase.functions"
import { AddResumeWorkHistory } from "@/actions/database/AddDatabase.functions"

export default function AddWorkExperience({ company, experienceID, resumeID }: any) {
  const router = useRouter()

  const [opened, { open, close }] = useDisclosure(false)
  
  const onSubmit =  async (values: any) => {
    const id = "workExperience"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
    const data = {
      id,
      position: values.position,
      startDate: values.startDate ? new Date(values.startDate) : null,
      endDate: values.endDate ? new Date(values.endDate) : null,
      description: values.description,
      workID: experienceID
    }
    const res = await AddResumeWorkHistory({ data: { values: data } })
    res.success && await UpdateResume_Time({ data: { id: resumeID }})

    res && notifications.show({
      id: `AddNewPosition${values.company}`,
      title: `${res.success ? `Added New History For ${values.company} 🎉` : `Error #${res.error?.code} has Occurred`}`,
      message: `${res.success ? `You have successfully updated the resume information!` : `An error has occurred: ${res.error?.message}. ${res.error?.hint && `${res.error?.hint}.`}`}`,
      color: res.success ? "green.0" : "red",
      icon: res.success ? <FontAwesomeIcon icon={["fal", "badge-check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
    })
    res.success && router.invalidate()

    console.log(res, data)
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
    <PrimaryButton onClick={open} icon={{ name: "plus" }} colour="green" fontColour="black">Add New History Experience</PrimaryButton>
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
