"use client"

import { Box, Title, Text } from "@mantine/core"

import z from "zod/v4"
import { zodResolver } from "mantine-form-zod-resolver"
import { useForm } from "@mantine/form"
import FormInput from "@/app/(Components)/(Form)/FormInput"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"

export default function SecurityCard({user, session}: {user: any, session: any}) {
    const isTwoFAEnabled = user.twoFactorEnabled ?? false
    const passwordReset = async () => {
        // TODO: Implement password reset logic
    }
    const onSubmit = async (values: any) => {
        //TODO: Update security logic
    }

    const initialValues = {
        // name: user?.name || "",
        // email: user?.email || "",
    }

    const schema = z.object({
        // name: z.string().min(1, { message: 'Name is required' }),
        // email: z.email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
    })
    
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: zodResolver(schema)
    })
    
    return <>
    <SectionCard id="password" styleType="primaryCard" m="2rem">
        <Title order={3} fz="2rem" ta="center">Change Password</Title>
        <Text>To change your password, we will need to initiate a password reset process. To start click the below button then follow the instructions sent to your email.</Text>
        <PrimaryButton action={passwordReset()} icon={<FontAwesomeIcon icon={["fal", "user-lock"]} />} isFullWidth>Reset Password</PrimaryButton>
    </SectionCard>
    <SectionCard id="2FA" styleType="primaryCard" m="2rem">
        <Title order={3} fz="2rem" ta="center">Two Factor Authentication</Title>
        <Text>Two Factor Authentication (2FA) is currently {isTwoFAEnabled ? "enabled" : "disabled"} on your account.</Text>
        {/* TODO: Create 2FA Function */}
    </SectionCard>
    <SectionCard id="Passkeys" styleType="primaryCard" m="2rem">
        <Title order={3} fz="2rem" ta="center">Passkeys</Title>
    </SectionCard>
        {/* <SectionCard id="profileEdit" styleType="primaryCard" mx="2rem" p="0rem 1rem">
            <Box p={{base: "0.5rem", sm: "2rem"}} component="form" onSubmit={form.onSubmit(onSubmit)}>
                <FormInput inputID="name" inputLabel="Name" {...form.getInputProps('name')} isRequired icon={<FontAwesomeIcon icon={["fal", "id-badge"]} />} />
                <FormInput inputID="email" inputLabel="Email" {...form.getInputProps('email')} isRequired icon={<FontAwesomeIcon icon={["fal", "envelope"]} />} />
                <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "user-pen"]} />} customWidth="calc(100% - 2rem)" disabled>Update Profile</FormSubmitButton>
            </Box>
        </SectionCard> */}
    </>
}
