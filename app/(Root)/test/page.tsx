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
import { HugeiconsIcon } from "@hugeicons/react"
// import {
//   FrameworksIcon,
// } from '@hugeicons-pro/core-stroke-rounded';
// import {
//   AddInvoiceStrokeRounded,
// } from '@hugeicons-pro/core-stroke-rounded';


export default function page() {
    const iconNames = HugeIconsNames.icons
    const iconList = new Array()
    const iconCall = new Array()
    iconNames.forEach((icon: { name: string }) => {
        iconList.push(icon.name)
        iconCall.push(icon.name.split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('') + 
            'StrokeRounded'
        )
    })
    // const list = iconList.toString().replaceAll(",", 'StrokeRounded, ')
    const list = iconCall.toString().replaceAll(",", ", ")
    // iconList.name.split('-')
    //         .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    //         .join('') + 
    //         variant.charAt(0).toUpperCase() + 
    //         variant.slice(1) + 
    //         'Rounded'

    const [clicked, setClicked] = useState(false)

    return <Box mt="2rem">
        {/* <HugeiconsIcon icon={AddInvoiceStrokeRounded} /> */}
        {/* <InlineCode code="console.log('Hello World')" />
        <ClipboardButton copyValue={list} /> */}
        {/* <HugeiconsIcon icon={FrameworksIcon} /> */}
        <HugeIcon name="webflow-ellipse" variant="duotone" size="3rem" />
        {/* altStatus={clicked} altName="absolute" onClick={() => setClicked(!clicked ? true : false)} */}
    </Box>
}
