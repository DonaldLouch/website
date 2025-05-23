'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { Box, Button, Code, Title, Stack, Group, Badge, Alert, SimpleGrid, ActionIcon, Text, Grid, rem } from "@mantine/core"

import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import DisplayDate from "@/lib/DisplayDate";
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";

import buttonClasses from "@/app/(Components)/(Buttons)/Buttons.module.css"
import { SectionTitle } from "@/app/(Components)/SectionTitle";

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from "@mantine/form";
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton";
import FormInput from "@/app/(Components)/(Form)/FormInput";
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea";
import { FormMultiSelect } from "@/app/(Components)/(Form)/FormMultiSelect";
import FormTags from "@/app/(Components)/(Form)/FormTags";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import { useState } from "react";
import { randomId, useListState } from "@mantine/hooks";
import FormButton from "@/app/(Components)/(Form)/FormButton";
import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { notifications } from "@mantine/notifications";
import HugeIcon from "@/app/(Components)/HugeIcon";

export default function EditPostContent({post, tagsData}: any) {
  // const toast = useToast()
  // const toastID = "toastID"
  const router = useRouter()

  const breadCrumbs = [
    {"pageLink": "/admin/blog", "pageName": "Blog"},
    {"pageLink": `/admin/postEdit/${post.slug}`, "pageName": `Edit Post: ${post.title}`},
  ]

  const [isTOCOption, setIsTOOption] = useState(post.toc.length > 0 ? true : false)
  const [isLinksOption, setIsLinksOption] = useState(post.links.length > 0 ? true : false)
  const [isPinnedOption, setIsPinnedOption] = useState(post.isPinned ? true : false)

  async function deletePost() {
    const { error: deletePostError, status: deletePostStatus } = await supabase.from("BlogPost").delete().eq('id', post.id);
        // deletePostStatus && !toast.isActive(toastID) &&
        // toast({
        //     id: toastID,
        //     title: `${deletePostStatus === 204 ? "Post ID Deleted  🗑️" : `Error #${deletePostError?.code} has Occurred`}`,
        //     description: `${deletePostStatus === 204 ? `You have successfully deleted the post "${post.title}"!` : `An error has occurred: ${deletePostError?.message}. ${deletePostError?.hint && `${deletePostError?.hint}.`}`}`,
        //     status: `${deletePostStatus === 204 ? "success" : "error"}`,
        //     duration: 9000,
        //     isClosable: true,
        // })
        deletePostStatus === 204 && router.push("/admin/blog?message=deletedPost")
  }

  const onSubmit = async (values: any) => {
    
    const subLinkValue = new Array()
      values.linksRow.forEach((link: any) => subLinkValue.push(
        {
          linkType: link.linkType, 
          icon: link.icon, 
          link: link.link, 
          name: link.name
        }
      ))
    const subTOCValue = new Array()
      values.tocRow.forEach((section: any) => subTOCValue.push(
        {
          title: section.title, 
          slug: section.slug
        }
      ))
    
    // // console.log(values, subLinkValue, subTOCValue)


    // let thumbnail = post.thumbnail

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
    //   thumbnail = supabaseMediaStatus === 201 ? thumbnailData.secure_url : thumbnail

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
    // const updatePostedOn = values.postedOn ? new Date(values.postedOn) : post.postedOn

    // const categoryValue = values.category.toString()

    // const values = {
    //   id: values.id,
    //   title: values.title,
    //   slug: values.slug,
    //   blogType: values.blogType,
    //   media: values.media,
    //   mediaCredit: values.mediaCredit,
    //   headingText: values.headingText,
    //   body: values.body,
    //   excerpt: values.excerpt,
    //   categories: categoryValue,
    //   tags: values.tags,
    //   thumbnail: thumbnail,
    //   sidebar: sidebar,
    //   pinned: pinned,
    //   sections: values.sections,
    //   postedOn: updatePostedOn,
    //   author: "Donald Louch",
    //   postStatus: "Public",
    //   lastUpdatedOn: new Date()
    // }
    const { status: supabaseStatus , error: supabaseError } = await supabase.from("BlogPost").update({ 
      title: values.title, 
      // blogType: values.blogType, 
      // media: values.media, 
      // mediaCredit: values.mediaCredit, 
      headingText: values.headingText, 
      body: values.body, 
      excerpt: values.excerpt,
      category: values.category, 
      tags: values.tags, 
      // thumbnail: values.thumbnail, 
      isSidebar: values.isSidebar, 
      isPinned: values.isPinned, 
      toc: subTOCValue, 
      links: subLinkValue, 
      postedOn: new Date(values.postedOn), 
      // author: values.author, 
      postStatus: values.postStatus, 
      lastUpdatedOn: new Date() 
    }).eq('id', post.id)
    supabaseStatus && notifications.show({ 
        title: `${supabaseStatus === 204 ? "Post Edited 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
        message:`${supabaseStatus === 204 ? `You have successfully edited ${values.title}!` : supabaseStatus === 23505 ?  "The chosen slug is already being used with another post, please try a new slug!" : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
        color: supabaseStatus === 204 ? "black" : "red",
        icon: supabaseStatus === 204 ? <HugeIcon name="pencil-edit-01" /> : <HugeIcon name="alert-diamond" />
    })
  }
  const initialTOCValues = new Array()
    post.toc && post.toc.forEach((section: any) => {
        initialTOCValues.push(
            { 
                key: randomId(),
                title: section.title, 
                slug: section.slug
            }
        )
    })
  
    const initialLinksValues = new Array()
    post.links && post.links.forEach((link: any) => {
        initialLinksValues.push(
            { 
                key: randomId(),
                linkType: link.linkType, 
                icon: link.icon, 
                link: link.link, 
                name: link.name
            }
        )
    })

    const initialValues = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        // blogType: post.blogType,
        // media: post.media,
        // mediaCredit: post.mediaCredit,
        headingText: post.headingText,
        body: post.body,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        // isTOCOption: post.isSidebar,
        // pinned: post.isPinned,
        // sections: post.sections,
        tocRow: initialTOCValues,
        linksRow: initialLinksValues,
        postedOn: new Date(post.postedOn),
        postStatus: post.postStatus,
    }
    
      // const validationSchema = Yup.object({
      //   title: Yup.string().required('This field is required.'),
      //   slug: Yup.string().required('This field is required.'),
      //   blogType: Yup.string().required('This field is required.'),
      //   headingText: Yup.string().required('This field is required.'),
      //   body: Yup.string().required('This field is required.'),
      //   excerpt: Yup.string().max(300, 'The excerpt must not be more than 300 characters long.').required('This field is required.'),
      //   category: Yup.array().required('This field is required.'),
      //   tags: Yup.string().required('This field is required.'),
      //   // thumbnail: Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').required('This field is required.'),
      //   // sidebar: Yup.string().required('This field is required.')
      // })

    const schema = yup.object().shape({
      // title: yup.string().required('This field is required.'),
      // slug: yup.string().required('This field is required.'),
      // blogType: yup.string().required('This field is required.'),
      // headingText: yup.string().required('This field is required.'),
      // body: yup.string().required('This field is required.'),
      // excerpt: yup.string().max(120, 'The excerpt must not be more than 120 characters long.').required('This field is required.'),
      // category: yup.array().required('This field is required.'),
      // tags: yup.string().required('This field is required.'),
      // thumbnail: Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Enter correct url!').required('This field is required.'),
      // sidebar: Yup.string().required('This field is required.')
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

    // const tocFields = form.getValues().tocRow?.map((item: any, index: any) => (
    //     <Grid key={item.key} gutter="2rem">
    //         <Grid.Col span={5.5}><FormInput inputID={`tocRow.${index}.title`} {...form.getInputProps(`tocRow.${index}.title`)} key={form.key(`sections.${index}.title`)} /></Grid.Col>
    //         <Grid.Col span={5.5}><FormInput inputID={`tocRow.${index}.slug`} {...form.getInputProps(`tocRow.${index}.slug`)} key={form.key(`sections.${index}.slug`)} /></Grid.Col>
    //         <Grid.Col span={1}><ActionIcon color="red" onClick={() => form.removeListItem('tocRow', index)}>
    //             <Delete02Icon size="1rem" />
    //         </ActionIcon></Grid.Col>
    //     </Grid>
    // ))
    
    // const [state, handlers] = useListState(data);
    // className={classes.dragHandle}

//     key={form.key(`sections.${index}.title`)}
// key={form.key(`sections.${index}.slug`)} 
    // const [state, handlers] = useListState(form.values.tocRow)
    // // console.log(state)

    const tocFields = form.values.tocRow.map((item: any, index: any) => (
      <Draggable key={item.key} index={index} draggableId={item.key}>
        {(provided) => (
          <Grid gutter="2rem"
            ref={provided.innerRef}
            {...provided.draggableProps} {...provided.dragHandleProps}
          >
             <Grid.Col span={0.5}><Box {...provided.dragHandleProps} mt="1rem">
             <HugeIcon name="drag-drop" />
            </Box></Grid.Col>
            <Grid.Col span={5.25}><FormInput inputID={`tocRow.${index}.title`} {...form.getInputProps(`tocRow.${index}.title`)} key={form.key(`sections.${index}.title`)} /></Grid.Col>
            <Grid.Col span={5.25}><FormInput inputID={`tocRow.${index}.slug`} {...form.getInputProps(`tocRow.${index}.slug`)} key={form.key(`sections.${index}.slug`)}  /></Grid.Col>
            <Grid.Col span={0.5}><ActionIcon color="red" onClick={() => form.removeListItem('tocRow', index)}>
            <HugeIcon name="delete-02" size="2rem" />
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
        {(provided) => (
          <Grid gutter="2rem"
            styles={{col: {alignItems: "center"}}}
            ref={provided.innerRef}
            {...provided.draggableProps} {...provided.dragHandleProps}
          >
            <Grid.Col span={0.5}><Box {...provided.dragHandleProps} mt="1rem">
              <HugeIcon name="drag-drop" />
            </Box></Grid.Col>

            <Grid.Col span={2.75}>
              <FormSelect inputID={`linksRow.${index}.linkType`} inputData={linkTypeOptions} key={form.key(`links.${index}.linkType`)} {...form.getInputProps(`linksRow.${index}.linkType`)} />
            </Grid.Col>
            <Grid.Col span={2.75}>
              <FormInput inputID={`linksRow.${index}.icon`} {...form.getInputProps(`linksRow.${index}.icon`)} key={form.key(`links.${index}.icon`)} />
            </Grid.Col>
            <Grid.Col span={2.75}>
              <FormInput inputID={`linksRow.${index}.link`} {...form.getInputProps(`linksRow.${index}.link`)} key={form.key(`links.${index}.link`)} />
            </Grid.Col>
            <Grid.Col span={2.75}>
              <FormInput inputID={`linksRow.${index}.name`} {...form.getInputProps(`linksRow.${index}.name`)} key={form.key(`links.${index}.name`)} />
            </Grid.Col>

            <Grid.Col span={0.5}><ActionIcon color="red" onClick={() => form.removeListItem('linksRow', index)}>
              <HugeIcon name="delete-02" size="2rem" />
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
        <Box component="main" id="editBlogPost" color="white">
          <Group my="2rem">
            <Group gap="0">
              <PrimaryLinkedButton link={`/post/${post.slug}`} primNewIcon={{name: "view", variant: "duotone"}}>View Blog Post</PrimaryLinkedButton>
              <Badge leftSection={<HugeIcon name="link-04" variant="twotone" />} color="blue" tt="lowercase">{post.slug}</Badge>
            </Group>
            <Button leftSection={<HugeIcon name="delete-03" variant="duotone" />} color="red" variant="filled" size="lg" classNames={{root: buttonClasses.primaryButton}}>Delete Blog Post</Button>
          </Group>
          <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
            <FormInput inputID="title" inputLabel="Title" {...form.getInputProps('title')} inputDescription="The title of the blog post so the users will now at a glance what the blog article will be about." isRequired />
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
                onClick={(e: any) => setIsTOOption(e.target.checked)} 
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

                <FormButton icon={<HugeIcon name="plus-sign" />} onClick={() => form.insertListItem('tocRow', {
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
                {linksFields.length > 0 ? (
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

                <FormButton icon={<HugeIcon name="plus-sign" />} onClick={() => form.insertListItem('linksRow', { 
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
            <FormSubmitButton icon={<HugeIcon name="pencil-edit-01" />}>Edit Blog Post</FormSubmitButton>
          </Box>
          {/*
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
                        ? "LINKTOIMAGE;;LINKTOIMAGE;;singlePic;;description || " 
                      : values.blogType === "Gallery" 
                        ? "LINKTOIMAGE;;LINKTOIMAGE;;galleryPic;;description || "
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
          </Formik> */}
        </Box>
    </>
  )
}
