import { Box, Divider, Flex, FlexProps, Text, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const DividerText = (props: FlexProps) => {
  const { children, ...flexProps } = props
  return (
    <Flex align="center" color={useColorModeValue('tertiary', 'white')} {...flexProps}>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
      <Text as="span" px="3" color="white" fontWeight="bold">
        {children}
      </Text>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
    </Flex>
  )
}
