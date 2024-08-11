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
import { ArrowUpRight01Icon, Chatting01Icon, GameController01Icon, MailAtSign02Icon, MusicNoteSquare02Icon, NewTwitterIcon, Shirt01Icon, SoundcloudIcon, SpotifyIcon, VimeoIcon, WifiConnected02Icon, YoutubeIcon } from "@hugeicons/react"

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
  <ArrowUpRight01Icon variant="twotone" size="3rem" /> as any

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
