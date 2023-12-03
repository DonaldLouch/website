import PagesContent from './PagesContent'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} Pages Manager`,
//     description: 'The Donald Louch page manager. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portal`,
//     openGraph: {
//         title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} Pages Manager`,
//         description: 'The Donald Louch page manager. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

export default function PageManager() {
  return <PagesContent />
}