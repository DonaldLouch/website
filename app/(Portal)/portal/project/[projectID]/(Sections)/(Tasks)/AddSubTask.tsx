'use client'

import FormInput from "@/app/(Components)/(Form)/FormInput"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import supabase from "@/lib/supabase"
import { AlertDiamondIcon, PencilEdit01Icon, TaskAdd01Icon, TextFontIcon } from "@hugeicons/react"
import { Box, Grid } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { useRouter } from "next/navigation"
import * as yup from 'yup';

export default function AddSubTask({task, isStaff}: any) {
    const router = useRouter()

    const onSubmit = async (values: any) => {
        const id = "subTask"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
        
        const subTaskData = {
            id,
            title: values.title,
            isCompleted: false,
            orderNumber: !task.subTasks ? 1 : task.subTasks.length + 1
        }
        const subArray = !task.subTasks ? new Array() : task.subTasks
        subArray.push(subTaskData)
        console.log(subArray)

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Tasks").update({ 
            subTasks: subArray,
            lastUpdated: new Date()
        }).eq('id', task.id)

        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 204 ? `"Added Sub Task 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
            message: `${supabaseStatus === 204 ? `You have successfully added the new sub task!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 204 ? "black" : "red-6",
            icon: supabaseStatus === 204 ? <PencilEdit01Icon /> : <AlertDiamondIcon />
        })
        supabaseStatus === 204 && router.refresh()
    }

    const initialValues= {
        title: null
    }
    const schema = yup.object().shape({})
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })

    return isStaff &&
        <Box component="form" onSubmit={form.onSubmit(onSubmit)} m="-1rem 2rem 2rem">
            <Grid w="80%" justify="center" align="center">
                <Grid.Col span={10} pl="2rem">
                    <FormInput inputID="title" {...form.getInputProps('title')} icon={<TextFontIcon variant="twotone" />} w="100%" />
                </Grid.Col>
                <Grid.Col span={2}>
                    <FormSubmitButton icon={<TaskAdd01Icon />} isNotFull={true}>Add Sub Task</FormSubmitButton>
                </Grid.Col>
            </Grid>
        </Box>

}