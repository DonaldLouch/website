import HeroPage from "../(Components)/HeroPage";

import Posts from "./Posts";
import ViewPostButton from "./ViewPostButton";

// import createClient from "@/lib/supabase-server"
// import supabase from "@/lib/supabase";

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: `${process.env.WEBSITE_NAME}'s Blog Post's`,
    description: process.env.DESCRIPTION,
    keywords: `${process.env.KEYWORDS}, blog. post, feed, photography, videography, audio, design, general, education`,
    openGraph: {
        type: "website",
        url: process.env.SITE_URL,
        title: `${process.env.WEBSITE_NAME} Blog Post's`,
        description: process.env.DESCRIPTION,
        siteName: process.env.WEBSITE_NAME,
        images: [{
            url: "https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.SITE_URL, creator: "@DonaldLouch", images: "https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpgg" },
}

export default async function Blog() {
  const pageLinks = [
    {
      linkTitle: "Photography",
      linkUrl: "/C/photography",
    },
    {
      linkTitle: "Videography",
      linkUrl: "/C/videography",
    },
    {
      linkTitle: "Audio",
      linkUrl: "/C/audio",
    },
    {
      linkTitle: "Graphic Design",
      linkUrl: "/C/design",
    },
    {
      linkTitle: "General",
      linkUrl: "/C/general",
    },
    {
      linkTitle: "Education",
      linkUrl: "/C/education",
    },
  ];
  // const {data: posts} = await supabase.from('BlogPost').select().match({ postStatus: 'Public' })
  // const {data: pinnedPosts} = await supabase.from('BlogPost').select().match({ postStatus: 'Public', pinned: true })
  // const supabase = createClient()
  // const { data: posts } = await supabase.from('BlogPost').select()
  // .match({ postStatus: 'Public' });
  // console.log("Blog Posts", posts)
//   const fetcher = (url: RequestInfo | URL) =>
//     fetch(url).then((res) => res.json());
//   const pageID = "pageL4UBG4TUp4n" as string;
//   useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

   // https://res.cloudinary.com/donaldlouch/image/upload/v1645167967/portfolio/hpqfin6z4olakfiso0pv.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1645167811/portfolio/kley3bouwow9kls6ifqh.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1668982688/donaldlouch/jan0tedmtlyt0sv4klsw.jpg
    // https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpg

  return (
    <>
      <HeroPage
        name="Donald Louch"
        tagLine="and, I'm a Web Developer and Digital Content Creator"
        links={pageLinks}
        cta={["About Me", "about"]}
        imageLink="https://res.cloudinary.com/donaldlouch/image/upload/v1668983119/donaldlouch/mob0k3krwkotmw3axkvt.jpg"
      />
      <ViewPostButton />
      {/* @ts-ignore */}
      <Posts />
    </>
  );
}