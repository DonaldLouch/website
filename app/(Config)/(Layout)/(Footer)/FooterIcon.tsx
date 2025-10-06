'use client'

import type { Icons } from "@/lib/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Anchor, Tooltip } from "@mantine/core";

interface FooterProps {
  linkURL: string
  socialMedia: string
  icon?: Icons
  iconPadding?: any
  iconSize?: any
}

export const FooterIcon = (props: FooterProps) => {
  const { linkURL, socialMedia, icon, iconPadding, iconSize } = props

  return <Anchor href={linkURL} target="_blank">
    <Tooltip label={socialMedia}>
      <ActionIcon style={{padding: iconPadding && iconPadding}}>
        {icon && <FontAwesomeIcon icon={[icon.pack || "fal", icon.name]} size={iconSize || "1x"} />}
      </ActionIcon>
    </Tooltip>
  </Anchor>
}
