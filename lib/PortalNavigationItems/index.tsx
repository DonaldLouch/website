import { Album02Icon, AlertDiamondIcon, CameraVideoIcon, ClipboardIcon, DashboardSpeed02Icon, Files01Icon, Home01Icon, InboxIcon, NewsIcon } from "@hugeicons/react";

interface PortalNavigationItemsProps {
  name: string;
  slug: any;
  // iconPre: any;
  // icon: any;
  icon: any;
  isParent: boolean;
  parentID: number | null;
  levelOfAccess: "isStaff"|"user"|"paymentOnly"|"ticketSupportOnly"|"anyone"
}

export const PortalNavigationItems: Array<PortalNavigationItemsProps> = [
   { 
        name: 'Home',
        slug: 'portal',
        icon: <Home01Icon />,
        isParent: false,
        parentID: 0,
        levelOfAccess: "anyone"
    },
   { 
        name: 'Projects',
        slug: 'portal/projects',
        icon: <Files01Icon />,
        isParent: false,
        parentID: 0,
        levelOfAccess: "user"
    },
  // {
  //   name: "Admin Portal",
  //   slug: "admin",
  //   icon: <DashboardSpeed02Icon />,
  //   isParent: false,
  //   parentID: 1,
  //   levelOfAccess: "0",
  // },

  // {
  //   name: "Photo Manger",
  //   slug: null,
  //   icon: <Album02Icon />,
  //   isParent: true,
  //   parentID: 2,
  //   levelOfAccess: "0",
  // },
  
  // {
  //   name: "Video Manger",
  //   slug: null,
  //   icon: <CameraVideoIcon />,
  //   isParent: true,
  //   parentID: 3,
  //   levelOfAccess: "0",
  // },

  // {
  //   name: "Blog Posts",
  //   slug: null,
  //   icon: <NewsIcon />,
  //   isParent: true,
  //   parentID: 4,
  //   levelOfAccess: "0",
  // },

  // {
  //   name: "Pages",
  //   slug: null,
  //   icon: <ClipboardIcon />,
  //   isParent: true,
  //   parentID: 5,
  //   levelOfAccess: "0",
  // },

  // {
  //   name: "Messages",
  //   slug: "admin/messages",
  //   icon: <InboxIcon />,
  //   isParent: false,
  //   parentID: 6,
  //   levelOfAccess: "0",
  // },

  // {
  //   name: "Alerts Manager",
  //   slug: "admin/alerts",
  //   icon: <AlertDiamondIcon />,
  //   isParent: false,
  //   parentID: 7,
  //   levelOfAccess: "0",
  // }
]
