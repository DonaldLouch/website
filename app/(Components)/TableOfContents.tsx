import { Anchor, Group, Stack, Text, Tooltip, rem } from '@mantine/core'
import React, { useState } from 'react'

import classes from "./Components.module.css"
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TableOfContentsProps = {
    // sections: [label: string, link: string|null, order: number]
    sections: any
    activeSection?: string|null
}

export default function TableOfContents({ sections, activeSection }: TableOfContentsProps) {
    const [active, setActive] = useState(activeSection ? activeSection : 0)
    const router = useRouter()
    const items = sections.map((section: any, index: number) => (
        <Tooltip label={section.label} key={section.label}>
            <Anchor 
                // key={section.label}
                href={section.link}
                onClick={(e: any) => {
                    e.preventDefault();
                    setActive(index)
                    router.push(section.link)
                }}
                lineClamp={1}
                style={{ whiteSpace: "nowrap", paddingLeft: `calc(${section.order} * var(--mantine-spacing-lg))`, borderLeft: `${rem("2px")} solid var(--secondary)`}}
                className={classes.tableOfContentsLink}
                c={active === index ? "var(--secondary)" : "white"}
                fw={active === index ? 900 : 400}
                td="none"
                lh="var(--link-height)"
                fz="sm"
                h="var(--link-height)"
                // m="auto"

    // // line-height: var(--link-height);
    // font-size: var(--mantine-font-size-sm);
    // height: var(--link-height);
    // border-top-right-radius: var(--mantine-radius-md);
    // border-bottom-right-radius: var(--mantine-radius-md);
    // border-left: rem(2px) solid var(--secondary);
    // margin: "auto";
            >{section.label}</Anchor>
        </Tooltip>
    ))
    return <Stack className={classes.tableOfContentsRoot}>
        <Group>
            <FontAwesomeIcon icon={["fal", "list-ul"]} />
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
