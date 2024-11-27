'use client'

import FormInput from "@/app/(Components)/(Form)/FormInput";
import { FormInputReadOnly } from "@/app/(Components)/(Form)/FormInputReadOnly";
import { FormInputRow } from "@/app/(Components)/(Form)/FormInputRow";
import supabase from "@/lib/supabase";
// imp
import { MailAtSign02Icon, NewTwitterIcon, Chatting01Icon, GameController01Icon, WifiConnected02Icon, SpotifyIcon, VimeoIcon, YoutubeIcon, MusicNoteSquare02Icon, Shirt01Icon, SoundcloudIcon, Home01Icon, ArrowUpRight01Icon, IconjarIcon, TextFontIcon, AlertDiamondIcon, Delete02Icon } from "@hugeicons/react";
import { ActionIcon, Anchor, Box, Code, Divider, Group, Modal, SimpleGrid, Stack, Text } from "@mantine/core";

import { useRouter } from "next/navigation";

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"

// import { BsLink45Deg } from "react-icons/bs";
// import { BsEnvelopeAt, BsTwitterX, BsChat, BsXbox, BsBarChart, BsSpotify, BsVimeo, BsYoutube, BsLink45Deg } from "react-icons/bs";
// import { IoShirtOutline, IoLogoSoundcloud } from "react-icons/io5";
// import { SiApplemusic } from "react-icons/si";

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

interface LinkCardAdminProps {
  id: string;
  link: string;
  title: string;
  iconPrefix: any;
  iconName: any;
  subTitle: string | null | undefined;
  newIcon?: any
}

