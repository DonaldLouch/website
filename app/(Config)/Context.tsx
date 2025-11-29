'use client'

import "@/lib/FontAwesome"
import { usePathname } from "next/navigation"
import MaintenanceModePage from "./(Layout)/MaintenanceModePage"

export default function Context({ children, isAdmin, isMaintenanceMode }: { children: React.ReactNode, isAdmin: boolean, isMaintenanceMode: boolean }) {
    const pathname = usePathname()
    
    return <>{!isMaintenanceMode || (isMaintenanceMode && isAdmin) ||  (isMaintenanceMode && pathname.includes('/auth'))
        ? <>{children}</>
        : <MaintenanceModePage />
    }</>
}