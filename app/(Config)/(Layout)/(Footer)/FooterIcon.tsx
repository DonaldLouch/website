'use client'

import { Box, Icon, IconButton, Link, Tooltip } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FooterProps {
  linkURL: string
  socialMedia: string
  linkIcon: any
}

export const FooterIcon = (props: FooterProps) => {
  const { linkURL, socialMedia, linkIcon } = props
  return (
      <Link
        href={linkURL}
        isExternal
        variant="unstyled"
        p="1rem 1rem 0.5rem"
        background="blurredPurpleRGBA"
        _hover={{ color: "primary", border: "none", background: "none" }}
        borderRadius="0 1rem"
      >
        <Tooltip label={socialMedia}>
          <Icon as={linkIcon} boxSize="1.3rem" />
        </Tooltip>
      </Link>
  )
}
