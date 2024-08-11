import { Cancel01Icon, CheckmarkBadge03Icon, DocumentValidationIcon, JobSearchIcon, Loading02Icon, Loading03Icon, SentIcon, Tick01Icon, TrafficLightIcon, UserIcon, UserShield01Icon, ViewIcon } from "@hugeicons/react"

interface ProjectStatusProps {
    id: string
    smallText: string
    fullText: string|null
    colorScheme: string|null
    icon: any
}

export const ProjectStatus: Array<ProjectStatusProps> = [
    { 
        id: 'SUBMITTED',
        smallText: 'Submitted',
        fullText: null,
        colorScheme: 'yellow',
        icon: <SentIcon variant="twotone" />
    },
    { 
        id: 'REVIEWING',
        smallText: 'Reviewing',
        fullText: null,
        colorScheme: 'yellow',
        icon: <ViewIcon variant="twotone" />
    },
    { 
        id: 'INPROGRESS',
        smallText: 'In Progress',
        fullText: null,
        colorScheme: 'yellow',
        icon: <Loading02Icon variant="twotone" />
    },

    { 
        id: 'REVIEWED',
        smallText: 'Reviewed',
        fullText: null,
        colorScheme: 'green',
        icon: <JobSearchIcon variant="twotone" />
    },
    { 
        id: 'OPENED',
        smallText: 'Opened',
        fullText: null,
        colorScheme: 'green',
        icon: <Tick01Icon variant="twotone" />
    },
    { 
        id: 'COMPLETED',
        smallText: 'Completed',
        fullText: null,
        colorScheme: 'green',
        icon: <CheckmarkBadge03Icon variant="twotone" />
    },
    { 
        id: 'APPROVED',
        smallText: 'Approved',
        fullText: null,
        colorScheme: 'green',
        icon: <DocumentValidationIcon variant="twotone" />
    },
    
    { 
        id: 'AWAITINGC',
        smallText: 'Awaiting: C',
        fullText: 'Awaiting: Customer',
        colorScheme: 'teal',
        icon: <UserIcon variant="twotone" />
    },
    
    { 
        id: 'AWAITINGA',
        smallText: 'Awaiting: A',
        fullText: 'Awaiting: Administrator',
        colorScheme: 'white',
        icon: <UserShield01Icon variant="twotone" />
    },
    
    { 
        id: 'STALLED',
        smallText: 'Stalled',
        fullText: null,
        colorScheme: 'black',
        icon: <TrafficLightIcon variant="twotone" />
    },
    { 
        id: 'CLOSED',
        smallText: 'Closed',
        fullText: null,
        colorScheme: 'black',
        icon: <Cancel01Icon variant="twotone" />
    },
    { 
        id: 'DECLINED',
        smallText: 'Declined',
        fullText: null,
        colorScheme: 'red',
        icon: <Cancel01Icon variant="twotone" />
    },
    { 
        id: 'OTHER',
        smallText: 'Other',
        fullText: null,
        colorScheme: 'blue',
        icon: <Loading03Icon variant="twotone" />
    }
]