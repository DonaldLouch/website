
import HugeIcon, { IconName, IconVariant } from "@/app/(Components)/HugeIcon"

type Icons = {name: IconName, variant?: IconVariant}

interface ProjectStatusProps {
    id: string
    smallText: string
    fullText: string|null
    colorScheme: string|null
    icon: Icons
}

export const ProjectStatus: Array<ProjectStatusProps> = [
    { 
        id: 'SUBMITTED',
        smallText: 'Submitted',
        fullText: null,
        colorScheme: 'yellow',
        icon: {name: "sent", variant: "twotone"}
    },
    { 
        id: 'REVIEWING',
        smallText: 'Reviewing',
        fullText: null,
        colorScheme: 'yellow',
        icon: {name: "view", variant: "twotone"}
    },
    { 
        id: 'INPROGRESS',
        smallText: 'In Progress',
        fullText: null,
        colorScheme: 'yellow',
        icon: {name: "loading-02", variant: "twotone"}
    },

    { 
        id: 'REVIEWED',
        smallText: 'Reviewed',
        fullText: null,
        colorScheme: 'green',
        icon: {name: "job-search", variant: "twotone"}
    },
    { 
        id: 'OPENED',
        smallText: 'Opened',
        fullText: null,
        colorScheme: 'green',
        icon: {name: "ticket-01", variant: "twotone"}
    },
    { 
        id: 'COMPLETED',
        smallText: 'Completed',
        fullText: null,
        colorScheme: 'green',
        icon: {name: "checkmark-badge-03", variant: "twotone"}
    },
    { 
        id: 'APPROVED',
        smallText: 'Approved',
        fullText: null,
        colorScheme: 'green',
        icon: {name: "document-validation", variant: "twotone"}
    },
    
    { 
        id: 'AWAITINGC',
        smallText: 'Awaiting: C',
        fullText: 'Awaiting: Customer',
        colorScheme: 'teal',
        icon: {name: "user", variant: "twotone"}
    },
    
    { 
        id: 'AWAITINGA',
        smallText: 'Awaiting: A',
        fullText: 'Awaiting: Administrator',
        colorScheme: 'white',
        icon: {name: "user-shield-01", variant: "twotone"}
    },
    
    { 
        id: 'STALLED',
        smallText: 'Stalled',
        fullText: null,
        colorScheme: 'black',
        icon: {name: "traffic-light", variant: "twotone"}
    },
    { 
        id: 'CLOSED',
        smallText: 'Closed',
        fullText: null,
        colorScheme: 'black',
        icon: {name: "cancel-01", variant: "twotone"}
    },
    { 
        id: 'DECLINED',
        smallText: 'Declined',
        fullText: null,
        colorScheme: 'red',
        icon: {name: "cancel-01", variant: "twotone"}
    },
    { 
        id: 'OTHER',
        smallText: 'Other',
        fullText: null,
        colorScheme: 'blue',
        icon: {name: "loading-03", variant: "twotone"}
    }
]