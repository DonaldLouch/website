import NewPostContent from './NewPostContent'

// import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: `New Blog Post | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//     description: 'Creating a new blog post. This area is restricted to access by Donald Louch ONLY!',
//     keywords: `${process.env.NEXT_PUBLIC_KEYWORDS}, portal`,
//     openGraph: {
//         title: `New Blog Post | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
//         description: 'Creating a new blog post. This area is restricted to access by Donald Louch ONLY!',
//     },
// }

export default async function EditBlogPost() {
  return <NewPostContent />
}