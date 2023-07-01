import supabase from '@/lib/supabase'
import EditLinksPage from './EditLinksPage'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `Edit: Links Page | ${process.env.WEBSITE_NAME}`,
//     description: 'The Donald Louch Links Page Edit. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.KEYWORDS}, portal`,
//     openGraph: {
//         title: `Edit: Resume Page | ${process.env.WEBSITE_NAME}`,
//         description: 'The Donald Louch Links Page Edit. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

export default async function PortalLinksPage() {
  const { data: links } = await supabase.from('Links').select().order('lastUpdatedOn', { ascending: false }) as any
  const { data: primaryLinks } = await supabase.from('PrimaryLinks').select().order('orderNumber', { ascending: true }) as any
  const { data: embeds } = await supabase.from('Embed').select().order('lastUpdatedOn', { ascending: false }) as any
  // const { data: pinnedPosts } = await supabase.from('BlogPost').select().order('lastUpdatedOn', { ascending: false }) as any
  return <EditLinksPage links={links} primaryLinks={primaryLinks} embeds={embeds} />
}