import HeroPage from "../(Components)/HeroPage";

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: "Donald Louch's Portfolio",
    description: process.env.DESCRIPTION,
    keywords: `${process.env.KEYWORDS}, portfolio, Donald Louch, donald, louch, web production, photography, videography, graphic design, audio, written work`,
    // manifest: "/faviconPride/site.webmanifest",
    openGraph: {
        type: "website",
        url: process.env.SITE_URL,
        title: "Donald Louch Portfolio",
        description: process.env.DESCRIPTION,
        siteName: process.env.WEBSITE_NAME,
        images: [{
            url: "https://res.cloudinary.com/donaldlouch/image/upload/v1644189338/donaldlouch/g4os77p6ityhxn0ki74v.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.SITE_URL, creator: "@DonaldLouch", images: "https://res.cloudinary.com/donaldlouch/image/upload/v1644189338/donaldlouch/g4os77p6ityhxn0ki74v.jpg" },
}

export default function Portfolio() {
  const pageLinks = [
    {
      linkTitle: "Websites",
      linkUrl: "https://github.com/donaldlouch",
    },
    {
      linkTitle: "Photography",
      linkUrl: "portfolio/photography",
    },
    {
      linkTitle: "Videography",
      linkUrl: "portfolio/videography",
    },
    {
      linkTitle: "Graphic Design",
      linkUrl: "C/graphic",
    },
    {
      linkTitle: "All Other Content",
      linkUrl: "blog",
    },
    {
      linkTitle: "Available For Freelance Jobs!",
      linkUrl: "jobs",
    },
  ];

//   const fetcher = (url: RequestInfo | URL) =>
//     fetch(url).then((res) => res.json());
//   const pageID = "pageL4UBG4TUp4n" as string;
//   useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

   // https://res.cloudinary.com/donaldlouch/image/upload/v1645167967/portfolio/hpqfin6z4olakfiso0pv.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1645167811/portfolio/kley3bouwow9kls6ifqh.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1668982688/donaldlouch/jan0tedmtlyt0sv4klsw.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpg

  return (
      <HeroPage
        name="Donald Louch"
        tagLine="and, I'm a Web Developer and Digital Content Creator"
        links={pageLinks}
        cta={["Resume", "portfolio/resume"]}
        imageLink="https://res.cloudinary.com/donaldlouch/image/upload/v1644189338/donaldlouch/g4os77p6ityhxn0ki74v.jpg"
      />
  );
}