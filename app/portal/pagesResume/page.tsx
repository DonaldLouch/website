import supabase from '@/lib/supabase'
import EditResumePage from './EditResumePage'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `Edit: Resume Page | ${process.env.WEBSITE_NAME}`,
//     description: 'The Donald Louch Resume Page Edit. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.KEYWORDS}, portal`,
//     openGraph: {
//         title: `Edit: Resume Page | ${process.env.WEBSITE_NAME}`,
//         description: 'The Donald Louch Resume Page Edit. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

export default async function PortalResumePage() {
  const { data: resume } = await supabase.from('Resume').select().single() as any
  return <EditResumePage resume={resume} />
}