import { Metadata } from 'next'
import TagContent from "./TagContent";
import supabase from '@/lib/supabase';

type Params = Promise<{ tag: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { tag } = await params
    const {count: postCount} = await supabase.from('BlogPost').select("*", { count: 'exact'}).ilike('tags', `%${tag}%`).match({ postStatus: 'Public' }) as any
    return {
      title: `(${postCount}) ${tag} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
      description: `Blog posts by Donald Louch that are flagged with the tag ${tag}`,
      openGraph: {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/T/${tag}`,
          title: `(${postCount}) ${tag} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
          description: `Blog posts by Donald Louch that are flagged with the tag ${tag}`,
      },
      twitter: { site: `${process.env.NEXT_PUBLIC_SITE_URL}/T/${tag}` },
      appleWebApp: { title: `(${postCount}) ${tag} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}` }
    }
}

export default async function Tag(props: {params: Params, searchParams: SearchParams}) {
    const { tag } = await props.params
    const { pg } = await props.searchParams as any

    let page = parseInt(pg) as number
    let currentPage = (((page) - 1) as number) || 0
    const postLimit = 12 as number
    const {count: postLength} = await supabase.from('BlogPost').select("*", { count: 'exact'}).contains('tags', [tag]).match({ postStatus: 'Public' }) as any
    let numberOfPages = (postLength / postLimit) as number;

    if (!Number.isInteger(numberOfPages)) {
        numberOfPages = Math.floor(numberOfPages) + 1;
    }

    if (numberOfPages < page) {
        currentPage = numberOfPages;
    }
    const pageCalc = currentPage * postLimit
    const { data: postData } = await supabase.from('BlogPost').select().contains('tags', [tag]).match({ postStatus: 'Public' }).order('postedOn', { ascending: false }).range(pageCalc, (pageCalc + postLimit - 1))

    const paginationArray = new Array()
    paginationArray.push(numberOfPages, currentPage)

    return <TagContent posts={postData} pagination={paginationArray} postsNumber={postLength} tag={tag} />
}