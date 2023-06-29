import supabase from '@/lib/supabase'
import EditAboutPage from './EditAboutPage'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `Edit: About Me Page | ${process.env.WEBSITE_NAME}`,
//     description: 'The Donald Louch About Me Page Edit. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.KEYWORDS}, portal`,
//     openGraph: {
//         title: `Edit: About Me Page | ${process.env.WEBSITE_NAME}`,
//         description: 'The Donald Louch About Me Page Edit. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

export default async function PortalAboutPage() {
  const { data: about } = await supabase.from('About').select().single() as any
  return <EditAboutPage about={about} />
}