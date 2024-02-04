import HeroPage from "../../(Components)/HeroPage";

// import Posts from "./Posts";
// import ViewPostButton from "./ViewPostButton";

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME}'s Feed's`,
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, blog. post, feed, photography, videography, audio, design, general, education`,
    openGraph: {
        type: "website",
        url: process.env.SITE_URL,
        title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} Feed's`,
        description: process.env.NEXT_PUBLIC_DESCRIPTION,
        siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        images: [{
            url: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.SITE_URL, creator: "@DonaldLouch", images: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpgg" },
}

export default async function Blog() {

  const pageLinks = [
    {
      linkTitle: "Photography",
      linkUrl: "/feed/photography",
    },
    {
      linkTitle: "Videography",
      linkUrl: "/feed/videography",
    },
    // {
    //   linkTitle: "LEGACY: Audio",
    //   linkUrl: "/C/audio",
    // },
    // {
    //   linkTitle: "LEGACY: Graphic Design",
    //   linkUrl: "/C/design",
    // },
    {
      linkTitle: "LEGACY: Blog Posts",
      linkUrl: "/blog",
    },
    {
      linkTitle: "LEGACY: General",
      linkUrl: "/C/general",
    },
  ]

    
  return (
    <>
      <HeroPage
        name="Donald Louch"
        tagLine="and I am a Web Developer"
        links={pageLinks}
        cta={["About Me", "about"]}
        imageLink="https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LO3NICOBz1pJVUysp"
      />
    </>
  );
}
