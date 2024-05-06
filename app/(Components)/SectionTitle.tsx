'use client'

import { Title } from '@mantine/core'

interface SectionTitleProps {
    headingTitle: String
}

export const SectionTitle = ( props: SectionTitleProps) => { 
    const {headingTitle} = props
    return (
        <Title 
            order={2}
            fz="2rem"
            td="underline var(--primary)"
            // textDecorationColor="primary"
            ta="center"
            c="white"
            // mb="1rem"
        >{headingTitle}</Title>
    )
}