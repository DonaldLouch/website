'use client'
import { Alert, Box, Group, Text } from '@mantine/core'
// import { BsEnvelopeAt, BsEnvelopeExclamation, BsPersonBadge, BsSend, BsSendCheck, BsSendDash } from 'react-icons/bs'

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from '@mantine/form';
import FormInput from '@/app/(Components)/(Form)/FormInput';
import FormTextArea from '@/app/(Components)/(Form)/FormTextArea'
import FormSubmitButton from '@/app/(Components)/(Form)/FormSubmitButton'

import { SectionCard } from '@/app/(Components)/(Cards)/SectionCard'
import { SectionTitle } from '@/app/(Components)/SectionTitle'
import { notifications } from '@mantine/notifications';
import InlineLink from '@/app/(Components)/InlineLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `Contact ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//     description: "Contact Donald Louch",
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, Contact`,
//     openGraph: {
//         type: "website",
//         url: process.env.NEXT_PUBLIC_SITE_URL,
//         title: `Contact ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//         description: "Contact Donald Louch",
//         siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
//         images: [{
//             url: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg",
//         }],
//     },
//     twitter: { card: "summary_large_image", site: process.env.NEXT_PUBLIC_SITE_URL, creator: "@DonaldLouch", images: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpgg" },
// }

export default function ContactMePage() {
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
        notifications.show({ 
            title: response.ok ? "Sent 🎉" : "An Error Occurred", 
            message: response.ok ? "You've successfully sent a message to Donald Louch!" : "It seems like an error occurred while trying to send your contact form to Donald Louch. Please try again.", 
            color: response.ok ? "black" : "red-6",
            icon: response.ok ? <FontAwesomeIcon icon={["fajdr", "paper-plane"]} /> : <FontAwesomeIcon icon={["fadl", "bell-exclamation"]} />,
        })
    }

    return (<>
        <SectionCard styleType="primaryCard" id="contactMe">
            <SectionTitle headingTitle="Contact Me" />
            <Text ta="center" component="div">You may contact me for any inquires with the below form. You may also email me directly and I'll be happy to help! My email is <InlineLink link="mailto:hello@donaldlouch.ca" leftIcon={{name: "light-envelope-at", pack: "fak"}} body="hello@donaldlouch.ca" /></Text>
             {/* <Alert variant="light" color="secondary" title="Contact Form Disabled!" icon={<HugeIcon name="mail-remove-01" variant="duotone" />}>
                <Text c="white" component="span">Due to a mailing change, I have currently disabled the contact form function. Sorry for any inconvenience. You can reach me at <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{name: "mail-at-sign-01"}} />.</Text>
            </Alert> */}
            <Box p={{base: "0.5rem", sm: "2rem"}} component="form" onSubmit={form.onSubmit(onSend)}>
                <FormInput isRequired inputLabel="First and Last Name" id="name" {...form.getInputProps('name')} icon={<FontAwesomeIcon icon={["fal", "id-badge"]} />} inputDescription="I ask for your name so that when I reply back in regards to your contact request, I can formally address you." inputType="text" />
                {/* @ts-ignore */}
                <FormInput isRequired inputLabel="Email Address" id="email" {...form.getInputProps('email')} icon={<FontAwesomeIcon icon={["fak", "light-envelope-at"]} />} inputDescription="Your email address is required so that I can send you a reply back in regards to your contact request." inputType="email" />
                <FormInput isRequired inputLabel="Subject" id="subject" inputDescription="By providing a subject to the contact request, it'll make it easier to distinguish the unique request from others." icon={<FontAwesomeIcon icon={["fajr", "font-case"]} />} {...form.getInputProps('subject')} inputType="text" />
                <FormTextArea inputID="message" inputLabel="Message" {...form.getInputProps('message')} isRequired />
                <Group justify="flex-end" mt="md">
                    <FormSubmitButton>Send Message</FormSubmitButton>
                </Group>
            </Box>
        </SectionCard>
    </>)
}
