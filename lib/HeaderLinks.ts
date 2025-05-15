import type { IconName, IconVariant } from "@/app/(Components)/HugeIcon"
type Icons = { name: IconName; variant?: IconVariant }

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
        icon: {name: "menu-two-lines", variant: "twotone"},
    },
]
*/

export const HeaderLinks: Array<HeaderLinkProps> = [
  // {
  //     name: "Home",
  //     slug: "/",
  //     description: "My home page is where you can find out quick information about me, pinned content, links to my social accounts, and much more.",
  //     icon: {name: "home-01", variant: "duotone"},
  //     isMega: false,
  // },
  {
    name: "Portfolio",
    slug: "/portfolio",
    description:
      "Here is my portfolio showcasing my productions in web development, photography, and videography. You can also review my resume and contact me if you have any inquiries.",
    icon: { name: "briefcase-02" },
    isMega: true,
    ctaText: "View Portfolio",
    subMenuLinks: [
      {
        name: "Resume",
        slug: "/portfolio/resume",
        description:
          "You are able to review my current resume with my work and education experience. As well as, my skills.",
        icon: { name: "passport", variant: "twotone" },
      },
      {
        name: "Web Production",
        slug: "https://github.donaldlouch.ca",
        description:
          "External Link: You can view my web production portfolio on my GitHub profile.",
        icon: { name: "github", variant: "twotone" },
      },
      {
        name: "Photography",
        slug: "/portfolio/photography",
        description: "You can review my photography portfolio.",
        icon: { name: "album-02", variant: "twotone" },
      },
      {
        name: "Videography",
        slug: "/video/clv70b4iy00013b6rinrnxiz7",
        description: "You can review my videography portfolio.",
        icon: { name: "camera-video", variant: "twotone" },
      },
    ],
  },
  {
    name: "Feeds",
    slug: "/feed",
    description:
      "Here is a collection of my latest digital content creations from photography, videography, and more.",
    icon: { name: "dashboard-square-02" },
    isMega: true,
    ctaText: "View Feeds",
    subMenuLinks: [
      {
        name: "Photography",
        slug: "/feed/photography",
        description:
          "You can review my photography feed. With the ability to view the content by tags, album, search terms, location, and other filtering and sorting options.",
        icon: { name: "album-02", variant: "twotone" },
      },
      {
        name: "Videography",
        slug: "/feed/videography",
        description: "You can review my videography feed.",
        icon: { name: "camera-video", variant: "twotone" },
      },
    ],
  },
  {
    name: "Blog",
    slug: "/blog",
    description:
      "Here is a collection of all my written blog posts ranging from life updates, website updates, travel, posts from when I was in school, and more.",
    icon: { name: "news" },
    ctaText: "View Blog Posts",
    isMega: true,
    subMenuLinks: [
      {
        name: "Life Updates",
        slug: "/blog/C/life",
        description:
          "You can review my life update posts and learn more about me, Donald Louch.",
        icon: { name: "contact", variant: "twotone" },
      },
      {
        name: "Website Updates",
        slug: "/blog/C/website",
        description:
          "You can review all my posts about my website updates. Including my personal branding updates such as logos, and more.",
        icon: { name: "globe-02", variant: "twotone" },
      },
      {
        name: "Travel",
        slug: "/blog/C/travel",
        description: "You can review all my travel update posts.",
        icon: { name: "pin-location-03", variant: "twotone" },
      },
      {
        name: "Eduction",
        slug: "/blog/C/education",
        description:
          "Here are some highlighted assignments that I wrote while in school.",
        icon: { name: "desk", variant: "twotone" },
      },
    ],
  },
  // {
  //     name: "Contact Me",
  //     slug: "contact",
  //     description: "Here is where you are able to contact me if you have any inquiries.",
  //     icon: {name: "chatting-01"},
  //     isMega: false
  // },
  // {
  //     name: "Links",
  //     slug: "./#links",
  //     description: "Here is the link to all my links to my social accounts, and much more.",
  //     icon: {name: "link-04"},
  //     isMega: false
  // }
];