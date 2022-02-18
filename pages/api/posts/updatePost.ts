
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../config/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const postData = JSON.parse(req.body) as unknown|any|null
        // console.log(postData)
        const post = await prisma.blogPost.update({
            where: {
                id: postData.id
            },
            data: {
                title: postData.title,
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
                sections: postData.sections,
                postStatus: postData.postStatus,
                postedOn: postData.postedOn,
                lastUpdatedOn: postData.lastUpdatedOn,
            }
        })
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error updating about me" })
    }
}