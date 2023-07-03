'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box, Code, Heading, Stack, useToast } from "@chakra-ui/react"

import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import * as Yup from 'yup'

import { FormInput } from "@/app/(Components)/(Form)/FormInput";
import { FormTextArea } from "@/app/(Components)/(Form)/FormTextArea";
import { FormTextAreaRow } from "@/app/(Components)/(Form)/FormTextAreaRow";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import { FormCheckGroup } from "@/app/(Components)/(Form)/FormCheckGroup";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow";
import supabase from "@/lib/supabase";

export default function NewPostContent() {
  const toast = useToast()
  const toastID = "toastID"

  const breadCrumbs = [
    {"pageLink": "/portal/blog", "pageName": "Blog"},
    {"pageLink": `/portal/postNew`, "pageName": `Create New Post`},
  ]

  const onSubmit =  async (values: any, actions: any) => {
    let thumbnail = "https://res.cloudinary.com/donaldlouch/image/upload/v1669225248/thumbnail/uv0fxdiue86dqkgwso98.jpg"
    const findFileName = ({ name }: any) => name === 'file'
    const form = document.querySelector('form') as any
    const fileInput = Array.from(form.elements).find(findFileName) as any

    const formData = new FormData()

    for ( const file of fileInput.files ) {
      formData.append('file', file)
      formData.append('upload_preset', 'thumbnail')

      const thumbnailData = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`, {
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
      const response = await fetch('/api/media/newMedia', {
        method: 'POST',
        body: JSON.stringify(submitMediaData),
      })
      thumbnail = response ? thumbnailData.secure_url : null
    }

    const sidebar = values.sidebar ? values.sidebar : null
    const pinned = values.pinned ? values.pinned : false
    const postedOn = values.postedOn ? new Date(values.postedOn) : new Date()

    const categoryValue = values.category.toString()

    const newPostData = {
      id: "blog"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
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
      pinned: pinned,
      sections: values.sections,
      postedOn: postedOn,
      postStatus: values.postStatus,
      lastUpdatedOn: new Date()
    }
    const { status: supabaseStatus , error: supabaseError } = await supabase.from("BlogPost").insert({ 
      id: newPostData.id,
      title: newPostData.title, 
      slug: newPostData.slug,
      blogType: newPostData.blogType, 
      media: newPostData.media, 
      mediaCredit: newPostData.mediaCredit, 
      headingText: newPostData.headingText, 
      body: newPostData.body, 
      excerpt: newPostData.excerpt,
      categories: newPostData.categories, 
      tags: newPostData.tags, 
      thumbnail: newPostData.thumbnail, 
      sidebar: newPostData.sidebar, 
      pinned: newPostData.pinned, 
      sections: newPostData.sections, 
      postedOn: newPostData.postedOn, 
      postStatus: newPostData.postStatus, 
      lastUpdatedOn: newPostData.lastUpdatedOn 
    })
     supabaseStatus && !toast.isActive(toastID) &&
      toast({
          id: toastID,
          title: `${supabaseStatus === 201 ? "Post Edited 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
          description: `${supabaseStatus === 201 ? `You have successfully edited ${values.title}!` : supabaseStatus === 409 ?  "The chosen slug is already being used with another post, please try a new slug!" : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
          status: `${supabaseStatus === 201 ? "success" : "error"}`,
          duration: 9000,
          isClosable: true,
      })

      actions.setSubmitting(false)
  }
  
  const initialValues = {}

  const validationSchema = Yup.object({
    title: Yup.string().required('This field is required.'),
    slug: Yup.string().required('This field is required.'),
    blogType: Yup.string().required('This field is required.'),
    headingText: Yup.string().required('This field is required.'),
    body: Yup.string().required('This field is required.'),
    excerpt: Yup.string().max(300, 'The excerpt must not be more than 300 characters long.').required('This field is required.'),
    tags: Yup.string().required('This field is required.')
  })
  return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Box as="main" id="newBlogPost" color="white">
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ handleSubmit, values }: any) => (
            <Stack as="form" onSubmit={handleSubmit as any} rowGap="2.5rem" my="2rem">
              <Stack  direction="row" spacing="2rem">
                <FormInputRow inputID="title" inputLabel="Title" inputType="text" />
                <FormInputRow inputID="slug" inputLabel="Slug" inputType="text" />
              </Stack>
              <FormSelect selectLabel="Blog Type" selectID="blogType" selectPlaceholder="Select A Blog Type">
                <option value="Standard">Standard</option>
                <option value="Video">Video</option>
                <option value="Gallery">Gallery</option>
                <option value="Photo 1">Photo 1</option>
                <option value="Photo 2">Photo 2</option>
                <option value="Photo 3">Photo 3</option>
                <option value="Photo 4">Photo 4</option>
                <option value="Photo 5">Photo 5</option>
                <option value="Audio">Audio</option>
                <option value="Special">Special</option>
              </FormSelect>
              {values?.blogType !== "Standard" && values?.blogType !== "Special" && values?.blogType !== ""  && values?.blogType !== undefined  && values?.blogType !== null && (
                <>
                  {values.blogType == "Photo 1" || values.blogType == "Photo 2" || values.blogType == "Photo 3" || values.blogType == "Photo 4" || values.blogType === "Gallery" && 
                    <FormTextAreaRow inputID="media" inputLabel="Media Embeds" inputDescription={
                      values.blogType == "Photo 1" || values.blogType == "Photo 2" || values.blogType == "Photo 3" || values.blogType == "Photo 4"  
                        ? "LINKTOIMAGE;;LINKTOIMAGE;;singlePic;;IMAGEDESCRIPTION || " 
                      : values.blogType === "Gallery" 
                        ? "LINKTOIMAGE;;LINKTOIMAGE;;galleryPic;;IMAGEDESCRIPTION || "
                      : null
                    } textRows={5} />
                  }

                  {values.blogType === "Video" && <FormTextArea inputID="media" inputLabel="Media Embeds" textRows={5} /> }
                  {values.blogType === "Video" && (
                    <>
                      <Code p={3} colorScheme='yellow'>&#60;iframe CONTENT&#62;&#60;/iframe&#62;</Code>
                      <Code p={3} colorScheme='yellow'>&#60;video id=&quot;player&quot; controls=&quot;controls&quot; src=&quot;VIDEOPATH&quot; preload=&quot;auto&quot; poster=&quot;THUMBNAILPATH&quot;&#62;&#60;/video&#62;</Code>
                      <Code p={3} colorScheme='yellow'>&#60;youtube&#62; || VIDEO ID (after https://youtu.be/)</Code>
                      <Code p={3} colorScheme='yellow' mb="1rem">&#60;opusvid&#62; || VIDEO ID (after https://opusvid.devlexicon.ca/)</Code>
                    </>
                  )} 
                  
                  {values.blogType === "Audio" && <FormTextArea inputID="media" inputLabel="Media Embeds" textRows={5} /> }
                  {values.blogType === "Audio" && (
                    <>
                      <Code p={3} colorScheme='yellow'>&#60;iframe CONTENT&#62;&#60;/iframe&#62;</Code>
                      <Code p={3} colorScheme='yellow'  mb="1rem">&#60;audio controls&#62;&#60;source src=&quot;AUDIOPATH&quot;&#62;&#60;/audio&#62;</Code>
                    </>
                  )}
                  

                  {values.blogType === "Video" 
                    ? <FormTextAreaRow inputID="mediaCredit" inputLabel="Media Credits" inputDescription="LINKTOVIDEO;;VIDEOTITLE;;LINKTOCREATOR;;CREATORNAME;;LINKTOWEBSITE;;NAMEOFWEBSITE" textRows={3} /> 
                    : <FormTextArea inputID="mediaCredit" inputLabel="Media Credits" textRows={3} /> 
                  }
                </>
              )}

              <FormInput inputID="headingText" inputLabel="Heading Text" inputType="text" />

              <FormTextAreaRow inputID="body" inputLabel="Body" textRows={10} />

              <FormTextAreaRow inputID="excerpt" inputLabel="Excerpt" textRows={4} />

              <Stack direction="row" spacing="2rem">
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
                <FormTextArea inputID="tags" inputLabel="Tags" textRows={8} />
              </Stack>

              <FormSwitch inputID="sidebar" helperText="Sidebar" />

              <FormSwitch inputID="pinned" helperText="Is this posted pinned?" />

              <Box
                boxShadow="bsBoldSecondary"
                _focus={{boxShadow: "bsBoldSecondary"}}
                _invalid={{boxShadow: "bsBoldRed"}}
                p="1.5rem 2rem"
                color="white"
                borderRadius="0 2rem"
                m="0rem 0 1.5rem"
              >
                <Heading as="h2" fontSize="1.5rem" color="white" mb="0.5rem">Update Thumbnail</Heading>
                <input type="file" name="file" id="file" />
              </Box>
              <FormTextAreaRow inputID="sections" inputLabel="Section Headers" textRows={4} inputDescription="Title#ID, Separate with comma"/>
              <FormInput inputID="postedOn" inputLabel={`Custom Post Date`} inputType="datetime-local" />
              <SubmitButton variant="blackFormButton">Publish</SubmitButton> 
            </Stack>
          )}
          </Formik>
        </Box>
    </>
  )
}
