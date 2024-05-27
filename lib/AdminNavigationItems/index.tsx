import { Album02Icon, CameraVideoIcon, ClipboardIcon, DashboardSpeed02Icon, Home01Icon, InboxIcon, NewsIcon } from "@hugeicons/react";

interface AdminNavigationItemsProps {
  name: string;
  slug: any;
  // iconPre: any;
  // icon: any;
  icon: any;
  isParent: boolean;
  parentID: number | null;
  levelOfAccess: string;
}

export const AdminNavigationItems: Array<AdminNavigationItemsProps> = [
   { 
        name: 'Home',
        slug: '',
        icon: <Home01Icon />,
        isParent: false,
        parentID: 0,
        levelOfAccess: "0"
    },
  {
    name: "Admin Portal",
    slug: "admin",
    icon: <DashboardSpeed02Icon />,
    isParent: false,
    parentID: 1,
    levelOfAccess: "0",
  },

  {
    name: "Photo Manger",
    slug: null,
    icon: <Album02Icon />,
    isParent: true,
    parentID: 2,
    levelOfAccess: "0",
  },
  
  {
    name: "Video Manger",
    slug: null,
    icon: <CameraVideoIcon />,
    isParent: true,
    parentID: 3,
    levelOfAccess: "0",
  },

  {
    name: "Blog Posts",
    slug: null,
    icon: <NewsIcon />,
    isParent: true,
    parentID: 4,
    levelOfAccess: "0",
  },

  {
    name: "Pages",
    slug: null,
    icon: <ClipboardIcon />,
    isParent: true,
    parentID: 5,
    levelOfAccess: "0",
  },

  {
    name: "Messages",
    slug: "admin/messages",
    icon: <InboxIcon />,
    isParent: false,
    parentID: 6,
    levelOfAccess: "0",
  },
]
