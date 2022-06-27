interface PortalNavigationItemsProps {
  name: string;
  slug: any;
  iconPre: any;
  iconName: any;
  isParent: boolean;
  parentID: number | null;
  levelOfAccess: string;
}

export const PortalNavigationItems: Array<PortalNavigationItemsProps> = [
  {
    name: "Portal",
    slug: "../portal",
    iconPre: "fas",
    iconName: "tachometer-alt",
    isParent: false,
    parentID: null,
    levelOfAccess: "0",
  },

  {
    name: "Test Page",
    slug: "../portal/test",
    iconPre: "fas",
    iconName: "layer-group",
    isParent: false,
    parentID: null,
    levelOfAccess: "0",
  },

  {
    name: "Media Manger",
    slug: "../portal/media",
    iconPre: "fas",
    iconName: "images",
    isParent: false,
    parentID: null,
    levelOfAccess: "0",
  },

  {
    name: "Blog Posts",
    slug: null,
    iconPre: "fas",
    iconName: "blog",
    isParent: true,
    parentID: 0,
    levelOfAccess: "0",
  },

  {
    name: "Pages",
    slug: null,
    iconPre: "fas",
    iconName: "copy",
    isParent: true,
    parentID: 1,
    levelOfAccess: "0",
  },

  {
    name: "Messages",
    slug: "../portal/messages",
    iconPre: "fas",
    iconName: "inbox",
    isParent: false,
    parentID: null,
    levelOfAccess: "0",
  },

  {
    name: "Sitemap",
    slug: "../sitemap",
    iconPre: "fas",
    iconName: "map",
    isParent: false,
    parentID: null,
    levelOfAccess: "0",
  },
];
/*
    const PortalNavigationItems: Array<LinkItemProps> = [
    { 
      name: 'Portal',
      slug: 'portal',
      iconPre: 'fas', 
      iconName: 'tachometer-alt',
      isParent: false,
      parentID: null,
      levelOfAccess: '0'
    },
  
    { 
      name: 'Projects',
      slug: null,
      iconPre: "fas", 
      iconName: "layer-group",
      isParent: true,
      parentID: 1,
      levelOfAccess: '0'
    },
  
    { 
      name: 'Payment Portal',
      slug: null,
      iconPre: "fab", 
      iconName: "cc-stripe",
      isParent: true,
      parentID: 2,
      levelOfAccess: '0'
    },
  
    { 
      name: 'Settings',
      slug: null,
      iconPre: "fas", 
      iconName: "cog",
      isParent: true,
      parentID: 3,
      levelOfAccess: '0'
    },
  
    { 
      name: 'Support Portal',
      slug: null,
      iconPre: "far", 
      iconName: "life-ring",
      isParent: true,
      parentID: 4,
      levelOfAccess: '0'
    },
  
    { 
      name: 'Knowledge Base',
      slug: null,
      iconPre: "fas", 
      iconName: "archive",
      isParent: true,
      parentID: 5,
      levelOfAccess: '0'
    },
  
    { 
      name: 'Product Portal',
      slug: null,
      iconPre: "fas", 
      iconName: "shopping-cart",
      isParent: true,
      parentID: 6,
      levelOfAccess: '0'
    },
  
    { 
      name: 'Users Portal',
      slug: null,
      iconPre: "fas", 
      iconName: "user-cog",
      isParent: true,
      parentID: 7,
      levelOfAccess: '0'
    },
  ]

*/
