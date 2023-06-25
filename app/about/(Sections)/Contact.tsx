'use client'

import {
  Stack,
  useToast,
  Text,
  // Heading,
  Link,
  Heading
} from "@chakra-ui/react";

import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";

import { SectionCard } from "../../(Components)/(Cards)/SectionCard";
import { SectionTitle } from "../../(Components)/SectionTitle";

import { FormInput } from "../../(Components)/(Form)/FormInput";
import { FormTextArea } from "../../(Components)/(Form)/FormTextArea";

import * as Yup from "yup";

export default function Contact() {
  const toast = useToast();

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values: any, actions: any) => {
    const contactData = {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    };

    const response = await fetch('/api/contact/newContact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    })

    if (response.ok) {
      toast({
        title: "Submitted 🎉",
        description: `You've successfully submitted a contact form to Donald Louch!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "An Error Occurred",
        description:
          "It seems like an error occurred while trying to send your contact form to Donald Louch. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    sleep(5000).then(() => {
      actions.setSubmitting(false)
    });
  }

  const initialValues = {}

  const validationSchema = Yup.object({
    name: Yup.string().required('The "First and Last Name" field is required.'),
    email: Yup.string()
      .email(
        "It seems that you have entered an incorrect email address or an email address not properly formatted."
      )
      .required('The "Email Address" field is required.'),
    subject: Yup.string().required('The "Subject" field is required.'),
    message: Yup.string().required('The "Message" field is required.'),
  });

  return (
    <SectionCard id="contact" styleType="primaryCard">
      <SectionTitle headingTitle="Contact Me" />
      <Heading as="h3" size="xl" my="1rem" textAlign="center" fontWeight="regular">THE CONTACT FORM IS CURRENTLY DISABLED</Heading>
      {/* <Text textAlign="center" fontSize="xl" my="1rem">You may contact me for any inquires with the below form. You may also email me directly and I'll be happy to help! My email is <Link href="mailto:hello@donaldlouch.ca" variant="primary">hello@donaldlouch.ca</Link>.</Text> */}
      {/* <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }: any) => (
          <Stack as="form" onSubmit={handleSubmit as any} rowGap="2.5rem" my="2rem">
            <FormInput
              inputID="name"
              inputLabel="First and Last Name"
              inputDescription="I ask for your name so that when I reply back in regards to your contact request, I can formally address you."
            />
            <FormInput
              inputID="email"
              inputLabel="Email Address"
              inputType="email"
              inputDescription="Your email address is required so that I can send you a reply back in regards to your contact request."
            />
            <FormInput
              inputID="subject"
              inputLabel="Subject"
              inputDescription="By providing a subject to the contact request, it'll make it easier to distinguish the unique request from others."
            />
            <FormTextArea inputID="message" inputLabel="Message" textRows={8} />
            <SubmitButton variant="blackFormButton">Submit</SubmitButton>
          </Stack>
        )}
      </Formik> */}
    </SectionCard>
  );
}
