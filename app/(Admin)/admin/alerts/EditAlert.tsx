'use client'

import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"
import supabase from "@/lib/supabase"
import { Add01Icon, Alert01Icon, Alert02Icon, AlertCircleIcon, AlertDiamondIcon, Archive02Icon, Bookmark01Icon, CancelCircleIcon, CheckmarkCircle02Icon, Cone01Icon, DashboardBrowsingIcon, DashboardSpeed02Icon, Delete01Icon, Delete02Icon, FavouriteIcon, Flag02Icon, Folder01Icon, Home01Icon, Image02Icon, InformationCircleIcon, LaurelWreath02Icon, Link01Icon, Location01Icon, Mail01Icon, Notification03Icon, PencilEdit01Icon, PencilIcon, Search01Icon, SecurityCheckIcon, SentIcon, Settings02Icon, StarIcon, Tag01Icon } from "@hugeicons/react"
import { Alert, Anchor, Box, Button, Modal, SimpleGrid, Stack, Text } from "@mantine/core"
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
import DisplayDate from "@/lib/DisplayDate"
import { useRouter } from "next/navigation"

export default function EditAlert({alert}: any) {
    const [opened, { open, close }] = useDisclosure(false)

    const [iconSelected, setIconSelected] = useState(alert.AlertIcon ? alert.AlertIcon : null)
    const [colourSelected, setColourSelected] = useState(alert.AlertColour ? alert.AlertColour: null)

    const router = useRouter()

    const isActive = !alert.EndedOn || alert.EndedOn && new Date(alert.EndedOn && alert.EndedOn) >= new Date()
    const icon = alert.AlertIcon === "Cone01Icon" ? <Cone01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} /> 
    : alert.AlertIcon === "Alert01Icon" ? <Alert01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Tag01Icon" ?  <Tag01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "StarIcon" ? <StarIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "FavouriteIcon" ? <FavouriteIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Settings02Icon" ? <Settings02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "SecurityCheckIcon" ? <SecurityCheckIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Search01Icon" ? <Search01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "PencilIcon" ? <PencilIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Notification03Icon" ? <Notification03Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Mail01Icon" ? <Mail01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Location01Icon" ? <Location01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Link01Icon" ? <Link01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "InformationCircleIcon" ? <InformationCircleIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Image02Icon" ? <Image02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Home01Icon" ? <Home01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Folder01Icon" ? <Folder01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Delete02Icon" ? <Delete02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "CheckmarkCircle02Icon" ? <CheckmarkCircle02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "CancelCircleIcon" ? <CancelCircleIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Bookmark01Icon" ? <Bookmark01Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Archive02Icon" ? <Archive02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "Flag02Icon" ? <Flag02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "LaurelWreath02Icon" ? <LaurelWreath02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "DashboardBrowsingIcon" ? <DashboardBrowsingIcon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : alert.AlertIcon === "DashboardSpeed02Icon" ? <DashboardSpeed02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />
    : <Alert02Icon variant={alert.AlertIconStyle ? alert.AlertIconStyle : "stroke"} />

    const deleteAlert = async () => {
        const  res  = await supabase.from('WebsiteAlerts').delete().eq('id', alert.id)as any
        console.log(res)
        res && notifications.show({ 
            title: `${res.status === 204 ? "Alert Deleted 🎉" : `Error #${res?.status} has Occurred`}`,
            message:`${res.status === 204 ? `You have successfully edited ${alert.id}!` : `An error has occurred: ${res?.status}. ${res?.statusText && `${res?.statusText}.`}`}`,
            color: res.status === 204 ? "black" : "red",
            icon: res.status === 204 ? <Delete01Icon /> : <AlertDiamondIcon />
        })
        res.status === 204 && router.refresh()
    }
    const onSubmit = async (values: any) => {
        const { status: supabaseStatus , error: supabaseError } = await supabase.from("WebsiteAlerts").update({ 
            AlertTitle: values.title,
            AlertMessage: values.message,
            AlertIcon: iconSelected === "other" ? values.otherIcon : iconSelected,
            AlertIconStyle: values.iconVariant,
            AlertColour: colourSelected === "other" ? values.otherAlertColour : colourSelected,
            CreatedOn: new Date(values.createdOn),
            LastUpdated: new Date(),
            EndedOn: values.endedOn ? new Date(values.endedOn) : null,
        }).eq('id', alert.id)
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 204 ? "Alert Edited 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
            message:`${supabaseStatus === 204 ? `You have successfully edited ${values.title}!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
            color: supabaseStatus === 204 ? "black" : "red",
            icon: supabaseStatus === 204 ? <PencilEdit01Icon /> : <AlertDiamondIcon />
        })
        supabaseStatus === 204 && router.refresh()
    }
    const initialValues = {
        title: alert.AlertTitle,
        message: alert.AlertMessage,
        icon: alert.AlertIcon ? alert.AlertIcon : null,
        otherIcon: null,
        iconVariant: alert.AlertIconStyle,
        alertColour: alert.AlertColour ? alert.AlertColour : null,
        otherAlertColour: null,
        createdOn: new Date(alert.CreatedOn),
        endedOn: alert.EndedOn ? new Date(alert.EndedOn) : null,
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
        {value: "Alert02Icon", label: "Default (Alert02)", disabled: true},
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
        <Anchor onClick={open} underline="never"><Alert key={alert.id} variant="light" color={!isActive ? "none" : alert.AlertColour ? alert.AlertColour : "blue"} title={alert.AlertTitle} icon={icon}>
            <Text my="0.5rem" c={alert.MessageColour ? alert.MessageColour : "white"}>{alert.AlertMessage}</Text>
            <Text m="1rem 0 0" size="sm" c="gray">Created on <strong><DisplayDate source={alert.CreatedOn} /></strong>{alert.EndedOn && (<> and {!isActive ? "ended" : "ends"} on <strong><DisplayDate source={alert.EndedOn} /></strong></>)}</Text>  
        </Alert></Anchor>
        <Modal opened={opened} onClose={close} title={`Edit Alert: ${alert.id}`} yOffset="2rem" xOffset="2rem" size="100%"  
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
                    <SimpleGrid cols={2} style={{alignItems: "center"}} spacing="2rem">
                        <FormSubmitButton icon={<SentIcon />}>Edit {alert.id} Alert</FormSubmitButton>
                        <PrimaryButton icon={<Delete01Icon />} onClick={deleteAlert} color="red">Delete Alert</PrimaryButton>
                    </SimpleGrid>
                </Box>
            </Box>
        </Modal>
    </>
}
