interface PortalSubNavigationItemsProps {
    name : string
    slug: string
    parentMenu: number
    levelOfAccess: string
  }
  
export const PortalSubNavigationItems: Array<PortalSubNavigationItemsProps> = [
    { 
        name: 'Manage',
        slug: '../portal/blog',
        parentMenu: 0,
        levelOfAccess: '0'
    },
    { 
        name: 'Create New Post',
        slug: '../portal/blogNew',
        parentMenu: 0,
        levelOfAccess: '0'
    },

    { 
        name: 'Manage',
        slug: '../portal/pages',
        parentMenu: 1,
        levelOfAccess: '0'
    },
    
    { 
        name: 'About Me',
        slug: '../portal/pagesAbout',
        parentMenu: 1,
        levelOfAccess: '0'
    },

    { 
        name: 'Resume',
        slug: '../portal/pagesResume',
        parentMenu: 1,
        levelOfAccess: '0'
    },

    { 
        name: 'Links',
        slug: '../portal/pagesLinks',
        parentMenu: 1,
        levelOfAccess: '0'
    },

    { 
        name: 'Terms of Service',
        slug: '../portal/pagesTOS',
        parentMenu: 1,
        levelOfAccess: '0'
    },

    { 
        name: 'New Page',
        slug: '../portal/pagesNew',
        parentMenu: 1,
        levelOfAccess: '0'
    },
]