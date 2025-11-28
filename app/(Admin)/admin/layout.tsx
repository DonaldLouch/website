import AdminLayoutContext from "../(Layout)/AdminLayoutContext";
import { AdminAccessOnly } from "@/app/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const isAdmin = await AdminAccessOnly({redirectDisabled: false})

    return <AdminLayoutContext isAdmin={isAdmin}>{children}</AdminLayoutContext>
}