import { Metadata } from "next"
import LinkSetPage from "./LinkSetPage"
import supabase from "@/lib/supabase"
import { serialize } from "next-mdx-remote-client/serialize"

type Params = Promise<{ slug: string }>

// export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
//     const { slug } = await params

//     const {data: postMeta} = await supabase.from('BlogPost').select('title,excerpt,thumbnail,tags,category,slug').match({ slug: slug }).single() as any
//     return {
//       title: `${postMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//       description: postMeta.excerpt,
//       keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, ${postMeta.tags}, ${postMeta.category}`,
//       openGraph: {
//           url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${postMeta.slug}`,
//           title: `${postMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//           description: postMeta.excerpt,
//           images: [{
//               url: postMeta.thumbnail,
//           }],
//       },
//       twitter: { site: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${postMeta.slug}`, creator: "@DonaldLouch", images: postMeta.thumbnail },
//       appleWebApp: { title: `${postMeta.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}` }
//     }
// }

export default async function page({ params }: { params: Params }) {
     const { slug } = await params
    const { data: linkSet } = await supabase.from('LinkSet').select().match({ setSlug: slug }).single() as any
    const mdxSource = await serialize({source: linkSet?.description})
    
    return <LinkSetPage linkSet={linkSet} mdxSource={mdxSource} />
}
