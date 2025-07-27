import { Anchor, Breadcrumbs } from '@mantine/core'

import classes from "./Components.module.css"
import HugeIcon from './HugeIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface BreadComp {
    breads: any
}

export const BreadCrumbPublic = (props: BreadComp) => {
    const { breads } = props

    return <Breadcrumbs m="1rem 0" separator={<FontAwesomeIcon icon={["fal", "chevron-right"]} />} fz="0.8rem">
        <Anchor href='/' className={classes.breadHome} c="var(--secondary)"><FontAwesomeIcon icon={["fajdr", "house"]}  /></Anchor>
        {breads.map((bread:any, index: number) => (
            <Anchor key={index} href={bread.pageLink} c="white" fz="0.8rem">{bread.pageName}</Anchor>
        ))}
    </Breadcrumbs>
}