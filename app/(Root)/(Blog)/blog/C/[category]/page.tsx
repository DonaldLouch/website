import { Metadata } from 'next'
import CategoryContent from "./CategoryContent";
import supabase from "@/lib/supabase";

type Params = Promise<{ category: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { category } = await params

    const {count: postCount} = await supabase.from('BlogPost').select("*", { count: 'exact'}).ilike('category', `%${category}%`).match({ postStatus: 'Public' }) as any
    return {
      title: `(${postCount}) ${category} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
      description: `Blog posts by Donald Louch that are flagged with the category ${category}`,
      openGraph: {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/C/${category}`,
          title: `(${postCount}) ${category} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
          description: `Blog posts by Donald Louch that are flagged with the category ${category}`,
      },
      twitter: { site: `${process.env.NEXT_PUBLIC_SITE_URL}/C/${category}` },
      appleWebApp: { title: `(${postCount}) ${category} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}` }
    }
}

export default async function Category(props: {params: Params, searchParams: SearchParams}) {
    const { category } = await props.params
    const { pg } = await props.searchParams as any



    let page = parseInt(pg) as number
    let currentPage = (((page) - 1) as number) || 0

    const postLimit = 12 as number
    const {count: postLength} = await supabase.from('BlogPost').select("*", { count: 'exact'}).contains('category', [category]).match({ postStatus: 'Public' }) as any

    let numberOfPages = (postLength / postLimit) as number;


    if (!Number.isInteger(numberOfPages)) {
        numberOfPages = Math.floor(numberOfPages) + 1;
    }

    if (numberOfPages < page) {
        currentPage = numberOfPages;
    }
    const pageCalc = currentPage * postLimit
    const { data: postData } = await supabase.from('BlogPost').select().contains('category', [category]).match({ postStatus: 'Public' }).order('postedOn', { ascending: false }).range(pageCalc, (pageCalc + postLimit - 1))
    //   .ilike('category', `%${category}%`).match({ postStatus: 'Public' })

    const paginationArray = new Array();
    paginationArray.push(numberOfPages, currentPage);

    return <CategoryContent posts={postData} pagination={paginationArray} postsNumber={postLength} category={category} />
}