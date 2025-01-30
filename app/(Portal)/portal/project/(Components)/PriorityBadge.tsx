'use client'

import { TaskPriority } from "@/lib/Project/taskPriority"
import { Badge } from "@mantine/core"
import HugeIcon from "@/app/(Components)/HugeIcon";

export default function PriorityBadge({priority}: any) {
    const taskPriority = TaskPriority.find(({ id }) => id === priority)

    return <Badge color={taskPriority?.colour ? taskPriority?.colour : "blue"} leftSection={taskPriority?.icon ? taskPriority?.icon : <HugeIcon name="remove-01" />}>
        {taskPriority?.text}
    </Badge>
}
