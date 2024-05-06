import { Icon, IconButton, Link, Tooltip } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BsFacebook, BsGithub, BsInstagram, BsLink45Deg, BsLinkedin, BsThreads, BsTiktok, BsTwitterX, BsYoutube } from "react-icons/bs"

interface LinkedButtonProps {
  id: string
  link: string
  subTitle: string | null | undefined
  title: string
  icon: any
}

export const LinkedButton = (buttonLink: LinkedButtonProps) => {
  const icon = 
  buttonLink.icon === "BsFacebook" ? BsFacebook :
  buttonLink.icon === "BsTwitterX" ? BsTwitterX :
  buttonLink.icon === "BsLinkedin" ? BsLinkedin :
  buttonLink.icon === "BsYoutube" ? BsYoutube :
  buttonLink.icon === "BsThreads" ? BsThreads :
  buttonLink.icon === "BsInstagram" ? BsInstagram :
  buttonLink.icon === "BsTiktok" ? BsTiktok :
  buttonLink.icon === "BsGithub" ? BsGithub :
BsLink45Deg
  return (
    <Link
      key={buttonLink.id}
      href={buttonLink.link}
      isExternal
      variant="unstyled"
      _hover={{ textDecoration: "none" }}
    >
      <Tooltip label={buttonLink.subTitle}>
        {/* <IconButton
          aria-label={`${buttonLink.title} Link`}
          variant="unstyled"
          h="auto"
          fontSize="4xl"
          _hover={{ color: "primary" }}
          icon={<FontAwesomeIcon icon={["fab", buttonLink.icon]} />}
        /> */}
        <Icon as={icon} boxSize="3rem" />
      </Tooltip>
    </Link>
  )
}
