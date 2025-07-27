import type { Icons } from "@/lib/FontAwesome"

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
        icon: {name: "house", pack: "fajdr"},
        isParent: false,
        parentID: 0,
        levelOfAccess: "0"
    },
  {
    name: "Admin Portal",
    slug: "admin",
    icon: {name: "chart-line"},
    isParent: false,
    parentID: 1,
    levelOfAccess: "0",
  },

  {
    name: "Photo Manger",
    slug: null,
    icon: {name: "images"},
    isParent: true,
    parentID: 2,
    levelOfAccess: "0",
  },
  
  {
    name: "Video Manger",
    slug: null,
    icon: {name: "films"},
    isParent: true,
    parentID: 3,
    levelOfAccess: "0",
  },

  {
    name: "Blog Posts",
    slug: null,
    icon: {name: "blog"},
    isParent: true,
    parentID: 4,
    levelOfAccess: "0",
  },
  
  {
    name: "Link Sets Manager",
    slug: "admin/linkSets",
    icon: {name: "link"},
    isParent: false,
    parentID: 5,
    levelOfAccess: "0",
  },

  {
    name: "Pages",
    slug: null,
    icon: {name: "files"},
    isParent: true,
    parentID: 6,
    levelOfAccess: "0",
  },

  {
    name: "Messages",
    slug: "admin/messages",
    icon: {name: "inboxes"},
    isParent: false,
    parentID: 7,
    levelOfAccess: "0",
  },

  {
    name: "Alerts Manager",
    slug: "admin/alerts",
    icon: {name: "bell"},
    isParent: false,
    parentID: 8,
    levelOfAccess: "0",
  }
]
