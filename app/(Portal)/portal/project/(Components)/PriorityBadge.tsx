'use client'

import { TaskPriority } from "@/lib/Project/taskPriority"
import { Remove01Icon } from "@hugeicons/react"
import { Badge } from "@mantine/core"

export default function PriorityBadge({priority}: any) {
    const taskPriority = TaskPriority.find(({ id }) => id === priority)

    return <Badge color={taskPriority?.colour ? taskPriority?.colour : "blue"} leftSection={taskPriority?.icon ? taskPriority?.icon : <Remove01Icon />}>
        {taskPriority?.text}
    </Badge>
}
