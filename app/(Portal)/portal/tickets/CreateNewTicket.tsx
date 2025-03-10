'use client'

import { Box, Modal, SimpleGrid } from "@mantine/core";
import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton";
import FormInput from "@/app/(Components)/(Form)/FormInput";
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { notifications } from "@mantine/notifications";
import { useRouter, useSearchParams } from "next/navigation";

import { TaskPriority } from "@/lib/Project/taskPriority";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import HugeIcon from "@/app/(Components)/HugeIcon";

// type ProjectProps = {
//     isAdmin: boolean
//     isMod: boolean
// }

// {isAdmin, isMod}: ProjectProps

// async function getClientProjects(userID: string) {
//     "use sever"
//     const clientProjects = await supabase.from('Projects').select().contains('client', {id: userID}) as any
//     return JSON.parse(JSON.stringify(clientProjects))
// }

// async function getAdminProjects(isStaff: boolean) {
//     "use sever"
//     const adminProjects = isStaff ? await supabase.from('Projects').select().order('lastUpdated', { ascending: false }) : undefined
//     return adminProjects
// }

export default function CreateNewTicket({isStaff, relatedID}: any) {
    const prams = useSearchParams()
    const openID = prams.get("openID") as string

    const router = useRouter()
    const [opened, { open, close }] = useDisclosure(false)

    // const guessTimezone =  moment.tz.guess()

    const [prioritySelected, setPrioritySelected] = useState("LOW")
    const [relatedSelected, setRelatedSelected] = useState(relatedID ? relatedID : null)
    const [subjectSelected, setSubjectSelected] = useState(null)
    const [internalOptions, setInternalOptions] = useState(false)
    // const [timezoneSelected, setTimezoneSelected] = useState(guessTimezone)
    console.log(relatedID)
    const { user } = useUser()
    const userID = user?.id
    
    const isOpenedID = openID === "newTicket" ? true : false

    function forceClose() {
        router.push(`/portal/tickets`)
    }

    const onSubmit = async (values: any) => {
        const id = "ticket"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()

        const from = isStaff ? {type: "admin"} : !isStaff && user?.id ? {
            type: "client",
            id: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user.emailAddresses[0].emailAddress!,
        } : {type: "user"}

        const theSubject = subjectSelected === "Other" ? values.otherSubject : subjectSelected

        const relatedArray = relatedSelected ?relatedSelected.split(";;") : []
        const relatedTo = {type: relatedArray[0], id: relatedArray[1]}

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Tickets").insert({ 
            id,
            from,
            subject: theSubject,
            body: values.body,
            relatedTo: relatedSelected ? relatedTo : [],
            internalONLY: internalOptions,
            priority: prioritySelected,
            // status: "SUBMITTED",
            createdOn: new Date(),
            lastUpdatedOn: new Date()
        })
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 201 ? "Ticket Created 🎉" : `Error #${supabaseError?.code} has Occurred`}`, 
            message:`${supabaseStatus === 201 ? `You have successfully created a ticket!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 201 ? "black" : "red",
            icon: supabaseStatus === 201 ? <HugeIcon name="sent" /> : <HugeIcon name="alert-diamond" />
        })
        supabaseStatus === 201 && router.push(`/portal/ticket/${id}`)
    }

    const initialValues = {
        otherSubject: "",
        body: "",
        // description: null, 
        // startDate: null, 
        // deadline: null, 
        // budget: null, 
        // type: null,
        // phone: null
    }
    const schema = yup.object().shape({})
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })

    const priorityOptions = new Array()
    // const taskPriority = TaskPriority.find(({ id }) => id === priority)
    TaskPriority.forEach((priority: any) => {
        priorityOptions.push({label: priority.text, value: priority.id})
    })

    const subjectOptions = new Array(
        {label: "Project Help", value: "Project Help"},
        {label: "Task Issue", value: "Task Issue"},
        {label: "Question About Invoice", value: "Question About Invoice"},
        {label: "Issue With Payment", value: "Issue With Payment"},
        {label: "Website Help", value: "Website Help"},
        {label: "Account Help", value: "Account Help"},
        {label: "Resume Request", value: "Resume Request"},
        {label: "Other", value: "Other"},
    )

    const [clientProjects, setClientProjects] = useState<any>([])
    const [adminProjects, setAdminProjects] = useState<any>([])    
    const [clientTasks, setClientTasks] = useState<any>([])
    const [adminTasks, setAdminTasks] = useState<any>([])

    useEffect(() => {
        const fetchClientProjects = async () => {
            const {data} = await supabase.from('Projects').select().contains('client', {id: userID}) as any
            setClientProjects(data)
        }
        fetchClientProjects()

        const fetchAdminProjects = async () => {
            const {data} = isStaff ? await supabase.from('Projects').select().order('lastUpdated', { ascending: false }) : undefined
            setAdminProjects(data)
        }
        fetchAdminProjects()
        
         const fetchClientTasks = async () => {
            const {data} = await supabase.from('Tasks').select().match({'clientID': userID}).order('lastUpdated', { ascending: false }) as any
            setClientTasks(data)
        }
        fetchClientTasks()

        const fetchAdminTasks = async () => {
            const {data} = isStaff ? await supabase.from('Tasks').select().order('lastUpdated', { ascending: false }) : undefined
            setAdminTasks(data)
        }
        fetchAdminTasks()
    }, [])
    const relatedOptions = new Array(
        // {group: "", items: [{label: "Nothing", value: ""}]},
        {group: "Projects", items: []},
        {group: "All Projects", items: []},
        {group: "Tasks", items: []},
        {group: "Invoice", items: []},
        {group: "Payment", items: []},
    ) as any
    clientProjects.forEach((project: any) => {
        project.client.id === userID && relatedOptions[0].items.push({"value": `Project;;${project.id}`, "label": `${project.name} (${project.id})`})
    })
    adminProjects.forEach((project: any) => {
        project.client.id != userID && relatedOptions[1].items.push({"value": `Project;;${project.id}`, "label": `${project.name} (${project.id})`})
    })
    clientTasks.forEach((task: any) => {
        task.clientID === userID && relatedOptions[2].items.push({"value": `Task;;${task.id}`, "label": `${task.title} (${task.id})`})
    })
    adminTasks.forEach((task: any) => {
        task.clientID != userID && relatedOptions[3].items.push({"value": `Task;;${task.id}`, "label": `${task.title} (${task.id})`})
    })

    return <>
        <PrimaryButton onClick={open}>Create New Ticket</PrimaryButton>
        <Modal opened={isOpenedID ? true : opened} onClose={isOpenedID ? forceClose : close} title="Create New Ticket" yOffset="2rem" xOffset="2rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Box component="main" id="newTicket" color="white">
                <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
                    <FormSelect inputID="subject" inputLabel="Ticket Subject" inputData={subjectOptions} {...form.getInputProps(`subject`)} onChange={setSubjectSelected} value={subjectSelected} />
                    {subjectSelected === "Other" &&
                        <FormInput inputID="otherSubject" inputLabel="Other Subject" {...form.getInputProps('otherSubject')} inputDescription="Please use a subject to describe the ticket" icon={<HugeIcon name="text-font" variant="twotone" />} isRequired={subjectSelected === "Other" ? true : false} />
                    }
                    <FormTextArea inputID="body" inputLabel="Ticket Body" helperText="MDX Enabled!" textRows={10} {...form.getInputProps('body')} isRequired />
                    <SimpleGrid cols={2} my="2rem">
                        {relatedOptions[0].items.length > 0 || relatedOptions[1].items.length > 0 ? <FormSelect inputID="relatedTo" inputLabel="Related To" inputData={relatedOptions} {...form.getInputProps(`relatedTo`)} onChange={setRelatedSelected} value={relatedSelected} searchable clearable /> : null}
                        <FormSelect inputID="priority" inputLabel="Priority" inputData={priorityOptions} {...form.getInputProps(`priority`)} onChange={setPrioritySelected} value={prioritySelected} />
                    </SimpleGrid>
                    {isStaff &&
                        <FormSwitch 
                            inputID="internalOptions" 
                            helperText="Toggle if this ticket is internal only"
                            onClick={(e: any) => setInternalOptions(e.target.checked)} 
                            checked={internalOptions}
                        />
                    }
                    <FormSubmitButton icon={<HugeIcon name="sent" />}>Create Ticket</FormSubmitButton>
                </Box>
            </Box>
        </Modal>
    </>
}