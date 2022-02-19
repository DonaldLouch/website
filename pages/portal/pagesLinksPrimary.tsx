import { 
    Stack, 
    useToast,
    Box, 
    useColorModeValue,
    IconButton
} from '@chakra-ui/react'

import { Formik } from 'formik'
import {
    SubmitButton
} from 'formik-chakra-ui'

import prisma from '../../config/prisma'

import {Metadata} from "../../components/Metadata"


import PortalLayout from '../../components/Portal/PortalLayout'
// import { SectionTitle } from "../../../components/SectionTitle"

import * as React from 'react'
import * as Yup from 'yup'

import { FormInput } from '../../components/Form/FormInput'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../config/fontAwesome'

export default function PrimaryLinksPortal({ linkData }:any) {
  const links = linkData
  
  const toast = useToast()

  // const boxShadow = useColorModeValue('bsBoldBlue', 'bsBoldWhite')
  const primeWhite = useColorModeValue('primary', 'white')
 
  const onSubmit =  async (values: any, actions: any) => {
    const updateLinksPrimaryData = {
      FacebookSubTitle: values.FacebookSubTitle,
      TwitterSubTitle: values.TwitterSubTitle,
      InstagramSubTitle: values.InstagramSubTitle,
      TikTokSubTitle: values.TikTokSubTitle,
      YouTubeSubTitle: values.YouTubeSubTitle,
      LinkedinSubTitle: values.LinkedinSubTitle,

      FacebookLink: values.FacebookLink,
      TwitterLink: values.TwitterLink,
      InstagramLink: values.InstagramLink,
      TikTokLink: values.TikTokLink,
      YouTubeLink: values.YouTubeLink,
      LinkedinLink: values.LinkedinLink,
      lastUpdatedOn: new Date()
    }
      await updateLink(updateLinksPrimaryData)

      actions.setSubmitting(false)
  }
  
  async function updateLink(updateLinksPrimaryData: any) {
    const response = await fetch('/api/links/updatePrimaryLinks', {
      method: 'POST',
      body: JSON.stringify(updateLinksPrimaryData)
    })
    
    if (response.ok) {
        toast({
          title: "Primary Links Updated 🎉",
          description: `You've successfully updated the primary links!`,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
      if (response.status === 500) {
        toast({
          title: "An Error Occurred",
          description: "It seems like an error occurred while trying to update the primary links. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
  }
  
    const initialValues = {
      FacebookSubTitle: links?.[0].subTitle,
      TwitterSubTitle: links?.[1].subTitle,
      InstagramSubTitle: links?.[2].subTitle,
      TikTokSubTitle: links?.[3].subTitle,
      YouTubeSubTitle: links?.[4].subTitle,
      LinkedinSubTitle: links?.[5].subTitle,
      
      FacebookLink: links?.[0].link,
      TwitterLink: links?.[1].link,
      InstagramLink: links?.[2].link,
      TikTokLink: links?.[3].link,
      YouTubeLink: links?.[4].link,
      LinkedinLink: links?.[5].link,
      // {links.map((link: any) => (

      // )}
      // id: about.id,

      // firstName: about.firstName,
      // middleName: about.middleName,
      // lastName: about.lastName,
      // currentAge: about.currentAge,
      // city: about.city,
      // province: about.province,
      // country: about.country,
      // tagLine: about.tagLine,
      // bio: about.bio,
      // email: about.email,
      }
    
      const validationSchema = Yup.object({
        // firstName: Yup.string().required('First Name is required'),
        // middleName: Yup.string().required('Middle Name is required'),
        // lastName: Yup.string().required('Last Name is required'),
        // currentAge: Yup.number().required('Age is required'),
        // city: Yup.string().required('City is required'),
        // province: Yup.string().required('Province is required'),
        // country: Yup.string().required('Country is required'),
        // tagLine: Yup.string().required('Tag Line is required'),
        // bio: Yup.string().required('Bio is required'),
        // email: Yup.string().email().required('Email is required'),
      })
    
    return (
        <>  
            <PortalLayout pageTitle={`Edit: Primary Links`}>
                <Metadata
                    title={`Edit: Primary Links | ${process.env.WEBSITE_NAME}`}
                    keywords={`${process.env.KEYWORDS}`}
                    description={`${process.env.DESCRIPTION}`}
                    />
                    <Box as="main" id="editAbout" color="black">
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {({ handleSubmit }: any) => (
                        <Stack as="form" onSubmit={handleSubmit as any} px="1rem">
                          {links.map((link: any) => (
                            <>
                            <Stack key={link.index} direction="row" my="2rem" alignItems="center" justify="center" spacing="2rem">
                              <IconButton
                                aria-label={`Edit ${link.title} Link`}
                                w="2%"
                                variant="unstyled"
                                pt="0.5rem"
                                // padding="0.5rem"
                                // borderRadius="0 1em"
                                color={primeWhite}
                                // _hover={{boxShadow: "none", color: useColorModeValue("primary", "grey")}}
                                icon={
                                    <FontAwesomeIcon icon={["fab", link.icon]} />
                                }
                              />
                              <FormInput inputID={`${link.title}SubTitle`} inputLabel="Account Name" inputType="text" />
                              <FormInput inputID={`${link.title}Link`} inputLabel="Link" inputType="text" />
                            </Stack>
                            </>
                          ))}
                          <SubmitButton variant="blackFormButton">Update Primary Links</SubmitButton>
                            {/* <FormInputReadOnly inputID="id" inputLabel="" inputType="hidden" />
                            
                            <HStack spacing="2rem">
                                <FormInput inputID="firstName" inputLabel="First Name" inputType="text" />
                                <FormInput inputID="middleName" inputLabel="Middle Name" inputType="text" />
                                <FormInput inputID="lastName" inputLabel="Last Name" inputType="text" />
                            </HStack>
                            
                            <FormInput inputID="currentAge" inputLabel="Current Age" inputType="number" />
                            
                            <HStack spacing="2rem">
                                <FormInput inputID="city" inputLabel="City" inputType="text" />
                                <FormInput inputID="province" inputLabel="Province" inputType="text" />
                                <FormInput inputID="country" inputLabel="Country" inputType="text" />
                            </HStack>

                            <FormInput inputID="tagLine" inputLabel="Tag Line" inputType="text" />

                            <FormTextArea inputID="bio" inputLabel="Biography" textRows={10} />

                            <FormInput inputID="email" inputLabel="Email Address" inputType="email" />
                            
                            <Box
                              boxShadow={boxShadow}
                              _focus={{boxShadow: "bsBoldOrange"}}
                              _invalid={{boxShadow: "bsBoldRed"}}
                              p="1.5rem 2rem"
                              color={primeWhite}
                              borderRadius="0 2rem 0 2rem"
                              m="1.5rem 0"
                            >
                              <Heading as="h2" fontSize="1.5rem" color={primeWhite} mb="0.5rem">Update Avatar</Heading>
                              <input type="file" name="file" id="file" />
                            </Box>
                            
                            <SubmitButton variant="blackFormButton">Update About Page</SubmitButton>  */}
                        </Stack>
                        )}
                    </Formik>
                    </Box>
            </PortalLayout>
        </>
    )
}


export async function getServerSideProps() {

    const linkData = await prisma.primaryLinks.findMany({})

    return { 
        props: { 
            linkData: JSON.parse(JSON.stringify(linkData))
        } 
    }
}