'use client'

import supabase from "@/lib/supabase"

import { useRouter } from "next/navigation"
import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"
import { Box, Modal, SimpleGrid } from "@mantine/core"
import z from "zod/v4"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import { useDisclosure } from "@mantine/hooks"
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import FormInput from "@/app/(Components)/(Form)/FormInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import FormNumber from "@/app/(Components)/(Form)/FormNumber"
import { notifications } from "@mantine/notifications"

export default function EducationExperience({ education, resumeID }: any) {
  const router = useRouter()

  const [opened, { open, close }] = useDisclosure(false)

  const deleteEducation = async () => {
    const { status: deleteStatus, error: deleteError } = await supabase.from("ResumeEducation").delete().eq('id', education.id);
    deleteStatus && notifications.show({
      id: `Delete${education.school}`,
      title: `${deleteStatus === 204 ? `${education.school} Deleted  🗑️` : `Error #${deleteError?.code} has Occurred`}`,
      message: `${deleteStatus === 204 ? `You have successfully deleted the ${education.school} experience` : `An error has occurred: ${deleteError?.message}. ${deleteError?.hint && `${deleteError?.hint}.`}`}`,
      color: deleteStatus === 204 ? "green.0" : "red",
      icon: deleteStatus === 204 ? <FontAwesomeIcon icon={["fal", "trash"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
    })
    deleteStatus === 204 && router.refresh()
  }
  
  const onSubmit =  async (values: any) => {
    const { status: supabaseStatus , error: supabaseError  } = await supabase.from("ResumeEducation").update({
      school: values.school,
      degree: values.degree,
      startDate: values.startDate,
      endDate: values.endDate,
      description: values.description,
    }).match({ id: education.id })

    await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })

    supabaseStatus && notifications.show({
      id: `Edit${values.school}`,
      title: `${supabaseStatus === 204 ? `Updated ${values.school} Experience 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
      message: `${supabaseStatus === 204 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
      color: supabaseStatus === 204 ? "green.0" : "red",
      icon: supabaseStatus === 204 ? <FontAwesomeIcon icon={["fal", "badge-check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
    })
    supabaseStatus === 204 && router.refresh()
  }

  const initialValues = {
    id: education.id,
    school: education.school,
    degree: education.degree,
    startDate: education.startDate,
    endDate: education.endDate,
    description: education.description
  }
  const schema = z.object({})

  const form = useForm({
    mode: 'controlled',
    initialValues,
    validate: zodResolver(schema)
  })

  return <>
    <PrimaryButton key={education.id} onClick={open} primNewIcon={{ name: "graduation-cap" }}>{education.school}</PrimaryButton>
    <Modal
        opened={opened} onClose={close} title={education.school} yOffset="2rem" xOffset="2rem" size="100%"
        overlayProps={{
            backgroundOpacity: 0.5, 
            blur: 4,
        }} 
        styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
        radius="lg"
    >
        <Box p="0 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
          <SectionCard styleType="primaryCard" m="2rem 0">
            <SimpleGrid cols={2} spacing="2rem">
              <FormInput inputID="school" inputLabel="School" {...form.getInputProps('school')} icon={<FontAwesomeIcon icon={["fal", "graduation-cap"]} />} isRequired />
              <FormInput inputID="degree" inputLabel="Degree" {...form.getInputProps('degree')} icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
            </SimpleGrid>
          </SectionCard>
          <SectionCard styleType="primaryCard" m="2rem 0">
            <SimpleGrid cols={2} spacing="2rem">
              <FormNumber inputID="startDate" inputLabel="Started On" inputDescription="Please enter your current age" {...form.getInputProps('startDate')} icon={<FontAwesomeIcon icon={["fal", "calendar"]} />} isRequired thousandSeparator="" />
              <FormNumber inputID="endDate" inputLabel="Ended On" inputDescription="Please enter your current age" {...form.getInputProps('endDate')} icon={<FontAwesomeIcon icon={["fal", "calendar"]} />} isRequired thousandSeparator="" />
            </SimpleGrid>
          </SectionCard>
          <SectionCard styleType="primaryCard" m="2rem 0">
            <FormTextArea inputID="description" inputLabel="Description" {...form.getInputProps('description')} textRows={4} icon={<FontAwesomeIcon icon={["fal", "quote-left"]} />} isRequired />
          </SectionCard>
          <SimpleGrid cols={2} spacing="2rem" style={{ alignItems: "center" }}>
            <PrimaryButton onClick={deleteEducation} primNewIcon={{ name: "trash" }} bg="red">Delete Education Experience</PrimaryButton>
            <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "pen"]} />} isNotFull>Update {education.school} Information</FormSubmitButton>
          </SimpleGrid>
        </Box>
    </Modal>
  </>
}
