'use client'

import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"
import supabase from "@/lib/supabase"
import { AlertDiamondIcon, PencilEdit01Icon } from "@hugeicons/react"
import { Box, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { yupResolver } from "mantine-form-yup-resolver"
import * as yup from 'yup';

export default function NotesSection({project, isStaff}: any) {
    const onSubmit = async (values: any) => {
        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Projects").update({ 
            notes: values.notes,
            lastUpdated: new Date()
        }).eq('id', project.id)
        
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 204 ? `"${project.name}" Notes Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
            message: `${supabaseStatus === 204 ? `You have successfully updated the project notes!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 204 ? "black" : "red-6",
            icon: supabaseStatus === 204 ? <PencilEdit01Icon /> : <AlertDiamondIcon />
        })
    }

     const initialValues= {
        notes: project.notes
    }

    const validationSchema = yup.object({})

    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(validationSchema)
    })
    
    return <>
        {/* <Title size="3xl" td="underline" fw="900" order={1} ta="center" m="0">Description</Title> */}

        <Box component="form" onSubmit={form.onSubmit(onSubmit)} mt="-1rem">
            <FormTextArea inputID="notes" textRows={30} {...form.getInputProps('notes')} disabled={!isStaff} />
            {isStaff && <FormSubmitButton icon={<PencilEdit01Icon />}>Update Notes</FormSubmitButton>}
        </Box>
    </>
}
