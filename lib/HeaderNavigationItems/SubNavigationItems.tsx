interface HeaderSubNavigationItemsProps {
    name : string
    slug: string
    parentMenu: number
  }
  
export const HeaderSubNavigationItems: Array<HeaderSubNavigationItemsProps> = [
    { 
        name: 'Portfolio Home',
        slug: 'portfolio',
        parentMenu: 1
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
        slug: 'video/clv70b4iy00013b6rinrnxiz7',
        parentMenu: 1
    },
    { 
        name: 'Feeds Home',
        slug: 'feed',
        parentMenu: 2
    },
    { 
        name: 'Photography',
        slug: 'feed/photography',
        parentMenu: 2
    },
    { 
        name: 'Videography',
        slug: 'feed/videography',
        parentMenu: 2
    },
    { 
        name: 'Blog Posts',
        slug: 'blog',
        parentMenu: 3
    },
    { 
        name: 'Life Updates',
        slug: 'blog/C/life',
        parentMenu: 3
    },
    { 
        name: 'Website Updates',
        slug: 'blog/C/website',
        parentMenu: 3
    },
    { 
        name: 'Travel',
        slug: 'blog/C/travel',
        parentMenu: 3
    },
    { 
        name: 'Education',
        slug: 'blog/C/education',
        parentMenu: 3
    }
]