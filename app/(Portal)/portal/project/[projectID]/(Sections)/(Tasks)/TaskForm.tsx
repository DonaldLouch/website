'use client'

import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker"
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea"
import { ProjectStatus } from "@/lib/Project/projectStatus"
import { TaskPriority } from "@/lib/Project/taskPriority"
import supabase from "@/lib/supabase"
import { AlertDiamondIcon, PencilEdit01Icon, TaskDone01Icon, TaskEdit01Icon } from "@hugeicons/react"
import { Box, SimpleGrid, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { yupResolver } from "mantine-form-yup-resolver"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import * as yup from 'yup';

export default function TaskForm({task, isStaff}: any) {
    const [statusSelected, setStatusSelected] = useState(task.status ? task.status : null)
    const [prioritySelected, setPrioritySelected] = useState(task.priority ? task.priority : null)
    const [startTime, setStartTime] = useState(null)
    const [deadline, setDeadline] = useState(null)

    const router = useRouter()

    useEffect(() => {
        console.log(startTime && startTime != new Date(task.startDate))

         if (statusSelected != task.status  && statusSelected === "COMPLETED") {
            (async () => {
                const { status: supabaseStatus , error: supabaseError } = await supabase.from("Tasks").update({ 
                    isCompleted: true,
                    status: statusSelected,
                    completedOn: new Date(),
                    lastUpdated: new Date()
                }).eq('id', task.id)
                supabaseStatus && notifications.show({ 
                    title: `${supabaseStatus === 204 ? `"${task.title}" Completed 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
                    message: `${supabaseStatus === 204 ? `You have successfully completed the task!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
                    color: supabaseStatus === 204 ? "black" : "red-6",
                    icon: supabaseStatus === 204 ? <TaskDone01Icon /> : <AlertDiamondIcon />
                })
                supabaseStatus === 204 && router.refresh()
            })()
        }
        
        if (statusSelected != task.status  && task.status === "COMPLETED") {
            (async () => {
                const { status: supabaseStatus , error: supabaseError } = await supabase.from("Tasks").update({ 
                    isCompleted: false,
                    status: statusSelected,
                    completedOn: null,
                    lastUpdated: new Date()
                }).eq('id', task.id)
                supabaseStatus && notifications.show({ 
                    title: `${supabaseStatus === 204 ? `"${task.title}" Not Completed 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
                    message: `${supabaseStatus === 204 ? `You have successfully marked the task as uncompleted!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
                    color: supabaseStatus === 204 ? "black" : "red-6",
                    icon: supabaseStatus === 204 ? <TaskEdit01Icon /> : <AlertDiamondIcon />
                })
                supabaseStatus === 204 && router.refresh()
            })()
        }

        if (statusSelected != task.status || prioritySelected != task.priority || startTime && startTime != new Date(task.startDate) || deadline && deadline != new Date(task.deadline)) {
            (async () => {
                const { status: supabaseStatus , error: supabaseError } = await supabase.from("Tasks").update({ 
                    status: statusSelected,
                    priority: prioritySelected,
                    startDate: startTime ? new Date(startTime) : task.startDate,
                    deadline: deadline ? new Date(deadline) : task.deadline,
                    lastUpdated: new Date()
                }).eq('id', task.id)
                supabaseStatus && notifications.show({ 
                    title: `${supabaseStatus === 204 ? `"${task.title}" Status Updated 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
                    message: `${supabaseStatus === 204 ? `You have successfully updated the task!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
                    color: supabaseStatus === 204 ? "black" : "red-6",
                    icon: supabaseStatus === 204 ? <PencilEdit01Icon /> : <AlertDiamondIcon />
                })
                supabaseStatus === 204 && router.refresh()
            })()
        }
    }, [statusSelected, prioritySelected, startTime, deadline])
    
    // const onSubmit = async (values: any) => {
    //     console.log(values, statusSelected, prioritySelected)
    //     // const { status: supabaseStatus , error: supabaseError } = await supabase.from("Tasks").update({ 
    //     //     description: values.description,
    //     //     lastUpdated: new Date()
    //     // }).eq('id', task.id)
        
    //     // supabaseStatus && notifications.show({ 
    //     //     title: `${supabaseStatus === 204 ? `"${task.title}" Description Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
    //     //     message: `${supabaseStatus === 204 ? `You have successfully updated the task description!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
    //     //     color: supabaseStatus === 204 ? "black" : "red-6",
    //     //     icon: supabaseStatus === 204 ? <PencilEdit01Icon /> : <AlertDiamondIcon />
    //     // })
    // }

    const initialValues= {
    }

    const validationSchema = yup.object({})

    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(validationSchema)
    })

    const statusOptions = new Array()
    ProjectStatus.forEach((type: any) => {
        statusOptions.push({label: type.fullText ? type.fullText : type.smallText, value: type.id})
    })
    
    const priorityOptions = new Array()
    TaskPriority.forEach((type: any) => {
        priorityOptions.push({label: type.text, value: type.id})
    })

    
    return <>
        <FormSelect inputID="status" inputLabel="Task Status" inputData={statusOptions} {...form.getInputProps(`status`)} onChange={setStatusSelected} value={statusSelected} disabled={!isStaff} />
        <FormSelect inputID="priority" inputLabel="Task Priority" inputData={priorityOptions} {...form.getInputProps(`priority`)} onChange={setPrioritySelected} value={prioritySelected} disabled={!isStaff} />
        {isStaff &&<>
            <SimpleGrid cols={2} mb="1rem">
                <FormDatePicker dateLabel="Start Date" onChange={setStartTime} />
                <FormDatePicker dateLabel="Deadline" onChange={setDeadline} />
            </SimpleGrid>
        </>}
    </>
}
