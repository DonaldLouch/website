'use client'

import DisplayDate from "@/lib/DisplayDate";
import { ActionIcon, Anchor, Badge, Box, Group, rem, Stack, Table, Text, Tooltip } from "@mantine/core";

import { useRouter } from "next/navigation";
import InvoiceTypeBadge from "../project/(Components)/InvoiceTypeBadge";
import PriorityBadge from "../project/(Components)/PriorityBadge";
import HugeIcon from "@/app/(Components)/HugeIcon";
import InvoiceStatusBadge from "../project/(Components)/InvoiceStatusBadge";
import CurrencyFormat from "@/lib/CurrencyFormat";

import classes from "@/app/(Components)/Components.module.css"
import moment from "moment";

export default function InvoiceRow({ invoice, isStaff }: { invoice: any, isStaff: boolean }) {   
  const invoiceID = invoice.invoiceID;

  const router = useRouter()

  function openProject() {
    router.push(`invoice/${invoiceID}`)
  }

  const currentTime = new Date()

  return <>
  <Table.Tr key={invoice.id} onClick={() => openProject()}>
    <Table.Td w="35%">
      <Stack gap="1rem" m='1rem'>
        <Group>
          <Badge color="primary" leftSection={<HugeIcon name="grid" variant="twotone" />}>
            {invoiceID}
          </Badge>
          {isStaff && <Badge color="secondary" leftSection={<HugeIcon name="id" />}>
            {invoice.client}
          </Badge>}
        </Group>

        <Group>
          <Group>
            <InvoiceTypeBadge type={invoice.invoiceType} />
            {invoice.versionNumber && 
              <Badge color="gray">
                Version {invoice.versionNumber}
              </Badge>
            }
          </Group>
          {invoice.multiple > 0 &&
            <Badge color="green">
              {invoice.multiple} Other versions available
            </Badge>
          }
        </Group>
      </Stack>
    </Table.Td>

    <Table.Td w="10%" ta="center">
      <Stack gap="0">
        <Tooltip label={invoice.createdOn ? moment(invoice.createdOn!).format("MMMM Do, YYYY [at] h:mma") : "Not Listed"}>
          <Text fz="sm" fw="600">{invoice.createdOn ? moment(invoice.createdOn!).format("MM-DD-YYYY") : "Not Listed"}</Text>
        </Tooltip>
        <Text fz="xs" c="dimmed" mt="-1rem">
          Created On
        </Text>
      </Stack>
    </Table.Td>

    <Table.Td w="10%" ta="center">
      <Stack gap="0">
        <Tooltip label={invoice.paidOn ? <DisplayDate source={invoice.paidOn} /> : invoice.dueOn ?  <DisplayDate source={invoice.dueOn} /> : "Not Listed"}>
          <Text fz="sm" fw="600" c={ !invoice.dueOn ? "white" : currentTime < new Date(invoice.dueOn) ? "green" : invoice.paidOn && new Date(invoice.paidOn) < new Date(invoice.dueOn) ? "green" :  "red" }>{invoice.paidOn ? <DisplayDate source={invoice.paidOn} format="MM-DD-YYYY" />  : invoice.dueOn ? <DisplayDate source={invoice.dueOn} format="MM-DD-YYYY" /> : "Not Listed"}</Text>
        </Tooltip>
        <Text fz="xs" c="dimmed" mt="-1rem">
          {invoice.paidOn ? "Paid On" : "Due On"}
        </Text>
      </Stack>
    </Table.Td>

    <Table.Td w="10%" ta="center">
      <Stack gap="0">
        <Text fz="sm" fw="600" c={invoice.owing > 0 ? "red" : "green"}>
          <CurrencyFormat amount={invoice.owing} />
        </Text>
        <Text fz="xs" c="dimmed" mt="-1rem">
          Left Owing
        </Text>
      </Stack>
    </Table.Td>

    <Table.Td w="15%" ta="right">
      {invoice.relatedItem &&
        <Tooltip label={`This invoice is primarily related to a ${invoice.relatedItem.type.toLowerCase()}, click on me to see the item!`}>
          <Anchor href={invoice.relatedItem.type === "Task" ? `/portal/project/${invoice.relatedItem.related}?openID=${invoice.relatedItem.id}` : `/portal/${invoice.relatedItem.type.toLowerCase()}/${invoice.relatedItem.id}`}>
            <Badge color="blue" leftSection={invoice.relatedItem.type === "Project" ? <HugeIcon name="files-01" /> : invoice.relatedItem.type === "Task" ? <HugeIcon name="task-01" /> : invoice.relatedItem.type === "Ticket" ? <HugeIcon name="ticket-01" /> : <HugeIcon name="grid" />}>
              {invoice.relatedItem.id}
            </Badge>
          </Anchor>
        </Tooltip>
      }
    </Table.Td>

    <Table.Td w="12.5%" ta="left">
      <InvoiceStatusBadge status={invoice.status} />
    </Table.Td> 

    <Table.Td w="8.5%" ta="center">
      <Tooltip label="View Invoice">
        <Stack py="1.5rem" mx="1.5rem" className={classes.actionIconDefault} style={{ borderRadius: "var(--mantine-radius-md)" }} align="center" justify="center"><HugeIcon name="view" variant="duotone" clickOption={openProject} /></Stack>
      </Tooltip>
    </Table.Td>
  </Table.Tr>
  </> 
}
