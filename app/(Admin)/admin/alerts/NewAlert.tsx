'use client'

import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"
import supabase from "@/lib/supabase"
import { Box, Button, Modal, SimpleGrid, Stack, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from "@mantine/form";
import FormInput from "@/app/(Components)/(Form)/FormInput"
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"
import { FormMultiSelect } from "@/app/(Components)/(Form)/FormMultiSelect"
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker"
import { useState } from "react"
import { useRouter } from "next/navigation"
import HugeIcon from "@/app/(Components)/HugeIcon"

export default function NewAlert() {
    const [opened, { open, close }] = useDisclosure(false)

    const [iconSelected, setIconSelected] = useState()
    const [colourSelected, setColourSelected] = useState()

    const router = useRouter()

    const onSubmit = async (values: any) => {
        const { status: supabaseStatus , error: supabaseError } = await supabase.from("WebsiteAlerts").insert({ 
            id: "wAlert"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
            AlertTitle: values.title,
            AlertMessage: values.message,
            AlertIcon: iconSelected === "other" ? values.otherIcon : iconSelected,
            AlertIconStyle: values.iconVariant,
            AlertColour: colourSelected === "other" ? values.otherAlertColour : colourSelected,
            CreatedOn: new Date(values.createdOn),
            LastUpdated: new Date(),
            EndedOn: values.endedOn ? new Date(values.endedOn) : null,
        })
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 201 ? "Alert Added 🎉" : `Error #${supabaseError?.code} has Occurred`}`, 
            message:`${supabaseStatus === 201 ? `You have successfully added ${values.title}!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 201 ? "black" : "red",
            icon: supabaseStatus === 201 ? <HugeIcon name="sent" /> : <HugeIcon name="alert-diamond" />
        })
        supabaseStatus === 201 && router.refresh()
    }
    const initialValues = {
        title: null,
        message: null,
        icon: iconSelected ? iconSelected : null,
        otherIcon: null,
        iconVariant: null,
        alertColour: colourSelected ? colourSelected : null,
        otherAlertColour: null,
        createdOn: new Date(),
        endedOn: null,
    }
    const schema = yup.object().shape({
        title: yup.string().required('This field is required.'),
        message: yup.string().required('This field is required.'),
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
    const iconOptions = new Array(
        {value: "Alert02Icon", label: `Default (Alert02)`, disabled: true},
        {value: "Alert01Icon", label: "Alert Information"},
        {value: "Cone01Icon", label: "Construction Cone"},
        {value: "Tag01Icon", label: "Sale Tag"},
        {value: "StarIcon", label: "Star"},
        {value: "FavouriteIconIcon", label: "Favourite"},
        {value: "Settings02Icon", label: "Config Cog"},
        {value: "SecurityCheckIcon", label: "Security Check"},
        {value: "Search01Icon", label: "Search"},
        {value: "PencilIcon", label: "Pencil"},
        {value: "Notification03Icon", label: "Notification Bell"},
        {value: "Mail01Icon", label: "Mail"},
        {value: "Location01Icon", label: "Location"},
        {value: "Link01Icon", label: "Link"},
        {value: "InformationCircleIcon", label: "Information Circle"},
        {value: "Image02Icon", label: "Image"},
        {value: "Home01Icon", label: "Home"},
        {value: "Folder01Icon", label: "Folder01"},
        {value: "Delete02Icon", label: "Delete02"},
        {value: "CheckmarkCircle02Icon", label: "Checkmark"},
        {value: "CancelCircleIcon", label: "Cancel"},
        {value: "Bookmark01Icon", label: "Bookmark"},
        {value: "Archive02Icon", label: "Archive"},
        {value: "Flag02Icon", label: "Flag"},
        {value: "LaurelWreath02Icon", label: "Award"},
        {value: "DashboardBrowsingIcon", label: "Admin Dashboard"},
        {value: "DashboardSpeed02Icon", label: "Client Portal"},
        {value: "other", label: "Other (not yet implemented)"},
    )
    
    const colourOptions = new Array(
        {value: "blue", label: "Default (Blue): Best for information", disabled: true},
        {value: "green", label: "Green: Best for success"},
        {value: "secondary", label: "Orange: Best for warning"},
        {value: "red", label: "Red: Best for alert"},
        {value: "var(--darkPurple)", label: "Dark Purple: Best for ended alerts"},
        {value: "black", label: "Black: Best for ended alerts"},
        {value: "white", label: "White: Best for ended alerts"},
        {value: "other", label: "Other"},
    )

    return <>
        <PrimaryButton icon={<HugeIcon name="add" />} onClick={open}>New Alert</PrimaryButton>
        <Modal opened={opened} onClose={close} title="New Alert" yOffset="2rem" xOffset="2rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Box component="main" id="newAlert" color="white">
                <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
                    <FormInput inputID="title" inputLabel="Title" {...form.getInputProps('title')} isRequired />
                    <FormTextArea inputID="message" inputLabel="Message" textRows={3} {...form.getInputProps('message')} />
                    <SimpleGrid cols={3}>
                        <FormSelect inputID="icon" inputLabel="Icon" inputData={iconOptions} {...form.getInputProps(`icon`)} onChange={setIconSelected} value={iconSelected} clearable searchable />
                        <FormSelect inputID="iconVariant" inputLabel="Icon Variant" inputData={iconVariantOptions} {...form.getInputProps(`iconVariant`)} clearable />
                        <FormSelect inputID="alertColour" inputLabel="Alert Colour" inputData={colourOptions} {...form.getInputProps(`alertColour`)} onChange={setColourSelected} value={colourSelected} clearable />
                    </SimpleGrid>
                    {iconSelected === "other" && <>
                        <FormInput inputID="otherIcon" inputLabel="Other Icon Name" {...form.getInputProps('otherIcon')} isRequired={iconSelected === "other" ? true : false} />
                    </>}
                    {colourSelected === "other" && <>
                        <FormInput inputID="otherAlertColour" inputLabel="Other Alert Colour" {...form.getInputProps('otherAlertColour')} isRequired={colourSelected === "other" ? true : false} />
                    </>}
                    <SimpleGrid cols={2}>
                          <FormDatePicker dateLabel="Created On" datePlaceholder="When was this posted?" {...form.getInputProps('createdOn')} />
                          <FormDatePicker dateLabel="Ended On" datePlaceholder="When is this alert set to expire?" {...form.getInputProps('endedOn')} />
                    </SimpleGrid>
                    <FormSubmitButton icon={<HugeIcon name="sent" />}>Publish New Alert</FormSubmitButton>
                </Box>
            </Box>
        </Modal>
    </>
}
