import z from "zod/v4"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import { useDisclosure } from "@mantine/hooks"
import { Box, Modal, SimpleGrid, Stack } from "@mantine/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import EditWorkHistory from "./EditWorkHistory"
import { notifications } from "@mantine/notifications"
import AddWorkExperience from "./AddWorkExperience"
import { useRouter } from "@tanstack/react-router"
import PrimaryButton from "../buttons/PrimaryButton"
import { SectionCard } from "../cards/SectionCard"
import FormDatePicker from "../form/FormDatePicker"
import FormInput from "../form/FormInput"
import FormSubmitButton from "../form/FormSubmitButton"
import FormTextArea from "../form/FormTextArea"
import { SectionTitle } from "../SectionTitle"
import { useQuery } from "@tanstack/react-query"
import { GetResume } from "@/actions/database/GetDatabase.functions"
import { UpdateResume_Time, UpdateResumeWork } from "@/actions/database/UpdateDatabase.functions"
import { DeleteResumeWork } from "@/actions/database/DeleteDatabase.functions"

export default function WorkExperience({ experience, resumeID }: any) {
  const router = useRouter()

  const [opened, { open, close }] = useDisclosure(false)

  const [workHistory, setWorkHistory] = useState([])
  useEffect(() => {
    async function GetHistory() {
      const data = await GetResume({data: { type: "historyID", id: experience.id }}) as any
      setWorkHistory(data)
    }
    GetHistory()
  }, [open, close, router])

  const deleteWork = async () => {
    const res = DeleteResumeWork({ data: {id: experience.id} }) as any

    res && notifications.show({
      id: `Delete${experience.company}`,
      title: `${res.success ? `${experience.company} Deleted  🗑️` : `Error #${res.error?.code} has Occurred`}`,
      message: `${res.success ? `You have successfully deleted the ${experience.company} experience` : `An error has occurred: ${res.error?.message}. ${res.error?.hint && `${res.error?.hint}.`}`}`,
      color: res.success ? "green.0" : "red",
      icon: res.success ? <FontAwesomeIcon icon={["fal", "trash"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
    })
    res.success && router.invalidate()
    console.log(res)
  }
  
  const onSubmit =  async (values: any) => {
    const data = {
      company: values.company,
      position: values.position,
      startDate: values.startDate ? new Date(values.startDate) : null,
      endDate: values.endDate ? new Date(values.endDate) : null,
      description: values.description,
    }
    const res = await UpdateResumeWork({ data: {values: data, id: experience.id} })
    res.success && await UpdateResume_Time({ data: { id: resumeID }})

    res && notifications.show({
      id: `Edit${values.company}`,
      title: `${res.success ? `Updated ${values.company} Experience 🎉` : `Error #${res.error?.code} has Occurred`}`,
      message: `${res.success ? `You have successfully updated the resume information!` : `An error has occurred: ${res.error?.message}. ${res.error?.hint && `${res.error?.hint}.`}`}`,
      color: res.success ? "green.0" : "red",
      icon: res.success ? <FontAwesomeIcon icon={["fal", "badge-check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
    })
    res.success && router.invalidate()
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
    <PrimaryButton key={experience.id} onClick={open} icon={{ name: "briefcase-blank" }}>{experience.company}</PrimaryButton>
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
            <PrimaryButton onClick={deleteWork} icon={{ name: "trash" }} bg="red">Delete Work Experience</PrimaryButton>
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
