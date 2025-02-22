import supabase from "@/lib/supabase";
import PhotographyFeed from "./PhotographyFeed";

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: `Photography Feed | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
    description: "Donald Louch's Photography Feed!",
    keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, feed, photography`,
    openGraph: {
        type: "website",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        title: `Videography Feed | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
        description: "Donald Louch's Photography Feed!",
        siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        images: [{
            url: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.NEXT_PUBLIC_SITE_URL, creator: "@DonaldLouch", images: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpgg" },
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function PortfolioPhotography(props: {searchParams: SearchParams}) {
  const { search: searchType,  value: searchValue  } = await props.searchParams as any
  // const searchType = searchParams.search as string
  // const searchValue = searchParams.value as string

  const postLimit = 15 as number

  const { data: photographyAlbum } = await supabase.from('PhotographyAlbum').select().order('uploadedOn', { ascending: false }) as any
  const { data: locationData } = await supabase.from('distinct_locations').select().order('location', { ascending: true }) as any
  const { data: tagData } = await supabase.from('distinct_tags').select().order('tag', { ascending: true }) as any

  const keyword = searchType === "tag" || searchType === "keyword"
    && searchValue?.includes("HASHTAG") ? searchValue?.replace('HASHTAG', '#') 
    : searchValue?.includes("%20") ? searchValue?.replace('%20', ' ') 
    : searchValue

  const query = supabase
    .from('Photography')
    .select(`*, fileID (*), album (*)`)
    .limit(postLimit)
    .match({ 
      isPublic: true, 
      isSetup: true,
      ...(searchType === "view" && searchValue === "pinned" ? { isPinned: true } : {})
    })
    if (searchType && searchValue) {
      switch (searchType) {
        case 'keyword':
          query.or(`caption.ilike.%${keyword}%,photoName.ilike.%${keyword}%,tags.cs.{${keyword}}`)
          query.contains('tags', [`${keyword}`])
          break
        case 'location':
          query.ilike('location', `%${keyword}%`)
          break
        case 'tag':
          query.contains('tags', [`${keyword}`])
          break
      }
    }
    query.order('uploadedOn', { ascending: searchType === "order" && searchValue === 'old' ? true : false })
  
  const query2 = supabase
    .from('Photography')
    .select("*", { count: 'exact'})
    .limit(postLimit)
    .match({ 
      isPublic: true,
       isSetup: true,
      ...(searchType === "view" && searchValue === "pinned" ? { isPinned: true } : {})
    })
    if (searchType && searchValue) {
      switch (searchType) {
        case 'keyword':
          query2.or(`caption.ilike.%${keyword}%,photoName.ilike.%${keyword}%,tags.cs.{${keyword}}`)
          break
        case 'location':
          query2.ilike('location', `%${keyword}%`)
          break
        case 'tag':
          query2.contains('tags', [`${keyword}`])
          break
      }
    }

    const { data: photos } = await query

    const { count: photosCount } = await query2

  return <PhotographyFeed photos={photos} photographyAlbum={photographyAlbum} locationData={locationData} tagData={tagData} searchType={searchType} searchValue={keyword} photosCount={photosCount} />
}
