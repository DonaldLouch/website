import {
  Text,
  Link,
  Flex,
  IconButton,
  Stack,
  Icon,
} from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { BsBarChart, BsChat, BsEnvelopeAt, BsLink45Deg, BsSpotify, BsTwitterX, BsVimeo, BsXbox, BsYoutube } from 'react-icons/bs'
import { IoShirtOutline, IoLogoSoundcloud } from 'react-icons/io5'
import { SiApplemusic } from 'react-icons/si'

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
  link.iconName === "BsEnvelopeAt" ? BsEnvelopeAt : 
  link.iconName === "BsTwitterX" ? BsTwitterX : 
  link.iconName === "BsChat" ? BsChat : 
  link.iconName === "BsXbox" ? BsXbox : 
  link.iconName === "BsBarChart" ? BsBarChart : 
  link.iconName === "BsSpotify" ? BsSpotify : 
  link.iconName === "BsVimeo" ? BsVimeo : 
  link.iconName === "BsYoutube" ? BsYoutube : 
  link.iconName === "SiApplemusic" ? SiApplemusic : 
  link.iconName === "IoShirtOutline" ? IoShirtOutline : 
  link.iconName === "IoLogoSoundcloud" ? IoLogoSoundcloud : 
  BsLink45Deg

  return (
    <Link
      key={link.id}
      href={link.link ? link.link : "#"}
      isExternal
      variant="unstyled"
      _hover={{ textDecoration: "none" }}
    >
      <Flex
        color="white"
        boxShadow="bsBoldSecondary"
        my="1.5rem"
        p="1.2rem 2rem"
        borderRadius="0 2rem"
        whiteSpace="nowrap"
        overflowX="scroll"
        alignItems="center"
        justifyContent="start"
        gap="1.3rem"
        _hover={{
          boxShadow: "none",
          bg: "backgroundGradient",
          color: "white",
        }}
      >
        <Icon as={icon} boxSize="2.3rem" mr="0.5rem" />
        <Stack>
          <Text
            m="0"
            fontWeight={{ base: "300", md: "600" }}
            fontSize={{ base: "2rem", md: "1.5rem" }}
            lineHeight="0.9"
          >
            {link.title}
          </Text>
          <Text
            fontSize="1rem"
            fontWeight="400"
            wordBreak="break-word"
            color="grey"
          >
            {link.subTitle}
          </Text>
        </Stack>
      </Flex>
    </Link>
  )
}
