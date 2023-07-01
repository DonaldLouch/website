import { IconButton, Link, Tooltip } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface LinkedButtonProps {
  id: string
  link: string
  subTitle: string | null | undefined
  title: string
  icon: any
}

export const LinkedButton = (buttonLink: LinkedButtonProps) => {
  return (
    <Link
      key={buttonLink.id}
      href={buttonLink.link}
      isExternal
      variant="unstyled"
      _hover={{ textDecoration: "none" }}
    >
      <Tooltip label={buttonLink.subTitle}>
        <IconButton
          aria-label={`${buttonLink.title} Link`}
          variant="unstyled"
          h="auto"
          fontSize="4xl"
          _hover={{ color: "primary" }}
          icon={<FontAwesomeIcon icon={["fab", buttonLink.icon]} />}
        />
      </Tooltip>
    </Link>
  )
}
