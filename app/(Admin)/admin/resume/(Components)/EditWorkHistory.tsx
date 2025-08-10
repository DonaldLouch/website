'use client'

import PrimaryButton from '@/app/(Components)/(Buttons)/PrimaryButton'
import { SectionCard } from '@/app/(Components)/(Cards)/SectionCard'
import FormDatePicker from '@/app/(Components)/(Form)/FormDatePicker'
import FormInput from '@/app/(Components)/(Form)/FormInput'
import FormSubmitButton from '@/app/(Components)/(Form)/FormSubmitButton'
import FormTextArea from '@/app/(Components)/(Form)/FormTextArea'
import DisplayDate from '@/lib/DisplayDate'
import supabase from '@/lib/supabase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Modal, SimpleGrid } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useRouter } from 'next/navigation'

import * as Yup from 'yup'
import z from 'zod/v4'

export default function EditWorkHistory({ history, company, resumeID }: any) {
    // const toast = useToast()
    // const toastID = "toastID"
    const router = useRouter()

    const [opened, { open, close }] = useDisclosure(false)
    
    const deleteHistory = async () => {
        const { status: deleteStatus, error: deleteError } = await supabase.from("ResumeWorkExperienceHistory").delete().eq('id', history.id);
        deleteStatus && notifications.show({
            id: `Delete${company}`,
            title: `${deleteStatus === 204 ? `${company} ${history.position} (${new Date(history.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}) Deleted  🗑️` : `Error #${deleteError?.code} has Occurred`}`,
            message: `${deleteStatus === 204 ? `You have successfully deleted the ${company} ${history.position} (${new Date(history.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}) experience` : `An error has occurred: ${deleteError?.message}. ${deleteError?.hint && `${deleteError?.hint}.`}`}`,
            color: deleteStatus === 204 ? "green.0" : "red",
            icon: deleteStatus === 204 ? <FontAwesomeIcon icon={["fal", "trash"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
        })
        deleteStatus === 204 && router.refresh()
    }

    const onSubmit =  async (values: any) => {
        const { status: supabaseStatus , error: supabaseError  } = await supabase.from("ResumeWorkExperienceHistory").update({ 
          position: values.position,
          startDate: values.startDate,
          endDate: values.endDate,
          description: values.description,
        }).match({ id: history.id })

        await supabase.from("Resume").update({lastUpdatedOn: new Date()}).match({ id: resumeID })

        supabaseStatus && notifications.show({
            id: `Edit${values.company}`,
            title: `${supabaseStatus === 204 ? `Updated ${history.position} History 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
            message: `${supabaseStatus === 204 ? `You have successfully updated the Resume page!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
            color: supabaseStatus === 204 ? "green.0" : "red",
            icon: supabaseStatus === 204 ? <FontAwesomeIcon icon={["fal", "badge-check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
        })
        supabaseStatus === 204 && router.refresh()
    }

    const initialValues = { 
        id: history.id,
        position: history.position,
        startDate: history.startDate ? new Date(history.startDate) : undefined,
        endDate: history.endDate ? new Date(history.endDate) : undefined,
        description: history.description,
     }
    const schema = z.object({
        // position: Yup.string().required('Position is required'),
        // startDate: Yup.string().required('Start Date is required'),
        // description: Yup.string().required('Description is required'),
    })
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: zodResolver(schema)
    })
    return <>
        <PrimaryButton key={history.id} onClick={open} primNewIcon={{ name: "briefcase-blank" }}>{history.position} (<DisplayDate source={history.startDate} format="YYYY" />)</PrimaryButton>
        <Modal
            opened={opened} onClose={close} title={`Edit: (${company}) ${history.position} (${new Date(history.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit'})})`} yOffset="2rem" xOffset="2rem" size="100%"
            overlayProps={{
            backgroundOpacity: 0.5, 
            blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
                <SectionCard styleType="primaryCard" m="2rem 0">
                    <FormInput inputID="position" inputLabel="Position" {...form.getInputProps('position')} icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
                </SectionCard>
                <SectionCard styleType="primaryCard" m="2rem 0">
                    <SimpleGrid cols={2} spacing="2rem">
                        <FormDatePicker dateLabel="Started On" datePlaceholder="When did you start?" {...form.getInputProps('startDate')} />
                        <FormDatePicker dateLabel="End On" datePlaceholder="When did you end?" {...form.getInputProps('endDate')} />
                    </SimpleGrid>
                </SectionCard>
                <SectionCard styleType="primaryCard" m="2rem 0 0">
                    <FormTextArea inputID="description" inputLabel="Description" {...form.getInputProps('description')} textRows={4} icon={<FontAwesomeIcon icon={["fal", "quote-left"]} />} isRequired />
                </SectionCard>
                <SimpleGrid cols={2} spacing="2rem" style={{ alignItems: "center" }}>
                    <PrimaryButton onClick={deleteHistory} primNewIcon={{ name: "trash" }} bg="red">Delete Position</PrimaryButton>
                    <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "pen"]} />} isNotFull>Update: ({company}) {history.position} (<DisplayDate source={history.startDate} format="YYYY" />)</FormSubmitButton>
                </SimpleGrid>
            </Box>
        </Modal>
            {/* <Button onClick={onOpen} variant="sectionButton" justifyContent="left" pl="3rem" fontSize="1.2rem" fontWeight="500">{history.position} (<DisplayDate source={history.startDate} format="YYYY" />)</Button> 
            <Modal isOpen={isOpen} onClose={onClose} id="addEduction" size="5xl">
                <ModalContent background="blurredPurple">
                    <ModalHeader>Edit: ({company}) {history.position} (<DisplayDate source={history.startDate} format="YYYY" />)</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            {({ handleSubmit }: any) => (
                                <Stack as="form" onSubmit={handleSubmit as any} gap="1rem">
                                    <FormInputReadOnly inputID="id" inputLabel="" inputType="text" />
                                
                                    <FormInput inputID="position" inputLabel="Position" inputType="text" />
                                    
                                    <Stack direction="row" spacing="2rem">
                                        <FormInputRow inputID="startDate" inputLabel="Start Date" inputType="datetime-local" />
                                        <FormInputRow inputID="endDate" inputLabel="End Date" inputType="datetime-local" />
                                    </Stack>
                                    
                                    <FormTextArea inputID="description" inputLabel="Description" textRows={4} />

                                    <SubmitButton variant="blackFormButton" my="1rem !important">Update: ({company}) {history.position} (<DisplayDate source={history.startDate} format="YYYY" />)</SubmitButton> 
                                </Stack>
                            )}
                        </Formik>
                        <Button onClick={deleteHistory} variant="primary" background="red" justifyContent="left" fontSize="1.2rem" fontWeight="500" w="100%" py="2rem">DELETE: {history.position} (<DisplayDate source={history.startDate} format="YYYY" />)</Button> 
                    </ModalBody>
                </ModalContent>
            </Modal> */}
    </>
}
