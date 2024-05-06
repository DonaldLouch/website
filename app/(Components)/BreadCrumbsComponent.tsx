import { Anchor, Breadcrumbs } from '@mantine/core';
import { ArrowRight01Icon, Home01Icon } from '@hugeicons/react-pro';

import classes from "./Components.module.css"

interface BreadComp {
    breads: any
}

export const BreadCrumb = (props: BreadComp) => {
    const { breads } = props
    
     return <Breadcrumbs m="-0.5rem 0 1rem" separator={<ArrowRight01Icon />} fz="0.8rem">
        <Anchor href='/admin' className={classes.breadHome}><Home01Icon variant="duotone" size="1.5rem" /></Anchor>
        {breads.map((bread:any, index: number) => (
            <Anchor key={index} href={bread.pageLink} c="white" fz="0.8rem">{bread.pageName}</Anchor>
        ))}
    </Breadcrumbs>
}