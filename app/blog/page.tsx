import supabase from "@/lib/supabase";
import HeroPage from "../(Components)/HeroPage";

import Posts from "./Posts";
import ViewPostButton from "./ViewPostButton";

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME}'s Blog Post's`,
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, blog. post, feed, photography, videography, audio, design, general, education`,
    openGraph: {
        type: "website",
        url: process.env.SITE_URL,
        title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} Blog Post's`,
        description: process.env.NEXT_PUBLIC_DESCRIPTION,
        siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        images: [{
            url: "https://sjc1.vultrobjects.com/donald-louch/donaldlouch/mob0k3krwkotmw3axkvt.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.SITE_URL, creator: "@DonaldLouch", images: "https://sjc1.vultrobjects.com/donald-louch/donaldlouch/mob0k3krwkotmw3axkvt.jpgg" },
}

export default async function Blog({searchParams}: any) {
  let page = parseInt(searchParams.pg) as number
  let currentPage = (((page) - 1) as number) || 0
 
  const postLimit = 9 as number
  const {count: postLength} = await supabase.from('BlogPost').select("*", { count: 'exact'}).match({ postStatus: 'Public' }) as any
  let numberOfPages = (postLength / postLimit) as number;

  if (!Number.isInteger(numberOfPages)) {
      numberOfPages = Math.floor(numberOfPages) + 1;
  }

  if (numberOfPages < page) {
      currentPage = numberOfPages;
  }
  const pageCalc = currentPage * postLimit
  const { data: postData } = await supabase.from('BlogPost').select().match({ postStatus: 'Public' }).order('postedOn', { ascending: false }).range(pageCalc, (pageCalc + postLimit - 1))
  const { data: pinnedPosts } = await supabase.from('BlogPost').select().match({ postStatus: 'Public', pinned: true }).order('postedOn', { ascending: false })
  
  const paginationArray = new Array()
  paginationArray.push(numberOfPages, currentPage)

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
    //   linkTitle: "Audio",
    //   linkUrl: "/C/audio",
    // },
    // {
    //   linkTitle: "Graphic Design",
    //   linkUrl: "/C/design",
    // },
    {
      linkTitle: "General",
      linkUrl: "/C/general",
    },
    // {
    //   linkTitle: "Education",
    //   linkUrl: "/C/education",
    // },
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
    <>
      <HeroPage
        name="Donald Louch"
        tagLine="and I am a Web Developer"
        links={pageLinks}
        cta={["About Me", "about"]}
        imageLink="https://donald-louch.sjc1.vultrobjects.com/photography/photography_LO3NICOBz1pJVUysp"
      />
      <ViewPostButton />
      {/* @ts-ignore */}
      <Posts posts={postData} pinnedPosts={pinnedPosts} pagination={paginationArray} postsNumber={parseInt(postLength)} />
    </>
  );
}
