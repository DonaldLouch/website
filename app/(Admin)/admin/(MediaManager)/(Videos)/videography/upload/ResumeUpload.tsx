import PrimaryButton from '@/app/(Components)/(Buttons)/PrimaryButton'
import FormInput from '@/app/(Components)/(Form)/FormInput'
import FormSubmitButton from '@/app/(Components)/(Form)/FormSubmitButton'
import HugeIcon from '@/app/(Components)/HugeIcon'
import supabase from '@/lib/supabase'
import { Box, Modal } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { yupResolver } from 'mantine-form-yup-resolver'
import { useRouter } from 'next/navigation'
import React from 'react'

import * as yup from 'yup'

export default function ResumeUpload() {
    const [opened, { open, close }] = useDisclosure(false)
    const router = useRouter()
    const onSubmit = async (values: any) => {
        const { status: search, data } = await supabase.from("Videography").select("*").eq('id', values.id).single()
       if(search === 200 && data) {
            const video = data.videoFileID
            const thumbnail = data.thumbnailFileID
            const isSetup = data.isSetup

            const currentStep = 
                isSetup ? 5
                : thumbnail ? 4 
                : video ? 3
                : 2 
            closed()
            router.push(`/admin/videography/upload?step=${currentStep}&id=${values.id}`)
       }
       else {
           notifications.show({ 
                id: "videoNotFound",
                title: 'Error!', 
                message: 'An error has occurred while trying to get the video data. Try again or start a new upload.',
                color: 'red',
                icon: <HugeIcon name="alert-diamond" />
           })
           closed()
       }
    }
    function closed() {
        close()
    }
    const initialValues = {
        id: null,
    }
    const schema = yup.object().shape({
        id:  yup.string().required('This field is required.')
    })
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })
    return <>
        <PrimaryButton colour="var(--secondary)" primNewIcon={{name: "refresh", variant: "twotone"}} fontColour="black" onClick={open}>Resume Upload</PrimaryButton>
        <Modal 
            opened={opened} onClose={closed} title="Resume Upload" yOffset="2rem" xOffset="2rem" size="100%"
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
                <FormInput inputID="id" {...form.getInputProps('id')} icon={<HugeIcon name="text-font" variant="duotone" />} isRequired />
                <FormSubmitButton icon={<HugeIcon name="search-01" variant="duotone" />}>Search Upload</FormSubmitButton>
            </Box>
        </Modal>
    </>
}
