import supabase from "@/lib/supabase";
import AboutGeneralLayout from "./GeneralLayout";

import { serialize } from 'next-mdx-remote/serialize'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Metadata } from 'next'
export async function generateMetadata(): Promise<Metadata> {
    const {data: about} = await supabase.from('About').select() as any
    const aboutMeta = about[0]
    return {
      title: `About: ${aboutMeta.firstName} ${aboutMeta.middleName} ${aboutMeta.lastName}`,
      description: aboutMeta.bioExcerpt,
      keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, ${aboutMeta.firstName} ${aboutMeta.lastName}, ${aboutMeta.firstName}, ${aboutMeta.lastName}, ${aboutMeta.middleName}, about me, ${aboutMeta.firstName} ${aboutMeta.middleName} ${aboutMeta.lastName}, canada, Canadian, photographer, videographer, web developer, devop`,
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

export default async function AboutMe() {
  // const fetcher = (url: RequestInfo | URL) =>
  //   fetch(url).then((res) => res.json());
  // const pageID = "pageL4UBFE8Gz45" as string;
  // useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  const { data: aboutMe } = await supabase.from('About').select().single()
  const { data: pinnedPostsData } = await supabase.from('BlogPost').select().match({ pinned: true, postStatus: 'Public' }).order('postedOn', { ascending: false }) as any
  const { data: primaryLinksData } = await supabase.from('PrimaryLinks').select().order('orderNumber', { ascending: true }) as any
  const { data: linksData } = await supabase.from('Links').select().order('lastUpdatedOn', { ascending: false }) as any
  const { data: embedsData } = await supabase.from('Embed').select().order('lastUpdatedOn', { ascending: false }) as any

  const mdxSource = await serialize(aboutMe.bio!, {mdxOptions: {
        development: process.env.NODE_ENV === 'development',
    }}) as MDXRemoteSerializeResult

  return <AboutGeneralLayout  about={aboutMe} posts={pinnedPostsData} primaryLinks={primaryLinksData} links={linksData} embeds={embedsData} mdxSource={mdxSource}/>
}