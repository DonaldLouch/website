'use client'

import HugeIcon from "@/app/(Components)/HugeIcon"
import { getVideoData } from "@/app/actions/video"
import { Box, Text } from "@mantine/core"
import { Suspense, useEffect, useState } from "react"

import Loading from "@/app/loading"
import CodeBlock from "@/app/(Components)/(MarkdownCode)/CodeBlock"
import InlineCode from "@/app/(Components)/(MarkdownCode)/InlineCode"
import { HugeIconsNames } from "@/lib/HugeIconsNames"
import ClipboardButton from "@/app/(Components)/(Buttons)/ClipboardButton"

export default function page() {
    const iconnames = HugeIconsNames.icons
    const iconList = new Array()
    const iconImports = new Array()
    iconnames.forEach((icon: { name: string }) => {
        iconList.push(icon.name)
        const importBase = icon.name.split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('')
        const theImport = `: iconName === "${icon.name}" && iconVariant === "stroke" ? StrokeIcons.${importBase}StrokeRounded 
            : iconName === "${icon.name}" && iconVariant === "solid" ? SolidIcons.${importBase}SolidRounded 
            : iconName === "${icon.name}" && iconVariant === "bulk" ? BulkIcons.${importBase}BulkRounded 
            : iconName === "${icon.name}" && iconVariant === "twotone" ? TwotoneIcons.${importBase}TwotoneRounded
            : iconName === "${icon.name}" && iconVariant === "duotone" ? DuotoneIcons.${importBase}DuotoneRounded`
        iconImports.push(theImport)
    })
    console.log(iconImports[1])
    const list = iconList.toString().replaceAll(",", '" | "')

    const [clicked, setClicked] = useState(false)

    return <Box mt="2rem">
        <InlineCode code="console.log('Hello World')" />
        <ClipboardButton copyValue={iconImports.toString()} />
        <HugeIcon name="sun" color="red" size="10rem" variant="twotone" altStatus={clicked} altName="moon" onClick={() => setClicked(!clicked ? true : false)} />
    </Box>
}