export const LinkCardAdmin = (link: LinkCardAdminProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [iconVariantSelected, setIconVariantSelected] = useState()
 
  const router = useRouter();

  const deleteLink = async () => {
    const { status: deleteStatus, error: deleteError } = await supabase.from("Links").delete().eq('id', link.id)
    deleteStatus && notifications.show({
      id: `EditLink${link.id}`,
      title: deleteStatus === 204 ? `${link.title} Deleted  🗑️` : `Error #${deleteError?.code} has Occurred`,
      message: deleteStatus === 204 ? `You have successfully deleted the ${link.title} link!` : `An error has occurred: ${deleteError?.message}. ${deleteError?.hint && `${deleteError?.hint}.`}`,
      color: deleteStatus === 204 ? "green.0" : "red",
      icon: deleteStatus === 204 ? <ArrowUpRight01Icon variant="twotone" /> : <AlertDiamondIcon variant="twotone" />,
    })
    deleteStatus === 204 && router.refresh()
  }

  const onSubmit =  async (values: any) => {
    const theIcon = new Array({
      "iconName": values.iconName,
      "iconVariant": iconVariantSelected ? iconVariantSelected : undefined,
    })

    const { status: supabaseStatus , error: supabaseError  } = await supabase.from("Links").update({ 
      iconName: values.iconName,
      newIcon: theIcon,
      title: values.title,
      subTitle: values.subTitle,
      link: values.linkForm,
      lastUpdatedOn: new Date()
    }).match({ id: link.id })
    supabaseStatus && notifications.show({
      id: `EditLink${link.id}`,
      title: `${supabaseStatus === 204 ? "Updated Link 🎉" : `Error #${supabaseError?.code} has Occurred`}`,
      message: `${supabaseStatus === 204 ? `You have successfully updated the ${link.title} link!` : `An error has occurred: ${supabaseError?.message}. ${supabaseError?.hint && `${supabaseError?.hint}.`}`}`,
      color: supabaseStatus === 204 ? "green.0" : "red",
      icon: supabaseStatus === 204 ? <ArrowUpRight01Icon variant="twotone" /> : <AlertDiamondIcon variant="twotone" />,
    })
    supabaseStatus === 204 && router.refresh()
  }

  const initialValues = {
    iconName: link.iconName,
    iconVariant: link.newIcon ? link.newIcon.iconVariant : null,
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

  const iconVariantOptions = new Array(
      {value: "stroke", label: "Default (Stroke)", disabled: true},
      {value: "twotone", label: "Twotone"},
      {value: "duotone", label: "Duotone (Filled In)"},
      {value: "solid", label: "Solid"},
      {value: "bulk", label: "Bulk"},
  )

  const icon = 
    link.iconName === "mail-at-sign-02" ? <MailAtSign02Icon variant="twotone" size="3rem" /> : 
    link.iconName === "new-twitter" ? <NewTwitterIcon variant="twotone" size="3rem" /> : 
    link.iconName === "chatting-01" ? <Chatting01Icon variant="twotone" size="3rem" /> : 
    link.iconName === "game-controller-01" ? <GameController01Icon variant="twotone" size="3rem" /> : 
    link.iconName === "wifi-connect-02" ? <WifiConnected02Icon variant="twotone" size="3rem" /> : 
    link.iconName === "spotify" ? <SpotifyIcon variant="twotone" size="3rem" /> : 
    link.iconName === "vimeo" ? <VimeoIcon variant="twotone" size="3rem" /> : 
    link.iconName === "youtube" ? <YoutubeIcon variant="twotone" size="3rem" /> : 
    link.iconName === "music-note-square-02" ? <MusicNoteSquare02Icon variant="twotone" size="3rem" /> : 
    link.iconName === "shirt-01" ? <Shirt01Icon variant="twotone" size="3rem" /> : 
    link.iconName === "soundcloud" ? <SoundcloudIcon variant="twotone" size="3rem" /> : 
    <Home01Icon /> as any
  
  return <>
    <Anchor
      key={link.id}
      onClick={open}
      c="currentColor"
      underline="never"
    >
      <Group wrap="nowrap" className={ classes.linkButton } 
        my="1.5rem"
        p="0.5rem 1.2rem"
      >
        <ActionIcon bg="none" style={{boxShadow: "none", padding: "0.6rem", margin: 0}}>{icon}</ActionIcon>
        <Stack gap="0">
          <Text c="white" mb="0" fz="1.5rem">{link.title}</Text>
          {link.subTitle ? <Text size="sm" c="dimmed" fw={300} mt="0">{link.subTitle}</Text> : null}
        </Stack>
      </Group>
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
      {link.link && <PrimaryLinkedButton primNewIcon={{name: "arrow-up-02", variant: "twotone"}} link={link.link} isExternal my="2rem">Open Link</PrimaryLinkedButton>}
      <Divider label="Edit Link" labelPosition="center" mx="3rem" my="2rem" />
      <Box p="2rem 2rem 0" component="form" onSubmit={form.onSubmit(onSubmit)}>
          <SimpleGrid cols={2} spacing="2rem">
              <FormInput inputID="iconName" inputLabel="Icon Name" {...form.getInputProps('iconName')} icon={<IconjarIcon variant="twotone" />} isRequired />
              <FormSelect inputID="iconVariant" inputLabel="Icon Variant" inputData={iconVariantOptions} {...form.getInputProps(`iconVariant`)} onChange={setIconVariantSelected} value={iconVariantSelected} clearable />
          </SimpleGrid>
          <Stack align="center" mb="2rem">
              <Code p="0.5rem" bg="var(--blackRGBA)" c="white" fz="1rem" w="100%">Please provide the icon name. You may visit <Anchor href="https://hugeicons.com/icons">https://hugeicons.com/icons</Anchor> for a list of all icons.</Code>
          </Stack>
          <SimpleGrid cols={2} spacing="2rem">
              <FormInput inputID="title" inputLabel="Link Title" {...form.getInputProps('title')} inputDescription="Please provide the link title." icon={<TextFontIcon variant="twotone" />} isRequired />
              <FormInput inputID="subTitle" inputLabel="Link Sub Title" {...form.getInputProps('subTitle')} inputDescription="Please provide the link sub title." icon={<TextFontIcon variant="twotone" />} isRequired />
          </SimpleGrid>
          <FormInput inputID="linkForm" inputLabel="Link" {...form.getInputProps('linkForm')} inputDescription="Please provide the link." icon={<ArrowUpRight01Icon variant="twotone" />} />
          <SimpleGrid cols={2} spacing="2rem" style={{ alignItems: "center" }}>
            <PrimaryButton action={deleteLink} icon={<Delete02Icon variant="twotone" />} colour="red">Delete {link.id} Link</PrimaryButton>
            <FormSubmitButton icon={<ArrowUpRight01Icon />}>Edit {link.id} Link</FormSubmitButton> 
          </SimpleGrid>
      </Box>
    </Modal>
  </>
}
