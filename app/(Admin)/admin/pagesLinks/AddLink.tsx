'use client'

import PrimaryButton from '@/app/(Components)/(Buttons)/PrimaryButton'
import FormInput from '@/app/(Components)/(Form)/FormInput'
import supabase from '@/lib/supabase'
import { Anchor, Box, Code, Modal, SimpleGrid, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from '@mantine/form'
import { FormSelect } from '@/app/(Components)/(Form)/FormSelect'
import { useState } from 'react'
import FormSubmitButton from '@/app/(Components)/(Form)/FormSubmitButton'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import type { Icons } from "@/lib/FontAwesome"

export default function AddLink() {
    const router = useRouter()

    const [iconPackSelected, setIconPackSelected] = useState<Icons["pack"] | null>()

    const [opened, { open, close }] = useDisclosure(false)

    const onSubmit =  async (values: any) => {
        const theIcon = new Array({
            "name": values.iconName,
            "pack": iconPackSelected ? iconPackSelected : undefined,
        })
        const { status: supabaseStatus , error: supabaseError  } = await supabase.from("Links").insert({ 
            id: "link"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
            icon: theIcon,
            title: values.title,
            subTitle: values.subTitle,
            link: values.link,
            lastUpdatedOn: new Date(),
            addedOn: new Date(),
        })
        supabaseStatus && notifications.show({
            id: "NewLink",
            title: `${supabaseStatus === 201 ? "Added New Link 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
            message: `${supabaseStatus === 201 ? `You have successfully added a new link!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
            color: supabaseStatus === 201 ? "green.0" : "red",
            icon: supabaseStatus === 201 ? <FontAwesomeIcon icon={["fal", "arrow-up-right"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
        })
        supabaseStatus === 201 && router.refresh()
    }

    const initialValues = {
        iconName: null,
        title: null,
        subTitle: null,
    }
    const schema = yup.object().shape({
        iconName:  yup.string().required('You must specify an icon'),
        title: yup.string().required('You must specify a link title'),
        subTitle: yup.string().required('You must specify a link sub title'),
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
        <PrimaryButton onClick={open} isFullWidth primNewIcon={{ name: "plus" }} mb="2rem">Add New Link</PrimaryButton>
        <Modal opened={opened} onClose={close} title="Add New Link" yOffset="2rem" xOffset="2rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
                <SimpleGrid cols={2} spacing="2rem">
                    <FormInput inputID="iconName" inputLabel="Icon Name" {...form.getInputProps('iconName')} icon={<FontAwesomeIcon icon={["fal", "icons"]} />} isRequired />
                    <FormSelect inputID="iconPack" inputLabel="Icon Variant" inputData={iconPackOptions} {...form.getInputProps(`iconPack`)} onChange={setIconPackSelected} value={iconPackSelected} clearable />
                </SimpleGrid>
                <Stack align="center" mb="2rem">
                    <Code p="0.5rem" bg="var(--blackRGBA)" c="white" fz="1rem" w="100%">Please provide the icon name. You may visit <Anchor href="https://fontawesome.com/icons">https://fontawesome.com/icons</Anchor> for a list of all icons.</Code>
                </Stack>
                <SimpleGrid cols={2} spacing="2rem">
                    <FormInput inputID="title" inputLabel="Link Title" {...form.getInputProps('title')} inputDescription="Please provide the link title." icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
                    <FormInput inputID="subTitle" inputLabel="Link Sub Title" {...form.getInputProps('subTitle')} inputDescription="Please provide the link sub title." icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
                </SimpleGrid>
                <FormInput inputID="link" inputLabel="Link" {...form.getInputProps('link')} inputDescription="Please provide the link." icon={<FontAwesomeIcon icon={["fal", "link"]} />} />
                <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "plus"]} />}>Add New Link</FormSubmitButton>
            </Box>
        </Modal>
    </>
}
