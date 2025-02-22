'use client'

import { Badge } from "@mantine/core"
import HugeIcon from "@/app/(Components)/HugeIcon";
import { InvoiceType } from "@/lib/Project/invoiceType";

export default function InvoiceTypeBadge({type}: any) {
    const invoiceType = InvoiceType.find(({ id }) => id === type)

    return <Badge color={invoiceType?.colour ? invoiceType?.colour : "blue"} leftSection={
        <HugeIcon name={invoiceType?.icon.name ? invoiceType.icon.name : "invoice-01"} variant={invoiceType?.icon.variant ? invoiceType?.icon.variant : "twotone"} />
    }>
        {invoiceType?.id}
    </Badge>
}
