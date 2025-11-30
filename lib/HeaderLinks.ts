// import type { IconName, IconVariant } from "@/app/(Components)/HugeIcon"
// import type {IconName, IconPrefix} from "@awesome.me/kit-c3986f6041/icons";
// type Icons = { name: IconName; pack?: IconPrefix };
import type { Icons } from "@/lib/FontAwesome"

type SubMenuProps = { name: string; slug: string; description?: string; icon?: Icons }
export type HeaderLinkProps = {
    name: string
    slug: any
    description?: string
    icon: Icons
    isMega: boolean
    ctaText?: string
    subMenuLinks?: SubMenuProps[]
}
/*
isMega: true,
ctaText: "Get Started",
subMenuLinks: [
    {
        name: "Title", 
        slug: "Slug",
        description: "Description",
        icon: {name: "menu-two-lines", pack: "twotone"},
    },
]
*/

export const HeaderLinks: Array<HeaderLinkProps> = [
  // {
  //     name: "Home",
  //     slug: "/",
  //     description: "My home page is where you can find out quick information about me, pinned content, links to my social accounts, and much more.",
  //     icon: {name: "home-01", pack: "duotone"},
  //     isMega: false,
  // },
  {
    name: "Portfolio",
    slug: "/portfolio",
    description:
      "Here is my portfolio showcasing my productions in web development, photography, and videography. You can also review my resume and contact me if you have any inquiries.",
    icon: { name: "briefcase-blank" },
    isMega: true,
    ctaText: "View Portfolio",
    subMenuLinks: [
      {
        name: "Resume",
        slug: "/portfolio/resume",
        description:
          "You are able to review my current resume with my work and education experience. As well as, my skills.",
        icon: { name: "id-badge", pack: "fadl" },
      },
      {
        name: "Web Production",
        slug: "https://github.donaldlouch.ca",
        description:
          "External Link: You can view my web production portfolio on my GitHub profile.",
        icon: { name: "github", pack: "fab" },
      },
      {
        name: "Photography",
        slug: "/portfolio/photography",
        description: "You can review my photography portfolio.",
        icon: { name: "images", pack: "fadl" },
      },
      {
        name: "Videography",
        slug: "/video/clv70b4iy00013b6rinrnxiz7",
        description: "You can review my videography portfolio.",
        icon: { name: "films", pack: "fadl" },
      },
    ],
  },
  {
    name: "Feeds",
    slug: "/feed",
    description:
      "Here is a collection of my latest digital content creations from photography, videography, and more.",
    icon: { name: "rectangle-history" },
    isMega: true,
    ctaText: "View Feeds",
    subMenuLinks: [
      {
        name: "Photography",
        slug: "/feed/photography",
        description:
          "You can review my photography feed. You can filter by tags, album, search terms, location, and more and  sorting options.",
        icon: { name: "images", pack: "fadl" },
      },
      {
        name: "Videography",
        slug: "/feed/videography",
        description: "You can review my videography feed.",
        icon: { name: "films", pack: "fadl" },
      },
    ],
  },
  {
    name: "Blog",
    slug: "/blog",
    description:
      "Here is a collection of all my written blog posts ranging from life updates, website updates, travel, posts from when I was in school, and more.",
    icon: { name: "blog" },
    ctaText: "View Blog Posts",
    isMega: true,
    subMenuLinks: [
      {
        name: "Life Updates",
        slug: "/blog/C/life",
        description:
          "You can review my life update posts and learn more about me, Donald Louch.",
        icon: { name: "person", pack: "fadl" },
      },
      {
        name: "Website Updates",
        slug: "/blog/C/website",
        description:
          "You can review all my posts about my website updates. Including my personal branding updates such as logos, and more.",
        icon: { name: "globe-pointer", pack: "fadl" },
      },
      {
        name: "Travel",
        slug: "/blog/C/travel",
        description: "You can review all my travel update posts.",
        icon: { name: "location-smile", pack: "fadl" },
      },
      {
        name: "Eduction",
        slug: "/blog/C/education",
        description:
          "Here are some highlighted assignments that I wrote while in school.",
        icon: { name: "graduation-cap", pack: "fadl" },
      },
    ],
  }
];