import supabase from '@/lib/supabase';
import MessageContent from '../MessageContent'

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


type Params = Promise<{ messageID: string }>

export default async function MessageC({ params }: { params: Params }) {
  const { messageID } = await params
  const type = messageID.includes("contact") ? "contact" : messageID.includes("job") ? "job" : undefined

  const { data: contactData } = await supabase.from('Contact').select().match({ id: messageID }).single() as any
  const { data: jobData } = await supabase.from('Job').select().match({ id: messageID }).single() as any

  return <MessageContent contactData={type === "contact" ? contactData : undefined} jobData={type === "job" ? jobData : undefined} type={type} />
}