'use client'
import {
  Stack,
  Text,
  Link,
  useToast
} from "@chakra-ui/react";

import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";

import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard";
import { SectionTitle } from "@/app/(Components)/SectionTitle";

import { FormInput } from "@/app/(Components)/(Form)/FormInput";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import { FormInputRow } from '../(Components)/(Form)/FormInputRow';

import * as Yup from "yup";
import { FormPhoneRow } from "../(Components)/(Form)/FormPhoneRow";
import { FormTextAreaRow } from "../(Components)/(Form)/FormTextAreaRow";

export default function Hire() {
  const toast = useToast();

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = async (values: any, actions: any) => {  
    const contactData = {
      name: values.name,
      company: values.company,
      email: values.email,
      phone: values.phone,
      jobType: values.jobType,
      description: values.description,
      budget: values.budget,
    };

    const response = await fetch('/api/mail/newJob', {
      method: 'POST',
      body: JSON.stringify(contactData),
    })

    if (response.ok) {
      toast({
        title: "Submitted 🎉",
        description: `You've successfully submitted a request for Donald Louch to do a job for you!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "An Error Occurred",
        description: "It seems like an error occurred while trying to submit your request form to Donald Louch. Please try again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    sleep(5000).then(() => {
      actions.setSubmitting(false)
    });
  };
  
  const initialValues = {};

  const validationSchema = Yup.object({
    name: Yup.string().required('The "First and Last Name" field is required.'),
    email: Yup.string()
      .email(
        "It seems that you have entered an incorrect email address or an email address not properly formatted."
      )
      .required('The "Email Address" field is required.'),
    phone: Yup.string().required('The "Phone Number" field is required.'),
    jobType: Yup.string().required('The "Type of Job" field is required.'),
    description: Yup.string().required('The "Description" field is required.'),
  });

  return (
    <SectionCard id="contact" styleType="primaryCard">
      <SectionTitle headingTitle="Request a Freelancing Job" />
      {/* <Text textAlign="center" fontSize="xl">Please note that I have disabled the contact form function. For more details please visit the incident page <Link href="https://donaldlouch.instatus.com/cl2uwebu5113668jaoefzwgiw9t" color={useColorModeValue('primary', 'secondary')}>on Instatus</Link>.</Text> */}
      {/* <Heading as="h3" size="xl" my="1rem" textAlign="center" fontWeight="regular">THE CONTACT FORM IS CURRENTLY DISABLED</Heading> */}
      <Text textAlign="center" fontSize="xl">Hello, if you would like you may hire me to do web development or digital content production freelancing. You may use the following inquiry form below or you may also email me directly and I&#39;ll be happy to help! My email is <Link href="mailto:hello@donaldlouch.ca">hello@donaldlouch.ca</Link>.</Text>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }: any) => (
          <Stack as="form" onSubmit={handleSubmit as any} rowGap="2.5rem" my="2rem">
            <Stack direction="row" gap="2rem" alignItems="center">
              <FormInputRow
                inputID="name"
                inputLabel="First and Last Name"
                inputType="text"
              />
              <FormInputRow
                inputID="company"
                inputLabel="Company"
                inputType="text"
              />
            </Stack>
            <Stack direction="row" gap="2rem" alignItems="center">
              <FormInputRow
                inputID="email"
                inputLabel="Email Address"
                inputType="email"
              />
              <FormPhoneRow
                inputID="phone"
                inputLabel="Phone Number (formatted: (123) 456-7890)"
              />
            </Stack>
            <FormSelect
              selectLabel="Type of Job"
              selectID="jobType"
              selectPlaceholder="Select A Type of Job"
            >
              <option value="Web Development">Web Development</option>
              <option value="Photography">Photography</option>
              <option value="Videography">Videography</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Other">Other</option>
            </FormSelect>
            <FormTextAreaRow
              inputID="description"
              inputLabel="Description of the Job"
              inputDescription="Please describe what you're looking for, in as much detail as possible. This way it will help me understand the scope of the job and will allow me to give you a proper quote and timeline in a faster manner."
              textRows={8}
            />
            <FormInput
              inputID="budget"
              inputLabel="Estimated Budget"
              inputDescription="If you are unsure what to put here, please type: I'm unsure OR $0.00"
              inputType="text"
            />
            <SubmitButton variant="blackFormButton">
              Submit Inquiry
            </SubmitButton>
          </Stack>
        )}
      </Formik> 
    </SectionCard>
  );
}
