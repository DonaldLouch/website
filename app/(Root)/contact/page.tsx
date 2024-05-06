'use client'
import { Anchor, Box, Group, Text, Notification } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { BsEnvelopeAt, BsEnvelopeExclamation, BsPersonBadge, BsSend, BsSendCheck, BsSendDash } from 'react-icons/bs'

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from '@mantine/form';
import FormInput from '@/app/(Components)/(Form)/FormInput';
import FormTextArea from '@/app/(Components)/(Form)/FormTextArea'
import FormSubmitButton from '@/app/(Components)/(Form)/FormSubmitButton'

import { SectionCard } from '@/app/(Components)/(Cards)/SectionCard'
import { SectionTitle } from '@/app/(Components)/SectionTitle'
import { MailAtSign02Icon, MailEdit02Icon, PassportIcon } from '@hugeicons/react-pro';

export default function ContactMe() {
    const initialValues = {
        name: '',
        email: '',
        subject: '',
        message: ''
    }

    const schema = yup.object().shape({
        name: yup.string().required('The "First and Last Name" field is required.'),
        email: yup.string()
            .email(
                "It seems that you have entered an incorrect email address or an email address not properly formatted."
            )
            .required('The "Email Address" field is required.'),
        subject: yup.string().required('The "Subject" field is required.'),
        message: yup.string().required('The "Message" field is required.'),
    })

    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })

    const onSend = async (values: any) => {
        const response = await fetch('/api/mail/newContact', {
            method: 'POST',
            body: JSON.stringify(values),
        })
        if (response.ok) {
            return <Notification icon={<BsSendCheck />} color="green" title="Sent 🎉">You've successfully sent a message to Donald Louch!</Notification>
        } else {
            return <Notification icon={<BsSendDash />} color="red" title="An Error Occurred">It seems like an error occurred while trying to send your contact form to Donald Louch. Please try again.</Notification>
        }
    }

    return (<>
        <SectionCard styleType="primary" id="contactMe">
            <SectionTitle headingTitle="Contact Me" />
            <Text ta="center">You may contact me for any inquires with the below form. You may also email me directly and I'll be happy to help! My email is <Anchor href="mailto:hello@donaldlouch.ca">hello@donaldlouch.ca</Anchor>.</Text>
            <Box p="2rem" component="form" onSubmit={form.onSubmit(onSend)}>
                <FormInput isRequired inputLabel="First and Last Name" id="name" {...form.getInputProps('name')} icon={<PassportIcon />} inputDescription="I ask for your name so that when I reply back in regards to your contact request, I can formally address you." inputType="text" />
                <FormInput isRequired inputLabel="Email Address" id="email" {...form.getInputProps('email')} icon={<MailAtSign02Icon />} inputDescription="Your email address is required so that I can send you a reply back in regards to your contact request." inputType="email" />
                <FormInput isRequired inputLabel="Subject" id="subject" inputDescription="By providing a subject to the contact request, it'll make it easier to distinguish the unique request from others." icon={<MailEdit02Icon />} {...form.getInputProps('subject')} inputType="text" />
                <FormTextArea inputID="message" inputLabel="Message" {...form.getInputProps('message')} isRequired />
                <Group justify="flex-end" mt="md">
                    <FormSubmitButton>Send Message</FormSubmitButton>
                </Group>
            </Box>
            {/* <Notification icon={<BsSendCheck />} color="green" title="Sent 🎉">You've successfully sent a message to Donald Louch!</Notification> */}
        </SectionCard>
    </>)
}
