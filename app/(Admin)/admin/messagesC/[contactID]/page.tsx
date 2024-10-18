import supabase from '@/lib/supabase';
import MessageCContent from '../MessageCContent'

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
    params: { contactID: string }
};

export default async function MessageC(props: Props) {
  const params = await props.params;
  const { contactID } = params
  const { data: contactData } = await supabase.from('Contact').select().match({ id: contactID }).single() as any

  return <MessageCContent contactData={contactData} />
}