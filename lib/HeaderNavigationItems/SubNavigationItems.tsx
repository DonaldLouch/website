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
        slug: '/C/photography',
        parentMenu: 2
    },
    { 
        name: 'Videography',
        slug: '/C/videography',
        parentMenu: 2
    },
    { 
        name: 'Audio',
        slug: '/C/audio',
        parentMenu: 2
    },
    { 
        name: 'Graphic Design',
        slug: '/C/graphic',
        parentMenu: 2
    },
    { 
        name: 'Education',
        slug: '/C/education',
        parentMenu: 2
    },
    { 
        name: 'General',
        slug: '/C/General',
        parentMenu: 2
    },
]