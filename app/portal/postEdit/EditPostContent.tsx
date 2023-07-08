'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box, Button, Code, Heading, Stack, useToast } from "@chakra-ui/react"

import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import * as Yup from 'yup'

import { FormInput } from "@/app/(Components)/(Form)/FormInput";
import { FormTextArea } from "@/app/(Components)/(Form)/FormTextArea";
import { FormTextAreaRow } from "@/app/(Components)/(Form)/FormTextAreaRow";
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import { FormCheckGroup } from "@/app/(Components)/(Form)/FormCheckGroup";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import DisplayDate from "@/lib/DisplayDate";

export default function EditPostContent({post}: any) {
  const toast = useToast()
  const toastID = "toastID"
  const router = useRouter()

  const breadCrumbs = [
    {"pageLink": "/portal/blog", "pageName": "Blog"},
    {"pageLink": `/portal/postEdit/${post.slug}`, "pageName": `Edit Post: ${post.title}`},
  ]

  async function deletePost() {
    const { error: deletePostError, status: deletePostStatus } = await supabase.from("BlogPost").delete().eq('id', post.id);
        deletePostStatus && !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: `${deletePostStatus === 204 ? "Post ID Deleted  🗑️" : `Error #${deletePostError?.code} has Occurred`}`,
            description: `${deletePostStatus === 204 ? `You have successfully deleted the post "${post.title}"!` : `An error has occurred: ${deletePostError?.message}. ${deletePostError?.hint && `${deletePostError?.hint}.`}`}`,
            status: `${deletePostStatus === 204 ? "success" : "error"}`,
            duration: 9000,
            isClosable: true,
        })
        deletePostStatus === 204 && router.push("/portal/blog?message=deletedPost")
  }

  const onSubmit =  async (values: any, actions: any) => {
    let thumbnail = post.thumbnail

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

      const { status: supabaseMediaStatus , error: supabaseMediaError } = await supabase.from("Media").insert({ 
        mediaID: "thumbnail"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
        mediaPublicID: thumbnailData.public_id,
        mediaSignature: thumbnailData.signature,
        mediaKind: thumbnailData.resource_type,
        mediaTitle: thumbnailData.original_filename,
        mediaExtension: thumbnailData.format,
        mediaPath: thumbnailData.secure_url,
        mediaSize: thumbnailData.bytes,
        mediaDimensions: `${thumbnailData.width}px x ${thumbnailData.height}px`,
        uploadedOn: new Date()
      })
      thumbnail = supabaseMediaStatus === 201 ? thumbnailData.secure_url : thumbnail

      supabaseMediaStatus != 201 && !toast.isActive(toastID) &&
        toast({
            id: toastID,
            title: `Error #${supabaseMediaError?.code} has Occurred`,
            description: `An error has occurred: ${supabaseMediaError?.message}. ${supabaseMediaError?.hint && `${supabaseMediaError?.hint}.`}`,
            status: "error",
            duration: 9000,
            isClosable: true,
        })
    }

    const sidebar = values.sidebar ? values.sidebar : null
    const pinned = values.pinned ? values.pinned : false
    const updatePostedOn = values.postedOn ? new Date(values.postedOn) : post.postedOn

    const categoryValue = values.category.toString()

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
      pinned: pinned,
      sections: values.sections,
      postedOn: updatePostedOn,
      author: "Donald Louch",
      postStatus: "Public",
      lastUpdatedOn: new Date()
    }
    const { status: supabaseStatus , error: supabaseError } = await supabase.from("BlogPost").update({ 
      title: updateBlogPostData.title, 
      blogType: updateBlogPostData.blogType, 
      media: updateBlogPostData.media, 
      mediaCredit: updateBlogPostData.mediaCredit, 
      headingText: updateBlogPostData.headingText, 
      body: updateBlogPostData.body, 
      excerpt: updateBlogPostData.excerpt,
      categories: updateBlogPostData.categories, 
      tags: updateBlogPostData.tags, 
      thumbnail: updateBlogPostData.thumbnail, 
      sidebar: updateBlogPostData.sidebar, 
      pinned: updateBlogPostData.pinned, 
      sections: updateBlogPostData.sections, 
      postedOn: updateBlogPostData.postedOn, 
      author: updateBlogPostData.author, 
      postStatus: updateBlogPostData.postStatus, 
      lastUpdatedOn: updateBlogPostData.lastUpdatedOn 
    }).eq('id', updateBlogPostData.id)
    supabaseStatus && !toast.isActive(toastID) &&
      toast({
          id: toastID,
          title: `${supabaseStatus === 204 ? "Post Edited 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
          description: `${supabaseStatus === 204 ? `You have successfully edited ${values.title}!` : supabaseStatus === 23505 ?  "The chosen slug is already being used with another post, please try a new slug!" : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
          status: `${supabaseStatus === 204 ? "success" : "error"}`,
          duration: 9000,
          isClosable: true,
      })
      actions.setSubmitting(false)
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
        pinned: post.pinned,
        sections: post.sections,
        postStatus: post.postStatus,
      }
    
      const validationSchema = Yup.object({
        title: Yup.string().required('This field is required.'),
        slug: Yup.string().required('This field is required.'),
        blogType: Yup.string().required('This field is required.'),
        headingText: Yup.string().required('This field is required.'),
        body: Yup.string().required('This field is required.'),
        excerpt: Yup.string().max(300, 'The excerpt must not be more than 300 characters long.').required('This field is required.'),
        category: Yup.array().required('This field is required.'),
        tags: Yup.string().required('This field is required.'),
        // thumbnail: Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').required('This field is required.'),
        // sidebar: Yup.string().required('This field is required.')
      })
      // const postedData = new Date(post.postedOn)
      // const postedDay = postedData.toLocaleDateString()
      // const postedTime = postedData.toLocaleTimeString()

      // const postedOnString = postedDay +" at " + postedTime
  
  return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Box as="main" id="editBlogPost" color="white">
          <Button as="a" href={`/post/${post.slug}`} variant="primary" background="primary" color="white" my="1rem !important">View Blog Post</Button>
          <Button as="a" onClick={deletePost} variant="primary" background="red" color="white" my="1rem !important">Delete Blog Post</Button>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ handleSubmit, values }: any) => (
            <Stack as="form" onSubmit={handleSubmit as any} rowGap="2.5rem" my="2rem">
              <Stack  direction="row" spacing="2rem">
                <FormInputReadOnly inputID="id" inputLabel="Post ID" inputType="text" />
                <FormInputReadOnly inputID="slug" inputLabel="Slug" inputType="text" />
                <FormInputRow inputID="title" inputLabel="Title" inputType="text" />
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
              {values.blogType !== "Standard" && values.blogType !== "Special" && values.blogType !== ""  && values.blogType !== undefined && (
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
                {/* <Stack w="100%"> */}
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
                {/* </Stack> */}
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
              {/* <Code p={3} colorScheme='yellow'>Title#ID, Separate with comma</Code> */}
              <FormInput inputID="postedOn" inputLabel={`Update Posted On`} inputDescription={<DisplayDate source={post.postedOn} />} inputType="datetime-local" />
              <FormSelect selectLabel="Post Status" selectID="postStatus" selectPlaceholder={post.postStatus}>
                <option>---</option>
                <option value="Draft">Draft</option>
                <option value="Public">Public</option>
                <option value="Unlisted">Unlisted</option>
                <option value="Private">Private</option>
              </FormSelect>
              <SubmitButton variant="blackFormButton">Update Post</SubmitButton> 
            </Stack>
          )}
          </Formik>
        </Box>
    </>
  )
}
