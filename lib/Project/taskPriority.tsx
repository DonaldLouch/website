import HugeIcon, { IconName, IconVariant } from "@/app/(Components)/HugeIcon"

type Icons = {name: IconName, variant?: IconVariant}
interface TaskPriorityProps {
    id: string
    text: string
    colour?: string
    icon?: Icons
}

export const TaskPriority: Array<TaskPriorityProps> = [
    { 
        id: 'LOW',
        text: 'Low',
        colour: 'blue',
        icon: {name: "arrow-down-02", variant: "twotone"}
    },
    { 
        id: 'MEDIUM',
        text: 'Medium',
        colour: 'orange',
        icon: {name: "arrow-left-02", variant: "twotone"}
    },
    { 
        id: 'HIGH',
        text: 'High',
        colour: 'red',
        icon: {name: "arrow-up-02", variant: "twotone"}
    },
    { 
        id: 'CRITICAL',
        text: 'Critical',
        colour: 'pink',
        icon: {name: "arrow-up-02", variant: "twotone"}
    },
    { 
        id: 'URGENT',
        text: 'Urgent',
        colour: 'primary',
        icon: {name: "alert-diamond", variant: "twotone"}
    },
]