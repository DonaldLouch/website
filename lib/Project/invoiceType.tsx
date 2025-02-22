
import HugeIcon, { IconName, IconVariant } from "@/app/(Components)/HugeIcon"

type Icons = {name: IconName, variant?: IconVariant}

interface InvoiceTypeProps {
    id: string
    colour: string|null
    icon: Icons
}

export const InvoiceType: Array<InvoiceTypeProps> = [
    { 
        id: 'Proposed',
        colour: 'orange',
        icon: {name: "license-draft", variant: "twotone"}
    },
    { 
        id: 'Official',
        colour: 'green',
        icon: {name: "document-validation"}
    },
    { 
        id: 'Final',
        colour: 'green',
        icon: {name: "invoice-02", variant: "duotone"}
    },
]