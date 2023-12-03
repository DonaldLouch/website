import supabase from '@/lib/supabase';
import MessageJContent from '../MessageJContent'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `Edit: POST | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//     description: 'Edit blog post. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portal`,
//     openGraph: {
//         title: `Edit: POST | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//         description: 'Edit blog post. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

type Props = {
    params: { jobID: string }
};

export default async function MessageJ({ params }: Props) {
  const { jobID } = params
  const { data: contactData } = await supabase.from('Job').select().match({ id: jobID }).single() as any

  return <MessageJContent contactData={contactData} />
}