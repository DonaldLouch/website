interface PortalSubNavigationItemsProps {
    name : string
    slug: string
    parentMenu: number
    levelOfAccess: string
  }
  
export const PortalSubNavigationItems: Array<PortalSubNavigationItemsProps> = [
    { 
        name: 'Manage',
        slug: '/portal/blog',
        parentMenu: 0,
        levelOfAccess: '0'
    },
    { 
        name: 'Create New Post',
        slug: '/portal/postNew',
        parentMenu: 0,
        levelOfAccess: '0'
    },

    { 
        name: 'Manage',
        slug: '/portal/pages',
        parentMenu: 1,
        levelOfAccess: '0'
    },
    
    { 
        name: 'About Me',
        slug: '/portal/pagesAbout',
        parentMenu: 1,
        levelOfAccess: '0'
    },

    { 
        name: 'Resume',
        slug: '/portal/pagesResume',
        parentMenu: 1,
        levelOfAccess: '0'
    },

    { 
        name: 'Links',
        slug: '/portal/pagesLinks',
        parentMenu: 1,
        levelOfAccess: '0'
    },

    // { 
    //     name: 'Terms of Service',
    //     slug: '/portal/pagesTOS',
    //     parentMenu: 1,
    //     levelOfAccess: '0'
    // },

    { 
        name: 'New Page',
        slug: '/portal/pagesNew',
        parentMenu: 1,
        levelOfAccess: '0'
    },
    
    { 
        name: 'Manager',
        slug: '/portal/photography',
        parentMenu: 2,
        levelOfAccess: '0'
    },
    { 
        name: 'Batch Editor',
        slug: '/portal/batchEdit',
        parentMenu: 2,
        levelOfAccess: '0'
    },
    { 
        name: 'Album Manager',
        slug: '/portal/albums',
        parentMenu: 2,
        levelOfAccess: '0'
    },

    { 
        name: 'Manager',
        slug: '/portal/videography',
        parentMenu: 3,
        levelOfAccess: '0'
    },
    { 
        name: 'Uploader',
        slug: '/portal/videography/upload',
        parentMenu: 3,
        levelOfAccess: '0'
    },

]