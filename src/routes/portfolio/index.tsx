import { GetAboutMe } from '@/actions/database/GetDatabase.server';
import HeroSection from '@/components/cards/HeroSection';
import { seo } from '@/utils/seo';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio/')({
  component: RouteComponent,
  head: () => ({
      meta: [
          ...seo({
              title: "Donald Louch's Portfolio",
              keywords: `${import.meta.env.VITE_KEYWORDS}, portfolio, Donald Louch, donald, louch, web production, photography, videography, graphic design, audio, written work`,
              image: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/g4os77p6ityhxn0ki74v.jpg"
          }),
      ]
  }),
  loader: async () => ({
    aboutMe: await GetAboutMe(),
  })
  
})

function RouteComponent() {
  const { aboutMe } = Route.useLoaderData()
  const links = [
    {
      linkTitle: "Websites",
      linkUrl: "https://github.com/donaldlouch",
      linkIcon: { name: "github", pack: "fab" },
    },
    {
      linkTitle: "Photography",
      linkUrl: "/portfolio/photography",
      linkIcon: { name: "images" }
    },
    {
      linkTitle: "Videography",
      linkUrl: "/video/clv70b4iy00013b6rinrnxiz7",
      linkIcon: { name: "films" }
    },
    // {
    //   linkTitle: "Graphic Design",
    //   linkUrl: "C/graphic",
    // },
    {
      linkTitle: "Blog",
      linkUrl: "/blog",
      linkIcon: { name: "blog" },
    },
    // {
    //   linkTitle: "Hire Me!",
    //   linkUrl: "jobs",
    // },
  ];

  const cta = [
    { ctaTitle: "Resume", ctaLink: "/portfolio/resume", ctaVector: {name: "id-badge"} },
  ]

  return  <HeroSection
    links={links}
    cta={cta}
    aboutMe={aboutMe}
    imageLink="https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LOANPCWJe9jTCQ2fh.jpg"
  />
}
