import { createServerFn } from "@tanstack/react-start"

import { serialize } from 'next-mdx-remote/serialize';

export const GetMarkdown = createServerFn({ method: 'GET' })
    .inputValidator((data: { content: any }) => data)
    .handler(async (ctx) => {
        const { content } = ctx.data
        const mdx = content && await serialize((content || "No content"), { parseFrontmatter: true }) as any
        // console.log("db", id)
        return mdx
    })