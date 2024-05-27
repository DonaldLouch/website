import supabase from "@/lib/supabase";
import VideoFeed from "./VideoFeed";

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: `Videography Feed | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
    description: "Donald Louch's Videography Feed!",
    keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, feed, videography`,
    openGraph: {
        type: "website",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        title: `Videography Feed | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
        description: "Donald Louch's Videography Feed!",
        siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        images: [{
            url: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpg",
        }],
    },
    twitter: { card: "summary_large_image", site: process.env.NEXT_PUBLIC_SITE_URL, creator: "@DonaldLouch", images: "https://donaldlouch.s3.us-west-004.backblazeb2.com/donaldlouch/mob0k3krwkotmw3axkvt.jpgg" },
}

export default async function VideoPage() {
    const { data: videoData } = await supabase.from('Videography').select(`*, videoFileID (*), thumbnailFileID (*), category (*)`).match({ videoPrivacy: "Public", isSetup: true }).order('uploadedOn', { ascending: false }).limit(12) as any
    const { count: videosCount } = await supabase.from('Videography').select("*", { count: 'exact'}).match({ videoPrivacy: "Public", isSetup: true })
    return <VideoFeed videoData={videoData} videosCount={videosCount} />
}
