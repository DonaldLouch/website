import { 
    // Stack,
    // Text, 
    Heading,
    // Link,
    // Button,
    // Input,
    // FormControl,
    // FormLabel,
    // FormErrorMessage,
    // Textarea,
    // useToast,
    // useColorModeValue
} from '@chakra-ui/react'

// import { Formik } from 'formik'
// import { SubmitButton } from 'formik-chakra-ui'

import { SectionCard } from "./Cards/SectionCard"
import { SectionTitle } from "./SectionTitle"

// import { FormInput } from './Form/FormInput'
// import { FormTextArea } from './Form/FormTextArea'

// import * as Yup from 'yup'

export default function Contact() {
    /*const toast = useToast();
    
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const onSubmit =  async (values: any, actions: any) => {
        // TODO: create a nodemailer transporter and send email of the submitted values.

        console.log(values)

        toast({
            title: "Submitting",
            description: `You're submitting you contact form. Thanks for your patience, ${values.name}.`,
            status: "warning",
            duration: 9000,
            isClosable: false,
        })
    
        sleep(5000).then(() => {
            actions.setSubmitting(false)
        })
    }

    const initialValues = { 
        name: '',
        email: '',
        subject: '',
        body: ''
      }

    const validationSchema = Yup.object({
        name: Yup.string().required('The "First and Last Name" field is required.'),
        email: Yup.string().email('It seems that you have entered an incorrect email address or an email address not properly formatted.').required('The "Email Address" field is required.'),
        subject: Yup.string().required('The "Subject" field is required.'),
        body: Yup.string().required('The "Body" field is required.')
    }) */
    
    return (
        <SectionCard id="contactUs" styleType="primaryCard">
            <SectionTitle headingTitle="Contact Us" />
            <Heading as="h3" size="xl" my="1rem" textAlign="center" fontWeight="regular">THE CONTACT FORM IS CURRENTLY DISABLED</Heading>
            {/* <Text textAlign="center" fontSize="xl">You may contact me for any inquires with the below form. You may also email me directly and I'll be happy to help! My email is <Link href="mailto:contact@donaldlouch.ca" color={useColorModeValue('primary', 'secondary')}>contact@donaldlouch.ca</Link>.</Text> */}
            {/* <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit, values }: any) => (
                    <Stack as="form" onSubmit={handleSubmit as any}>
                        <FormInput inputID="name" inputLabel="First and Last Name" inputType="text" />
                        <FormInput inputID="email" inputLabel="Email Address" inputType="email" />
                        <FormInput inputID="subject" inputLabel="Subject" inputType="text" />
                        <FormTextArea inputID="body" inputLabel="Body" textRows={10} />
                        <SubmitButton variant="blackFormButton">Submit</SubmitButton>
                    </Stack>
                )}
            </Formik> */}
        </SectionCard>
    )
}