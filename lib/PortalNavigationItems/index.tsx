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

  // {
  //   name: "Test Page",
  //   slug: "../portal/test",
  //   iconPre: "fas",
  //   iconName: "layer-group",
  //   isParent: false,
  //   parentID: null,
  //   levelOfAccess: "0",
  // },

  {
    name: "Photo Manger",
    slug: null,
    iconPre: "fas",
    iconName: "images",
    isParent: true,
    parentID: 2,
    levelOfAccess: "0",
  },
  
  {
    name: "Video Manger",
    slug: null,
    iconPre: "fas",
    iconName: "films",
    isParent: true,
    parentID: 3,
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

  // {
  //   name: "Sitemap",
  //   slug: "../sitemap",
  //   iconPre: "fas",
  //   iconName: "map",
  //   isParent: false,
  //   parentID: null,
  //   levelOfAccess: "0",
  // },
]
