import { Anchor, Button, Group, Stack, Text, Tooltip } from '@mantine/core'
import React, { useState } from 'react'
import { BsListNested } from 'react-icons/bs'

import cx from 'clsx';

import classes from "./Components.module.css"
import { useRouter } from 'next/navigation';
import { Book04Icon, LeftToRightBlockQuoteIcon } from '@hugeicons/react-pro';

type TableOfContentsProps = {
    // sections: [label: string, link: string|null, order: number]
    sections: any
    activeSection?: string|null
}

export default function TableOfContents({ sections, activeSection }: TableOfContentsProps) {
    const [active, setActive] = useState(activeSection ? activeSection : 0)
    const router = useRouter()
    const items = sections.map((section: any, index: number) => (
        <Tooltip label={section.label}>
            <Anchor 
                key={section.label}
                href={section.link}
                onClick={(e) => {
                    e.preventDefault();
                    setActive(index)
                    router.push(section.link)
                }}
                lineClamp={1}
                style={{ whiteSpace: "nowrap", paddingLeft: `calc(${section.order} * var(--mantine-spacing-lg))` }}
                className={classes.tableOfContentsLink}
                c={active === index ? "var(--secondary)" : "white"}
                fw={active === index ? 900 : 400}
            >{section.label}</Anchor>
        </Tooltip>
    ))
    return <Stack className={classes.tableOfContentsRoot}>
        <Group>
            <LeftToRightBlockQuoteIcon variant="duotone" />
            <Text>Table of Contents</Text>
        </Group>
        <Stack gap="0">
            <div
                className={classes.tableOfContentsIndicator}
                style={{
                    transform: `translateY(calc(${active} * var(--link-height) + var(--indicator-offset)))`,
                }}
            />
            {items}
        </Stack>
    </Stack>
}
