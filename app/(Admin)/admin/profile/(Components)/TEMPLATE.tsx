"use client"

import { Box } from "@mantine/core"

import z from "zod/v4"
import { zodResolver } from "mantine-form-zod-resolver"
import { useForm } from "@mantine/form"
import FormInput from "@/app/(Components)/(Form)/FormInput"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"

export default function TEMPLATE({user}: {user: any}) {
    const onSubmit = async (values: any) => {
        //TODO: Update profile logic
    }

    const initialValues = {
        name: user?.name || "",
        email: user?.email || "",
    }

    const schema = z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        email: z.email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
    })
    
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: zodResolver(schema)
    })
    
    return <SectionCard id="profileEdit" styleType="primaryCard" mx="2rem" p="0rem 1rem">
        <Box p={{base: "0.5rem", sm: "2rem"}} component="form" onSubmit={form.onSubmit(onSubmit)}>
            <FormInput inputID="name" inputLabel="Name" {...form.getInputProps('name')} isRequired icon={<FontAwesomeIcon icon={["fal", "id-badge"]} />} />
            <FormInput inputID="email" inputLabel="Email" {...form.getInputProps('email')} isRequired icon={<FontAwesomeIcon icon={["fal", "envelope"]} />} />
            <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "user-pen"]} />} customWidth="calc(100% - 2rem)" disabled>Update Profile</FormSubmitButton>
        </Box>
    </SectionCard>
}
