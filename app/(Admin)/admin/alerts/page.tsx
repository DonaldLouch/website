import supabase from '@/lib/supabase'
import AlertsManager from './AlertsManager'

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

export default async function Alerts() {
  const { data: alerts } = await supabase.from('WebsiteAlerts').select().order('LastUpdated', { ascending: false }) as any
  return <AlertsManager alerts={alerts} />
}