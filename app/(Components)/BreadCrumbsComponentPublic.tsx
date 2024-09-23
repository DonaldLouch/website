import { Anchor, Breadcrumbs } from '@mantine/core'
import { ArrowRight01Icon, Home01Icon } from '@hugeicons/react'

import classes from "./Components.module.css"

interface BreadComp {
    breads: any
}

export const BreadCrumbPublic = (props: BreadComp) => {
    const { breads } = props
    
    return <Breadcrumbs m="1rem 0" separator={<ArrowRight01Icon />} fz="0.8rem">
        <Anchor href='/' className={classes.breadHome} c="var(--secondary)"><Home01Icon variant="duotone" size="1.5rem" /></Anchor>
        {breads.map((bread:any, index: number) => (
            <Anchor key={index} href={bread.pageLink} c="white" fz="0.8rem">{bread.pageName}</Anchor>
        ))}
    </Breadcrumbs>
}