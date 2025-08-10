'use client'

import PrimaryButton from '@/app/(Components)/(Buttons)/PrimaryButton'
import { SectionCard } from '@/app/(Components)/(Cards)/SectionCard'
import FormInput from '@/app/(Components)/(Form)/FormInput'
import FormNumber from '@/app/(Components)/(Form)/FormNumber'
import FormSubmitButton from '@/app/(Components)/(Form)/FormSubmitButton'
import FormTextArea from '@/app/(Components)/(Form)/FormTextArea'
import supabase from '@/lib/supabase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Modal, SimpleGrid } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useRouter } from 'next/navigation'

import z from 'zod/v4'

export default function AddEducation({ resumeID }: any) {  
    const router = useRouter()  

    const [opened, { open, close }] = useDisclosure(false)

    const onSubmit =  async (values: any) => {
        const id = "education"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()

        const { status: supabaseStatus , error: supabaseError  } = await supabase.from("ResumeEducation").insert({ 
            id,
            school: values.school,
            degree: values.degree,
            startDate: values.startDate,
            endDate: values.endDate,
            description: values.description,
        })

        await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })

        supabaseStatus && notifications.show({
            id: `New${values.school}`,
            title: `${supabaseStatus === 201 ? `Added New Education Experience 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
            message: `${supabaseStatus === 201 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
            color: supabaseStatus === 201 ? "green.0" : "red",
            icon: supabaseStatus === 201 ? <FontAwesomeIcon icon={["fal", "badge-check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
        })
        supabaseStatus === 201 && router.refresh()
    }
    const initialValues = {}
    const schema = z.object({})
    
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: zodResolver(schema)
    })
    return <>
        <PrimaryButton onClick={open} primNewIcon={{ name: "plus" }} colour="green" fontColour="black" isFullWidth>Add New Education</PrimaryButton>
        <Modal
            opened={opened} onClose={close} title="Add New Education" yOffset="2rem" xOffset="2rem" size="100%"
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
                <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "plus"]} />} isNotFull>Add New Education Information</FormSubmitButton>
            </Box>
        </Modal>
    </>
}
