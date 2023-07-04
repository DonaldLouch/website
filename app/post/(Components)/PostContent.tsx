import { MdxContent } from '@/app/mdx-content'
export default function PostContent({mdxSource}: any) {
  return <MdxContent source={mdxSource} />
}