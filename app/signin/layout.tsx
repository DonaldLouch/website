import { ClerkProvider } from "@clerk/nextjs";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
    return <ClerkProvider>{children}</ClerkProvider>
}