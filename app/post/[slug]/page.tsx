import createClient from "@/lib/supabase-server"
import PostPage from "./PostPage";

{/* <Metadata
        title={`${post.title} | ${process.env.WEBSITE_NAME}`}
        keywords={`${process.env.KEYWORDS}, ${post.tags}`}
        description={`${post.excerpt}`}
      /> */}

import { Metadata } from 'next';
type Props = {
    params: { slug: string }
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params
    const supabase = createClient();
    const {data: post} = await supabase.from('BlogPost').select('title,excerpt,thumbnail,tags,categories,slug').match({ slug: slug }) as any
    const postMeta = post[0]
    // console.log("Metadata", excerpt)
    return {
      title: `${postMeta.title} | ${process.env.WEBSITE_NAME}`,
      description: postMeta.excerpt,
      keywords: `${process.env.KEYWORDS}, ${postMeta.tags}, ${postMeta.categories}`,
      openGraph: {
          url: `${process.env.SITE_URL}/post/${postMeta.slug}`,
          title: `${postMeta.title} | ${process.env.WEBSITE_NAME}`,
          description: postMeta.excerpt,
          images: [{
              url: postMeta.thumbnail,
          }],
      },
      twitter: { site: `${process.env.SITE_URL}/post/${postMeta.slug}`, creator: "@DonaldLouch", images: postMeta.thumbnail },
      appleWebApp: { title: `${postMeta.title} | ${process.env.WEBSITE_NAME}` }
    }
}

export default async function Post({ params }: Props) {
  const { slug } = params
  const supabase = createClient();
  const { data: post } = await supabase.from('BlogPost').select().match({ slug: slug }) as any

  const { data: { user } } = await supabase.auth.getUser();
  let loggedIn = false
  user ? loggedIn = true : false

  return <PostPage {...post} loggedIn={loggedIn} />
}