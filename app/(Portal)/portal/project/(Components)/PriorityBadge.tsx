'use client'

import { TaskPriority } from "@/lib/Project/taskPriority"
import { Badge } from "@mantine/core"
import HugeIcon from "@/app/(Components)/HugeIcon";

export default function PriorityBadge({priority}: any) {
    const taskPriority = TaskPriority.find(({ id }) => id === priority)

    return <Badge color={taskPriority?.colour ? taskPriority?.colour : "blue"} leftSection={
        <HugeIcon name={taskPriority.icon.name ? taskPriority.icon.name : "remove-01"} variant={taskPriority.icon.variant ? taskPriority.icon.variant : "twotone"} />
    }>
        {taskPriority?.text}
    </Badge>
}
