import { auth } from "@clerk/nextjs/server"
import { Briefcase02Icon, Chatting01Icon, DashboardSpeed02Icon, DashboardSquare02Icon, Folder01Icon, Home01Icon, Link04Icon, Login01Icon, NewsIcon } from "@hugeicons/react"
import { BsFolder2Open, BsImages, BsLink45Deg, BsPersonBadge } from "react-icons/bs"

interface HeaderNavigationItemsProps {
    name: string
    slug: any
    // iconPre: any
    icon: any
    isParent: boolean
    parentID: number|null
}

export const HeaderNavigationItems: Array<HeaderNavigationItemsProps> = [
    { 
        name: 'Home',
        slug: '/',
        icon: <Home01Icon />,
        isParent: false,
        parentID: 0
    },
    { 
        name: 'Portfolio',
        slug: 'portfolio',
        icon: <Briefcase02Icon />,
        isParent: true,
        parentID: 1
    },
    { 
        name: 'Feeds',
        slug: 'feed',
        icon: <DashboardSquare02Icon />,
        isParent: true,
        parentID: 2
    },
    { 
        name: 'Blog',
        slug: 'blog',
        icon: <NewsIcon />,
        isParent: true,
        parentID: 3
    },
    { 
        name: 'Contact Me',
        slug: 'contact',
        icon: <Chatting01Icon />,
        isParent: false,
        parentID: 4
    },
    { 
        name: 'Links',
        slug: './#links',
        icon: <Link04Icon />,
        isParent: false,
        parentID: 5
    }
]