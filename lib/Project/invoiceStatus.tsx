
import HugeIcon, { IconName, IconVariant } from "@/app/(Components)/HugeIcon"

type Icons = {name: IconName, variant?: IconVariant}

interface InvoiceStatusProps {
    id: string
    smallText: string
    fullText: string|null
    colour: string|null
    icon: Icons
}

// {value: "Partial Paid", label: "Partial Paid"},
// {value: "Fully Paid", label: "Fully Paid"},
// {value: "Canceled", label: "Canceled"},
// {value: "Flagged", label: "Flagged"},

export const InvoiceStatus: Array<InvoiceStatusProps> = [
    { 
        id: 'Sent',
        smallText: 'Sent',
        fullText: null,
        colour: 'yellow',
        icon: {name: "sent", variant: "twotone"}
    },
    { 
        id: 'Seen By Client',
        smallText: 'Seen By Client',
        fullText: null,
        colour: 'yellow',
        icon: {name: "view", variant: "duotone"}
    },
    { 
        id: 'Under Review',
        smallText: 'Under Review',
        fullText: null,
        colour: 'yellow',
        icon: {name: "loading-02"}
    },
    { 
        id: 'Approved',
        smallText: 'Approved',
        fullText: null,
        colour: 'green',
        icon: {name: "document-validation", variant: "duotone"}
    },
    { 
        id: 'Declined',
        smallText: 'Declined',
        fullText: null,
        colour: 'red',
        icon: {name: "cancel-01", variant: "bulk"}
    },
    { 
        id: 'Partially Paid',
        smallText: 'Partially Paid',
        fullText: null,
        colour: 'yellow',
        icon: {name: "save-money-dollar", variant: "twotone"}
    },
    { 
        id: 'Fully Paid',
        smallText: 'Fully Paid',
        fullText: null,
        colour: 'green',
        icon: {name: "save-money-dollar", variant: "duotone"}
    },
    { 
        id: 'Canceled',
        smallText: 'Canceled',
        fullText: null,
        colour: 'black',
        icon: {name: "unavailable", variant: "bulk"}
    },
    { 
        id: 'Flagged',
        smallText: 'Flagged',
        fullText: null,
        colour: 'red',
        icon: {name: "flag-02", variant: "bulk"}
    },
]