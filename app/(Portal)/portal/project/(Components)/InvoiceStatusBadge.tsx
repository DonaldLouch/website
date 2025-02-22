'use client'

import { InvoiceStatus } from "@/lib/Project/invoiceStatus"
import { Badge, Tooltip } from "@mantine/core"
import HugeIcon from "@/app/(Components)/HugeIcon";

export default function InvoiceStatusBadge({status}: any) {
    const invoiceStatus = InvoiceStatus.find(({ id }) => id === status)
    
    return <Tooltip label={invoiceStatus?.fullText ? invoiceStatus?.fullText : invoiceStatus?.smallText}>
        <Badge color={invoiceStatus?.colour ? invoiceStatus?.colour : "blue"} leftSection={<HugeIcon name={invoiceStatus.icon.name ? invoiceStatus.icon.name : "loading-03"} variant={invoiceStatus.icon.variant ? invoiceStatus.icon.variant : "twotone"} />}>
            {invoiceStatus?.fullText ? invoiceStatus?.fullText : invoiceStatus?.smallText}
        </Badge>
    </Tooltip>
}
