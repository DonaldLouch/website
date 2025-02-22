'use client'

import { BreadCrumb } from "@/app/(Components)/BreadCrumbsComponentPortal";
import CreateNewInvoice from "./CreateNewInvoice";
import InvoiceRow from "./InvoiceRow";
import { Alert, Table, Tabs, Title, Text } from "@mantine/core";
import HugeIcon from "@/app/(Components)/HugeIcon";

export default function Invoices({invoices, usersList, isStaff} : {invoices: any, usersList?: any, isStaff: boolean}){
  const breadCrumbs = [
    {"pageLink": null, "pageName": "Invoices"},
  ]

  return <>
    <BreadCrumb breads={breadCrumbs} />
    {isStaff && <CreateNewInvoice isStaff={isStaff} invoices={invoices} usersList={usersList} />}

    <Title mt="1.5rem" ta="center">Invoices</Title>
    {invoices.length === 0 ? <Alert variant="light" color="green" icon={<HugeIcon name="information-circle" variant="twotone"/>} mt="3rem"><Text my="0.5rem" c="white">There currently is no invoices that have been requested!</Text></Alert> : <Table stickyHeader stickyHeaderOffset={60} highlightOnHover borderColor="var(--darkPurple)" highlightOnHoverColor="var(--darkPurpleRGBA)" striped="even" stripedColor="var(--blackRGBA)" p="1rem" style={{boxShadow: "var(--mantine-shadow-bsSMSecondary)", borderRadius: "var(--mantine-radius-md)", overflow: "hidden"}} my="2rem">
      <Table.Tbody>
        {invoices.map((invoice: any) => (
          <InvoiceRow key={invoice.id} invoice={invoice} isStaff={isStaff} />
        ))}
      </Table.Tbody>
    </Table>}
  </>
}