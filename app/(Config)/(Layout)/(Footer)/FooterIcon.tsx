'use client'

import HugeIcon, { IconName, IconVariant } from "@/app/(Components)/HugeIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Anchor, Tooltip } from "@mantine/core";

interface FooterProps {
  linkURL: string
  socialMedia: string
  linkIcon: any
  iconPadding?: any
  iconSize?: any
  iconVariant?: any
}

export const FooterIcon = (props: FooterProps) => {
  const { linkURL, socialMedia, linkIcon, iconPadding, iconSize, iconVariant} = props
  return <Anchor href={linkURL} target="_blank">
    <Tooltip label={socialMedia}>
      <ActionIcon style={{padding: iconPadding && iconPadding}}>
        {
          iconVariant?.includes("fa")
          ? <FontAwesomeIcon icon={[iconVariant || "far", linkIcon]} size="1x" />
          : <HugeIcon name={linkIcon} size={iconSize || "1.5rem"} variant={iconVariant || undefined} />
        }
      </ActionIcon>
    </Tooltip>
  </Anchor>
}
