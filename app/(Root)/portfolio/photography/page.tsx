import supabase from "@/lib/supabase";

import type { Metadata } from 'next'
import PortfolioPhotographyFeed from "./PortfolioPhotographyFeed";

export const metadata: Metadata = {
    title: `Photography | Donald Louch Portfolio`,
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portfolio, Donald Louch, donald, louch, photography`,
    openGraph: {
        type: "website",
        url: process.env.SITE_URL,
        title: `Photography | Donald Louch Portfolio`,
        description: process.env.NEXT_PUBLIC_DESCRIPTION,
        siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        images: [{
            url: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.SITE_URL, creator: "@DonaldLouch", images: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpgg" },
}

export default async function PortfolioPhotography() {
  const postLimit = 20 as number

  const { data: aboutMe } = await supabase.from('About').select().single()

//   const mdxSource = await serialize({source: aboutMe.bio})

  // const { data: photographyAlbum } = await supabase.from('PhotographyAlbum').select().order('lastUpdatedOn', { ascending: false }) as any
  // const { data: locationData } = await supabase.from('distinct_locations').select().order('location', { ascending: true }) as any

  const { data: photos } = await supabase
      .from('Photography')
      .select(`*, fileID (*), album (*)`)
      .limit(postLimit)
      .order('uploadedOn', { ascending: false })
      .match({ isPublic: true, isSetup: true, isPortfolio: true })

  const { count: photosCount } = await supabase.from('Photography').select("*", { count: 'exact'}).match({ isPublic: true, isSetup: true, isPortfolio: true })

  return <PortfolioPhotographyFeed photos={photos} about={aboutMe} photosCount={photosCount} />
}
