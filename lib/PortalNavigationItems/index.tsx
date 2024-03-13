import { BsCopy, BsFilm, BsHouseGear, BsImages, BsInboxes, BsPostcard } from "react-icons/bs";

interface PortalNavigationItemsProps {
  name: string;
  slug: any;
  // iconPre: any;
  // icon: any;
  icon: any;
  isParent: boolean;
  parentID: number | null;
  levelOfAccess: string;
}

export const PortalNavigationItems: Array<PortalNavigationItemsProps> = [
  {
    name: "Portal",
    slug: "../portal",
    icon: BsHouseGear,
    isParent: false,
    parentID: null,
    levelOfAccess: "0",
  },

  // {
  //   name: "Test Page",
  //   slug: "../portal/test",
  //   iconPre: "fas",
  //   icon: "layer-group",
  //   isParent: false,
  //   parentID: null,
  //   levelOfAccess: "0",
  // },

  {
    name: "Photo Manger",
    slug: null,
    // iconPre: "fas",
    icon: BsImages,
    isParent: true,
    parentID: 2,
    levelOfAccess: "0",
  },
  
  {
    name: "Video Manger",
    slug: null,
    // iconPre: "fas",
    icon: BsFilm,
    isParent: true,
    parentID: 3,
    levelOfAccess: "0",
  },

  {
    name: "Blog Posts",
    slug: null,
    // iconPre: "fas",
    icon: BsPostcard,
    isParent: true,
    parentID: 0,
    levelOfAccess: "0",
  },

  {
    name: "Pages",
    slug: null,
    // iconPre: "fas",
    icon: BsCopy,
    isParent: true,
    parentID: 1,
    levelOfAccess: "0",
  },

  {
    name: "Messages",
    slug: "../portal/messages",
    // iconPre: "fas",
    icon: BsInboxes,
    isParent: false,
    parentID: null,
    levelOfAccess: "0",
  },

  // {
  //   name: "Sitemap",
  //   slug: "../sitemap",
  //   iconPre: "fas",
  //   icon: "map",
  //   isParent: false,
  //   parentID: null,
  //   levelOfAccess: "0",
  // },
]
