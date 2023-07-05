import { ClerkProvider } from "@clerk/nextjs";
import PortalLayoutContext from "./(Layout)/PortalLayoutContext";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    // return <ClerkProvider><PortalLayoutContext>{children}</PortalLayoutContext></ClerkProvider>
    return <PortalLayoutContext>{children}</PortalLayoutContext>
}