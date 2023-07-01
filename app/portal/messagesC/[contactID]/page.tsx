import supabase from '@/lib/supabase';
import MessageCContent from '../MessageCContent'
// import createClient from "@/lib/supabase-server"

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `Edit: POST | ${process.env.WEBSITE_NAME}`,
//     description: 'Edit blog post. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.KEYWORDS}, portal`,
//     openGraph: {
//         title: `Edit: POST | ${process.env.WEBSITE_NAME}`,
//         description: 'Edit blog post. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

type Props = {
    params: { contactID: string }
};

export default async function MessageC({ params }: Props) {
  const { contactID } = params
  // const supabase = createClient();
  const { data: contactData } = await supabase.from('Contact').select().match({ id: contactID }).single() as any

  return <MessageCContent contactData={contactData} />
}