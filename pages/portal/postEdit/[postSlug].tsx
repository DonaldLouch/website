import { 
    Stack, 
    HStack, 
    VStack,
    // Link, 
    Code,
    useToast,
    Box, 
    // Radio,
    Heading,
    useColorModeValue
} from '@chakra-ui/react'

import { Formik } from 'formik'
import {
    SubmitButton
} from 'formik-chakra-ui'

import prisma from '../../../config/prisma'

import {Metadata} from "../../../components/Metadata"


import PortalLayout from '../../../components/Portal/PortalLayout'
// import { SectionTitle } from "../../../components/SectionTitle"

import * as React from 'react'
import * as Yup from 'yup'

import { FormInput } from '../../../components/Form/FormInput'
import { FormSelect } from '../../../components/Form/FormSelect'
import { FormTextArea } from '../../../components/Form/FormTextArea'
import { FormSwitch } from '../../../components/Form/FormSwitch'
import { FormInputReadOnly } from '../../../components/Form/FormInputReadOnly'

import { FormCheckGroup } from '../../../components/Form/FormCheckGroup'

export default function Post({ postData }:any) {
    const post = postData
    // console.log(post.body)

    const toast = useToast()

  const boxShadow = useColorModeValue('bsBoldBlue', 'bsBoldWhite')
  const primeWhite = useColorModeValue('primary', 'white')

  const onSubmit =  async (values: any, actions: any) => {
    let thumbnail = post.thumbnail
    const findFileName = ({ name }: any) => name === 'file'
    const form = document.querySelector('form') as any
    const fileInput = Array.from(form.elements).find(findFileName) as any

    const formData = new FormData()

    for ( const file of fileInput.files ) {
        formData.append('file', file)
        formData.append('upload_preset', 'thumbnail')

        const thumbnailData = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
        }).then(r => r.json())

        const submitMediaData = {
            mediaPublicID: thumbnailData.public_id,
            mediaSignature: thumbnailData.signature,
            mediaKind: thumbnailData.resource_type,
            mediaTitle: thumbnailData.original_filename,
            mediaExtension: thumbnailData.format,
            mediaPath: thumbnailData.secure_url,
            mediaSize: thumbnailData.bytes,
            mediaDimensions: `${thumbnailData.width}px x ${thumbnailData.height}px`,
          }
      
          if (submitMediaData) {
            await addMedia(submitMediaData)
          }

        thumbnail = thumbnailData.secure_url
    }

    let sidebar = null as null|boolean
    
    if (!values.sidebar) {
      sidebar = false
    } else {
      sidebar = true
    }

    let updatePostedOn = post.postedOn
    if (values.postedOn) {updatePostedOn = new Date(values.postedOn)}

    // console.log(values.category)

    const categoryValue = values.category.toString()

    // console.log(categoryValue)
    const updateBlogPostData = {
        id: values.id,
        title: values.title,
        slug: values.slug,
        blogType: values.blogType,
        media: values.media,
        mediaCredit: values.mediaCredit,
        headingText: values.headingText,
        body: values.body,
        excerpt: values.excerpt,
        categories: categoryValue,
        tags: values.tags,
        thumbnail: thumbnail,
        sidebar: sidebar,
        sections: values.sections,
        // author: "Donald Louch",
        postedOn: updatePostedOn,
        postStatus: values.postStatus,
        lastUpdatedOn: new Date()
      }
      await updatePost(updateBlogPostData)

      actions.setSubmitting(false)
  }

  async function addMedia(submitMediaData: any) {
    const response = await fetch('/api/media/addMedia', {
      method: 'POST',
      body: JSON.stringify(submitMediaData)
    })
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
      return await response.json()
  }
  
  async function updatePost(updateBlogPostData: any) {
    const response = await fetch('/api/posts/updatePost', {
      method: 'POST',
      body: JSON.stringify(updateBlogPostData)
    })
    
    if (response.ok) {
        toast({
          title: "Blog Post Updated 🎉",
          description: `You've successfully updated ${post.title}!`,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
      if (response.status === 500) {
        toast({
          title: "An Error Occurred",
          description: "It seems like an error occurred while trying to update the blog post. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
  }
  
    const initialValues = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        blogType: post.blogType,
        media: post.media,
        mediaCredit: post.mediaCredit,
        headingText: post.headingText,
        body: post.body,
        excerpt: post.excerpt,
        category: [`${post.categories}`],
        tags: post.tags,
        sidebar: post.sidebar,
        sections: post.sections,
        postStatus: post.postStatus,
      }
    
      const validationSchema = Yup.object({
        /*
        title: Yup.string().required('This field is required.'),
        slug: Yup.string().required('This field is required.'),
        blogType: Yup.string().required('This field is required.'),
        headingText: Yup.string().required('This field is required.'),
        body: Yup.string().required('This field is required.'),
        excerpt: Yup.string().max(300, 'The excerpt must not be more than 300 characters long.').required('This field is required.'),
        category: Yup.string().required('This field is required.'),
        tags: Yup.string().required('This field is required.'),
        thumbnail: Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').required('This field is required.'),
        sidebar: Yup.string().required('This field is required.')
        */
      })
      const postedData = new Date(post.postedOn)
      const postedDay = postedData.toLocaleDateString()
      const postedTime = postedData.toLocaleTimeString()

      const postedOnString = postedDay +" at " + postedTime
    

    return (
        <>  
            <PortalLayout pageTitle={`Edit: ${post.title}`}>
                <Metadata
                    title={`${process.env.WEBSITE_NAME} | Edit: ${post.title}`}
                    keywords={`${process.env.KEYWORDS}`}
                    description={`${process.env.DESCRIPTION}`}
                    />
                    <Box as="main" id="editBlogPost" color="black">
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {({ handleSubmit, values }: any) => (
                        <Stack as="form" onSubmit={handleSubmit as any}>
                            <HStack spacing="2rem">
                                <FormInputReadOnly inputID="id" inputLabel="Post ID" inputType="text" />
                                <FormInputReadOnly inputID="slug" inputLabel="Slug" inputType="text" />
                                <FormInput inputID="title" inputLabel="Title" inputType="text" />
                            </HStack>
                            <FormSelect selectLabel="Blog Type" selectID="blogType" selectPlaceholder="Select A Blog Type">
                                <option value="Standard">Standard</option>
                                <option value="Video">Video</option>
                                <option value="Gallery">Gallery</option>
                                <option value="Photo 1">Photo 1</option>
                                <option value="Photo 2">Photo 2</option>
                                <option value="Photo 3">Photo 3</option>
                                <option value="Photo 4">Photo 4</option>
                                <option value="Audio">Audio</option>
                                <option value="Special">Special</option>
                            </FormSelect>
                            {values.blogType !== "Standard" && values.blogType !== "Special" && values.blogType !== ""  && values.blogType !== undefined && (
                            <>
                                <FormTextArea inputID="media" inputLabel="Media Embeds" textRows={5} />
                                
                                {values.blogType == "Photo 1" || values.blogType == "Photo 2" || values.blogType == "Photo 3" || values.blogType == "Photo 4"  ? (
                                <Code p={3} colorScheme='yellow'>LINKTOIMAGE;;LINKTOIMAGE;;singlePic;;IMAGEDESCRIPTION || </Code>
                                ) : (<></>)}
                                
                                {values.blogType === "Gallery" && (
                                <Code p={3} colorScheme='yellow'>LINKTOIMAGE;;LINKTOIMAGE;;galleryPic;;IMAGEDESCRIPTION || </Code>
                                )}
                                
                                {values.blogType === "Video" && (
                                <>
                                    <Code p={3} colorScheme='yellow'>&#60;iframe CONTENT&#62;&#60;/iframe&#62;</Code>
                                    <Code p={3} colorScheme='yellow'>&#60;video id=&quot;player&quot; controls=&quot;controls&quot; src=&quot;VIDEOPATH&quot; preload=&quot;auto&quot; poster=&quot;THUMBNAILPATH&quot;&#62;&#60;/video&#62;</Code>
                                    <Code p={3} colorScheme='yellow'>&#60;youtube&#62; || VIDEO ID (after https://youtu.be/)</Code>
                                    <Code p={3} colorScheme='yellow'>&#60;opusvid&#62; || VIDEO ID (after https://opusvid.devlexicon.ca/)</Code>
                                </>
                                )}
                                {values.blogType === "Audio" && (
                                <>
                                    <Code p={3} colorScheme='yellow'>&#60;iframe CONTENT&#62;&#60;/iframe&#62;</Code>
                                    <Code p={3} colorScheme='yellow'>&#60;audio controls&#62;&#60;source src=&quot;AUDIOPATH&quot;&#62;&#60;/audio&#62;</Code>
                                </>
                                )}

                                

                                <FormTextArea inputID="mediaCredit" inputLabel="Media Credits" textRows={3} />
                                {values.blogType === "Video" && (
                                <Code p={3} colorScheme='yellow'>LINKTOVIDEO;;VIDEOTITLE;;LINKTOCREATOR;;CREATORNAME;;LINKTOWEBSITE;;NAMEOFWEBSITE</Code>
                                )}
                                </>
                            )}

                            <FormInput inputID="headingText" inputLabel="Heading Text" inputType="text" />
                            {/* <FormTextArea inputID="tagLine" inputLabel="Tag Line" textRows={3} /> */}

                            <FormTextArea inputID="body" inputLabel="Body" textRows={10} />
                            
                            <FormTextArea inputID="excerpt" inputLabel="Excerpt" textRows={4} />

                            <HStack spacing="2rem">
                            <VStack w="100%">
                            <FormCheckGroup
                              checkGroupID="category" 
                              checkGroupLabel="Category" 
                              checkGroupArray={[
                                {'checkValue':'Photography', 'checkLabel':'Photography'},
                                {'checkValue':'Videography', 'checkLabel':'Videography'},
                                {'checkValue':'Audio', 'checkLabel':'Audio'},
                                {'checkValue':'Graphic Design', 'checkLabel':'Graphic Design'},
                                {'checkValue':'General', 'checkLabel':'General'},
                                {'checkValue':'Education', 'checkLabel':'Education'},
                              ]}
                            />
                                {/* <FormSelect selectLabel="Category" selectID="category" selectPlaceholder="Select A Category">
                                <option value="Photography">Photography</option>
                                <option value="Videography">Videography</option>
                                <option value="Audio">Audio</option>
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="General">General</option>
                                <option value="Education">Education</option>
                                </FormSelect> */}
                            </VStack>
                            <FormTextArea inputID="tags" inputLabel="Tags" textRows={3} />
                            </HStack>
                                
                            <FormSwitch inputID="sidebar" inputLabel="Sidebar" />
                            
                            <Box
                            boxShadow={boxShadow}
                            _focus={{boxShadow: "bsBoldOrange"}}
                            _invalid={{boxShadow: "bsBoldRed"}}
                            p="1.5rem 2rem"
                            color={primeWhite}
                            borderRadius="0 2rem 0 2rem"
                            m="1.5rem 0"
                            >
                            <Heading as="h2" fontSize="1.5rem" color={primeWhite} mb="0.5rem">Update Thumbnail</Heading>
                            <input type="file" name="file" id="file" />
                            </Box>
                            <FormTextArea inputID="sections" inputLabel="Section Headers" textRows={4} />
                            <Code p={3} colorScheme='yellow'>Title#ID, Separate with comma</Code>
                            <FormInput inputID="postedOn" inputLabel={`Update Posted On: ${postedOnString}`} inputType="datetime-local" />
                            <FormSelect selectLabel="Post Status" selectID="postStatus" selectPlaceholder={post.postStatus}>
                                {/* <option value={post.postStatus} selected>{post.postStatus}</option> */}
                                <option>---</option>
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Private">Private</option>
                            </FormSelect>
                            <SubmitButton variant="blackFormButton">Update Post</SubmitButton> 
                        </Stack>
                        )}
                    </Formik>
                    </Box>
            </PortalLayout>
        </>
    )
}


export async function getServerSideProps(router: any) {
    const slug = router.params.postSlug

    const postData = await prisma.blogPost.findUnique({
        where: {
            slug: slug
        }
    })

    return { 
        props: { 
            postData: JSON.parse(JSON.stringify(postData))
        } 
    }
}