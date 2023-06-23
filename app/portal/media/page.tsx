// 'use server'

import MediaManager from './MediaManager'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `${process.env.WEBSITE_NAME} Media Manager`,
//     description: 'The media manager page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.KEYWORDS}, portal`,
//     openGraph: {
//         title: `${process.env.WEBSITE_NAME} Media Manager`,
//         description: 'The media manager page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

export default function Media() {
  return <MediaManager />
}