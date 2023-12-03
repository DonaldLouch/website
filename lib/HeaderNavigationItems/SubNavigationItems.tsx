interface HeaderSubNavigationItemsProps {
    name : string
    slug: string
    parentMenu: number
  }
  
export const HeaderSubNavigationItems: Array<HeaderSubNavigationItemsProps> = [
    { 
        name: 'Contact Me',
        slug: 'about#contact',
        parentMenu: 0
    },
    { 
        name: 'Resume',
        slug: 'portfolio/resume',
        parentMenu: 1
    },
    { 
        name: 'Web Production',
        slug: 'https://github.com/donaldlouch',
        parentMenu: 1
    },
    { 
        name: 'Photography',
        slug: 'portfolio/photography',
        parentMenu: 1
    },
    { 
        name: 'Videography',
        slug: 'portfolio/videography',
        parentMenu: 1
    },
    { 
        name: 'Photography',
        slug: '/feed/photography',
        parentMenu: 2
    },
    { 
        name: 'Videography',
        slug: '/feed/videography',
        parentMenu: 2
    },
    { 
        name: 'LEGACY: Blog Feed',
        slug: '/blog',
        parentMenu: 2
    },
    // { 
    //     name: 'LEGACY: Photography',
    //     slug: '/C/photography',
    //     parentMenu: 2
    // },
    // { 
    //     name: 'LEGACY: Audio',
    //     slug: '/C/audio',
    //     parentMenu: 2
    // },
    // { 
    //     name: 'LEGACY: Graphic Design',
    //     slug: '/C/graphic',
    //     parentMenu: 2
    // },
    // { 
    //     name: 'LEGACY: Education',
    //     slug: '/C/education',
    //     parentMenu: 2
    // },
    { 
        name: 'LEGACY: General',
        slug: '/C/General',
        parentMenu: 2
    },
    
]