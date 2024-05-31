'use client'

import { Anchor, Box, Tooltip } from '@mantine/core'

import { Mouse01Icon } from '@hugeicons/react'
// import Link from 'next/link'

import classes from "@/app/(Components)/Components.module.css"

export default function ViewPostButton() {
  return (
    <Tooltip label="View Blog Posts">
        <Box
          pos="absolute"
          top="93vh"
          left="50vw"
          style={{
            zIndex: 1002
            // _hover={{ color: "secondary" }}
          }}
          className={classes.mouseIcon}
          // c="var(--darkPurple)"
          fz="1.5rem"
          c="white"
        >
          <Anchor href="/blog#posts" c="currentColor">
            <Mouse01Icon size="3rem" variant="duotone" />
          </Anchor>
        </Box>
      </Tooltip>
  )
}
