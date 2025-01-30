import HugeIcon, { IconName, IconVariant } from "@/app/(Components)/HugeIcon"

type Icons = {name: IconName, variant?: IconVariant}

interface AdminNavigationItemsProps {
  name: string;
  slug: any;
  // iconPre: any;
  // icon: any;
  icon: Icons
  isParent: boolean;
  parentID: number | null;
  levelOfAccess: string;
}

export const AdminNavigationItems: Array<AdminNavigationItemsProps> = [
   { 
        name: 'Home',
        slug: '',
        icon: {name: "home-01", variant: "duotone"},
        isParent: false,
        parentID: 0,
        levelOfAccess: "0"
    },
  {
    name: "Admin Portal",
    slug: "admin",
    icon: {name: "dashboard-browsing"},
    isParent: false,
    parentID: 1,
    levelOfAccess: "0",
  },

  {
    name: "Photo Manger",
    slug: null,
    icon: {name: "album-02"},
    isParent: true,
    parentID: 2,
    levelOfAccess: "0",
  },
  
  {
    name: "Video Manger",
    slug: null,
    icon: {name: "camera-video"},
    isParent: true,
    parentID: 3,
    levelOfAccess: "0",
  },

  {
    name: "Blog Posts",
    slug: null,
    icon: {name: "news"},
    isParent: true,
    parentID: 4,
    levelOfAccess: "0",
  },
  
  {
    name: "Link Sets Manager",
    slug: "admin/linkSets",
    icon: {name: "link-01"},
    isParent: false,
    parentID: 5,
    levelOfAccess: "0",
  },

  {
    name: "Pages",
    slug: null,
    icon: {name: "clipboard"},
    isParent: true,
    parentID: 6,
    levelOfAccess: "0",
  },

  {
    name: "Messages",
    slug: "admin/messages",
    icon: {name: "inbox"},
    isParent: false,
    parentID: 7,
    levelOfAccess: "0",
  },

  {
    name: "Alerts Manager",
    slug: "admin/alerts",
    icon: {name: "alert-diamond"},
    isParent: false,
    parentID: 8,
    levelOfAccess: "0",
  }
]
