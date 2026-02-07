// "use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Anchor, Badge } from "@mantine/core"

export default function LinkBadge({linkName, link, linkType, linkIcon}: {linkName: string, link: string, linkType: string, linkIcon: any}) {
    const iconName = 
        linkIcon.name ? linkIcon.name 
        : !linkIcon.name && linkType.includes("ex") ? "arrow-up-right"
        : !linkIcon.name && linkType.includes("in") ? "arrow-up-right-from-square"
        : "link"

    return <Anchor href={link} key={link} target={linkType === "exLink" ? "_blank" : "_self"} m="0"><Badge color="blue" leftSection={linkIcon 
        ? <FontAwesomeIcon icon={[linkIcon.pack || "fadl", iconName]} size="lg" /> 
        : <FontAwesomeIcon icon={["fadl", "link"]} size="lg" />
    }>
        {linkName}
    </Badge></Anchor>
}
