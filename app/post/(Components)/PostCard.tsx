'use client'

import { Box } from '@chakra-ui/react'

interface CardProps {
  children: React.ReactNode
}

export const PostCard = (props: CardProps) => {
  const { children } = props
  return (
    <Box as="article" id="post" boxShadow="bsBoldBlue" p="4rem 2rem" borderRadius="0 3rem">
      {children}
    </Box>
  )
}