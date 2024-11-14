// "use server"

import { serialize } from "next-mdx-remote-client/serialize"

// export async function MDXBody(body): Promise<any[]> {
export async function MDXBody(body: any): Promise<any> {
  try {
    const mdxSource = await serialize({ source: body })
    return mdxSource
  } catch (error) {
    console.error("Error parsing MDX:", error)
    throw new Error("Failed to parse MDX.")
  }
}