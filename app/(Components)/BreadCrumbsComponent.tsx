import { Anchor, Breadcrumbs } from '@mantine/core';

import classes from "./Components.module.css"
import HugeIcon from './HugeIcon';

interface BreadComp {
    breads: any
}

export const BreadCrumb = (props: BreadComp) => {
    const { breads } = props
    
     return <Breadcrumbs m="-0.5rem 0 1rem" separator={<HugeIcon name="arrow-right-01" />} fz="0.8rem">
        <Anchor href='/admin' className={classes.breadHome} c="var(--secondary)"><HugeIcon name="home-01" variant="duotone" size="1.5rem" /></Anchor>
        {breads.map((bread:any, index: number) => (
            <Anchor key={index} href={bread.pageLink} c="white" fz="0.8rem">{bread.pageName}</Anchor>
        ))}
    </Breadcrumbs>
}