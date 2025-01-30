'use client'

import HugeIcon from "@/app/(Components)/HugeIcon"
import { getVideoData } from "@/app/actions/video"
import { Box, Text } from "@mantine/core"
import { Suspense, useEffect, useState } from "react"

import Loading from "@/app/loading"
import CodeBlock from "@/app/(Components)/(MarkdownCode)/CodeBlock"
import InlineCode from "@/app/(Components)/(MarkdownCode)/InlineCode"

export default function page() {
    return <Box mt="2rem">
        <InlineCode code="console.log('Hello World')" />
        <HugeIcon name="tiktok" color="red" size="10rem" variant="twotone" />
    </Box>
}
