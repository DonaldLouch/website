'use client'

import FormInput from "@/app/(Components)/(Form)/FormInput";
import supabase from "@/lib/supabase";
import { ActionIcon, Anchor, Box, Code, Divider, Group, Modal, SimpleGrid, Stack, Text } from "@mantine/core";

import { useRouter } from "next/navigation";

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"

import * as yup from 'yup'
import { yupResolver } from 'mantine-form-yup-resolver';
import { useDisclosure } from "@mantine/hooks";
import PrimaryLinkedButton from "@/app/(Components)/(Buttons)/PrimaryLinkedButton";
import { FormSelect } from "@/app/(Components)/(Form)/FormSelect";
import FormSubmitButton from "@/app/(Components)/(Form)/FormSubmitButton";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import PrimaryButton from "@/app/(Components)/(Buttons)/PrimaryButton";

import type { Icons } from "@/lib/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LinkCardAdminProps {
  id: string;
  link: string;
  title: string;
  subTitle: string | null | undefined;
  icon?: Icons | null | undefined;
}

export const PrimaryLinkManager = (link: LinkCardAdminProps) => {

  // console.log(link)
  const [opened, { open, close }] = useDisclosure(false)
  const [iconPackSelected, setIconPackSelected] = useState(link.icon.pack || null)

  const router = useRouter();

  const deleteLink = async () => {
    const { status: deleteStatus, error: deleteError } = await supabase.from("PrimaryLinks").delete().eq('id', link.id)
    deleteStatus && notifications.show({
      id: `DeletePrimaryLink${link.id}`,
      title: deleteStatus === 204 ? `${link.title} Deleted  🗑️` : `Error #${deleteError?.code} has Occurred`,
      message: deleteStatus === 204 ? `You have successfully deleted the ${link.title} link!` : `An error has occurred: ${deleteError?.message}. ${deleteError?.hint && `${deleteError?.hint}.`}`,
      color: deleteStatus === 204 ? "green.0" : "red",
      icon: deleteStatus === 204 ? <FontAwesomeIcon icon={["fal", "trash"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
    })
    deleteStatus === 204 && router.refresh()
  }

  const onSubmit =  async (values: any) => {
    const theIcon = new Array({
      "name": values.iconName,
      "pack": iconPackSelected || undefined,
    })

    const { status: supabaseStatus , error: supabaseError  } = await supabase.from("PrimaryLinks").update({ 
      // iconName: values.iconName,
      icon: theIcon,
      title: values.title,
      subTitle: values.subTitle,
      link: values.linkForm,
      lastUpdatedOn: new Date()
    }).match({ id: link.id })
    supabaseStatus && notifications.show({
      id: `EditPrimaryLink${link.id}`,
      title: `${supabaseStatus === 204 ? "Updated Link 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
      message: `${supabaseStatus === 204 ? `You have successfully updated the ${link.title} link!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
      color: supabaseStatus === 204 ? "green.0" : "red",
      icon: supabaseStatus === 204 ? <FontAwesomeIcon icon={["fal", "check-circle"]} /> : <FontAwesomeIcon icon={["fal", "seal-exclamation"]} />,
    })
    supabaseStatus === 204 && router.refresh()
  }

  const initialValues = {
    iconName: link.icon.name || null,
    iconPack: link.icon.pack || null,
    title: link.title,
    subTitle: link.subTitle,
    linkForm: link.link,
  }
  const schema = yup.object().shape({
    iconName:  yup.string().required('You must specify an icon'),
    title: yup.string().required('You must specify a link title'),
    subTitle: yup.string().required('You must specify a link sub title'),
  })
  const form = useForm({
    mode: 'controlled',
    initialValues,
    validate: yupResolver(schema)
  })

  const iconPackOptions = new Array(
    {value: "fal", label: "fal (Light; Default)", disabled: true},
    {value: "fadl", label: "fadl (Duotone)"},
    {value: "fab", label: "fab (Brands)"},
    {value: "fajr", label: "fajr (Jelly)"},
    {value: "fajdr", label: "fajdr (Jelly Duo)"},
    {value: "fak", label: "fak (Packs)"}
  )

  return <>
    <Anchor
      key={link.id}
      onClick={open}
      c="currentColor"
      underline="never"
    >
      <ActionIcon style={{ padding: "0.6rem" }} mx="0.5rem">
        <FontAwesomeIcon icon={[link.icon.pack || "fal", link.icon.name]} size="lg" />
      </ActionIcon>
      {/* <Group wrap="nowrap" className={ classes.linkButton } 
        my="1.5rem"
        p="0.5rem 1.2rem"
      > */}
        {/* <ActionIcon bg="none" style={{boxShadow: "none", padding: "0.6rem", margin: 0}}>{<FontAwesomeIcon icon={[link.icon.pack || "fal", link.icon.name]} />}</ActionIcon> */}
        {/* <Stack gap="0">
          <Text c="white" mb="0" fz="1.5rem">{link.title}</Text>
          {link.subTitle ? <Text size="sm" c="dimmed" fw={300} mt="0">{link.subTitle}</Text> : null}
        </Stack> */}
      {/* </Group> */}
    </Anchor>
    <Modal 
      opened={opened} onClose={close} title={`Edit Link: ${link.id}`} yOffset="2rem" xOffset="2rem" size="100%"
      overlayProps={{
        backgroundOpacity: 0.5, 
        blur: 4,
      }} 
      styles={{header: {background: "var(--blurredBackground)"}, content: { background: "var(--darkPurple)"}}}
      radius="lg"
    >
      {link.link && <PrimaryLinkedButton primNewIcon={{name: "arrow-up-right"}} link={link.link} isExternal my="2rem">Open Link</PrimaryLinkedButton>}
      <Divider label="Edit Link" labelPosition="center" mx="3rem" my="2rem" />
      <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
          <SimpleGrid cols={2} spacing="2rem">
              <FormInput inputID="iconName" inputLabel="Icon Name" {...form.getInputProps('iconName')} icon={<FontAwesomeIcon icon={["fal", "icons"]} />} isRequired />
              <FormSelect inputID="IconPack" inputLabel="Icon Pack" inputData={iconPackOptions} {...form.getInputProps(`IconPack`)} onChange={setIconPackSelected} value={iconPackSelected} clearable />
          </SimpleGrid>
          <Stack align="center" mb="2rem">
              <Code p="0.5rem" bg="var(--blackRGBA)" c="white" fz="1rem" w="100%">Please provide the icon name. You may visit <Anchor href="https://fontawesome.com/icons" target="_blank">https://fontawesome.com/icons</Anchor> for a list of all icons.</Code>
          </Stack>
          <SimpleGrid cols={2} spacing="2rem">
              <FormInput inputID="title" inputLabel="Link Title" {...form.getInputProps('title')} inputDescription="Please provide the link title." icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
              <FormInput inputID="subTitle" inputLabel="Link Sub Title" {...form.getInputProps('subTitle')} inputDescription="Please provide the link sub title." icon={<FontAwesomeIcon icon={["fal", "font-case"]} />} isRequired />
          </SimpleGrid>
          <FormInput inputID="linkForm" inputLabel="Link" {...form.getInputProps('linkForm')} inputDescription="Please provide the link." icon={<FontAwesomeIcon icon={["fal", "link"]} />} />
          <SimpleGrid cols={2} spacing="2rem" style={{ alignItems: "center" }}>
            <PrimaryButton action={deleteLink} icon={<FontAwesomeIcon icon={["fal", "trash"]} />} colour="red">Delete {link.id} Link</PrimaryButton>
            <FormSubmitButton icon={<FontAwesomeIcon icon={["fal", "pen"]} />}>Edit {link.id} Link</FormSubmitButton>
          </SimpleGrid>
      </Box>
    </Modal>
  </>
}
