'use client'

import "@/lib/fontAwesome"

import MaintenanceModePage from "./MaintenanceModePage"
import GeneralLayout from "./GeneralLayout"
import { useToast } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"

export default function AppLayout({ children, isLoggedIn }: { children: React.ReactNode, isLoggedIn: boolean}) {
    const params = useSearchParams()
    const error = params.get('error_description') as string
    const toast = useToast()
    const toastID = "toastID";

    error == "Signups not allowed for this instance" && !toast.isActive(toastID) &&
    toast({
        id: toastID,
        title: "Authentication Error",
        description: "At this time users are not allowed to signup nor login to the Donald Louch website. Sorry for any inconvenience this may cause.",
        status: "error",
        duration: 9000,
        isClosable: true,
    })

    !isLoggedIn && !toast.isActive(toastID) &&
    toast({
        id: toastID,
        title: "Alpha Website",
        description: `Please note that this version of Donald Louch's Website is currently under an alpha development and may not be working properly. You may visit the live version of the website at https://donaldlouch.ca.`,
        status: "error",
        duration: null,
        isClosable: false,
    })
    
    return (
        <>
            <GeneralLayout isLoggedIn={isLoggedIn}>{children}</GeneralLayout>
            {/* { isLoggedIn ? 
                <GeneralLayout isLoggedIn={isLoggedIn}>{children}</GeneralLayout> 
            : 
                <MaintenanceModePage /> 
            } */}
        </>
    )
}