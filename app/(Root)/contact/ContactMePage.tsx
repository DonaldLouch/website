'use client'
import { Alert, Box, Group, SimpleGrid, Tabs, Text } from '@mantine/core'
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
import FormNumber from '@/app/(Components)/(Form)/FormNumber';

export default function ContactMePage({type}: {type?: "general" | "hire" | "contact"}) {
    const initialValuesGeneral = {
        // name: '',
        // email: '',
        // subject: '',
        // message: ''
    }
    const initialValuesHire = {}

    const schemaGeneral = yup.object().shape({
        name: yup.string().required('The "First and Last Name" field is required.'),
        email: yup.string()
            .email(
                "It seems that you have entered an incorrect email address or an email address not properly formatted."
            )
            .required('The "Email Address" field is required.'),
        subject: yup.string().required('The "Subject" field is required.'),
        message: yup.string().required('The "Message" field is required.'),
    })

    const formGeneral = useForm({
        mode: 'controlled',
        initialValues: initialValuesGeneral,
        validate: yupResolver(schemaGeneral)
    })

    const onSendGeneral = async (values: any) => {
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

    const schemaHire = yup.object().shape({})
    
    const formHire = useForm({
        mode: 'controlled',
        initialValues: initialValuesHire,
        validate: yupResolver(schemaHire)
    })

    const onSendHire = async (values: any) => {
        const response = await fetch('/api/mail/newJob', {
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
            <Tabs defaultValue={type || "general"} fz="inherit">
                <Tabs.List grow justify="center">
                    <Tabs.Tab value="general">General Inquiries</Tabs.Tab>
                    <Tabs.Tab value="hire">Hire Me!</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="general">
                    <Box p={{base: "0.5rem", sm: "2rem"}} component="form" onSubmit={formGeneral.onSubmit(onSendGeneral)}>
                        <FormInput isRequired inputLabel="First and Last Name" id="name" {...formGeneral.getInputProps('name')} icon={<FontAwesomeIcon icon={["fal", "id-badge"]} />} inputDescription="I ask for your name so that when I reply back in regards to your contact request, I can formally address you." inputType="text" />
                        {/* @ts-ignore */}
                        <FormInput isRequired inputLabel="Email Address" id="email" {...formGeneral.getInputProps('email')} icon={<FontAwesomeIcon icon={["fak", "light-envelope-at"]} />} inputDescription="Your email address is required so that I can send you a reply back in regards to your contact request." inputType="email" />
                        <FormInput isRequired inputLabel="Subject" id="subject" inputDescription="By providing a subject to the contact request, it'll make it easier to distinguish the unique request from others." icon={<FontAwesomeIcon icon={["fajr", "font-case"]} />} {...formGeneral.getInputProps('subject')} inputType="text" />
                        <FormTextArea inputID="message" inputLabel="Message" {...formGeneral.getInputProps('message')} isRequired />
                        {/* <Group justify="flex-end" mt="md"> */}
                            <FormSubmitButton>Send Message</FormSubmitButton>
                        {/* </Group> */}
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="hire">
                    {/* <Text ta="center">The hiring contact form is being constructed. For hiring inquiries, please email me directly at <InlineLink link="mailto:hello@donaldlouch.ca" body="hello@donaldlouch.ca" leftIcon={{name: "light-envelope-at", pack: "fak"}} />.</Text> */}
                    <Box p={{base: "0.5rem", sm: "2rem"}} component="form" onSubmit={formHire.onSubmit(onSendHire)}>
                        <SimpleGrid cols={{base: 1, md: 2}} m="0rem 0 2rem" spacing="2rem">
                            <FormInput isRequired inputLabel="First and Last Name" id="name" {...formHire.getInputProps('name')} icon={<FontAwesomeIcon icon={["fal", "id-badge"]} />} inputType="text" />
                            <FormInput inputLabel="Company Name" id="company" {...formHire.getInputProps('company')} icon={<FontAwesomeIcon icon={["fal", "briefcase-blank"]} />} inputType="text" />
                        </SimpleGrid>
                        <SimpleGrid cols={{base: 1, md: 2}} m="2rem 0" spacing="2rem">
                        {/* @ts-ignore */}
                        <FormInput isRequired inputLabel="Email Address" id="email" {...formHire.getInputProps('email')} icon={<FontAwesomeIcon icon={["fak", "light-envelope-at"]} />} inputType="email" />
                        <FormInput inputLabel="Phone Number" id="phone" {...formHire.getInputProps('phone')} icon={<FontAwesomeIcon icon={["fal", "phone"]} />} inputType="tel" />
                        </SimpleGrid>
                        <FormInput isRequired inputLabel="Type" id="type" inputDescription="By providing a project type like 'Web Development' it will make it easier for me to understand your needs." icon={<FontAwesomeIcon icon={["fajr", "font-case"]} />} {...formHire.getInputProps('type')} inputType="text" />
                        <FormTextArea inputID="description" inputLabel="Project Description" {...formHire.getInputProps('description')} isRequired />
                        <FormNumber inputID="budget" inputLabel="Budget" inputDescription="Providing a budget helps me understand your project's scope." icon={<FontAwesomeIcon icon={["fal", "dollar-sign"]} />} {...formHire.getInputProps('budget')} />
                        {/* <Group justify="flex-end" mt="md"> */}
                            <FormSubmitButton>Send Message</FormSubmitButton>
                        {/* </Group> */}
                    </Box>
                </Tabs.Panel>
            </Tabs>
        </SectionCard>
    </>)
}
