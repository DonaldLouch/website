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
        name: 'About Me',
        slug: 'about',
        // iconPre: 'fal', 
        icon: BsPersonBadge,
        isParent: true,
        parentID: 0
    },
    { 
        name: 'Portfolio',
        slug: 'portfolio',
        // iconPre: 'fal', 
        icon: BsFolder2Open,
        isParent: true,
        parentID: 1
    },
    // { 
    //     name: 'Blog',
    //     slug: 'blog',
    //     iconPre: 'fal', 
    //     icon: 'newspaper',
    //     isParent: true,
    //     parentID: 2
    // },
    { 
        name: 'Feeds',
        slug: 'feed',
        // iconPre: 'fal', 
        icon: BsImages,
        isParent: true,
        parentID: 2
    },
    { 
        name: 'Links',
        slug: 'about#links',
        // iconPre: 'fal', 
        icon: BsLink45Deg,
        isParent: false,
        parentID: 3
    }
]