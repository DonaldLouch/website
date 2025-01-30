import supabase from "@/lib/supabase";
import HeroPage from "@/app/(Components)/HeroPage";

import Posts from "./Posts";
import ViewPostButton from "./ViewPostButton";

import type { Metadata } from 'next'
import HeroSection from "@/app/(Components)/(Cards)/HeroSection";
import HugeIcon from "@/app/(Components)/HugeIcon";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME}'s Blog Post's`,
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, blog. post, feed, photography, videography, audio, design, general, education`,
    openGraph: {
        type: "website",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} Blog Post's`,
        description: process.env.NEXT_PUBLIC_DESCRIPTION,
        siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        images: [{
            url: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.NEXT_PUBLIC_SITE_URL, creator: "@DonaldLouch", images: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpgg" },
}

export default async function Blog(props: {searchParams: SearchParams}) {
  const { pg } = await props.searchParams as any

  let page = parseInt(pg) as number
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
  const { data: pinnedPosts } = await supabase.from('BlogPost').select().match({ postStatus: 'Public', isPinned: true }).order('postedOn', { ascending: false })

  const paginationArray = new Array()
  paginationArray.push(numberOfPages, currentPage)

  const links = [
    // {
    //   linkTitle: "Photography",
    //   linkUrl: "/feed/photography",
    // }
    {linkUrl: "/blog/C/life", linkTitle: "Life Updates", linkIcon: <HugeIcon name="contact" /> },
    {linkUrl: "/blog/C/website", linkTitle: "Website Updates", linkIcon: <HugeIcon name="globe-02" />},
    {linkUrl: "/blog/C/travel", linkTitle: "Travel", linkIcon: <HugeIcon name="pin-location-03" />},
    {linkUrl: "/blog/C/education", linkTitle: "Education", linkIcon: <HugeIcon name="desk" />},
    {linkUrl: "/feed/photography", linkTitle: "Photography Feed", linkIcon: <HugeIcon name="album-01" />},
    {linkUrl: "/feed/videography", linkTitle: "Videography Feed", linkIcon: <HugeIcon name="camera-video" />},
  ];
  const cta = [
    { ctaTitle: "About Me", ctaLink: "/", ctaVector: <HugeIcon name="contact" /> }
  ]

  const { data: aboutMe } = await supabase.from('About').select().single()

  return (
    <>
      <HeroSection
        links={links}
        aboutMe={aboutMe}
        cta= {cta}
        imageLink="https://donaldlouch.s3.us-west-004.backblazeb2.com/photography/photography_LO3NICOBz1pJVUysp.jpg"
      />
      <ViewPostButton />
      <Posts posts={postData} pinnedPosts={pinnedPosts} pagination={paginationArray} postsNumber={parseInt(postLength)} />
    </>
  );
}
