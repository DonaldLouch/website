'use client'

import { ActionIcon, Anchor, Tooltip } from "@mantine/core";

interface FooterProps {
  linkURL: string
  socialMedia: string
  linkIcon: any
  iconPadding?: any
}

export const FooterIcon = (props: FooterProps) => {
  const { linkURL, socialMedia, linkIcon, iconPadding} = props
  return <Anchor href={linkURL} target="_blank">
    <Tooltip label={socialMedia}>
      <ActionIcon style={{padding: iconPadding && iconPadding}}>{linkIcon}</ActionIcon>
    </Tooltip>
  </Anchor>
}
