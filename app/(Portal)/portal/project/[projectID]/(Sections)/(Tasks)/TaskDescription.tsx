'use client'

import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"
import HugeIcon from "@/app/(Components)/HugeIcon"
import supabase from "@/lib/supabase"
import { Box, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { yupResolver } from "mantine-form-yup-resolver"
import * as yup from 'yup';

export default function TaskDescription({task, isStaff}: any) {
    const onSubmit = async (values: any) => {
        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Tasks").update({ 
            description: values.description,
            lastUpdated: new Date()
        }).eq('id', task.id)
        
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 204 ? `"${task.title}" Description Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
            message: `${supabaseStatus === 204 ? `You have successfully updated the task description!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 204 ? "black" : "red-6",
            icon: supabaseStatus === 204 ? <HugeIcon name="pencil-edit-01" /> : <HugeIcon name="alert-diamond" />
        })
    }

     const initialValues= {
        description: task.description
    }

    const validationSchema = yup.object({})

    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(validationSchema)
    })
    
    return <>
        <Title size="3xl" td="underline" fw="900" order={1} ta="center" m="0">Description</Title>

        <Box component="form" onSubmit={form.onSubmit(onSubmit)} m="0">
            <FormTextArea inputID="description" textRows={10} {...form.getInputProps('description')} disabled={!isStaff} />
            {isStaff && <FormSubmitButton icon={<HugeIcon name="pencil-edit-01" />}>Update Description</FormSubmitButton>}
        </Box>
    </>
}
