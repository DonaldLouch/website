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
    iconnames.forEach((icon: { name: string }) => {
        iconList.push(icon.name)
    })
    const list = iconList.toString().replaceAll(",", '" | "')

    const [clicked, setClicked] = useState(false)

    return <Box mt="2rem">
        <InlineCode code="console.log('Hello World')" />
        <ClipboardButton copyValue={list} />
        <HugeIcon name="sun-01" variant="duotone" color={!clicked ? "white" : "black"} size="10rem" altStatus={clicked} altName="moon-02" clickOption={() => setClicked(!clicked ? true : false)}  />
        {/* altStatus={clicked} altName="absolute" onClick={() => setClicked(!clicked ? true : false)} */}
    </Box>
}
