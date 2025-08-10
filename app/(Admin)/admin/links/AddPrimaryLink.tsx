'use client'

import PrimaryButton from '@/app/(Components)/(Buttons)/PrimaryButton'
import FormInput from '@/app/(Components)/(Form)/FormInput'
import { FormInputRow } from '@/app/(Components)/(Form)/FormInputRow'
import { FormSelect } from '@/app/(Components)/(Form)/FormSelect'
import FormSubmitButton from '@/app/(Components)/(Form)/FormSubmitButton'
import supabase from '@/lib/supabase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Anchor, Box, Code, Modal, SimpleGrid, Stack } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import * as yup from 'yup'

export default function AddPrimaryLink({ primaryLength }: any) {
    const primaryLinkIndex = parseInt(primaryLength) as number

    const [opened, { open, close }] = useDisclosure(false)

    const [iconPackSelected, setIconPackSelected] = useState()

    const router = useRouter()
  
    const onSubmit =  async (values: any) => {
        const theIcon = new Array({
            "name": values.iconName,
            "pack": iconPackSelected || undefined,
        })
        const { status: supabaseStatus , error: supabaseError  } = await supabase.from("PrimaryLinks").insert({ 
            id: "primaryLink"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
            icon: theIcon,
            title: values.title,
            subTitle: values.subTitle,
            link: values.link,
            // order: primaryLinkIndex
        })
            supabaseStatus && notifications.show({
                id: "newPrimaryLink",
                title:  `${supabaseStatus === 201 ? "Added New Primary Link 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
                message:  `${supabaseStatus === 201 ? `You have successfully added a new link!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
                icon: supabaseStatus === 201 ? <FontAwesomeIcon icon={["fal", "check"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
            })
        supabaseStatus === 201 && router.refresh()
    }

    const initialValues = {
        iconName: null,
        IconPack: null,
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

    const iconPackOptions = new Array(
        {value: "fal", label: "fal (Light; Default)", disabled: true},
        {value: "fadl", label: "fadl (Duotone)"},
        {value: "fab", label: "fab (Brands)"},
        {value: "fajr", label: "fajr (Jelly)"},
        {value: "fajdr", label: "fajdr (Jelly Duo)"},
        {value: "fak", label: "fak (Packs)"}
    )


    return <>
        <ActionIcon style={{ padding: "0.6rem", background: "var(--primary)" }} mx="0.5rem" onClick={open}>
            <FontAwesomeIcon icon={["fal", "plus"]} size="lg" />
        </ActionIcon>
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
                    <FormInput inputID="iconName" inputLabel="Icon Name" {...form.getInputProps('iconName')} icon={<FontAwesomeIcon icon={["fal", "icons"]} />} isRequired />
                    <FormSelect inputID="IconPack" inputLabel="Icon Variant" inputData={iconPackOptions} {...form.getInputProps(`IconPack`)} onChange={setIconPackSelected} value={iconPackSelected} clearable />
                </SimpleGrid>
                <Stack align="center" mb="2rem">
                    <Code p="0.5rem" bg="var(--blackRGBA)" c="white" fz="1rem" w="100%">Please provide the icon name. You may visit <Anchor href="https://fontawesome.com/icons" target='_blank'>https://fontawesome.com/icons</Anchor> for a list of all icons.</Code>
                </Stack>
                <SimpleGrid cols={2} my="2rem">
                    <FormInput inputID="title" inputLabel="Link Title" {...form.getInputProps('title')} inputDescription="Please provide the link title." icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
                    <FormInput inputID="subTitle" inputLabel="Link Sub Title" {...form.getInputProps('subTitle')} inputDescription="Please provide the link sub title." icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
                </SimpleGrid>
              <FormInput inputID="link" inputLabel="Link" {...form.getInputProps('link')} inputDescription="Please provide the link." icon={<FontAwesomeIcon icon={["fal", "link"]} />} />
            <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "check"]} />}>Add New Primary Link</FormSubmitButton>
            </Box>
        </Modal>
    </>
}
