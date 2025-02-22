"use client"

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponentPortal"
import { Anchor, AspectRatio, Badge, Box, Divider, Grid, Group, SimpleGrid, Stack, Table, Text, Title, Tooltip } from "@mantine/core"
import InvoiceTypeBadge from "../project/(Components)/InvoiceTypeBadge"
import InvoiceStatusBadge from "../project/(Components)/InvoiceStatusBadge"
import CodeBlock from "@/app/(Components)/(MarkdownCode)/CodeBlock"
import HugeIcon from "@/app/(Components)/HugeIcon"
import moment from "moment"
import DisplayDate from "@/lib/DisplayDate"
import CurrencyFormat from "@/lib/CurrencyFormat"

export default function Invoice({invoices, isAdmin, clientInfo}: any) {
  console.log(invoices,clientInfo)

  const latestInvoice = invoices[0]
  const count = invoices.length

  const breadCrumbs = [
    {"pageLink": "/portal/invoices", "pageName": "Invoices"},
    {"pageLink": null, "pageName": `#${latestInvoice.invoiceID}`},
  ]

  const currentTime = new Date()

  return (
    <Box>
        <BreadCrumb breads={breadCrumbs} />
        <Group>
          <Title order={2}>Invoice: {latestInvoice.invoiceID}</Title>
          <InvoiceTypeBadge type={latestInvoice.invoiceType} />    
          {latestInvoice.versionNumber && 
              <Badge color="gray">
                Version {latestInvoice.versionNumber}
              </Badge>
            }
            {count > 1 &&
              <Badge color="blue">
                {count} Versions Available
              </Badge>
            }
            <InvoiceStatusBadge status={latestInvoice.status} />
            <Tooltip label={`This invoice was created at ${moment(latestInvoice.createdOn).format("h:mma")}`}>
              <Badge color="primary" leftSection={<HugeIcon name="calendar-03" />}>
                Created on <DisplayDate source={latestInvoice.createdOn} format="MMM Do, YYYY, h:mma" />
              </Badge>
            </Tooltip>
            {(latestInvoice.dueOn || latestInvoice.paidOn) && (
              <Tooltip label={`This invoice ${latestInvoice.paidOn ? "was paid on" : "is due at"} ${moment(latestInvoice.dueOn).format("h:mma")}`}>
                <Badge color={!latestInvoice.dueOn ? "black" : currentTime < new Date(latestInvoice.dueOn) ? "green" : latestInvoice.paidOn && new Date(latestInvoice.paidOn) < new Date(latestInvoice.dueOn) ? "green" :  "red"} leftSection={<HugeIcon name="calendar-03" />}>
                  {latestInvoice.paidOn ? "Paid" : "Due"} on <DisplayDate source={latestInvoice.paidOn ? latestInvoice.paidOn : latestInvoice.dueOn} format="MMM Do, YYYY, h:mma" />
                </Badge>
              </Tooltip>
            )}
            {latestInvoice.relatedItem &&
              <Tooltip label={`This invoice is primarily related to a ${latestInvoice.relatedItem.type.toLowerCase()}, click on me to see the item!`}>
                <Anchor href={latestInvoice.relatedItem.type === "Task" ? `/portal/project/${latestInvoice.relatedItem.related}?openID=${latestInvoice.relatedItem.id}` : `/portal/${latestInvoice.relatedItem.type.toLowerCase()}/${latestInvoice.relatedItem.id}`}>
                  <Badge color="blue" leftSection={latestInvoice.relatedItem.type === "Project" ? <HugeIcon name="files-01" /> : latestInvoice.relatedItem.type === "Task" ? <HugeIcon name="task-01" /> : latestInvoice.relatedItem.type === "Ticket" ? <HugeIcon name="ticket-01" /> : <HugeIcon name="grid" />}>
                    {latestInvoice.relatedItem.id}
                  </Badge>
                </Anchor>
              </Tooltip>
            }
            {isAdmin && <Text>EDIT</Text>}   
        </Group>
        <Divider mt="1rem" opacity={0.3} />
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: "1rem", md: "5rem" }}>
          <Stack p="2rem" mt="2rem !important" style={{ boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)" }}>
            <Title order={2} size="2xl" td="underline" fw="900" ta="center" my="1rem">Billed To</Title>
            <Stack m="0" gap="0.5rem">
              <Tooltip label={clientInfo.name}>
                <Group>
                  <Title order={3} fz="2xl" fw="900" lineClamp={1}>{clientInfo.name}</Title>
                  {isAdmin && 
                    <Badge color="secondary" leftSection={<HugeIcon name="id" />}>
                      {clientInfo.id}
                    </Badge>
                  }
                </Group>
              </Tooltip>
              <Group c="white" wrap="nowrap">
                <HugeIcon name="mail-at-sign-01" />
                {isAdmin ? 
                  <Tooltip label="Email client">
                    <Anchor href={`mailto:${clientInfo.firstName} ${clientInfo.lastName}<${clientInfo.email}>?subject=RE: Invoice ${latestInvoice.id}`} c="var(--secondary)" underline="hover" m="inherit"><Text lineClamp={1}>{clientInfo.email}</Text></Anchor>
                  </Tooltip> : 
                  <Text lineClamp={1}>{clientInfo.email}</Text>
                }
              </Group>
              {clientInfo.phoneNumber &&
                <Group c="white" wrap="nowrap">
                  <HugeIcon name="smart-phone-01" />
                  <Text lineClamp={1}>{clientInfo.phoneNumber}</Text>
                </Group>
              }
              {clientInfo.address.city &&
                <Group c="white" wrap="nowrap">
                  <HugeIcon name="map-pinpoint-01" />
                  {isAdmin ? 
                    <Tooltip label={`It's ${moment().tz(clientInfo.address.timezone).format("MMMM Do, YYYY, h:mma (z)")} for the client right now!`}>
                      <Text lineClamp={1}>{clientInfo.address ? `${clientInfo.address.city}, ${clientInfo.address.province}, ${clientInfo.address.country}` : 'Address not available'}</Text>
                    </Tooltip> : 
                    <Text lineClamp={1}>{clientInfo.address.city}, {clientInfo.address.province}, {clientInfo.address.country}</Text>
                  }
                </Group>
              }
            </Stack>
          </Stack>
          <Stack p="2rem" mt="2rem !important" style={{ boxShadow: "var(--mantine-shadow-bsBoldPrimary)", borderRadius: "var(--mantine-radius-md)" }}>
              <Title order={2} size="2xl" td="underline" fw="900" ta="center" my="1rem">Billing From</Title>
            <Stack m="0" gap="0.5rem" align="flex-end">
              <Group c="white" wrap="nowrap">
                <Title order={3} fz="2xl" fw="900" lineClamp={1}>Donald Louch</Title>
              </Group>
              <Group c="white" wrap="nowrap">
                {isAdmin ? 
                  <Text lineClamp={1}>{process.env.NEXT_PUBLIC_EMAIL}</Text>
                  : <Tooltip label="Email Donald for help with the invoice">
                    <Anchor href={`mailto:Donald Louch<${process.env.NEXT_PUBLIC_EMAIL}>?subject=RE: Invoice ${latestInvoice.id}`} c="var(--secondary)" underline="hover" m="inherit"><Text lineClamp={1}>{process.env.NEXT_PUBLIC_EMAIL}</Text></Anchor>
                  </Tooltip>
                }
                <HugeIcon name="mail-at-sign-01" />
              </Group>
              <Group c="white" wrap="nowrap">
                <Tooltip label={`It's ${moment().tz("America/Vancouver").format("MMMM Do, YYYY, h:mma (z)")} for Donald Louch right now!`}>
                  <Text lineClamp={1}>Available Upon Request</Text>
                </Tooltip>
                <HugeIcon name="smart-phone-01" />
              </Group>
              <Group c="white" wrap="nowrap">
                <Text lineClamp={1}>{process.env.NEXT_PUBLIC_ADDRESS}</Text>
                <HugeIcon name="map-pinpoint-01" />
              </Group>
            </Stack>
          </Stack>
        </SimpleGrid>
        <Text c={latestInvoice.owing > 0 ? "red" : "red"} fw="900" ta="center" my="2rem">
          {latestInvoice.owing > 0 ? "You still owe " : "You have fully paid off the invoice!"}
          {latestInvoice.owing > 0 && <CurrencyFormat amount={latestInvoice.owing} />}{latestInvoice.dueOn ? ` which is due on ${moment(latestInvoice.dueOn!).tz(clientInfo.address.timezone || "America/Vancouver").format("MMMM Do, YYYY [at] h:mma")}.` : "."}
        </Text>
          <Table tabularNums stickyHeader stickyHeaderOffset={30} highlightOnHover borderColor="var(--darkPurple)" highlightOnHoverColor="var(--darkPurpleRGBA)" striped="even" stripedColor="var(--blackRGBA)" p="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)"}} my="2rem">
            <Table.Thead bg="var(--darkPurple)">
              <Table.Tr lh="3rem">
                <Table.Th w="10%" ta="center">Quantity</Table.Th>
                <Table.Th w="70%">Name</Table.Th>
                <Table.Th w="10%" ta="center">Price</Table.Th>
                <Table.Th w="10%" ta="center">Total</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {latestInvoice.items.map((invoice: any, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td w="10%" ta="center">
                    <Tooltip label={`${invoice.quantity} ${invoice.type}`}>
                      <Text>{invoice.quantity}</Text>
                    </Tooltip>
                  </Table.Td>
                  <Table.Td w="70vw">
                    {invoice.name.type === "Custom" ?
                    <Badge color="white">
                      {invoice.name.id}
                    </Badge>: 
                      <Tooltip label={`This is related to a ${invoice.name.type.toLowerCase()}, click on me to see the item!`}>
                        <Anchor href={invoice.name.type === "Task" ? `/portal/project/${invoice.name.related}?openID=${invoice.name.id}` : `/portal/${invoice.name.type.toLowerCase()}/${invoice.name.id}`}>
                          <Badge color="blue" leftSection={invoice.name.type === "Project" ? <HugeIcon name="files-01" /> : invoice.name.type === "Task" ? <HugeIcon name="task-01" /> : invoice.name.type === "Ticket" ? <HugeIcon name="ticket-01" /> : <HugeIcon name="grid" />}>
                            {invoice.name.id}
                          </Badge>
                        </Anchor>
                      </Tooltip>
                    }
                  </Table.Td>
                  <Table.Td w="10%" ta="center">
                    <Text><CurrencyFormat amount={invoice.price} /></Text>
                  </Table.Td>
                  <Table.Td w="10%" ta="center">
                    <Text><CurrencyFormat amount={invoice.total} /></Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Grid gutter="5rem">
            <Grid.Col span={9.5}>
              <Stack style={{ boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)", overflow: "scroll" }} h="100%" w="100%" mah="40vh" p="2rem">
                <Title order={3}>Notes:</Title>
                <Text>{latestInvoice.notes || "There are no notes for this invoice!"}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={2.5}>
              <Table tabularNums stickyHeader stickyHeaderOffset={30} highlightOnHover borderColor="var(--darkPurple)" highlightOnHoverColor="var(--darkPurpleRGBA)" striped="even" stripedColor="var(--blackRGBA)" p="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)"}} my="2rem">
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td ta="right">
                      <Text fw="900">Sub Total</Text>
                    </Table.Td>
                    <Table.Td  ta="left">
                      <Text><CurrencyFormat amount={latestInvoice.subTotal} /></Text>
                    </Table.Td>
                  </Table.Tr>
                {latestInvoice.discounts ?
                    <Table.Tr>
                      <Table.Td ta="right">
                        <Text fw="900">Discounts</Text>
                      </Table.Td>
                      <Table.Td  ta="left">
                        <Text c="green">-<CurrencyFormat amount={latestInvoice.discounts} /></Text>
                      </Table.Td>
                    </Table.Tr> : null}
                  <Table.Tr>
                    <Table.Td ta="right">
                      <Text fw="900">Total</Text>
                    </Table.Td>
                    <Table.Td ta="left">
                      <Text><CurrencyFormat amount={latestInvoice.total} /></Text>
                    </Table.Td>
                  </Table.Tr>

                  {latestInvoice.paid ?
                    <Table.Tr>
                      <Table.Td ta="right">
                        <Text fw="900">Paid</Text>
                      </Table.Td>
                      <Table.Td  ta="left">
                        <Text><CurrencyFormat amount={latestInvoice.paid} /></Text>
                      </Table.Td>
                    </Table.Tr> : null}


                  <Table.Tr>
                    <Table.Td ta="right">
                      <Text fw="900">Owing</Text>
                    </Table.Td>
                    <Table.Td  ta="left">
                      <Text c={latestInvoice.owing > 0 ? "red" : "green"} fw="900"><CurrencyFormat amount={latestInvoice.owing} /></Text>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </Grid.Col>
          </Grid>
          <Text>Payment History Coming Soon!</Text>
          <Text>Payment Coming Soon!</Text>
          <Text>Related Invoices Coming Soon!</Text>
    </Box>
  )
}
