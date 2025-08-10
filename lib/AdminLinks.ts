import type { Icons } from "@/lib/FontAwesome"

type SubMenuProps = { name: string; slug: string; }

export type AdminLinkProps = {
    name: string
    slug: any
    icon: Icons
    subMenuLinks?: SubMenuProps[]
}

export const AdminLinks: Array<AdminLinkProps> = [
  {
    name: "Public Home",
    slug: "/",
    icon: { name: "house-blank", pack: "fadl" },
  },
  {
    name: "Admin Portal",
    slug: "/admin",
    icon: { name: "objects-column", pack: "fadl" },
  },
  {
    name: "Photo Manager",
    slug: "/admin/photos",
    icon: { name: "images", pack: "fadl" },
    subMenuLinks: [
      {
        name: "Batch Editor",
        slug: "/admin/batchEdit",
      },
      {
        name: "Album Manager",
        slug: "/admin/albums",
      },
    ],
  },
  {
    name: "Video Manager",
    slug: "/admin/videography",
    icon: { name: "films", pack: "fadl" },
    subMenuLinks: [
      {
        name: "Video Uploader",
        slug: "/admin/videography/upload",
      },
    ],
  },
  {
    name: "Blog Posts",
    slug: "/admin/blog",
    icon: { name: "blog", pack: "fadl" },
    subMenuLinks: [
      {
        name: "Create New Post",
        slug: "/admin/postNew",
      },
    ],
  },
  {
    name: "Update: About Me",
    slug: "/admin/about",
    icon: { name: "id-badge", pack: "fadl" },
  },
  {
    name: "Update: Resume",
    slug: "/admin/resume",
    icon: { name: "id-badge", pack: "fadl" },
  },
  {
    name: "Links Manager",
    slug: "/admin/links",
    icon: { name: "link", pack: "fal" },
    subMenuLinks: [
        {
            name: "Link Sets",
            slug: "/admin/linkSets",
        },
        {
            name: "Create New Link Set",
            slug: "/admin/linksNew",
        },
    ],
  },
  {
    name: "Messages",
    slug: "/admin/messages",
    icon: { name: "message-smile", pack: "fadl" },
  }
];