'use client'

import { hugeiconsLicense } from "@hugeicons/react-pro";
const iconLICENSE = process.env.NEXT_PUBLIC_HUGEICONSLICENSE!
hugeiconsLicense(iconLICENSE)

export default function Context({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}