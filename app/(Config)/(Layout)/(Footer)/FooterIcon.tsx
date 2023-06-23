'use client'

import { Box, IconButton, Link, Tooltip } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FooterProps {
  linkURL: string
  socialMedia: string
  linkIcon: any
}

export const FooterIcon = (props: FooterProps) => {
  const { linkURL, socialMedia, linkIcon } = props
  return (
    <Box>
      <Link
        href={linkURL}
        isExternal
        variant="unstyled"
        _hover={{ color: "primary", border: "none" }}
        px="0.2rem"
      >
        <Tooltip label={socialMedia}>
          <IconButton
            aria-label={`${socialMedia} Link`}
            variant="unstyled"
            h="auto"
            fontSize="4xl"
            icon={<FontAwesomeIcon icon={["fab", linkIcon]}/>}
          />
        </Tooltip>
      </Link>
    </Box>
  )
}
