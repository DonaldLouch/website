import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const postData = JSON.parse(req.body) as unknown|any|null

        const post = await prisma.blogPost.create({
            data: {
                id: postData.id,
                title: postData.title,
                slug: postData.slug,
                blogType: postData.blogType,
                media: postData.media,
                mediaCredit: postData.mediaCredit,
                headingText: postData.headingText,
                body: postData.body,
                excerpt: postData.excerpt,
                categories: postData.categories,
                tags: postData.tags,
                thumbnail: postData.thumbnail,
                sidebar: postData.sidebar,
                pinned: postData.pinned,
                sections: postData.sections,
                author: postData.author,
                postStatus: postData.postStatus,
                postedOn: postData.postedOn,
            },
        })

        res.status(200).json(post)
    } catch (error: any) {
        if(error.code === "P2002") {
            res.status(400).json({ message: 'Slug is already used. Try another slug.'})
        } else {
            res.status(500).json({ error })
        }
    }
}