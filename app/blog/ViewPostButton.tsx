'use client'

import { Box, Icon, Tooltip } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function ViewPostButton() {
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
          <Link href="/blog#posts" style={{color: "inherit"}}>
            <Icon w="2rem" h="2rem">
              <FontAwesomeIcon icon={['fal', 'down']} color="currentColor" /> 
            </Icon>
          </Link>
        </Box>
      </Tooltip>
  )
}
