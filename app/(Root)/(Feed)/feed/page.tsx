import { AppShell } from "@mantine/core";
import HeroPage from "../../../(Components)/HeroPage";

// import Posts from "./Posts";
// import ViewPostButton from "./ViewPostButton";

import type { Metadata } from 'next'
import supabase from "@/lib/supabase";
import FeedHome from "./FeedHome";
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
    twitter: { card: "summary_large_image", site: process.env.SITE_URL, creator: "@DonaldLouch", images: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg" },
}

export default async function Blog() {
    const { data: aboutMe } = await supabase.from('About').select().single()
  const { data: pinnedPostsData } = await supabase.from('BlogPost').select().match({ isPinned: true, postStatus: 'Public' }).order('postedOn', { ascending: false }) as any
  const { data: primaryLinksData } = await supabase.from('PrimaryLinks').select().order('orderNumber', { ascending: true }) as any
  const { data: linksData } = await supabase.from('Links').select().order('lastUpdatedOn', { ascending: false }) as any
  // const { data: embedsData } = await supabase.from('Embed').select().order('lastUpdatedOn', { ascending: false }) as any
  const { data: photos } = await supabase
      .from('Photography')
      .select(`*, fileID (*), album (*)`)
      .limit(20)
      // .order('')
      .match({ isPublic: true, isSetup: true, isPinned: true })
  const { data: videos } = await supabase
      .from('Videography')
      .select(`*, videoFileID (*), thumbnailFileID (*), category (*)`)
      // .limit(20)
      // .order('')
     .match({ videoPrivacy: "Public", isSetup: true, isPinned: true})
     .order('uploadedOn', { ascending: false })
  // const mdxSource = await serialize({source: aboutMe.bio})

  const { count: photosPinnedCount } = await supabase.from('Photography').select("*", { count: 'exact'}).match({ isPublic: true, isSetup: true, isPinned: true })
  const { count: photosAllCount } = await supabase.from('Photography').select("*", { count: 'exact'}).match({ isPublic: true, isSetup: true })

  // const { count: videosPinnedCount } = await supabase.from('Videography').select("*", { count: 'exact'}).match({ videoPrivacy: "Public", isSetup: true, isPinned: true })
  const { count: videosAllCount } = await supabase.from('Videography').select("*", { count: 'exact'}).match({ videoPrivacy: "Public", isSetup: true })

  // const { count: postPinnedCount } = await supabase.from('BlogPost').select("*", { count: 'exact'}).match({ isPinned: true, postStatus: 'Public' })
  const { count: postAllCount } = await supabase.from('BlogPost').select("*", { count: 'exact'}).match({ postStatus: 'Public' })
  
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
    //   linkUrl: "/blog/C/audio",
    // },
    // {
    //   linkTitle: "LEGACY: Graphic Design",
    //   linkUrl: "/blog/C/design",
    // },
    {
      linkTitle: "LEGACY: Blog Posts",
      linkUrl: "/blog",
    },
    {
      linkTitle: "LEGACY: General",
      linkUrl: "/blog/C/general",
    },
  ]

    
  return <FeedHome pinnedPhotos={photos} photosPinnedCount={photosPinnedCount} photosAllCount={photosAllCount} videosAllCount={videosAllCount} videos={videos} pinnedPosts={pinnedPostsData} postAllCount={postAllCount}  />
}
