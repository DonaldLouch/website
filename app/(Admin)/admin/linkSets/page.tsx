import LinkSetsManager from './LinkSetsManager'

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

export default function LinkSets() {
  return <LinkSetsManager />
}