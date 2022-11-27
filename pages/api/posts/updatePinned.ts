
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const postData = JSON.parse(req.body) as unknown|any|null
        // console.log("data", postData)
        postData.map(async (post: { postID: string; pinned: boolean }) => {
            await prisma.blogPost.updateMany({
                where: { id: post.postID },
                data: {
                    pinned: post.pinned,
                }
            }) as any
        })

        res.status(200).json({ message: "Successfully updated primary links" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error updating about me" })
    }
}