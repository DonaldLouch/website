import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Modal, SimpleGrid } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useRouter } from '@tanstack/react-router'
import { zodResolver } from 'mantine-form-zod-resolver'

import z from 'zod/v4'
import PrimaryButton from '../buttons/PrimaryButton'
import { SectionCard } from '../cards/SectionCard'
import FormDatePicker from '../form/FormDatePicker'
import FormInput from '../form/FormInput'
import FormSubmitButton from '../form/FormSubmitButton'
import FormTextArea from '../form/FormTextArea'

export default function AddWork({ resumeID }: any) {
   const router = useRouter()
    
    const [opened, { open, close }] = useDisclosure(false)
    
    const onSubmit =  async (values: any) => {
        const id = "work"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()

        // const { status: supabaseStatus , error: supabaseError  } = await supabase.from("ResumeWorkExperience").insert({ 
        //     id,
        //     company: values.company,
        //     position: values.position,
        //     startDate: values.startDate,
        //     endDate: values.endDate,
        //     description: values.description,
        // })

        // await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })

        // supabaseStatus && notifications.show({
        //     id: `New${values.company}`,
        //     title: `${supabaseStatus === 201 ? `Added New Education Experience 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
        //     message: `${supabaseStatus === 201 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
        //     color: supabaseStatus === 201 ? "green.0" : "red",
        //     icon: supabaseStatus === 201 ? <FontAwesomeIcon icon={["fal", "badge-check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
        // })
        // supabaseStatus === 201 && router.invalidate()
    }
    const initialValues = {}
    const schema = z.object({})

    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: zodResolver(schema)
    })

    return <>
        <PrimaryButton onClick={open} icon={{ name: "plus" }} colour="green" fontColour="black" isFullWidth>Add New Work Experience</PrimaryButton>
        <Modal
            opened={opened} onClose={close} title="Add New Work Experience" yOffset="2rem" xOffset="2rem" size="100%"
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
                <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "plus"]} />} isNotFull>Add New Work Experience Information</FormSubmitButton>
            </Box>
        </Modal>
    </>
}
