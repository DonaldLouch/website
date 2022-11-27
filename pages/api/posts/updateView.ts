
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const postData = JSON.parse(req.body) as unknown|any|null
        // console.log(postData)
        const post = await prisma.blogPost.update({
            where: {
                id: postData.id
            },
            data: {
                views: postData.newView,
            }
        })
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error updating the view count." })
    }
}