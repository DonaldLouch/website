import HeroSection from "@/app/(Components)/(Cards)/HeroSection";
import HeroPage from "../../(Components)/HeroPage";

import type { Metadata } from 'next'
import supabase from "@/lib/supabase";
import HugeIcon from "@/app/(Components)/HugeIcon";
export const metadata: Metadata = {
    title: "Donald Louch's Portfolio",
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portfolio, Donald Louch, donald, louch, web production, photography, videography, graphic design, audio, written work`,
    // manifest: "/favicon/site.webmanifest",
    openGraph: {
        type: "website",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        title: "Donald Louch Portfolio",
        description: process.env.NEXT_PUBLIC_DESCRIPTION,
        siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        images: [{
            url: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/g4os77p6ityhxn0ki74v.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.NEXT_PUBLIC_SITE_URL, creator: "@DonaldLouch", images: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/g4os77p6ityhxn0ki74v.jpg" },
}

export default async function Portfolio() {
  const links = [
    {
      linkTitle: "Websites",
      linkUrl: "https://github.com/donaldlouch",
      linkIcon: <HugeIcon name="github" />
    },
    {
      linkTitle: "Photography",
      linkUrl: "/portfolio/photography",
      linkIcon: <HugeIcon name="camera-video" />
    },
    {
      linkTitle: "Videography",
      linkUrl: "/video/clv70b4iy00013b6rinrnxiz7",
      linkIcon: <HugeIcon name="camera-video" />
    },
    // {
    //   linkTitle: "Graphic Design",
    //   linkUrl: "C/graphic",
    // },
    {
      linkTitle: "Blog",
      linkUrl: "/blog",
      linkIcon: <HugeIcon name="news" />
    },
    // {
    //   linkTitle: "Hire Me!",
    //   linkUrl: "jobs",
    // },
  ];

  const cta = [
    { ctaTitle: "Resume", ctaLink: "/portfolio/resume", ctaVector: <HugeIcon name="contact" /> },
  ]
  
  const { data: aboutMe } = await supabase.from('About').select().single()

//   const fetcher = (url: RequestInfo | URL) =>
//     fetch(url).then((res) => res.json());
//   const pageID = "pageL4UBG4TUp4n" as string;
//   useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

   // https://res.cloudinary.com/donaldlouch/image/upload/v1645167967/portfolio/hpqfin6z4olakfiso0pv.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1645167811/portfolio/kley3bouwow9kls6ifqh.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1668982688/donaldlouch/jan0tedmtlyt0sv4klsw.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpg

  return (
      <HeroSection
        links={links}
        cta={cta}
        aboutMe={aboutMe}
        imageLink="https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LOANPCWJe9jTCQ2fh.jpg"
      />
  );
}
