'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponent"
import { LinkCardAdmin } from "./LinkCardAdmin"
import AddLink from "./AddLink"
import { PrimaryLinkManager } from "./PrimaryLinkManager"
import AddPrimaryLink from "./AddPrimaryLink"
import { EmbedManager } from "./EmbedManager"
import { AddEmbed } from "./AddEmbed"
import { ActionIcon, Anchor, Box, Flex, Grid, Group, Tabs, Text } from "@mantine/core"
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton"
import { useForm, yupResolver } from "@mantine/form"
import * as yup from 'yup';
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { randomId } from "@mantine/hooks"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton"
import supabase from "@/lib/supabase"
import { SectionCard } from "@/app/(Components)/(Cards)/SectionCard"
import { link } from "fs/promises"
import { Fragment } from "react"

export default function EditLinksPage({ links, primaryLinks }: any) {
  const breadCrumbs = [
    {"pageLink": "/admin/pages", "pageName": "Page Manager"},
    {"pageLink": "/admin/pagesLinks", "pageName": "Links Manager"}
  ]

  const initialLinksValues = new Array()
    links && links.forEach((link: any) => {
      initialLinksValues.push({ 
        key: randomId(),
        id: link.id,
        link: link.link,
        title: link.title,
        icon: link.icon[0],
        subTitle: link.subTitle,
        order: link.order || 0,
      })
    })
  
  const initialPrimaryLinksValues = new Array()
    primaryLinks && primaryLinks.forEach((link: any) => {
      initialPrimaryLinksValues.push({ 
        key: randomId(),
        id: link.id,
        link: link.link,
        title: link.title,
        icon: link.icon[0],
        subTitle: link.subTitle,
        order: link.order || 0,
      })
    })

  const initialValues = {
    linksRow: initialLinksValues
  }
  const initialValuesPrimary = {
    primaryLinksRow: initialPrimaryLinksValues
  }

  const schema = {}

  const form = useForm({
    mode: 'controlled',
    initialValues,
    validate: schema
  }) as any
  const formPrimary = useForm({
    mode: 'controlled',
    initialValues: initialValuesPrimary,
    validate: schema
  }) as any

  const linksField = form.getValues().linksRow?.map((item: any, index: any) => (
    <Draggable key={item.key} index={index} draggableId={item.key}>
      {(provided: any) => (
        <Grid key={item.key}
          align="center"
          gutter="2rem"
          ref={provided.innerRef}
          my="1rem"
          {...provided.draggableProps} {...provided.dragHandleProps}
        >
        <Grid.Col span={0.25}><Box {...provided.dragHandleProps}>
          <FontAwesomeIcon icon={["fal", "grip-dots-vertical"]} />
        </Box></Grid.Col>
        <Grid.Col span={11.75}>
          <LinkCardAdmin {...item} key={item.id} /></Grid.Col>
        </Grid>
      )}
    </Draggable>
  ))

  const primaryLinksField = formPrimary.getValues().primaryLinksRow?.map((item: any, index: any) => (
    <Draggable key={item.key} index={index} draggableId={item.key}>
      {(provided: any) => (
        <Box key={item.key} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <PrimaryLinkManager {...item} />
        </Box>
      )}
    </Draggable>
  ))

  const onSubmit = async (values: any) => {
    values.linksRow.forEach(async (link: any) => {
      const { status: supabaseStatus , error: supabaseError  } = await supabase.from("Links").update({ 
        order: values.linksRow.findIndex((l: any) => l.id === link.id),
        lastUpdatedOn: new Date()
      }).match({ id: link.id })
      console.log("Link Updated: ", link.id, "Status: ", supabaseStatus, "Error: ", supabaseError)
    })
  }
  const onSubmitPrimary = async (values: any) => {
    values.primaryLinksRow.forEach(async (link: any) => {
      const { status: supabaseStatus , error: supabaseError  } = await supabase.from("PrimaryLinks").update({ 
        order: values.primaryLinksRow.findIndex((l: any) => l.id === link.id),
        lastUpdatedOn: new Date()
      }).match({ id: link.id })
      console.log("Link Updated: ", link.id, "Status: ", supabaseStatus, "Error: ", supabaseError)
    })
  }

  return (
    <>
      <BreadCrumb breads={breadCrumbs} />
      <Box component="main">
        <PrimaryLinkedButton link="/" primNewIcon={{ name: "arrow-up-right" }}>View Links</PrimaryLinkedButton>
        <Box p="2rem" component="form" onSubmit={formPrimary.onSubmit(onSubmitPrimary)}>
          <Flex
            justify={{base: "flex-start", sm: "center"}}
            c="white"
            gap="1rem"
            w="100%"
            align="center"
            wrap="nowrap"
            style={{
              overflowX: "scroll",
              overflowY: "hidden",
              whiteSpace: "nowrap"
            }}
          >
            <AddPrimaryLink primaryLength={primaryLinks.length} />
            <DragDropContext
              onDragEnd={({ destination, source }: any) =>
              destination?.index !== undefined && formPrimary.reorderListItem('primaryLinksRow', { from: source.index, to: destination.index })
            }
            >
              <Droppable droppableId="primaryLinksDnD" direction="horizontal">
                {(provided: any) => (
                  <Box {...provided.droppableProps} ref={provided.innerRef} display="flex">
                    {primaryLinksField}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
            <ActionIcon style={{ padding: "0.6rem", background: "var(--secondary)" }} mx="0.5rem" type="submit" c="black">
              <FontAwesomeIcon icon={["fal", "save"]} size="lg" />
            </ActionIcon>
          </Flex>
          {/* <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "pen"]} />}>Save Primary Links Order</FormSubmitButton> */}
        </Box>
        <SectionCard id="allLinks" styleType="primaryCard" mx="0" pb="1rem">
          <AddLink />
          <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
            <DragDropContext
              onDragEnd={({ destination, source }: any) =>
              destination?.index !== undefined && form.reorderListItem('linksRow', { from: source.index, to: destination.index })
            }
            >
              <Droppable droppableId="linksDnD" direction="vertical">
                {(provided: any) => (
                  <Box {...provided.droppableProps} ref={provided.innerRef}>
                    {linksField}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
            <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "pen"]} />}>Save Links Order</FormSubmitButton>
          </Box>
        </SectionCard>
      </Box> 
    </>
  )
}
