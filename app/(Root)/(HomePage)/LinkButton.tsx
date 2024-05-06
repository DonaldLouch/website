import {
  Text,
  Anchor,
  Flex,
  Stack,
  ActionIcon,
  Group,
} from "@mantine/core"

import { BsBarChart, BsChat, BsEnvelopeAt, BsLink45Deg, BsSpotify, BsTwitterX, BsVimeo, BsXbox, BsYoutube } from 'react-icons/bs'
import { IoShirtOutline, IoLogoSoundcloud } from 'react-icons/io5'
import { SiApplemusic } from 'react-icons/si'

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"

interface LinkButtonProps {
  id: string
  link: string|null
  title: string
  iconPrefix: any
  iconName: any
  subTitle: string | null | undefined
}

export const LinkButton = (link: LinkButtonProps) => {
  const icon = 
  link.iconName === "BsEnvelopeAt" ? <BsEnvelopeAt size="3rem" /> : 
  link.iconName === "BsTwitterX" ? <BsTwitterX size="3rem" /> : 
  link.iconName === "BsChat" ? <BsChat size="3rem" /> : 
  link.iconName === "BsXbox" ? <BsXbox size="3rem" /> : 
  link.iconName === "BsBarChart" ? <BsBarChart size="3rem" /> : 
  link.iconName === "BsSpotify" ? <BsSpotify size="3rem" /> : 
  link.iconName === "BsVimeo" ? <BsVimeo size="3rem" /> : 
  link.iconName === "BsYoutube" ? <BsYoutube size="3rem" /> : 
  link.iconName === "SiApplemusic" ? <SiApplemusic size="3rem" /> : 
  link.iconName === "IoShirtOutline" ? <IoShirtOutline size="3rem" /> : 
  link.iconName === "IoLogoSoundcloud" ? <IoLogoSoundcloud size="3rem" /> : 
  BsLink45Deg as any

  return <Anchor
    key={link.id}
    href={link.link ? link.link : "#"}
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
}
