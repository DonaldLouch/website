import HugeIcon, { IconName, IconVariant } from "@/app/(Components)/HugeIcon"

type Icons = {name: IconName, variant?: IconVariant}

interface HeaderNavigationItemsProps {
    name: string
    slug: any
    // iconPre: any
    icon: Icons
    isParent: boolean
    parentID: number|null
}

export const HeaderNavigationItems: Array<HeaderNavigationItemsProps> = [
    { 
        name: 'Home',
        slug: '/',
        icon: {name: "home-01", variant: "duotone"},
        isParent: false,
        parentID: 0
    },
    { 
        name: 'Portfolio',
        slug: 'portfolio',
        icon: {name: "briefcase-02"},
        isParent: true,
        parentID: 1
    },
    { 
        name: 'Feeds',
        slug: 'feed',
        icon: {name: "dashboard-square-02"},
        isParent: true,
        parentID: 2
    },
    { 
        name: 'Blog',
        slug: 'blog',
        icon: {name: "news"},
        isParent: true,
        parentID: 3
    },
    { 
        name: 'Contact Me',
        slug: 'contact',
        icon: {name: "chatting-01"},
        isParent: false,
        parentID: 4
    },
    { 
        name: 'Links',
        slug: './#links',
        icon: {name: "link-04"},
        isParent: false,
        parentID: 5
    }
]