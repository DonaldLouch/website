


import { 
  Stack, 
  HStack, 
  Link, 
  useToast,
  Box, 
  Radio,
  } from '@chakra-ui/react'
  
  import { Formik } from 'formik'
  import {
  CheckboxSingleControl,
  PercentComplete,
  SliderControl,
  SubmitButton
  } from 'formik-chakra-ui'
  
  import * as React from 'react'
  import * as Yup from 'yup'
  
  import { FormInput } from './FormInput'
  import { FormPhone } from './FormPhone'
  import { FormSelect } from './FormSelect'
  import { FormNumber } from './FormNumber'
  import { FormRadio } from './FormRadio'
  import { FormCheckGroup } from './FormCheckGroup'
  import { FormTextArea } from './FormTextArea'
  import { FormSwitch } from './FormSwitch'
  import { FormPassword } from './FormPassword'
  
  export default function ExampleForm() {
    const toast = useToast()
  
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  
    const onSubmit =  async (values: any, actions: any) => {  
      toast({
        title: "Form Has Been Submitted",
        description: "We're reviewing your account creation!",
        status: "info",
        duration: 9000,
        isClosable: true,
      })
  
      sleep(5000).then(() => {
        window.alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false)
      })
    }
  
    const initialValues = {
      password: "",
      // lastName: "",
      // age: 0,
      // employed: false,
      // favoriteColor: "",
      // toppings: ["tuna"],
      // notes: "",
      // foo: 23,
      // bar: ""
    }
  
    const validationSchema = Yup.object({
      password: Yup.string().required('This field is required.')
      // age: Yup.number().required().min(18),
      // toppings: Yup.array().min(2),
      /*regularRequired: Yup.string().required('This field is required.'),
      minMaxMatch: Yup
        .string()
        .min(2, 'This field must be more than 2 characters long.')
        .max(10, 'This field must be less than 10 characters long.')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid text')
        .required('This field is required.'),
      email: Yup
        .string()
        .email('It seems that you have entered an incorrect email address or an email address not properly formatted.')
        .required('This field is required.'),
      phone: Yup
        .string()
        .matches(/^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/, 'Your phone number isn\'t formatted correctly. Please use a "(123) 123-1234" syntax.')
        .required('This field is required.'),
      password: Yup
        .string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character')
        .required('The "Password" field is required.'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
      tos: Yup.boolean().equals([true], 'Must Be Checked')*/
    })
  
    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit, values, errors }: any) => (
          <Stack as="form" onSubmit={handleSubmit as any}>
            <FormPassword inputID="password" inputLabel="Password" />
            <FormSelect selectLabel="Account Type" selectID="accountType" selectPlaceholder="Select An Account Type">
              <option value="individual">Individual Account</option>
              <option value="business">Business Account</option>
            </FormSelect>
            <HStack spacing="2rem">
              <FormInput inputID="firstName" inputLabel="First Name" inputType="text" />
              <FormInput inputID="lastName" inputLabel="Last Name" inputType="text" />
            </HStack>
              <FormInput inputID="email" inputLabel="Email Address" inputType="email" />
              <FormPhone inputID="phone" inputLabel="Phone Number: (123) 456-7890" />
            {/* <HStack spacing="2rem"> 
              <FormInput inputID="confirmPassword" inputLabel="Confirm Password" inputType="password" />
             </HStack> */ }
            <CheckboxSingleControl name="tos" checkBoxProps={{colorScheme: "orange"}}>I {values.firstName} {values.lastName} on behalf of the company {values.company}, have read and acknowledged that we understand and accept the DevLexicon <Link href="../tos" color="secondary" fontWeight="bold">Terms of Service</Link>.</CheckboxSingleControl>
            <FormNumber inputID="age" inputLabel="Age"/>
            <FormRadio radioName="favoriteColor" radioLabel="Favorite Color">
              <Radio value="#ff0000">Red</Radio>
              <Radio value="#00ff00">Green</Radio>
              <Radio value="#0000ff">Blue</Radio>
            </FormRadio>
            <FormCheckGroup
              checkGroupID="toppings" 
              checkGroupLabel="Toppings" 
              checkGroupArray={[
                {'checkValue':'chicken', 'checkLabel':'Chicken'},
                {'checkValue':'ham', 'checkLabel':'Ham'},
                {'checkValue':'mushrooms', 'checkLabel':'Mushrooms'},
                {'checkValue':'cheese', 'checkLabel':'Cheese'},
                {'checkValue':'tuna', 'checkLabel':'Tuna'},
                {'checkValue':'pineapple', 'checkLabel':'Pineapple'},
              ]}
            />
            <FormTextArea inputID="notes" inputLabel="Notes" textRows={10} />
            <FormSwitch inputID="employed" helperText="Employed" />
            
            <SliderControl name="foo" sliderProps={{ max: 40, colorScheme: 'orange' }} /> 

            <PercentComplete progressProps={{ colorScheme: 'orange', size: 'md', hasStripe: false}} />

            <SubmitButton variant="blackFormButton">Signup</SubmitButton> 

            <Box as="pre" marginY={10}>
              {JSON.stringify(values, null, 2)}
              <br />
              {JSON.stringify(errors, null, 2)}
            </Box>
          </Stack>
        )}
      </Formik>
    )
  }