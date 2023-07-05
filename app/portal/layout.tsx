import PortalLayoutContext from "./(Layout)/PortalLayoutContext";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return <PortalLayoutContext>{children}</PortalLayoutContext>
}