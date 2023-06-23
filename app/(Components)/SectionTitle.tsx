'use client'

import { Heading } from '@chakra-ui/react'

interface SectionTitleProps {
    headingTitle: String
}

export const SectionTitle = ( props: SectionTitleProps) => { 
    const {headingTitle} = props
    return (
        <Heading 
            as="h2"
            size="3xl"
            textDecoration="underline"
            textDecorationColor="primary"
            textAlign="center"
            color="white"
            mb="1rem"
        >{headingTitle}</Heading>
    )
}