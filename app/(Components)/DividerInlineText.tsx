import { Divider } from '@mantine/core'
import React from 'react'

export default function DividerInlineText({text}: {text?: string}) {
  return <Divider label={text} labelPosition="center" mx="3rem" my="2rem" />
}
