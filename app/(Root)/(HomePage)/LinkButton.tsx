import {
  Text,
  Anchor,
  Flex,
  Stack,
  ActionIcon,
  Group,
} from "@mantine/core"

// import { BsBarChart, BsChat, BsEnvelopeAt, BsLink45Deg, BsSpotify, BsTwitterX, BsVimeo, BsXbox, BsYoutube } from 'react-icons/bs'
// import { IoShirtOutline, IoLogoSoundcloud } from 'react-icons/io5'
// import { SiApplemusic } from 'react-icons/si'

import classes from "@/app/(Components)/(Buttons)/Buttons.module.css"
import { ArrowUpRight01Icon, Chatting01Icon, GameController01Icon, MailAtSign02Icon, MusicNoteSquare02Icon, NewsIcon, NewTwitterIcon, Shirt01Icon, SoundcloudIcon, SpotifyIcon, VimeoIcon, WifiConnected02Icon, YoutubeIcon } from "@hugeicons/react"
import HugeIcon, { IconName, IconVariant } from "@/app/(Components)/HugeIcon"

type Icons = {name: IconName, variant?: IconVariant}
interface LinkButtonProps {
  id: string
  link: string|null
  title: string
  iconPrefix: any
  newIcon: Icons
  subTitle: string | null | undefined
}

export const LinkButton = (link: LinkButtonProps) => {
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
      <ActionIcon bg="none" style={{boxShadow: "none", padding: "0.6rem", margin: 0}}><HugeIcon name={link.newIcon[0].name} size="3rem" variant="twotone" /></ActionIcon>
      <Stack gap="0">
        <Text c="white" mb="0" fz="1.5rem">{link.title}</Text>
        {link.subTitle ? <Text size="sm" c="dimmed" fw={300} mt="0">{link.subTitle}</Text> : null}
      </Stack>
    </Group>
  </Anchor>
}
