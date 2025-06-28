'use client'

// import { ProjectType } from "@/lib/Project/projectType";
import { Box, Stack, Modal, SimpleGrid, Text, Grid, ActionIcon } from "@mantine/core";
import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton";
import { randomId, useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton";
import FormInput from "@/app/(Components)/(Form)/FormInput";
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea";
import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { notifications } from "@mantine/notifications";
import { useRouter, useSearchParams } from "next/navigation";
import FormInputPhone from "@/app/(Components)/(Form)/FormInputPhone";
import { Timezones } from "@/lib/Timezones";

import moment from 'moment-timezone';
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import FormButton from "@/app/(Components)/(Form)/FormButton";
import FileUploader from "../(MediaManager)/(Components)/FileUploader";
import HugeIcon from "@/app/(Components)/HugeIcon";

// type ProjectProps = {
//     isAdmin: boolean
//     isMod: boolean
// }

// {isAdmin, isMod}: ProjectProps

export default function AddNewLinkSet() {
    const router = useRouter()
    const [opened, { open, close }] = useDisclosure(false)

    const [typeSelected, setTypeSelected] = useState()

    const id = "linkSet"+Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toLowerCase()

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
        const media = new Array()
        typeSelected === "Audio" ?
            media.push({
                type: typeSelected,
                audioSRC: values.audioSRC
            })
        : media.push({
            type: typeSelected
        })

        const thumbnail = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME!}.${process.env.NEXT_PUBLIC_S3_HOST_NAME!}/thumbnail/linkSet/${id}.jpeg`

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("LinkSet").insert({ 
            id,
            setName: values.setName,
            setSlug: values.setSlug,
            description: values.description,
            excerpt: values.excerpt,
            media,
            links: subLinkValue,
            postDate: new Date(values.postDate),
            lastUpdated: new Date(),
            thumbnail
        })
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 201 ? "Link Set Added 🎉" : `Error #${supabaseError?.code} has Occurred`}`, 
            message:`${supabaseStatus === 201 ? `You have successfully added ${values.setName}!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`, 
            color: supabaseStatus === 201 ? "black" : "red",
            icon: supabaseStatus === 201 ? <HugeIcon name="sent" /> : <HugeIcon name="alert-diamond" />
        })
        supabaseStatus === 201 && router.refresh()
    }

    const initialLinkValues = new Array()

    const initialValues = {
        setName: undefined,
        setSlug: undefined,
        description: undefined,
        excerpt: undefined,
        postDate: new Date(),
        linksRow: initialLinkValues,
    }
    const schema = yup.object().shape({})
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    })
    
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
    // @ts-ignore
    const linkFields = form.getValues().linksRow.map((item: any, index: any) => (
        <Draggable key={item.key} index={index} draggableId={item.key}>
            {(provided: any) => (
                <Grid key={item.key}
                    align="center"
                    gutter="2rem"
                    ref={provided.innerRef}
                    {...provided.draggableProps} {...provided.dragHandleProps}
                >
                    <Grid.Col span={0.5}><Box {...provided.dragHandleProps} mt="1rem">
                        <HugeIcon name="drag-drop" />
                    </Box></Grid.Col>
                    <Grid.Col span={2.75}> <FormSelect inputID={`linksRow.${index}.linkType`} inputData={linkTypeOptions} key={form.key(`linksRow.${index}.linkType`)} {...form.getInputProps(`linksRow.${index}.linkType`)} /></Grid.Col>
                    <Grid.Col span={2.75}><FormInput inputID={`linksRow.${index}.icon`}  {...form.getInputProps(`linksRow.${index}.icon`)} key={form.key(`linksRow.${index}.icon`)} /></Grid.Col>
                    <Grid.Col span={2.75}><FormInput inputID={`linksRow.${index}.link`}  {...form.getInputProps(`linksRow.${index}.link`)} key={form.key(`linksRow.${index}.link`)} /></Grid.Col>
                    <Grid.Col span={2.75}><FormInput inputID={`linksRow.${index}.name`}  {...form.getInputProps(`linksRow.${index}.name`)} key={form.key(`linksRow.${index}.name`)} /></Grid.Col>
                    <Grid.Col span={0.5}><ActionIcon color="red" onClick={() => form.removeListItem('linksRow', index)}>
                        <HugeIcon name="delete-02" size="1rem" />
                    </ActionIcon></Grid.Col>
                </Grid>
            )}
        </Draggable>
    )) as any

    const typeOptions = new Array(
        {label: "Photo", value: "Photo"},
        {label: "Video", value: "Video"},
        {label: "Audio", value: "Audio"}
    )
    
    return <>
    <PrimaryButton onClick={open}>Add New Link Set</PrimaryButton>
    <Modal opened={opened} onClose={close} title="Add New Link Set" yOffset="2rem" xOffset="2rem" size="100%"  
            overlayProps={{
                backgroundOpacity: 0.5, 
                blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Box component="main" id="newLinkSet" color="white">
                <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
                    {/* 
                        setName
                        setSlug
                        description
                        excerpt
                        mediaType
                        mediaContent
                        links
                        postDate
                     */}
                    <SimpleGrid cols={2} my="2rem">
                        <FormInput inputID="setName" inputLabel="Link Set Name" {...form.getInputProps('setName')} icon={<HugeIcon name="text-font" variant="twotone" />} isRequired />
                        <FormInput inputID="setSlug" inputLabel="Link Set Slug" {...form.getInputProps('setSlug')} icon={<HugeIcon name="link-01" variant="twotone" />} isRequired />
                    </SimpleGrid>

                    <FormTextArea inputID="description" inputLabel="Link Set Description" helperText="MDX Enabled!" textRows={5} {...form.getInputProps('description')} isRequired />
                    <FormTextArea inputID="excerpt" inputLabel="Link Set Excerpt" textRows={3} {...form.getInputProps('excerpt')} isRequired />

                    <FormSelect inputID="type" inputLabel="Media Type" inputData={typeOptions} {...form.getInputProps(`type`)} onChange={setTypeSelected} value={typeSelected} clearable />
                    {typeSelected === "Audio" ? (<>
                            <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem 2rem 1rem" mb="2rem">
                                <SectionTitle headingTitle="Media: Audio" />
                                <FormInput inputID="audioSRC" inputLabel="Audio Source Link" {...form.getInputProps('audioSRC')} icon={<HugeIcon name="link-01" variant="twotone" />} isRequired={typeSelected === "Audio"} />
                            </Stack>
                        </>) 
                        : typeSelected && <Text ta="center" my="2rem">The {typeSelected} media is currently not supported.</Text>
                    }
                    
                    <Stack style={{boxShadow: "var(--mantine-shadow-bsSMWhite)", borderRadius: "var(--mantine-radius-md)"}} p="2rem 2rem 1rem">
                        <SectionTitle headingTitle="Links" />
                        {linkFields.length > 0 ? (
                            <Grid gutter="2rem">
                                <Grid.Col span={0.5}></Grid.Col>
                                <Grid.Col span={2.75}><Text ta="center">Link Type</Text></Grid.Col>
                                <Grid.Col span={2.75}><Text ta="center">Icon</Text></Grid.Col>
                                <Grid.Col span={2.75}><Text ta="center">Link</Text></Grid.Col>
                                <Grid.Col span={2.75}><Text ta="center">Name</Text></Grid.Col>
                                <Grid.Col span={0.5}></Grid.Col>
                            </Grid>
                        ) : <Text ta="center">There is Currently No Links! You can add one though!</Text>}

                        <DragDropContext
                            onDragEnd={({ destination, source }: any) =>
                                destination?.index !== undefined && form.reorderListItem('linksRow', { from: source.index, to: destination.index })
                            }
                        >
                            <Droppable droppableId="linksDnD" direction="vertical">
                                {(provided: any) => (
                                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                                        {linkFields}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </DragDropContext>

                        <FormButton icon={<HugeIcon name="plus-sign" />} onClick={() => form.insertListItem('linksRow', {
                            key: randomId(),
                            linkType: "exLink", 
                            icon: undefined, 
                            link: undefined, 
                            name: undefined
                        })}>Add More Link(s)</FormButton>
                    </Stack>

                   <FormDatePicker dateLabel="Post Date" datePlaceholder="When are you posting this link set?" {...form.getInputProps('postDate')} />

                    <Box m="2rem 5rem 0rem"><FileUploader mediaType={"thumbnail/linkSet"} uploadTitle="Upload Thumbnail" helperText="Recommend uploading a single thumbnail." id={id} /></Box>

                    <FormSubmitButton icon={<HugeIcon name="sent" />}>Add New Link Set</FormSubmitButton>
                </Box>
            </Box>
        </Modal>
    </>
}