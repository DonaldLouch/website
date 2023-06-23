import BlogContent from './BlogContent'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `${process.env.WEBSITE_NAME} Blog Posts`,
//     description: 'The blog posts manager page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.KEYWORDS}, portal`,
//     openGraph: {
//         title: `${process.env.WEBSITE_NAME} Blog Posts`,
//         description: 'The blog posts manager page for Donald Louch. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

export default function PortalBlog() {
  return <BlogContent />
}