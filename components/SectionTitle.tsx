import { Heading, useColorModeValue } from '@chakra-ui/react'
//import React, { useState } from "react"

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
            color={useColorModeValue('black', 'white')}
            // textTransform="capitalize"
        >{headingTitle}</Heading>
    )
}