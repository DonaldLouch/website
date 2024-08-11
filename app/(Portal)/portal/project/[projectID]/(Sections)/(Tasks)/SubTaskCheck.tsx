'use client'

import FormCheckbox from '@/app/(Components)/(Form)/FormCheckbox';
import supabase from '@/lib/supabase';
import { AlertDiamondIcon, PencilEdit01Icon, TaskDone01Icon } from '@hugeicons/react';
import { Box } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

export default function SubTaskCheck({subtask, allSubTasks, isStaff, index, taskID}: any) {
    const [isChecked, setIsChecked] = useState(subtask.isCompleted)
    const router = useRouter()
    useEffect(() => {
        const getFullArray = allSubTasks
        // const currentSubTask = getFullArray.find(({ id }: any) => id === subtask.id)
        if(subtask.isCompleted != isChecked) {

            getFullArray[index]['isCompleted']=isChecked ? true : false as any
            // getFullArray[index].push(currentSubTask)
            // console.log(isChecked)
            (async () => {
                const { status: supabaseStatus , error: supabaseError } = await supabase.from("Tasks").update({ 
                    subTasks: getFullArray,
                    lastUpdated: new Date()
                }).eq('id', taskID)
                supabaseStatus && notifications.show({ 
                    title: `${supabaseStatus === 204 ? `Sub Task Updated 🎉` : `Error #${supabaseError?.code} has Occurred`}`, 
                    message: `${supabaseStatus === 204 ? `You have successfully update the sub task!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
                    color: supabaseStatus === 204 ? "black" : "red-6",
                    icon: supabaseStatus === 204 ? <PencilEdit01Icon /> : <AlertDiamondIcon />
                })
                supabaseStatus === 204 && router.refresh()
            })()
        }
        // console.log(currentSubTask['isCompleted']=isChecked, currentSubTask)
    }, [isChecked]);
    
    // const onSubmit = async (values: any) => {}
    // const initialValues= {}
    // const schema = yup.object().shape({})
    // const form = useForm({
    //     mode: 'controlled',
    //     initialValues,
    //     validate: yupResolver(schema)
    // })

    return <Box my="1rem">
        <FormCheckbox inputID={subtask.id} inputLabel={subtask.title} disabled={!isStaff} onChange={(event: any) => setIsChecked(event.currentTarget.checked)} checked={isChecked} />
    </Box>
}
