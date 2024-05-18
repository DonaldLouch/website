'use client'

import { hugeiconsLicense } from "@hugeicons/react";
const iconLICENSE = process.env.NEXT_PUBLIC_HUGEICONSLICENSE!
hugeiconsLicense(iconLICENSE)

export default function Context({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}