interface HeaderNavigationItemsProps {
    name: string
    slug: any
    iconPre: any
    iconName: any
    isParent: boolean
    parentID: number|null
}

export const HeaderNavigationItems: Array<HeaderNavigationItemsProps> = [
    { 
        name: 'About Me',
        slug: 'about',
        iconPre: 'fal', 
        iconName: 'id-badge',
        isParent: true,
        parentID: 0
    },
    { 
        name: 'Portfolio',
        slug: 'portfolio',
        iconPre: 'fal', 
        iconName: 'folder-open',
        isParent: true,
        parentID: 1
    },
    { 
        name: 'Blog',
        slug: 'blog',
        iconPre: 'fal', 
        iconName: 'newspaper',
        isParent: true,
        parentID: 2
    },
    { 
        name: 'Links',
        slug: 'about#links',
        iconPre: 'fal', 
        iconName: 'link',
        isParent: false,
        parentID: 3
    }
]