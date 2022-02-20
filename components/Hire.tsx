import { 
    Stack,
    // Text, 
    // Heading,
    // Link,
    // Button,
    // Input,
    // FormControl,
    // FormLabel,
    // FormErrorMessage,
    // Textarea,
    useToast,
    // useColorModeValue
} from '@chakra-ui/react'

import { Formik } from 'formik'
import { SubmitButton } from 'formik-chakra-ui'

import { SectionCard } from "./Cards/SectionCard"
import { SectionTitle } from "./SectionTitle"

import { FormInput } from './Form/FormInput'
import { FormPhone } from './Form/FormPhone'
import { FormTextArea } from './Form/FormTextArea'

import * as Yup from 'yup'
import { FormSelect } from './Form/FormSelect'

export default function Hire() {
    const toast = useToast();
    
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const onSubmit =  async (values: any, actions: any) => {
        // TODO: create a nodemailer transporter and send email of the submitted values.
        // actions.setSubmitting(false)

        // console.log(values)

        const contactData = {
            name: values.name,
            company: values.company,
            email: values.email,
            phone: values.phone,
            jobType: values.jobType,
            description: values.description,
            budget: values.budget,
        }

        await sendContact(contactData)
    
        sleep(5000).then(() => {
            actions.setSubmitting(false)
        })
    }

    async function sendContact(contactData: any) {
        const response = await fetch('/api/mail/sendJob', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(contactData)
        })

        if (response.ok) {
            toast({
              title: "Submitted 🎉",
              description: `You've successfully submitted a request for Donald Louch to do a job for you!`,
              status: "success",
              duration: 9000,
              isClosable: true,
            })
          }
      
        if (response.status === 500) {
        toast({
            title: "An Error Occurred",
            description: "It seems like an error occurred while trying to submit your request form to Donald Louch. Please try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
        })
        }
    
        return await response.json()
    }


    const initialValues = {}

    const validationSchema = Yup.object({
        name: Yup.string().required('The "First and Last Name" field is required.'),
        email: Yup.string().email('It seems that you have entered an incorrect email address or an email address not properly formatted.').required('The "Email Address" field is required.'),
        phone: Yup.string().required('The "Phone Number" field is required.'),
        jobType: Yup.string().required('The "Type of Job" field is required.'),
        description: Yup.string().required('The "Description" field is required.')
    }) 
    
    return (
        <SectionCard id="contact" styleType="primaryCard">
            <SectionTitle headingTitle="Hire Me" />
            {/* <Heading as="h3" size="xl" my="1rem" textAlign="center" fontWeight="regular">THE CONTACT FORM IS CURRENTLY DISABLED</Heading> */}
            {/* <Text textAlign="center" fontSize="xl">You may contact me for any inquires with the below form. You may also email me directly and I'll be happy to help! My email is <Link href="mailto:contact@donaldlouch.ca" color={useColorModeValue('primary', 'secondary')}>contact@donaldlouch.ca</Link>.</Text> */}
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }: any) => (
                    <Stack as="form" onSubmit={handleSubmit as any}>
                        <Stack direction="row" spacing={4} alignItems="center">
                            <FormInput inputID="name" inputLabel="First and Last Name" inputType="text" />
                            <FormInput inputID="company" inputLabel="Company" inputType="text" />
                        </Stack>
                        <Stack direction="row" spacing={4} alignItems="center">
                            <FormInput inputID="email" inputLabel="Email Address" inputType="email" />
                            <FormPhone inputID="phone" inputLabel="Phone Number (formatted: (123) 456-7890)" />
                        </Stack>
                        <FormSelect selectLabel="Type of Job" selectID="jobType" selectPlaceholder="Select A Type of Job">
                            <option value="Web Development">Web Development</option>
                            <option value="Photography">Photography</option>
                            <option value="Videography">Videography</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Other">Other</option>
                        </FormSelect>
                        <FormTextArea inputID="description" inputLabel="In As Much Detail Please Describe What You're Looking For" textRows={8} />
                        <FormInput inputID="budget" inputLabel="Estimated Budget" inputType="text" />
                        <SubmitButton variant="blackFormButton">Submit Request</SubmitButton>
                    </Stack>
                )}
            </Formik>
        </SectionCard>
    )
}