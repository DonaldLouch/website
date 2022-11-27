import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
    // if (req.method === 'POST') {
    //     return res.status(405).json({ message: 'Method Not Allowed' })
    // }

    try {
        const embedData = JSON.parse(req.body) as unknown|any|null
        // console.log(postData)

        const embed = await prisma.embed.create({
            data: {
                title: embedData.title,
                link: embedData.link,
                embedLink: embedData.embed,
                options: embedData.options,
                note: embedData.note,
            },
        })

        res.status(200).json(embed)
    } catch (error: any) {
            // console.log(error)
            res.status(500).json({ error })
    }
}