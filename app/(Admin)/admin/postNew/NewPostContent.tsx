'use client'

import supabase from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { ActionIcon, Box, Grid, SimpleGrid, Stack, Text } from "@mantine/core";

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from "@mantine/form";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { AlertDiamondIcon, Delete02Icon, DragDropIcon, PencilEdit01Icon, PlusSignIcon, SentIcon } from "@hugeicons/react";
import FormInput from "@/app/(Components)/(Form)/FormInput";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent";
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea";
import { FormMultiSelect } from "@/app/(Components)/(Form)/FormMultiSelect";
import FormTags from "@/app/(Components)/(Form)/FormTags";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import FormButton from "@/app/(Components)/(Form)/FormButton";
import { randomId } from "@mantine/hooks";
import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker";
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton";
import { notifications } from "@mantine/notifications";

export default function NewPostContent({tagsData}: any) {
  const router = useRouter()

  const [isTOCOption, setIsTOCOption] = useState(false)
  const [isLinksOption, setIsLinksOption] = useState(false)
  const [isPinnedOption, setIsPinnedOption] = useState(false)


  const breadCrumbs = [
    {"pageLink": "/admin/blog", "pageName": "Blog"},
    {"pageLink": `/admin/postNew`, "pageName": `Create New Post`},
  ]

  const onSubmit = async (values: any) => {
    let thumbnail = "https://donaldlouch.s3.us-west-004.backblazeb2.com/thumbnail/uv0fxdiue86dqkgwso98.jpg"
    // const findFileName = ({ name }: any) => name === 'file'
    // const form = document.querySelector('form') as any
    // const fileInput = Array.from(form.elements).find(findFileName) as any

    // const formData = new FormData()

    // for ( const file of fileInput.files ) {
    //   formData.append('file', file)
    //   formData.append('upload_preset', 'thumbnail')

    //   const thumbnailData = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`, {
    //     method: 'POST',
    //     body: formData
    //   }).then(r => r.json())
    //   const { status: supabaseMediaStatus , error: supabaseMediaError } = await supabase.from("Media").insert({ 
    //     mediaID: "thumbnail"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
    //     mediaPublicID: thumbnailData.public_id,
    //     mediaSignature: thumbnailData.signature,
    //     mediaKind: thumbnailData.resource_type,
    //     mediaTitle: thumbnailData.original_filename,
    //     mediaExtension: thumbnailData.format,
    //     mediaPath: thumbnailData.secure_url,
    //     mediaSize: thumbnailData.bytes,
    //     mediaDimensions: `${thumbnailData.width}px x ${thumbnailData.height}px`,
    //     uploadedOn: new Date()
    //   })
    //   thumbnail = supabaseMediaStatus === 201 ? thumbnailData.secure_url : null

    //   supabaseMediaStatus != 201 && !toast.isActive(toastID) &&
    //     toast({
    //         id: toastID,
    //         title: `Error #${supabaseMediaError?.code} has Occurred`,
    //         description: `An error has occurred: ${supabaseMediaError?.message}. ${supabaseMediaError?.hint && `${supabaseMediaError?.hint}.`}`,
    //         status: "error",
    //         duration: 9000,
    //         isClosable: true,
    //     })
    // }

    // const sidebar = values.sidebar ? values.sidebar : null
    // const pinned = values.pinned ? values.pinned : false
    const postedOn = values.postedOn ? new Date(values.postedOn) : new Date()
    
    const subLinkValue = new Array()
      isLinksOption && values.linksRow.forEach((link: any) => subLinkValue?.push(
        {
          linkType: link.linkType, 
          icon: link.icon, 
          link: link.link, 
          name: link.name
        }
      ))
    const subTOCValue = new Array()
      isTOCOption && values.tocRow.forEach((section: any) =>  subTOCValue?.push(
        {
          title: section.title, 
          slug: section.slug
        }
      ))

    const { status: supabaseStatus , error: supabaseError } = await supabase.from("BlogPost").insert({ 
      id: "blog"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase(),
      title: values.title,
      slug: values.slug,
      headingText: values.headingText,
      body: values.body,
      excerpt: values.excerpt,
      category: values.category,
      tags: values.tags,
      thumbnail: thumbnail,
      toc: subTOCValue,
      links: subLinkValue,
      pinned: values.pinned,
      postedOn: postedOn,
      postStatus: values.postStatus,
      author: "Donald Louch",
      lastUpdatedOn: new Date()
    })
     supabaseStatus && notifications.show({ 
          title: `${supabaseStatus === 201 ? "Post Added 🎉" : `Error #${supabaseError?.code} has Occurred`}`, 
          message:`${supabaseStatus === 201 ? `You have successfully added ${values.title}!` : supabaseStatus === 409 ?  "The chosen slug is already being used with another post, please try a new slug!" : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
          color: supabaseStatus === 201 ? "black" : "red",
          icon: supabaseStatus === 201 ? <SentIcon /> : <AlertDiamondIcon />
      })
    //  !toast.isActive(toastID) &&
    //   toast({
    //       id: toastID,
    //       title: `${supabaseStatus === 201 ? "Post Added 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
    //       description: `${supabaseStatus === 201 ? `You have successfully added ${values.title}!` : supabaseStatus === 409 ?  "The chosen slug is already being used with another post, please try a new slug!" : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
    //       status: `${supabaseStatus === 201 ? "success" : "error"}`,
    //       duration: 9000,
    //       isClosable: true,
    //   })

      // actions.setSubmitting(false)
  }

  const initialTOCValues = new Array()
  const initialLinksValues = new Array()
  
  const initialValues = {
    title: "",
    slug: "",
    headingText: "",
    body: "",
    excerpt: "",
    category: "website",
    tags: [],

    tocRow: initialTOCValues,
    linksRow: initialLinksValues,
    postedOn: new Date(),
    postStatus: "Draft",
  }

  const schema = yup.object().shape({
    title: yup.string().required('This field is required.'),
    slug: yup.string().required('This field is required.'),
    headingText: yup.string().required('This field is required.'),
    body: yup.string().required('This field is required.'),
    excerpt: yup.string().max(300, 'The excerpt must not be more than 300 characters long.').required('This field is required.'),
    // tags: yup.string().required('This field is required.')
  })

  const form = useForm({
      mode: 'controlled',
      initialValues,
      validate: yupResolver(schema)
  }) as any

  const categoryOptions = new Array(
    {value: "life", label: "Life"},
    {value: "travel", label: "Travel"},
    {value: "education", label: "Education"},
    {value: "website", label: "Website"},
    {value: "general", label: "General"},
  )

  const tocFields = form.values.tocRow.map((item: any, index: any) => (
    <Draggable key={item.key} index={index} draggableId={item.key}>
      {(provided: any) => (
        <Grid gutter="2rem"
          ref={provided.innerRef}
          {...provided.draggableProps} {...provided.dragHandleProps}
        >
            <Grid.Col span={0.5}><Box {...provided.dragHandleProps} mt="1rem">
            <DragDropIcon />
          </Box></Grid.Col>
          <Grid.Col span={5.25}><FormInput inputID={`tocRow.${index}.title`} {...form.getInputProps(`tocRow.${index}.title`)} key={form.key(`tocRow.${index}.title`)} /></Grid.Col>
          <Grid.Col span={5.25}><FormInput inputID={`tocRow.${index}.slug`} {...form.getInputProps(`tocRow.${index}.slug`)} key={form.key(`tocRow.${index}.slug`)}  /></Grid.Col>
          <Grid.Col span={0.5}><ActionIcon color="red" onClick={() => form.removeListItem('tocRow', index)}>
            <Delete02Icon size="1rem" />
          </ActionIcon></Grid.Col>
        </Grid>
      )}
    </Draggable>
  ))

  const linkTypeOptions = [
    {
        value: "exLink",
        label: "External Link"
    },
    {
        value: "exEmbed",
        label: "External Embed"
    },
    {
        value: "inLink",
        label: "Internal Link"
    },
    {
        value: "inEmbed",
        label: "Internal Embed"
    },
    {
        value: "nonLink",
        label: "Non-Link"
    },
  ]
  const linksFields = form.values.linksRow.map((item: any, index: any) => (
    <Draggable key={item.key} index={index} draggableId={item.key}>
      {(provided: any) => (
        <Grid gutter="2rem"
          styles={{col: {alignItems: "center"}}}
          ref={provided.innerRef}
          {...provided.draggableProps} {...provided.dragHandleProps}
        >
          <Grid.Col span={0.5}><Box {...provided.dragHandleProps} mt="1rem">
            <DragDropIcon />
          </Box></Grid.Col>

          <Grid.Col span={2.75}>
            <FormSelect inputID={`linksRow.${index}.linkType`} inputData={linkTypeOptions} key={form.key(`linksRow.${index}.linkType`)} {...form.getInputProps(`linksRow.${index}.linkType`)} />
          </Grid.Col>
          <Grid.Col span={2.75}>
            <FormInput inputID={`linksRow.${index}.icon`} {...form.getInputProps(`linksRow.${index}.icon`)} key={form.key(`linksRow.${index}.icon`)} />
          </Grid.Col>
          <Grid.Col span={2.75}>
            <FormInput inputID={`linksRow.${index}.link`} {...form.getInputProps(`linksRow.${index}.link`)} key={form.key(`linksRow.${index}.link`)} />
          </Grid.Col>
          <Grid.Col span={2.75}>
            <FormInput inputID={`linksRow.${index}.name`} {...form.getInputProps(`linksRow.${index}.name`)} key={form.key(`linksRow.${index}.name`)} />
          </Grid.Col>

          <Grid.Col span={0.5}><ActionIcon color="red" onClick={() => form.removeListItem('linksRow', index)}>
            <Delete02Icon size="1rem" />
          </ActionIcon></Grid.Col>
        </Grid>
      )}
    </Draggable>
  ))
  
  const postStatusOptions = [
    {
        value: "Draft",
        label: "Draft"
    },
    {
        value: "Public",
        label: "Public"
    },
    {
        value: "Unlisted",
        label: "Unlisted"
    },
    {
        value: "Private",
        label: "Private"
    }
  ]

  return (
    <>
        <BreadCrumb breads={breadCrumbs} />
        <Box component="main" id="newBlogPost" color="white">
          <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
            <SimpleGrid cols={2} spacing="2rem" mb="2rem">
              <FormInput inputID="title" inputLabel="Title" {...form.getInputProps('title')} isRequired />
              <FormInput inputID="slug" inputLabel="Slug" {...form.getInputProps('slug')} isRequired />
            </SimpleGrid>
            <FormInput inputID="headingText" inputLabel="Heading Text"  {...form.getInputProps('headingText')} inputDescription="This heading will display after the meta information and before the article. This will describe what the article will be about in a one line sentence." />
            <FormTextArea inputID="body" inputLabel="Body (MDX Enabled)" textRows={10} {...form.getInputProps('body')} helperText="Please note that this section is equipped with the ability to write in the Mark Down language. Please refer to this MDX (COMING SOON) for more information." />
            <FormTextArea inputID="excerpt" inputLabel="Excerpt" textRows={4}  {...form.getInputProps('excerpt')} helperText="The excerpt must not be more than 120 characters long."/>
            <SimpleGrid cols={2}>
              <FormMultiSelect inputID="category" inputData={categoryOptions} inputLabel="Categories" inputHelperText="You may select multiple categories if they apply." {...form.getInputProps(`category`)} />
              <FormTags searchValues={tagsData} {...form.getInputProps('tags')} />
            </SimpleGrid>
            <FormSwitch 
                inputID="isTOCOption" 
                helperText="Toggle on if this post has Table of Contents"
                {...form.getInputProps('isTOCOption')}
                onClick={(e: any) => setIsTOCOption(e.target.checked)} 
                checked={isTOCOption}
            />
             {isTOCOption && (<>
              <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem 2rem 1rem">
                <SectionTitle headingTitle="Table of Contents" />
                {tocFields.length > 0 ? (
                  <Grid my="0">
                    <Grid.Col span={0.5}><></></Grid.Col>
                    <Grid.Col span={5.25} ta="center"><Text>Table of Contents Title</Text></Grid.Col>
                    <Grid.Col span={5.25} ta="center"><Text>Table of Contents Slug</Text></Grid.Col>
                    <Grid.Col span={0.5}><></></Grid.Col>
                  </Grid>
                ) : <Text ta="center" my="0">There is Currently No Sections In The Table of Contents! You can add one though!</Text>}

                <DragDropContext
                  onDragEnd={({ destination, source }: any) =>
                    destination?.index !== undefined && form.reorderListItem('tocRow', { from: source.index, to: destination.index })
                  }
                >
                  <Droppable droppableId="tocDnD" direction="vertical">
                    {(provided: any) => (
                      <Box {...provided.droppableProps} ref={provided.innerRef}>
                        {tocFields}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </DragDropContext>

                <FormButton icon={<PlusSignIcon />} onClick={() => form.insertListItem('tocRow', { 
                  key: randomId(),
                  title: null, 
                  slug: null,
                })}>Add More Section(s) In The Table of Contents</FormButton>
              </Stack>
             </>)}
            
            <FormSwitch 
                inputID="isLinks" 
                helperText="Toggle on if this post has link(s)"
                {...form.getInputProps('isLinks')}
                onClick={(e: any) => setIsLinksOption(e.target.checked)} 
                checked={isLinksOption}
            />
             {isLinksOption && (<>
              <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem 2rem 1rem">
                <SectionTitle headingTitle="Links" />
                {tocFields.length > 0 ? (
                  <Grid my="0">
                    <Grid.Col span={0.5}><></></Grid.Col>
                    <Grid.Col span={2.75} ta="center"><Text>Link Type</Text></Grid.Col>
                    <Grid.Col span={2.75} ta="center"><Text>Link Icon</Text></Grid.Col>
                    <Grid.Col span={2.75} ta="center"><Text>Link</Text></Grid.Col>
                    <Grid.Col span={2.75} ta="center"><Text>Link Name</Text></Grid.Col>
                    <Grid.Col span={0.5}><></></Grid.Col>
                  </Grid>
                ) : <Text ta="center" my="0">There is Currently No Links! You can add one though!</Text>}

                <DragDropContext
                  onDragEnd={({ destination, source }) =>
                    destination?.index !== undefined && form.reorderListItem('linksRow', { from: source.index, to: destination.index })
                  }
                >
                  <Droppable droppableId="linksDnD" direction="vertical">
                    {(provided) => (
                      <Box {...provided.droppableProps} ref={provided.innerRef}>
                        {linksFields}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </DragDropContext>

                <FormButton icon={<PlusSignIcon />} onClick={() => form.insertListItem('linksRow', { 
                  key: randomId(),
                        linkType: "exLink", 
                        icon: null, 
                        link: null, 
                        name: null
                })}>Add More Links(s)</FormButton>
              </Stack>
             </>)}

             <SimpleGrid cols={3}>
              <FormSwitch 
                  inputID="isPinned" 
                  helperText="Toggle on if you want this post to be pinned"
                  {...form.getInputProps('isPinned')}
                  onClick={(e: any) => setIsPinnedOption(e.target.checked)} 
                  checked={isPinnedOption}
              /> 
              <FormDatePicker dateLabel="Posted On" datePlaceholder="When was this posted?" {...form.getInputProps('postedOn')}/>
              <FormSelect inputID="postStatus" inputLabel="Post Status" inputData={postStatusOptions} {...form.getInputProps(`postStatus`)} />
            </SimpleGrid>
            {/* TODO: UPLOAD NEW THUMBNAIL */}
            <FormSubmitButton icon={<SentIcon />}>Publish Blog Post</FormSubmitButton>
          </Box>
        </Box>
    </>
  )
}
