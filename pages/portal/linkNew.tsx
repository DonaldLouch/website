import { 
    Stack, 
    // HStack,
    useToast,
    Box,
    Link,
    // Heading,
    // Text,
    // useColorModeValue,
    // IconButton
} from '@chakra-ui/react'

import { Formik } from 'formik'
import {
    SubmitButton
} from 'formik-chakra-ui'

// import prisma from '../../config/prisma'

import {Metadata} from "../../components/Metadata"


import PortalLayout from '../../components/Portal/PortalLayout'
// import { SectionTitle } from "../../../components/SectionTitle"

import * as React from 'react'
import * as Yup from 'yup'

import { FormInput } from '../../components/Form/FormInput'
// import { FormTextArea } from '../../components/Form/FormTextArea'
// import { FormInputReadOnly } from '../../components/Form/FormInputReadOnly'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import '../../config/fontAwesome'

export default function NewLinkPortal() {
  const toast = useToast()

  // const boxShadow = useColorModeValue('bsBoldBlue', 'bsBoldWhite')
  // const primeWhite = useColorModeValue('primary', 'white')

  const onSubmit =  async (values: any, actions: any) => {
    const addLinkData = {
      iconPrefix: values.iconPrefix,
      iconName: values.iconName,
      title: values.title,
      subTitle: values.subTitle,
      link: values.link,
      currentTime: new Date()
    }
      await addLink(addLinkData)

      actions.setSubmitting(false)
  }
  
  async function addLink(addLinkData: any) {
    const response = await fetch('/api/links/addNewLink', {
      method: 'POST',
      body: JSON.stringify(addLinkData)
    })
    
    if (response.ok) {
        toast({
          title: "Added New Link 🎉",
          description: `You've successfully added a new link!`,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
      if (response.status === 500) {
        toast({
          title: "An Error Occurred",
          description: "It seems like an error occurred while trying to add a new link. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
  }
  
    const initialValues = {}
    
      const validationSchema = Yup.object({
        iconPrefix: Yup.string().required('Icon Prefix is required.'),
        iconName: Yup.string().required('Icon Name is required.'),
        title: Yup.string().required('Title is required.'),
        subTitle: Yup.string().required('Sub Title is required.')
      })
    
    return (
        <>  
            <PortalLayout pageTitle="Edit: A New Link">
                <Metadata
                    title={`Add New Link | ${process.env.WEBSITE_NAME}`}
                    keywords={`${process.env.KEYWORDS}, portal, new, admin`}
                    description={`Add new link's to Donald Louch`}
                    />
                    <Box as="main" id="editAbout" color="black">
                    <Link variant="primary" href="pagesLinks">Go Back To Links</Link>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {({ handleSubmit }: any) => (
                        <Stack as="form" onSubmit={handleSubmit as any} px="1rem">
                          <Stack direction="row" alignItems="center" justify="center" spacing="2rem">
                            <FormInput inputID="iconPrefix" inputLabel="Icon Prefix" inputType="text" />
                            <FormInput inputID="iconName" inputLabel="Icon Name" inputType="text" />
                          </Stack>
                          <Stack direction="row" alignItems="center" justify="center" spacing="2rem">
                            <FormInput inputID="title" inputLabel="Title" inputType="text" />
                            <FormInput inputID="subTitle" inputLabel="Sub Title" inputType="text" />
                          </Stack>
                          
                          <FormInput inputID="link" inputLabel="Link" inputType="text" />

                          <SubmitButton variant="blackFormButton">Add New Link</SubmitButton>
                        </Stack>
                        )}
                    </Formik>
                    </Box>
            </PortalLayout>
        </>
    )
}