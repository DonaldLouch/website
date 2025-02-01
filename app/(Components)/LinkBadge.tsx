'use client'

import { Anchor, Badge } from "@mantine/core"
import HugeIcon, { IconName, IconVariant } from "@/app/(Components)/HugeIcon"

type Icons = {name: IconName, variant?: IconVariant}

export default function LinkBadge({linkName, link, linkType, linkIcon}: {linkName: string, link: string, linkType: string, linkIcon: Icons}) {
    const iconName = 
        linkIcon.name ? linkIcon.name 
        : !linkIcon.name && linkType.includes("ex") ? "arrow-up-right-01"
        : !linkIcon.name && linkType.includes("in") ? "link-square-02"
        : "link-04"

    return <Anchor href={link} key={link} target={linkType === "exLink" ? "_blank" : "_self"} m="0"><Badge color="blue" leftSection={linkIcon ? <HugeIcon name={iconName} variant={linkIcon.variant ? linkIcon.variant : undefined} /> : <HugeIcon name="link-04" />}>
        {linkName}
    </Badge></Anchor>
}
