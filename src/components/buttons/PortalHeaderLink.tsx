import { NavLink } from '@mantine/core'

import classes from './Buttons.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import type { Icons } from '@/lib/FontAwesome'

interface propTypes {
    name: string
    slug: string
    children?: React.ReactNode 
    icon?: Icons
}


export default function PortalHeaderLink( props: propTypes ) {
    const {name, slug, icon, children} = props

    // const theIcon = 
    //     icon === "BsSend" ? <BsSend /> :
    //     icon === "BsFolder2Open" ? <BsFolder2Open /> :
    //     icon === "BsImages" ? <BsImages /> :
    //     icon === "BsLink45Deg" ? <BsLink45Deg /> :
    //     <BsLink45Deg />

    return <NavLink href={slug}
        color="secondary"
        variant="subtle"
        classNames={{
            root: classes.headerLinkPortal,
            label: classes.headerLink_labelPortal,
        }}
        label={name}
        my="0.5rem"
        p="1rem"
        leftSection={<FontAwesomeIcon icon={[icon?.pack || 'fadl', icon?.name]} size="lg" />}
    >{children}</NavLink>
}