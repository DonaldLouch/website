'use client'

import { ProjectStatus } from "@/lib/Project/projectStatus"
import { Badge, Tooltip } from "@mantine/core"
import HugeIcon from "@/app/(Components)/HugeIcon";

export default function StatusBadge({status}: any) {
    const projectStatus = ProjectStatus.find(({ id }) => id === status)
    
    return <Tooltip label={projectStatus?.fullText ? projectStatus?.fullText : projectStatus?.smallText}>
        <Badge color={projectStatus?.colorScheme ? projectStatus?.colorScheme : "blue"} leftSection={projectStatus?.icon ? projectStatus?.icon : <HugeIcon name="loading-03" variant="twotone" />}>
            {projectStatus?.fullText ? projectStatus?.fullText : projectStatus?.smallText}
        </Badge>
    </Tooltip>
}
