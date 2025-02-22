import { isUserSignedIn, userList, userRole, userData } from "@/app/actions/clerk"
import Invoices from "./Invoices"
import supabase from "@/lib/supabase"

export default async function InvoicesPage() {
    const isUser = await isUserSignedIn()
    const role = await userRole()
    const isAdmin = isUser && role === "admin" ? true : false
    const isMod = isUser && role === "moderator" ? true : false
    const isStaff = isAdmin || isMod

    const { userId } = await userData()

    const { data: invoicesData } = isAdmin 
        ? await supabase.from('Invoices').select().order('createdOn', { ascending: false }) as any 
        : await supabase.from('Invoices').select().match({ client: userId }).order('createdOn', { ascending: false }) as any

    const invoicesArray = new Map()
    invoicesData.forEach((invoice: any) => {
        const invoiceID = invoice.invoiceID

        const count = invoicesData.filter((inv: any) => inv.id.includes(invoiceID)).length - 1

        if (!invoicesArray.has(invoiceID) || new Date(invoice.createdOn) > new Date(invoicesArray.get(invoiceID).createdOn)) {
            invoicesArray.set(invoiceID, { ...invoice, multiple: count, invoiceID })
        }
    })

    const invoices = Array.from(invoicesArray.values())

    const usersList = await userList().then((res) => JSON.parse(JSON.stringify(res)))

    return <Invoices isStaff={isStaff} invoices={invoices} usersList={usersList.data} />
}