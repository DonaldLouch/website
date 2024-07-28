import { NavLink } from '@mantine/core'

import classes from './Buttons.module.css'

interface propTypes {
    linkName: string
    href: string
    children?: React.ReactNode 
    icon?: any
}


export default function HeaderLink( props: propTypes ) {
    const {linkName, href, icon, children} = props

    // const theIcon = 
    //     icon === "BsSend" ? <BsSend /> :
    //     icon === "BsFolder2Open" ? <BsFolder2Open /> :
    //     icon === "BsImages" ? <BsImages /> :
    //     icon === "BsLink45Deg" ? <BsLink45Deg /> :
    //     <BsLink45Deg />

    return <NavLink href={href}
        color="secondary"
        variant="subtle"
        classNames={{
            root: classes.headerLink,
            label: classes.headerLink_label,
        }}
        label={linkName}
        my="0.5rem"
        p="1rem"
        fw="300"
        // fz="1rem"
        leftSection={icon}
    >{children}</NavLink>
}