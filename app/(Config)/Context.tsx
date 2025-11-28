'use client'

import "@/lib/FontAwesome"
import { usePathname } from "next/navigation"
import MaintenanceModePage from "./(Layout)/MaintenanceModePage"

export default function Context({ children, isAdmin, isMaintenanceMode }: { children: React.ReactNode, isAdmin: boolean, isMaintenanceMode: boolean }) {
    const pathname = usePathname()
    console.log(isMaintenanceMode, isAdmin)
    
    // return <>{isMaintenanceMode || (isMaintenanceMode && isAdmin) && pathname.includes('/auth') 
    //     ? <>{children}</>
    //     : <MaintenanceModePage /> 
    // }</>
    return <>{!isMaintenanceMode || (isMaintenanceMode && isAdmin) ||  (isMaintenanceMode && pathname.includes('/auth'))
        ? <>{children}</>
        : <MaintenanceModePage />
    }</>
}