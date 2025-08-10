'use client'

import { Title } from '@mantine/core'

interface SectionTitleProps {
    headingTitle: String
    [key: string]: any
}

export const SectionTitle = ( props: SectionTitleProps) => { 
    const {headingTitle, ...rest} = props
    return (
        <Title 
            order={2}
            fz="2rem"
            td="underline var(--primary)"
            // textDecorationColor="primary"
            ta="center"
            c="white"
            {...rest}
            // mb="1rem"
        >{headingTitle}</Title>
    )
}