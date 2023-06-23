'use client'

// import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Tooltip } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

export default function ViewPostButton() {
  // const ChevronDownIcon = () => <FontAwesomeIcon icon={['fal', 'down']} color="currentColor" />
  return (
    <Tooltip label="View Blog Posts">
        <Box
          position="absolute"
          top="93vh"
          left="50vw"
          zIndex="overlay"
          color="white"
          fontSize="1.5rem"
          _hover={{ color: "secondary" }}
        >
          <Link href="/blog#posts">
            {/* <ChevronDownIcon /> */}
          </Link>
        </Box>
      </Tooltip>
  )
}
