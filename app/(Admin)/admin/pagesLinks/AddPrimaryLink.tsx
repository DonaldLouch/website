'use client'

import PrimaryButton from '@/app/(Components)/(Buttons)/PrimaryButton'
import FormInput from '@/app/(Components)/(Form)/FormInput'
import { FormInputRow } from '@/app/(Components)/(Form)/FormInputRow'
import { FormSelect } from '@/app/(Components)/(Form)/FormSelect'
import FormSubmitButton from '@/app/(Components)/(Form)/FormSubmitButton'
import HugeIcon from '@/app/(Components)/HugeIcon'
import supabase from '@/lib/supabase'
import { Anchor, Box, Code, Modal, SimpleGrid, Stack } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import * as yup from 'yup'

export default function AddPrimaryLink({ primaryLength }: any) {
    const primaryLinkIndex = parseInt(primaryLength) as number

    const [opened, { open, close }] = useDisclosure(false)

    const [iconVariantSelected, setIconVariantSelected] = useState()

    const router = useRouter()
  
    const onSubmit =  async (values: any) => {
        const theIcon = new Array({
            "iconName": values.iconName,
            "iconVariant": iconVariantSelected ? iconVariantSelected : undefined,
        })
        const { status: supabaseStatus , error: supabaseError  } = await supabase.from("PrimaryLinks").insert({ 
            id: "primaryLink"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
            newIcon: theIcon,
            title: values.title,
            subTitle: values.subTitle,
            link: values.link,
            orderNumber: primaryLinkIndex
        })
            supabaseStatus && notifications.show({
                id: "newPrimaryLink",
                title:  `${supabaseStatus === 201 ? "Added New Primary Link 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
                message:  `${supabaseStatus === 201 ? `You have successfully added a new link!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
                icon: supabaseStatus === 201 ? <HugeIcon name="add-01" /> : <HugeIcon name="alert-diamond" />,
            })
        supabaseStatus === 201 && router.refresh()
    }

    const initialValues = {
        iconName: null,
        iconVariant: null,
        title: null,
        subTitle: null,
        link: null
    }
    const schema = yup.object().shape({
        iconName: yup.string().required("Icon is required."),
        title: yup.string().required("Title is required."),
        subTitle: yup.string().required("Sub Title is required."),
    })
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })

    const iconVariantOptions = new Array(
        {value: "stroke", label: "Default (Stroke)", disabled: true},
        {value: "twotone", label: "Twotone"},
        {value: "duotone", label: "Duotone (Filled In)"},
        {value: "solid", label: "Solid"},
        {value: "bulk", label: "Bulk"},
    )

    return <>
        <PrimaryButton onClick={open}>Add New Primary Link</PrimaryButton>
        <Modal 
            opened={opened} onClose={close} title="Add New Primary Link" yOffset="2rem" xOffset="2rem" size="100%"
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
                <SimpleGrid cols={2} my="2rem">
                    <FormInput inputID="iconName" inputLabel="Icon Name" {...form.getInputProps('iconName')} icon={<HugeIcon name="icon-jar" variant="twotone" />} isRequired />
                    <FormSelect inputID="iconVariant" inputLabel="Icon Variant" inputData={iconVariantOptions} {...form.getInputProps(`iconVariant`)} onChange={setIconVariantSelected} value={iconVariantSelected} clearable />
                </SimpleGrid>
                <Stack align="center" mb="2rem">
                    <Code p="0.5rem" bg="var(--blackRGBA)" c="white" fz="1rem" w="100%">Please provide the icon name. You may visit <Anchor href="https://hugeicons.com/icons">https://hugeicons.com/icons</Anchor> for a list of all icons.</Code>
                </Stack>
                <SimpleGrid cols={2} my="2rem">
                    <FormInput inputID="title" inputLabel="Link Title" {...form.getInputProps('title')} inputDescription="Please provide the link title." icon={<HugeIcon name="text-font" variant="twotone" />} isRequired />
                    <FormInput inputID="subTitle" inputLabel="Link Sub Title" {...form.getInputProps('subTitle')} inputDescription="Please provide the link sub title." icon={<HugeIcon name="text-font" variant="twotone" />} isRequired />
                </SimpleGrid>
              <FormInput inputID="link" inputLabel="Link" {...form.getInputProps('link')} inputDescription="Please provide the link." icon={<HugeIcon name="arrow-up-right-01" variant="twotone" />} />
            <FormSubmitButton icon={<HugeIcon name="sent" />}>Add New Primary Link</FormSubmitButton>
            </Box>
        </Modal>
    </>
}
