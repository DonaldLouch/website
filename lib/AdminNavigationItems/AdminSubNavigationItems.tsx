interface AdminSubNavigationItemsProps {
    name : string
    slug: string
    parentMenu: number
    levelOfAccess: string
  }
  
export const AdminSubNavigationItems: Array<AdminSubNavigationItemsProps> = [    
    { 
        name: 'Photo Manager',
        slug: 'admin/photography',
        parentMenu: 2,
        levelOfAccess: '0'
    },
    { 
        name: 'Batch Editor',
        slug: 'admin/batchEdit',
        parentMenu: 2,
        levelOfAccess: '0'
    },
    { 
        name: 'Album Manager',
        slug: 'admin/albums',
        parentMenu: 2,
        levelOfAccess: '0'
    },

    { 
        name: 'Video Manager',
        slug: 'admin/videography',
        parentMenu: 3,
        levelOfAccess: '0'
    },
    { 
        name: 'Uploader',
        slug: 'admin/videography/upload',
        parentMenu: 3,
        levelOfAccess: '0'
    },
    { 
        name: 'Post Manage',
        slug: 'admin/blog',
        parentMenu: 4,
        levelOfAccess: '0'
    },
    { 
        name: 'Create New Post',
        slug: 'admin/postNew',
        parentMenu: 4,
        levelOfAccess: '0'
    },

    { 
        name: 'Page Manage',
        slug: 'admin/pages',
        parentMenu: 5,
        levelOfAccess: '0'
    },
    { 
        name: 'About Me',
        slug: 'admin/pagesAbout',
        parentMenu: 5,
        levelOfAccess: '0'
    },
    { 
        name: 'Resume',
        slug: 'admin/pagesResume',
        parentMenu: 5,
        levelOfAccess: '0'
    },
    { 
        name: 'Links',
        slug: 'admin/pagesLinks',
        parentMenu: 5,
        levelOfAccess: '0'
    },
    { 
        name: 'New Page',
        slug: 'admin/pagesNew',
        parentMenu: 5,
        levelOfAccess: '0'
    },
    // { 
    //     name: 'Terms of Service',
    //     slug: '/admin/pagesTOS',
    //     parentMenu: 5,
    //     levelOfAccess: '0'
    // },

]