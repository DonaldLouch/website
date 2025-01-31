import { NavLink } from '@mantine/core'

import classes from './Buttons.module.css'

import HugeIcon from '../HugeIcon'
// import { Bs123, BsFolder2Open, BsImages, BsLink45Deg, BsPersonBadge, BsSend } from 'react-icons/bs'

interface propTypes {
    linkName: string
    href: string
    children?: React.ReactNode 
    icon?: any
}


export default function PortalHeaderLink( props: propTypes ) {
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
            root: classes.headerLinkPortal,
            label: classes.headerLink_labelPortal,
        }}
        label={linkName}
        my="0.5rem"
        p="1rem"
        leftSection={<HugeIcon name={icon.name} size="1.5rem" variant={icon.variant ? icon.variant : undefined} />}
    >{children}</NavLink>
}