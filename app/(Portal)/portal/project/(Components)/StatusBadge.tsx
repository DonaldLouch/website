'use client'

import { ProjectStatus } from "@/lib/Project/projectStatus"
import { Loading03Icon } from "@hugeicons/react"
import { Badge, Tooltip } from "@mantine/core"

export default function StatusBadge({status}: any) {
    const projectStatus = ProjectStatus.find(({ id }) => id === status)
    
    return <Tooltip label={projectStatus?.fullText ? projectStatus?.fullText : projectStatus?.smallText}>
        <Badge color={projectStatus?.colorScheme ? projectStatus?.colorScheme : "blue"} leftSection={projectStatus?.icon ? projectStatus?.icon : <Loading03Icon variant="twotone" />}>
            {projectStatus?.fullText ? projectStatus?.fullText : projectStatus?.smallText}
        </Badge>
    </Tooltip>
}
