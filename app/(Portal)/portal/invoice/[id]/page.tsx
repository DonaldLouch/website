import supabase from "@/lib/supabase"
import Invoice from "../Invoice"
import { userData, userLookup, userRole } from "@/app/actions/clerk"
import { redirect } from "next/navigation"

// const params = await props.params
type Params = Promise<{ id: string }>

export default async function InvoicePage({ params }: { params: Params }) {
  const { userId } = await userData()

  const role = await userRole()
  const isAdmin = role === "admin" ? true : false

  const { id } = await params
  const { data: invoices } = await supabase.from('Invoices').select(`*`).match({invoiceID: id}).order("lastUpdatedOn", {ascending: true}) as any

  !isAdmin && invoices[0].client !== userId && redirect(`/portal/invoices?error=unauthorized&id=${id}`)

  const client = await userLookup(invoices[0].client)

  if (invoices[0].status === "Sent" && invoices[0].client === userId) {
    await supabase.from("Invoices").update({ 
        status: "Seen By Client",
        lastUpdatedOn: new Date()
    }).eq('id', invoices[0].id)
  }
  return (
    <Invoice invoices={invoices} clientInfo={client} isAdmin={isAdmin} />
  )
}
