import { AlertDiamondIcon, ArrowDown02Icon, ArrowLeft02Icon, ArrowRight02Icon, ArrowUp02Icon } from "@hugeicons/react"

interface TaskPriorityProps {
    id: string
    text: string
    colour?: string
    icon?: any
}

export const TaskPriority: Array<TaskPriorityProps> = [
    { 
        id: 'LOW',
        text: 'Low',
        colour: 'blue',
        icon: <ArrowDown02Icon variant="twotone" />
    },
    { 
        id: 'MEDIUM',
        text: 'Medium',
        colour: 'orange',
        icon: <ArrowLeft02Icon variant="twotone" />
    },
    { 
        id: 'HIGH',
        text: 'High',
        colour: 'red',
        icon: <ArrowUp02Icon variant="twotone" />
    },
    { 
        id: 'CRITICAL',
        text: 'Critical',
        colour: 'pink',
        icon: <ArrowRight02Icon variant="twotone" />
    },
    { 
        id: 'URGENT',
        text: 'Urgent',
        colour: 'primary',
        icon: <AlertDiamondIcon variant="twotone" />
    },
]