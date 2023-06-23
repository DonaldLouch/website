import createClient from "@/lib/supabase-server"

import AboutGeneralLayout from "./GeneralLayout";

import { Metadata } from 'next'
export async function generateMetadata(): Promise<Metadata> {
    const supabase = createClient();
    const {data: about} = await supabase.from('About').select() as any
    const aboutMeta = about[0]
    return {
      title: `About: ${aboutMeta.firstName} ${aboutMeta.middleName} ${aboutMeta.lastName}`,
      description: aboutMeta.bioExcerpt,
      keywords: `${process.env.KEYWORDS}, ${aboutMeta.firstName} ${aboutMeta.lastName}, ${aboutMeta.firstName}, ${aboutMeta.lastName}, ${aboutMeta.middleName}, about me, ${aboutMeta.firstName} ${aboutMeta.middleName} ${aboutMeta.lastName}, canada, Canadian, photographer, videographer, web developer, devop`,
      openGraph: {
          url: `${process.env.SITE_URL}/about`,
          title: `About: ${aboutMeta.firstName} ${aboutMeta.middleName} ${aboutMeta.lastName}`,
          description: aboutMeta.bioExcerpt,
          images: [{
              url: aboutMeta.avatar,
          }],
      },
      twitter: { site: `${process.env.SITE_URL}/about`, creator: "@DonaldLouch", images: aboutMeta.avatar },
      appleWebApp: { title: `About: ${aboutMeta.firstName} ${aboutMeta.middleName} ${aboutMeta.lastName}` }
    }
}

export default function AboutMe() {
  // const fetcher = (url: RequestInfo | URL) =>
  //   fetch(url).then((res) => res.json());
  // const pageID = "pageL4UBFE8Gz45" as string;
  // useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  return <AboutGeneralLayout />
}