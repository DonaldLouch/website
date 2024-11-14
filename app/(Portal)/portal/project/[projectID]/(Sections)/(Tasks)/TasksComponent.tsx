'use client'

import { Title, Stack, Text, Grid, Box, Badge, Anchor, Group, Alert, Table } from "@mantine/core";
import { useRouter } from "next/navigation";

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from "@mantine/form";

import { AlertDiamondIcon, InformationCircleIcon, TaskAdd01Icon, TextFontIcon } from "@hugeicons/react";
import supabase from "@/lib/supabase";
import { notifications } from "@mantine/notifications";
import FormInput from "@/app/(Components)/(Form)/FormInput";
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton";
import { ProjectStatus } from "@/lib/Project/projectStatus";
import TaskRow from "./TaskRow";

// import { ProjectStatus } from "../../../../lib/projectStatus";

// import { useRouter } from 'next/navigation'
// import { TaskPriority } from "../../../../lib/taskPriority";

// async function getAllTasks(projectID: string) {
//   const res = await fetch(`/api/project/tasks/getAllTasks?id=${projectID}`, { cache: 'no-store' });
//   if (!res.ok) {
//     throw new Error('Failed to fetch tasks for this projects');
//   }
//   return res.json();
// }

export default function TasksComponent({project, isStaff, tasks, openID}: any) {

    // const toast = useToast()
    // const id = "toastID";  
    const router = useRouter()

    
    // const {response: tasks} = await getAllTasks(project.id)
    const taskStatus = ProjectStatus.find(({ id }) => id === tasks.status)
    // console.log(tasks)

    const onSubmit = async (values: any) => {
        const id = "task"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()
        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Tasks").insert({ 
            id,
            clientID: project.client.id,
            projectID: project.id,
            title: values.title,
            taskOrderNumber: tasks.length + 1
        }) as any
         supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 201 ? "Task added 🎉" : `Error #${supabaseError?.code} has Occurred`}`, 
            message:`${supabaseStatus === 201 ? `You have successfully added ${values.title}!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 201 ? "black" : "red",
            icon: supabaseStatus === 201 ? <TaskAdd01Icon /> : <AlertDiamondIcon />
        })
        supabaseStatus === 201 && router.refresh()
    }

    // async function update(detailsData: any) {
    //     const response = await fetch(`/api/project/updateDetails`, {
    //         method: "POST",
    //         body: JSON.stringify(detailsData),
    //     });

    //     // console.log(response)

    //     if (response.ok) {
    //         if (!toast.isActive(id)) {
    //         toast({
    //             id,
    //             title: "Details Updated",
    //             description: `The project details have been updated successfully. Donald Louch will review the details and contact you for further updates.`,
    //             status: "success",
    //             duration: 9000,
    //             isClosable: true,
    //         })
    //     }
    //     }
    //     if (response.status === 400) {
    //         console.log("Error")
    //     }
    // }
    

    const initialValues= {
        title: null
    }
    const schema = yup.object().shape({})
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })
  
    return <>
            {isStaff &&
                <Box component="form" onSubmit={form.onSubmit(onSubmit)} m="-1rem 2rem 2rem">
                    <Grid w="100%" justify="center" align="center">
                        <Grid.Col span={10} pl="2rem">
                            <FormInput inputID="title" {...form.getInputProps('title')} icon={<TextFontIcon variant="twotone" />} w="100%" />
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <FormSubmitButton icon={<TaskAdd01Icon />} isNotFull={true}>Add Task</FormSubmitButton>
                        </Grid.Col>
                    </Grid>
                </Box>
            }
            {tasks.length === 0 ? <Alert variant="light" color="green" icon={<InformationCircleIcon variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">There currently is no tasks assigned for this project. Donald Louch will add new tasks as the project progresses so make sure to check back!</Text></Alert> :
                <Table stickyHeader stickyHeaderOffset={60} highlightOnHover borderColor="var(--darkPurple)" highlightOnHoverColor="var(--darkPurpleRGBA)" striped="even" stripedColor="var(--blackRGBA)" p="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)", overflow: "hidden"}}>
                    <Table.Tbody>
                        {tasks.map((task: any, index: number) => {
                            const isOpenedID = openID === task.id ? true : false
                            return <TaskRow key={index} task={task} isStaff={isStaff} isOpenedID={isOpenedID} />
                            })}
                    </Table.Tbody>
                </Table>
            }
    </>
}