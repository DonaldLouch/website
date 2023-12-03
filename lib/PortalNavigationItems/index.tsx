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
    iconPre: "fal",
    iconName: "tachometer-alt",
    isParent: false,
    parentID: null,
    levelOfAccess: "0",
  },

  // {
  //   name: "Test Page",
  //   slug: "../portal/test",
  //   iconPre: "fal",
  //   iconName: "layer-group",
  //   isParent: false,
  //   parentID: null,
  //   levelOfAccess: "0",
  // },

  {
    name: "Photo Manger",
    slug: null,
    iconPre: "fal",
    iconName: "images",
    isParent: true,
    parentID: 2,
    levelOfAccess: "0",
  },
  
  {
    name: "Video Manger",
    slug: null,
    iconPre: "fal",
    iconName: "films",
    isParent: true,
    parentID: 3,
    levelOfAccess: "0",
  },

  {
    name: "Blog Posts",
    slug: null,
    iconPre: "fal",
    iconName: "blog",
    isParent: true,
    parentID: 0,
    levelOfAccess: "0",
  },

  {
    name: "Pages",
    slug: null,
    iconPre: "fal",
    iconName: "copy",
    isParent: true,
    parentID: 1,
    levelOfAccess: "0",
  },

  {
    name: "Messages",
    slug: "../portal/messages",
    iconPre: "fal",
    iconName: "inbox",
    isParent: false,
    parentID: null,
    levelOfAccess: "0",
  },

  // {
  //   name: "Sitemap",
  //   slug: "../sitemap",
  //   iconPre: "fal",
  //   iconName: "map",
  //   isParent: false,
  //   parentID: null,
  //   levelOfAccess: "0",
  // },
]
