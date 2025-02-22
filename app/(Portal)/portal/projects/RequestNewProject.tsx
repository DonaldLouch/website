'use client'

import { ProjectType } from "@/lib/Project/projectType";
import { Box, Modal, SimpleGrid } from "@mantine/core";
import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton";
import FormInput from "@/app/(Components)/(Form)/FormInput";
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea";
import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { notifications } from "@mantine/notifications";
import { useRouter, useSearchParams } from "next/navigation";
import FormInputPhone from "@/app/(Components)/(Form)/FormInputPhone";
import { Timezones } from "@/lib/Timezones";

import moment from 'moment-timezone';
import HugeIcon from "@/app/(Components)/HugeIcon";

// type ProjectProps = {
//     isAdmin: boolean
//     isMod: boolean
// }

// {isAdmin, isMod}: ProjectProps

export default function RequestNewProject() {
    const prams = useSearchParams()
    const openID = prams.get("openID") as string

    const router = useRouter()
    const [opened, { open, close }] = useDisclosure(false)

    const guessTimezone =  moment.tz.guess()

    const [typeSelected, setTypeSelected] = useState()
    const [timezoneSelected, setTimezoneSelected] = useState(guessTimezone)

    const { user } = useUser()

    
    const isOpenedID = openID === "newProject" ? true : false

    function forceClose() {
        router.push(`/portal/projects`)
    }

    const onSubmit = async (values: any) => {
        const id = "project"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()

        const client = {
            id: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            username: user?.username,
            email: user?.emailAddresses?.[0]?.emailAddress ?? '',
            phoneNumber: values.phone,
            timezone: timezoneSelected
        }

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Projects").insert({ 
            id,
            client,
            name: values.name,
            description: values.description,
            startDate: values.startDate ? new Date(values.startDate) : null,
            deadline: values.deadline ? new Date(values.deadline) : null,
            budget: values.budget,
            projectKind: typeSelected,
            status: "SUBMITTED",
            createdOn: new Date(),
            lastUpdated: new Date()
        })
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 201 ? "Request Submitted 🎉" : `Error #${supabaseError?.code} has Occurred`}`, 
            message:`${supabaseStatus === 201 ? `You have successfully added ${values.title}!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 201 ? "black" : "red",
            icon: supabaseStatus === 201 ? <HugeIcon name="sent" /> : <HugeIcon name="alert-diamond" />
        })
        supabaseStatus === 201 && router.push(`/portal/project/${id}`)
    }

    const initialValues = {
        name: "",
        description: "", 
        startDate: null, 
        deadline: null, 
        budget: "", 
        type: "",
        phone: ""
    }
    const schema = yup.object().shape({})
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })

    const typeOptions = new Array()
    ProjectType.forEach((type: any) => {
        typeOptions.push({label: type.fullText ? type.fullText : type.smallText, value: type.id})
    })

     const timezoneOptions = new Array(
        {group: "America", items: []},
        {group: "Europe", items: []},
        {group: "Pacific", items: []},
        {group: "Asia", items: []},
        {group: "Antarctica", items: []},
        {group: "Africa", items: []},
        {group: "Atlantic", items: []},
        {group: "Indian", items: []},
    ) as any
    Timezones.forEach((timezone: any) => {
        timezone.group === "America" && timezoneOptions[0].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Europe" && timezoneOptions[1].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Pacific" && timezoneOptions[2].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Asia" && timezoneOptions[3].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Antarctica" && timezoneOptions[4].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Africa" && timezoneOptions[5].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Atlantic" && timezoneOptions[6].items.push({"value": timezone.value, "label": timezone.label})
        timezone.group === "Indian" && timezoneOptions[7].items.push({"value": timezone.value, "label": timezone.label})
    })
    
    return <>
    <PrimaryButton onClick={open}>Request New Project</PrimaryButton>
    <Modal opened={isOpenedID ? true : opened} onClose={isOpenedID ? forceClose : close} title="Request New Project" yOffset="2rem" xOffset="2rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Box component="main" id="newAlert" color="white">
                <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
                    <FormInput inputID="name" inputLabel="Project Name" {...form.getInputProps('name')} inputDescription="Please use a easily project name to make it easy for finding. (I.E. Install: DLPortal)" icon={<HugeIcon name="text-font" variant="twotone" />} isRequired />
                    <FormTextArea inputID="description" inputLabel="Project Description" helperText="MDX Enabled!" textRows={3} {...form.getInputProps('description')} isRequired />
                    <SimpleGrid cols={2} my="2rem">
                          <FormDatePicker dateLabel="Expected Start Date" datePlaceholder="When are you expecting this project to start on?" {...form.getInputProps('startDate')} />
                          <FormDatePicker dateLabel="Expected Deadline" datePlaceholder="When is the expected deadline of this project?" {...form.getInputProps('deadline')} />
                    </SimpleGrid>
                    <FormInput inputID="budget" inputLabel="Budget" {...form.getInputProps('budget')} icon={<HugeIcon name="save-money-dollar" variant="twotone"/>} inputDescription="Please include what you think will be the budget for the project. If no budget say FREE, or UNSURE if you're unsure. If currency is not in Canadian Dollar (CAD) please also specify the currency!" isRequired />
                    <FormSelect inputID="type" inputLabel="Project Type" inputData={typeOptions} {...form.getInputProps(`type`)} onChange={setTypeSelected} value={typeSelected} clearable searchable />
                     <FormInputPhone inputID="phone" inputLabel="Your Phone Number" {...form.getInputProps('phone')} inputDescription="Please provide a phone number that you can be reached at if you would like. If you chose to leave it blank that is also okay. Please use the format of '(123) 456-7890'." icon={<HugeIcon name="smart-phone-01" variant="twotone" />} />
                     <FormSelect inputID="timezone" inputLabel="Timezone" inputDescription="Please select the timezone of the contact's phone number; that way it will be easier to schedule calls for times that works for everyone!" inputData={timezoneOptions} {...form.getInputProps(`timezone`)} onChange={setTimezoneSelected} value={timezoneSelected} searchable />
                    <FormSubmitButton icon={<HugeIcon name="sent" />}>Request New Project</FormSubmitButton>
                </Box>
            </Box>
        </Modal>
    </>
}