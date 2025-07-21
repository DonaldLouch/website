import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton"
import { ActionIcon, Box, Grid, Modal, SimpleGrid, Stack, Text } from "@mantine/core"
import { randomId, useDisclosure } from "@mantine/hooks"

import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from '@mantine/form'
import FormInput from "@/app/(Components)/(Form)/FormInput";
import FormTextArea from "@/app/(Components)/(Form)/FormTextArea";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton";
import FormDatePicker from "@/app/(Components)/(Form)/FormDatePicker";
import HugeIcon from "@/app/(Components)/HugeIcon";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FormSwitch } from "@/app/(Components)/(Form)/FormSwitch";
import { SectionTitle } from "@/app/(Components)/SectionTitle";
import FormButton from "@/app/(Components)/(Form)/FormButton";
import supabase from "@/lib/supabase";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export default function EditAlbumMetadata({albumData}: {albumData: any}) {
    const [opened, { open, close }] = useDisclosure(false)

    const [isLinksOption, setIsLinksOption] = useState(albumData.links?.length > 0 ? true : false)
    const [isSetup, setIsSetup] = useState(albumData.initialSetup)

    const router = useRouter()
    
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

        const { status: supabaseStatus , error: supabaseError } = await supabase.from("PhotographyAlbum").update({ 
            albumName: values.albumName,
            albumCaption: values.albumCaption || albumData.albumCaption,
            links: subLinkValue,
            uploadedOn: new Date(values.uploadedOn),
            lastUpdatedOn: new Date(),
            initialSetup: isSetup,
            privacy: values.albumPrivacy,
        }).eq('id', albumData.id)
        supabaseStatus && notifications.show({ 
            title: `${supabaseStatus === 204 ? `The Album ${values.albumName} Was Edited 🎉` : `Error #${supabaseError?.code} has Occurred`}`,
            message:`${supabaseStatus === 204 ? `You have successfully edited the selected album!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
            color: supabaseStatus === 204 ? "black" : "red",
            icon: supabaseStatus === 204 ? <HugeIcon name="pencil-edit-01" /> : <HugeIcon name="alert-diamond" />
        })
        supabaseStatus === 204 && router.refresh()
    }

    const initialLinksValues = new Array()
        albumData.links && albumData.links.forEach((link: any) => {
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
        albumName: albumData.albumName,
        albumCaption: albumData.albumCaption,

        linksRow: initialLinksValues,

        uploadedOn: new Date(albumData.uploadedOn),
        albumPrivacy: albumData.privacy,
    }
    const schema = yup.object().shape({
        albumName:  yup.string().required('The album name is required.'),
        albumCaption: yup.string().required('The album description is required.'),
        // linksRow: yup.array().of(
        //     yup.object().shape({
        //         linkType: yup.string().required('Link type is required.'),
        //         icon: yup.string().required('Icon is required.'),
        //         link: yup.string().url('Must be a valid URL').required('Link is required.'),
        //         name: yup.string().required('Name is required.'),
        //     })
        // ).required('At least one link is required.'),
    })
    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: yupResolver(schema)
    }) as any

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

    const albumPrivacyOptions = [
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

    return <>
        <PrimaryButton onClick={open} primNewIcon={{name: "note-edit"}}>Edit Album Details</PrimaryButton>
        <Modal 
            opened={opened} onClose={close} title="Edit Album Metadata" yOffset="2rem" xOffset="2rem" size="100%"
            overlayProps={{
            backgroundOpacity: 0.5, 
            blur: 4,
            }} 
            styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
            radius="lg"
        >
            <Text>{albumData.id}</Text>
            <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
                <FormInput inputID="albumName" inputLabel="Album Name" {...form.getInputProps('albumName')} inputDescription="Please provide a name for the album!" icon={<HugeIcon name="text-font" variant="twotone" />} isRequired />
                <FormTextArea inputID="albumCaption" inputLabel="Album Caption" textRows={4} {...form.getInputProps('albumCaption')} isRequired />
                <FormSwitch 
                    inputID="isLinks" 
                    helperText="Toggle on if this album has link(s)"
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
                <FormDatePicker dateLabel="Uploaded/Posted On" datePlaceholder="Please select a date!" {...form.getInputProps('uploadedOn')} />
                <SimpleGrid cols={2} spacing="2rem">
                    <FormSwitch 
                        inputID="isSetup" 
                        helperText="Toggle on if this album is setup"
                        {...form.getInputProps('isSetup')}
                        onClick={(e: any) => setIsSetup(e.target.checked)} 
                        checked={isSetup}
                    />
                    <FormSelect inputID="albumPrivacy" inputLabel="Album Privacy" inputData={albumPrivacyOptions} {...form.getInputProps(`albumPrivacy`)} />
                </SimpleGrid>
                <FormSubmitButton icon={<HugeIcon name="sent" variant="twotone" />}>Edit Album Metadata</FormSubmitButton>
            </Box>
        </Modal>
    </>
}