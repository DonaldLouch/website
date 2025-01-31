
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
import { useRouter } from "next/navigation";

import { TaskPriority } from "@/lib/Project/taskPriority";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import { ProjectStatus } from "@/lib/Project/projectStatus";
import HugeIcon from "@/app/(Components)/HugeIcon";

export default function EditTicket({isStaff, ticket}: any) {
    const router = useRouter()
    const [opened, { open, close }] = useDisclosure(false)
    const [statusSelected, setStatusSelected] = useState(ticket.status ? ticket.status : undefined)

    const [prioritySelected, setPrioritySelected] = useState(ticket.priority)
    const [fromSelected, setFromSelected] = useState(ticket.from.type ? `client;;${ticket.from.id}` : undefined)
    const [relatedSelected, setRelatedSelected] = useState(ticket.relatedTo.id ? `${ticket.relatedTo.type};;${ticket.relatedTo.id}` : undefined)
    const [internalOptions, setInternalOptions] = useState(ticket.internalONLY)
    const [users, setUsers] = useState<any>([])

    const { user } = useUser()
    const userID = user?.id

    useEffect(() => {
        async function getUsers() {
            const { users } = await fetch('/api/users/getAllUsers').then((res) => res.json())
            setUsers(users)
        }
        getUsers()
    }, [])

    const onSubmit = async (values: any) => {
        const fromArray = fromSelected.split(";;")
        const userData = users.find(({ id }: any) => id === fromArray[1])
        const from = fromArray[0] === "admin" ? {type: "admin"} 
            : fromArray[0] === "client" ? {
                type: "client",
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.emailAddresses[0].emailAddress,
            } 
            : {type: "user"}
        const relatedArray = relatedSelected.split(";;")
        const relatedTo = {type: relatedArray[0], id: relatedArray[1]}

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Tickets").update({ 
            from,
            subject: values.subject,
            body: values.body,
            relatedTo: relatedSelected ? relatedTo : null,
            internalONLY: internalOptions,
            priority: prioritySelected,
            status: statusSelected,
            lastUpdatedOn: new Date()
        }).eq('id', ticket.id)
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 204 ? `"${ticket.id}" Updated 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
            message: `${supabaseStatus === 204 ? `You have successfully updated the ticket!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 204 ? "black" : "red-6",
            icon: supabaseStatus === 204 ? <HugeIcon name="ticket-01" /> : <HugeIcon name="alert-diamond" />
        })
        supabaseStatus === 204 && router.refresh()
    }

    const initialValues = {
        subject: ticket.subject,
        body: ticket.body,
    }
    const schema = yup.object().shape({})
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })

    const statusOptions = new Array()
    ProjectStatus.forEach((type: any) => {
        statusOptions.push({label: type.fullText ? type.fullText : type.smallText, value: type.id})
    })
    
    const priorityOptions = new Array()
    TaskPriority.forEach((priority: any) => {
        priorityOptions.push({label: priority.text, value: priority.id})
    })
    
    const userOptions = new Array({label: "ADMIN", value: "admin"})
    users.forEach((user: any) => {
        userOptions.push({label: `${user.firstName} ${user.lastName}`, value: `client;;${user.id}`})
    })

    const [clientProjects, setClientProjects] = useState<any>([])
    const [adminProjects, setAdminProjects] = useState<any>([])

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

    return <>
        <PrimaryButton onClick={open}>Edit Ticket</PrimaryButton>
        <Modal opened={opened} onClose={close} title={`Edit Ticket: ${ticket.id}`} yOffset="2rem" xOffset="2rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Box component="main" id="newTicket" color="white">
                <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
                   <FormInput inputID="subject" inputLabel="Subject" {...form.getInputProps('subject')} inputDescription="Please use a subject to describe the ticket" icon={<HugeIcon name="text-font" variant="twotone" />} isRequired />
                    
                    <FormTextArea inputID="body" inputLabel="Ticket Body" helperText="MDX Enabled!" textRows={10} {...form.getInputProps('body')} isRequired />
                    {relatedOptions[0].items.length > 0 || relatedOptions[1].items.length > 0 ? <FormSelect inputID="relatedTo" inputLabel="Related To" inputData={relatedOptions} {...form.getInputProps(`relatedTo`)} onChange={setRelatedSelected} value={relatedSelected} searchable clearable /> : null}
                    <FormSelect inputID="from" inputLabel="From" inputData={userOptions} {...form.getInputProps(`from`)} onChange={setFromSelected} value={fromSelected} searchable clearable />
                    <SimpleGrid cols={2} my="2rem">
                        <FormSelect inputID="priority" inputLabel="Priority" inputData={priorityOptions} {...form.getInputProps(`priority`)} onChange={setPrioritySelected} value={prioritySelected} />
                        <FormSelect inputID="status" inputLabel="Task Status" inputData={statusOptions} {...form.getInputProps(`status`)} onChange={setStatusSelected} value={statusSelected} disabled={!isStaff} />
                    </SimpleGrid>
                    {isStaff &&
                        <FormSwitch 
                            inputID="internalOptions" 
                            helperText="Toggle if this ticket is internal only"
                            onClick={(e: any) => setInternalOptions(e.target.checked)} 
                            checked={internalOptions}
                        />
                    }
                    <FormSubmitButton icon={<HugeIcon name="pencil-edit-01" />}>Edit Ticket</FormSubmitButton>
                </Box>
            </Box>
        </Modal>
    </>
}