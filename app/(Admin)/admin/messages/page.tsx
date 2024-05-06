import supabase from '@/lib/supabase'
import MessagesPage from './MessagesPage'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `Test Page | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//     description: 'The portal test page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portal`,
//     openGraph: {
//         title: `Test Page | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//         description: 'The portal test page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

export default async function PortalMessages() {
  const { data: contact } = await supabase.from('Contact').select().order('sentOn', { ascending: false }) as any
  const { data: job } = await supabase.from('Job').select().order('sentOn', { ascending: true }) as any
  return <MessagesPage contactData={contact} jobData={job} />
}