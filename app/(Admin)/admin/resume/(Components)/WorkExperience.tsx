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
import AddWorkExperience from "./AddWorkExperience"

export default function WorkExperience({ experience, resumeID }: any) {
  const router = useRouter()

  const [opened, { open, close }] = useDisclosure(false)

  const [workHistory, setWorkHistory] = useState([])

  useEffect(() => {
    async function getHistory() {
      const { data} = await supabase.from('ResumeWorkExperienceHistory').select().match({ workID: experience.id }) as any
      setWorkHistory(data)
    }
    getHistory()
  }, [])

  const deleteWork = async () => {
    const { status: deleteStatus, error: deleteError } = await supabase.from("ResumeWorkExperience").delete().eq('id', experience.id)
    deleteStatus && notifications.show({
      id: `Delete${experience.company}`,
      title: `${deleteStatus === 204 ? `${experience.company} Deleted  🗑️` : `Error #${deleteError?.code} has Occurred`}`,
      message: `${deleteStatus === 204 ? `You have successfully deleted the ${experience.company} experience` : `An error has occurred: ${deleteError?.message}. ${deleteError?.hint && `${deleteError?.hint}.`}`}`,
      color: deleteStatus === 204 ? "green.0" : "red",
      icon: deleteStatus === 204 ? <FontAwesomeIcon icon={["fal", "trash"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
    })
    deleteStatus === 204 && router.refresh()
  }
  
  const onSubmit =  async (values: any) => {
    const { status: supabaseStatus , error: supabaseError  } = await supabase.from("ResumeWorkExperience").update({
      company: values.company,
      position: values.position,
      startDate: values.startDate,
      endDate: values.endDate,
      description: values.description,
    }).match({ id: experience.id })
   
    await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })
   
    supabaseStatus && notifications.show({
      id: `Edit${values.company}`,
      title: `${supabaseStatus === 204 ? `Updated ${values.company} Experience 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
      message: `${supabaseStatus === 204 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
      color: supabaseStatus === 204 ? "green.0" : "red",
      icon: supabaseStatus === 204 ? <FontAwesomeIcon icon={["fal", "badge-check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
    })
    supabaseStatus === 204 && router.refresh()
  }

  const initialValues = {
      id: experience.id,
      company: experience.company,
      position: experience.position,
      startDate: experience.startDate ? new Date(experience.startDate) : undefined,
      endDate: experience.endDate ? new Date(experience.endDate) : undefined,
      description: experience.description,
    }
   const schema = z.object({
      // company: Yup.string().required('Company is required'),
      // position: Yup.string().required('Position is required'),
      // startDate: Yup.string().required('Start Date is required'),
      // // endDate: Yup.string().required('End Date is required'),
      // description: Yup.string().required('Description is required'),
    })

    const form = useForm({
      mode: 'controlled',
      initialValues,
      validate: zodResolver(schema)
    })

  return <>
    <PrimaryButton key={experience.id} onClick={open} primNewIcon={{ name: "briefcase-blank" }}>{experience.company}</PrimaryButton>
    <Modal
      opened={opened} onClose={close} title={experience.company} yOffset="2rem" xOffset="2rem" size="100%"
      overlayProps={{
        backgroundOpacity: 0.5, 
        blur: 4,
      }} 
      styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
      radius="lg"
    >
      <SectionTitle headingTitle={`Update ${experience.company} information`} my="2rem" />
      <SectionCard styleType="secondaryCard" m="1rem" p="0.5rem 1rem">
        <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
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
          <SimpleGrid cols={2} spacing="2rem" style={{ alignItems: "center" }}>
            <PrimaryButton onClick={deleteWork} primNewIcon={{ name: "trash" }} bg="red">Delete Work Experience</PrimaryButton>
            <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "pen"]} />} isNotFull>Update {experience.company} Information</FormSubmitButton>
          </SimpleGrid>
        </Box>
      </SectionCard>
      <SectionTitle headingTitle={`${experience.company} Work History`} my="2rem" />
      <Stack gap="1rem" my="1rem">
        <AddWorkExperience company={experience.company} resumeID={resumeID} experienceID={experience.id} />
        {workHistory?.map((history: any) => ( <EditWorkHistory history={history} company={experience.company} resumeID={resumeID} key={history.id} /> ))}
      </Stack>
    </Modal>
  </>
}
