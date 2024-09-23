import { Box } from "@mantine/core"

import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"

import { useForm, yupResolver } from "@mantine/form"
import * as yup from "yup"
import { AlertDiamondIcon, SentIcon } from "@hugeicons/react"
import supabase from "@/lib/supabase"
import { useUser } from "@clerk/nextjs"
import { notifications } from "@mantine/notifications"
import { useRouter } from "next/navigation"

export default function AddReply({ ticket, isStaff }: any) {
    const { user } = useUser()
    const router = useRouter()
    const onSubmit = async (values: any) => {
        const ticketID = ticket.id
        const id = "reply"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()

        const from = isStaff ? {type: "admin"} : {
            type: "client",
            id: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            // username: user?.username,
            // email: user?.emailAddresses[0].emailAddress,
            // phoneNumber: values.phone,
            // timezone: timezoneSelected
        }

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("TicketReplies").insert({ 
            id,
            ticketID,
            from,
            body: values.body,
            createdOn: new Date(),
            lastUpdatedOn: new Date()
        })
        supabaseStatus === 201 && await supabase.from("Tickets").update({ 
            lastUpdatedOn: new Date(),
            status: isStaff ? "AWAITINGC" : "AWAITINGA"
        }).eq('id', ticket.id)
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 201 ? "Reply Added 🎉" : `Error #${supabaseError?.code} has Occurred`}`, 
            message:`${supabaseStatus === 201 ? `You have successfully added a reply to the ticket: ${ticket.id}!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 201 ? "black" : "red",
            icon: supabaseStatus === 201 ? <SentIcon /> : <AlertDiamondIcon />
        })
        supabaseStatus === 201 && router.refresh()
        // const from = ticket.from.id
    }
    const initialValues= {
        body: null
    }
    const schema = yup.object().shape({})
    
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })

    return <Box component="form" onSubmit={form.onSubmit(onSubmit)} m="0">
        <FormTextArea inputID="body" textRows={10} {...form.getInputProps('body')} />
        <FormSubmitButton icon={<SentIcon />}>Add Reply</FormSubmitButton>
    </Box>
}
