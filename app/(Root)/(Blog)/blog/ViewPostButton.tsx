'use client'

import { Anchor, Box, Tooltip } from '@mantine/core'

import classes from "@/app/(Components)/Components.module.css"
import HugeIcon from '@/app/(Components)/HugeIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            <FontAwesomeIcon icon={["fadl", "computer-mouse-scrollwheel"]} size="3x" />
          </Anchor>
        </Box>
      </Tooltip>
  )
}
