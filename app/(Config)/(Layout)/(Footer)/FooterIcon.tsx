'use client'

import HugeIcon, { IconName, IconVariant } from "@/app/(Components)/HugeIcon";
import { ActionIcon, Anchor, Tooltip } from "@mantine/core";

interface FooterProps {
  linkURL: string
  socialMedia: string
  linkIcon: IconName
  iconPadding?: any
  iconSize?: any
  iconVariant?: IconVariant
}

export const FooterIcon = (props: FooterProps) => {
  const { linkURL, socialMedia, linkIcon, iconPadding, iconSize, iconVariant} = props
  return <Anchor href={linkURL} target="_blank">
    <Tooltip label={socialMedia}>
      <ActionIcon style={{padding: iconPadding && iconPadding}}><HugeIcon name={linkIcon} size={iconSize ? iconSize : "1.5rem"} variant={iconVariant ? iconVariant : undefined} /></ActionIcon>
    </Tooltip>
  </Anchor>
}
